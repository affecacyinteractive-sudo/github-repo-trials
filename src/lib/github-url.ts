import { AppError } from "@/lib/errors";

export type GithubResolvedRefType = "default_branch" | "branch" | "tag" | "commit";

export type ParsedGithubRepoUrl = {
  owner: string;
  repoName: string;
  canonicalUrl: string;
  refFromUrl?: string;
  refTypeFromUrl?: Exclude<GithubResolvedRefType, "default_branch">;
};

const GITHUB_HOSTS = new Set(["github.com", "www.github.com"]);

export function parseGithubRepoUrl(input: string): ParsedGithubRepoUrl {
  let url: URL;

  try {
    url = new URL(input);
  } catch {
    throw new AppError(
        "invalid_repo_url",
        "The provided repository URL is not a valid GitHub URL.",
        400
    );
  }

  if (!GITHUB_HOSTS.has(url.hostname)) {
    throw new AppError(
        "invalid_repo_url",
        "Only github.com repository URLs are supported.",
        400
    );
  }

  const parts = url.pathname.split("/").filter(Boolean);

  if (parts.length < 2) {
    throw new AppError(
        "invalid_repo_url",
        "Repository URL must look like https://github.com/owner/repo.",
        400
    );
  }

  const owner = decodeURIComponent(parts[0]);
  const repoName = stripGitSuffix(decodeURIComponent(parts[1]));

  if (!owner || !repoName) {
    throw new AppError(
        "invalid_repo_url",
        "Repository URL must include both owner and repo name.",
        400
    );
  }

  let refFromUrl: string | undefined;
  let refTypeFromUrl: ParsedGithubRepoUrl["refTypeFromUrl"];

  if (parts[2] === "commit" && parts[3]) {
    refFromUrl = decodeURIComponent(parts[3]);
    refTypeFromUrl = "commit";
  } else if (parts[2] === "releases" && parts[3] === "tag" && parts[4]) {
    refFromUrl = decodeURIComponent(parts[4]);
    refTypeFromUrl = "tag";
  } else if (parts[2] === "tree" && parts[3] && parts.length === 4) {
    refFromUrl = decodeURIComponent(parts[3]);
    refTypeFromUrl = "branch";
  } else if (parts[2] === "blob") {
    throw new AppError(
        "invalid_repo_url",
        "Paste the repository URL, not a file URL. Use the optional ref field for branch/tag/commit.",
        400
    );
  }

  return {
    owner,
    repoName,
    canonicalUrl: `https://github.com/${owner}/${repoName}`,
    refFromUrl,
    refTypeFromUrl
  };
}

function stripGitSuffix(value: string) {
  return value.endsWith(".git") ? value.slice(0, -4) : value;
}