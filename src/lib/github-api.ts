import { AppError } from "@/lib/errors";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_API_VERSION = "2026-03-10";

type GithubRepoResponse = {
    node_id: string;
    private: boolean;
    default_branch: string;
    license: {
        spdx_id: string | null;
        name: string | null;
    } | null;
};

type GithubBranchResponse = {
    name: string;
    commit: {
        sha: string;
    };
};

type GithubCommitResponse = {
    sha: string;
};

type GithubLicenseResponse = {
    license: {
        spdx_id: string | null;
        name: string | null;
    } | null;
};

type GithubGitRefResponse = {
    object: {
        type: "commit" | "tag";
        sha: string;
    };
};

type GithubTagObjectResponse = {
    object: {
        type: "commit" | "tag";
        sha: string;
    };
};

export type GithubRepoMetadata = {
    nodeId: string;
    defaultBranch: string;
    licenseSpdx: string | null;
    licenseName: string | null;
};

export type GithubResolvedRef = {
    requestedRef: string;
    resolvedRefType: "default_branch" | "branch" | "tag" | "commit";
    commitSha: string;
};

export type GithubLicenseMetadata = {
    spdxId: string | null;
    name: string | null;
} | null;

export async function getGithubRepositoryMetadata(
    owner: string,
    repoName: string
): Promise<GithubRepoMetadata> {
    const repo = await githubFetch<GithubRepoResponse>(`/repos/${owner}/${repoName}`);

    if (repo.private) {
        throw new AppError(
            "repo_not_public",
            "Only public GitHub repositories are supported right now.",
            403
        );
    }

    return {
        nodeId: repo.node_id,
        defaultBranch: repo.default_branch,
        licenseSpdx: repo.license?.spdx_id ?? null,
        licenseName: repo.license?.name ?? null
    };
}

export async function getGithubRepositoryLicense(
    owner: string,
    repoName: string
): Promise<GithubLicenseMetadata> {
    const license = await githubFetch<GithubLicenseResponse>(
        `/repos/${owner}/${repoName}/license`,
        { allow404: true }
    );

    if (!license) {
        return null;
    }

    return {
        spdxId: license.license?.spdx_id ?? null,
        name: license.license?.name ?? null
    };
}

export async function resolveGithubRef(
    owner: string,
    repoName: string,
    requestedRef: string | undefined,
    defaultBranch: string
): Promise<GithubResolvedRef> {
    if (!requestedRef) {
        const branch = await getBranch(owner, repoName, defaultBranch);
        return {
            requestedRef: defaultBranch,
            resolvedRefType: "default_branch",
            commitSha: branch.commit.sha
        };
    }

    if (requestedRef === defaultBranch) {
        const branch = await getBranch(owner, repoName, requestedRef);
        return {
            requestedRef,
            resolvedRefType: "branch",
            commitSha: branch.commit.sha
        };
    }

    const branch = await getBranch(owner, repoName, requestedRef, true);
    if (branch) {
        return {
            requestedRef,
            resolvedRefType: "branch",
            commitSha: branch.commit.sha
        };
    }

    const tagCommitSha = await getTagCommitSha(owner, repoName, requestedRef);
    if (tagCommitSha) {
        return {
            requestedRef,
            resolvedRefType: "tag",
            commitSha: tagCommitSha
        };
    }

    const commit = await getCommit(owner, repoName, requestedRef, true);
    if (commit) {
        return {
            requestedRef,
            resolvedRefType: "commit",
            commitSha: commit.sha
        };
    }

    throw new AppError(
        "commit_resolution_failed",
        `Could not resolve ref "${requestedRef}" to a commit SHA.`,
        422
    );
}

async function getBranch(
    owner: string,
    repoName: string,
    ref: string,
    allow404 = false
) {
    return githubFetch<GithubBranchResponse>(
        `/repos/${owner}/${repoName}/branches/${encodeURIComponent(ref)}`,
        { allow404 }
    );
}

async function getCommit(
    owner: string,
    repoName: string,
    ref: string,
    allow404 = false
) {
    return githubFetch<GithubCommitResponse>(
        `/repos/${owner}/${repoName}/commits/${encodeURIComponent(ref)}`,
        { allow404 }
    );
}

async function getTagCommitSha(
    owner: string,
    repoName: string,
    tag: string
): Promise<string | null> {
    const ref = await githubFetch<GithubGitRefResponse>(
        `/repos/${owner}/${repoName}/git/ref/tags/${encodeURIComponent(tag)}`,
        { allow404: true }
    );

    if (!ref) {
        return null;
    }

    if (ref.object.type === "commit") {
        return ref.object.sha;
    }

    const annotatedTag = await githubFetch<GithubTagObjectResponse>(
        `/repos/${owner}/${repoName}/git/tags/${ref.object.sha}`
    );

    if (annotatedTag.object.type !== "commit") {
        throw new AppError(
            "commit_resolution_failed",
            `Tag "${tag}" did not resolve to a commit.`,
            422
        );
    }

    return annotatedTag.object.sha;
}

async function githubFetch<T>(
    path: string,
    options?: {
        allow404?: boolean;
    }
): Promise<T | null> {
    const response = await fetch(`${GITHUB_API_BASE}${path}`, {
        method: "GET",
        headers: buildGithubHeaders(),
        cache: "no-store"
    });

    if (options?.allow404 && response.status === 404) {
        return null;
    }

    if (response.status === 404) {
        throw new AppError(
            "repo_not_found",
            "GitHub repository or ref not found.",
            404
        );
    }

    if (response.status === 403) {
        throw new AppError(
            "github_access_denied",
            "GitHub denied the request. Add GITHUB_TOKEN or try again later.",
            502
        );
    }

    if (!response.ok) {
        const text = await response.text();
        throw new AppError(
            "github_api_error",
            `GitHub API request failed with status ${response.status}: ${text}`,
            502
        );
    }

    return (await response.json()) as T;
}

function buildGithubHeaders() {
    const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": GITHUB_API_VERSION,
        "User-Agent": "Quescade-Core"
    };

    const token = process.env.GITHUB_TOKEN?.trim();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

export async function downloadGithubRepositoryArchive(
    owner: string,
    repoName: string,
    ref: string,
    format: "zip" | "tarball" = "zip"
): Promise<Buffer> {
    const endpoint =
        format === "zip"
            ? `/repos/${owner}/${repoName}/zipball/${encodeURIComponent(ref)}`
            : `/repos/${owner}/${repoName}/tarball/${encodeURIComponent(ref)}`;

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
        method: "GET",
        headers: buildGithubHeaders(),
        cache: "no-store",
        redirect: "follow"
    });

    if (response.status === 404) {
        throw new AppError(
            "archive_not_found",
            "Could not download the repository archive for the resolved ref.",
            404
        );
    }

    if (response.status === 403) {
        throw new AppError(
            "github_access_denied",
            "GitHub denied the archive request. Add GITHUB_TOKEN or try again later.",
            502
        );
    }

    if (!response.ok) {
        const text = await response.text();
        throw new AppError(
            "github_archive_error",
            `GitHub archive download failed with status ${response.status}: ${text}`,
            502
        );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.byteLength === 0) {
        throw new AppError(
            "empty_archive",
            "GitHub returned an empty archive.",
            502
        );
    }

    return buffer;
}