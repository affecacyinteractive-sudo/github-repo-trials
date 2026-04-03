module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/lib/contracts.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "codeBlockGetResponseSchema",
    ()=>codeBlockGetResponseSchema,
    "errorEnvelopeSchema",
    ()=>errorEnvelopeSchema,
    "fileGetResponseSchema",
    ()=>fileGetResponseSchema,
    "ingestJobSummarySchema",
    ()=>ingestJobSummarySchema,
    "ingestRequestSchema",
    ()=>ingestRequestSchema,
    "ingestResponseSchema",
    ()=>ingestResponseSchema,
    "repoSummarySchema",
    ()=>repoSummarySchema,
    "snapshotFileItemSchema",
    ()=>snapshotFileItemSchema,
    "snapshotFilesQuerySchema",
    ()=>snapshotFilesQuerySchema,
    "snapshotFilesResponseSchema",
    ()=>snapshotFilesResponseSchema,
    "snapshotGetResponseSchema",
    ()=>snapshotGetResponseSchema,
    "snapshotSummarySchema",
    ()=>snapshotSummarySchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const ingestRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    repoUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "repoUrl is required."),
    ref: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "ref cannot be empty.").max(255).optional()
});
const repoSummarySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("github"),
    owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    repoName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    canonicalUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()
});
const snapshotSummarySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    requestedRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    resolvedRefType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "default_branch",
        "branch",
        "tag",
        "commit"
    ]).nullable(),
    commitSha: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    detectedLicenseSpdx: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    detectedLicenseName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
    ingestStatus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "queued",
        "metadata_resolved",
        "archive_stored",
        "unpacked",
        "manifest_built",
        "blocks_extracted",
        "completed",
        "failed"
    ]),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime(),
    ingestedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable().optional()
});
const ingestJobSummarySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "queued",
        "running",
        "completed",
        "failed",
        "cancelled"
    ]),
    currentStep: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "queued",
        "resolve_metadata",
        "download_archive",
        "upload_archive",
        "unpack_archive",
        "classify_files",
        "persist_manifest",
        "extract_blocks",
        "finalize",
        "failed"
    ]),
    retryCount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
    errorCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
    errorMessage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
    startedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable().optional(),
    finishedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable().optional(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime(),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().optional()
});
const ingestResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    repo: repoSummarySchema,
    snapshot: snapshotSummarySchema,
    job: ingestJobSummarySchema.nullable(),
    reused: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
});
const snapshotGetResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    repo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
        provider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("github"),
        owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        repoName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        canonicalUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url(),
        defaultBranch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable()
    }),
    requestedRef: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    resolvedRefType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "default_branch",
        "branch",
        "tag",
        "commit"
    ]).nullable(),
    commitSha: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    archiveFormat: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "zip",
        "tarball"
    ]),
    detectedLicenseSpdx: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    detectedLicenseName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    ingestStatus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "queued",
        "metadata_resolved",
        "archive_stored",
        "unpacked",
        "manifest_built",
        "blocks_extracted",
        "completed",
        "failed"
    ]),
    ingestedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime().nullable(),
    createdAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime(),
    counts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        files: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
        excludedFiles: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
        parsedFiles: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
        codeBlocks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative()
    })
});
const snapshotFilesQuerySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    pathPrefix: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    language: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    excluded: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "true",
        "false"
    ]).optional().transform((value)=>value === undefined ? undefined : value === "true"),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().transform((value)=>value ? Number(value) : 100).pipe(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive().max(100)),
    cursor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const snapshotFileItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    path: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    fileName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    extension: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    language: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    sizeBytes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
    isBinary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    isGenerated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    isExcluded: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    excludedReason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    parseStatus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "pending",
        "parsed",
        "skipped",
        "failed"
    ])
});
const snapshotFilesResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    items: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(snapshotFileItemSchema),
    nextCursor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable()
});
const fileGetResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    snapshotId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    path: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    fileName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    extension: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    language: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    sizeBytes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
    isBinary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    isGenerated: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    isExcluded: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean(),
    excludedReason: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    parseStatus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "pending",
        "parsed",
        "skipped",
        "failed"
    ]),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    blocks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
        blockKind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "function",
            "method",
            "class",
            "interface",
            "type",
            "test_block"
        ]),
        symbolName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
        startLine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
        endLine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive()
    }))
});
const codeBlockGetResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    snapshotId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
    file: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid(),
        path: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        language: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable()
    }),
    blockKind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "function",
        "method",
        "class",
        "interface",
        "type",
        "test_block"
    ]),
    symbolName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    parentSymbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable(),
    startLine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
    endLine: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive(),
    contentText: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    contentHash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    extractionMode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("semantic"),
    commitSha: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const errorEnvelopeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        code: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })
});
}),
"[project]/src/lib/errors.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppError",
    ()=>AppError,
    "isAppError",
    ()=>isAppError
]);
class AppError extends Error {
    code;
    status;
    constructor(code, message, status = 400){
        super(message);
        this.code = code;
        this.status = status;
    }
}
function isAppError(error) {
    return error instanceof AppError;
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/http.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fail",
    ()=>fail,
    "ok",
    ()=>ok,
    "toAppError",
    ()=>toAppError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
;
;
;
function ok(data, init) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, init);
}
function fail(error) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: {
            code: error.code,
            message: error.message
        }
    }, {
        status: error.status
    });
}
function toAppError(error) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAppError"])(error)) {
        return error;
    }
    if (error instanceof SyntaxError) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_json", "Request body must be valid JSON.", 400);
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"]) {
        const firstIssue = error.issues[0];
        return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_request", firstIssue?.message ?? "Request validation failed.", 400);
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("internal_error", "An unexpected error occurred.", 500);
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[project]/src/generated/prisma/internal/class.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPrismaClientClass",
    ()=>getPrismaClientClass
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * Please import the `PrismaClient` class from the `client.ts` file instead.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const config = {
    "previewFeatures": [],
    "clientVersion": "7.6.0",
    "engineVersion": "75cbdc1eb7150937890ad5465d861175c6624711",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum Provider {\n  github\n}\n\nenum ResolvedRefType {\n  default_branch\n  branch\n  tag\n  commit\n}\n\nenum ArchiveFormat {\n  zip\n  tarball\n}\n\nenum SnapshotIngestStatus {\n  queued\n  metadata_resolved\n  archive_stored\n  unpacked\n  manifest_built\n  blocks_extracted\n  completed\n  failed\n}\n\nenum FileParseStatus {\n  pending\n  parsed\n  skipped\n  failed\n}\n\nenum IngestJobStatus {\n  queued\n  running\n  completed\n  failed\n  cancelled\n}\n\nenum IngestCurrentStep {\n  queued\n  resolve_metadata\n  download_archive\n  upload_archive\n  unpack_archive\n  classify_files\n  persist_manifest\n  extract_blocks\n  finalize\n  failed\n}\n\nenum CodeBlockKind {\n  function\n  method\n  class\n  interface\n  type\n  test_block\n}\n\nenum ExtractionMode {\n  semantic\n}\n\nmodel SourceRepo {\n  id            String   @id @db.Uuid\n  provider      Provider\n  owner         String\n  repoName      String   @map(\"repo_name\")\n  canonicalUrl  String   @unique @map(\"canonical_url\")\n  defaultBranch String?  @map(\"default_branch\")\n  isPublic      Boolean  @default(true) @map(\"is_public\")\n  createdAt     DateTime @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt     DateTime @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  snapshots SourceSnapshot[]\n\n  @@unique([provider, owner, repoName])\n  @@index([owner])\n  @@index([repoName])\n  @@map(\"source_repos\")\n}\n\nmodel SourceSnapshot {\n  id                    String               @id @db.Uuid\n  sourceRepoId          String               @map(\"source_repo_id\") @db.Uuid\n  requestedRef          String?              @map(\"requested_ref\")\n  resolvedRefType       ResolvedRefType?     @map(\"resolved_ref_type\")\n  commitSha             String               @map(\"commit_sha\")\n  archiveFormat         ArchiveFormat        @default(zip) @map(\"archive_format\")\n  archiveS3Key          String?              @map(\"archive_s3_key\")\n  archiveChecksumSha256 String?              @map(\"archive_checksum_sha256\")\n  archiveSizeBytes      BigInt?              @map(\"archive_size_bytes\")\n  detectedLicenseSpdx   String?              @map(\"detected_license_spdx\")\n  detectedLicenseName   String?              @map(\"detected_license_name\")\n  githubRepoNodeId      String?              @map(\"github_repo_node_id\")\n  ingestStatus          SnapshotIngestStatus @default(queued) @map(\"ingest_status\")\n  ingestRulesVersion    Int                  @default(1) @map(\"ingest_rules_version\")\n  ingestedAt            DateTime?            @map(\"ingested_at\") @db.Timestamptz(6)\n  createdAt             DateTime             @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt             DateTime             @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  sourceRepo SourceRepo   @relation(fields: [sourceRepoId], references: [id], onDelete: Cascade)\n  files      SourceFile[]\n  codeBlocks CodeBlock[]\n  ingestJobs IngestJob[]\n\n  @@unique([sourceRepoId, commitSha])\n  @@index([ingestStatus])\n  @@index([createdAt(sort: Desc)])\n  @@map(\"source_snapshots\")\n}\n\nmodel SourceFile {\n  id             String          @id @db.Uuid\n  snapshotId     String          @map(\"snapshot_id\") @db.Uuid\n  path           String\n  fileName       String          @map(\"file_name\")\n  extension      String?\n  language       String?\n  mimeType       String?         @map(\"mime_type\")\n  sizeBytes      BigInt          @map(\"size_bytes\")\n  sha256         String?\n  textS3Key      String?         @map(\"text_s3_key\")\n  isBinary       Boolean         @default(false) @map(\"is_binary\")\n  isGenerated    Boolean         @default(false) @map(\"is_generated\")\n  isExcluded     Boolean         @default(false) @map(\"is_excluded\")\n  excludedReason String?         @map(\"excluded_reason\")\n  parseStatus    FileParseStatus @default(pending) @map(\"parse_status\")\n  createdAt      DateTime        @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt      DateTime        @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  snapshot   SourceSnapshot @relation(fields: [snapshotId], references: [id], onDelete: Cascade)\n  codeBlocks CodeBlock[]\n\n  @@unique([snapshotId, path])\n  @@index([snapshotId, language])\n  @@index([snapshotId, isExcluded])\n  @@index([snapshotId, parseStatus])\n  @@map(\"source_files\")\n}\n\nmodel CodeBlock {\n  id             String         @id @db.Uuid\n  snapshotId     String         @map(\"snapshot_id\") @db.Uuid\n  fileId         String         @map(\"file_id\") @db.Uuid\n  blockKind      CodeBlockKind  @map(\"block_kind\")\n  symbolName     String?        @map(\"symbol_name\")\n  parentSymbol   String?        @map(\"parent_symbol\")\n  language       String?\n  startLine      Int            @map(\"start_line\")\n  endLine        Int            @map(\"end_line\")\n  byteStart      Int?           @map(\"byte_start\")\n  byteEnd        Int?           @map(\"byte_end\")\n  contentHash    String         @map(\"content_hash\")\n  contentText    String         @map(\"content_text\")\n  extractionMode ExtractionMode @default(semantic) @map(\"extraction_mode\")\n  createdAt      DateTime       @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt      DateTime       @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  snapshot SourceSnapshot @relation(fields: [snapshotId], references: [id], onDelete: Cascade)\n  file     SourceFile     @relation(fields: [fileId], references: [id], onDelete: Cascade)\n\n  @@unique([fileId, blockKind, symbolName, startLine, endLine])\n  @@index([snapshotId])\n  @@index([fileId])\n  @@index([snapshotId, blockKind])\n  @@index([snapshotId, symbolName])\n  @@map(\"code_blocks\")\n}\n\nmodel IngestJob {\n  id           String            @id @db.Uuid\n  snapshotId   String            @map(\"snapshot_id\") @db.Uuid\n  status       IngestJobStatus   @default(queued)\n  currentStep  IngestCurrentStep @default(queued) @map(\"current_step\")\n  retryCount   Int               @default(0) @map(\"retry_count\")\n  errorCode    String?           @map(\"error_code\")\n  errorMessage String?           @map(\"error_message\")\n  startedAt    DateTime?         @map(\"started_at\") @db.Timestamptz(6)\n  finishedAt   DateTime?         @map(\"finished_at\") @db.Timestamptz(6)\n  createdAt    DateTime          @default(now()) @map(\"created_at\") @db.Timestamptz(6)\n  updatedAt    DateTime          @updatedAt @map(\"updated_at\") @db.Timestamptz(6)\n\n  snapshot SourceSnapshot @relation(fields: [snapshotId], references: [id], onDelete: Cascade)\n\n  @@index([snapshotId])\n  @@index([status])\n  @@index([status, createdAt(sort: Desc)])\n  @@map(\"ingest_jobs\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"SourceRepo\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"enum\",\"type\":\"Provider\"},{\"name\":\"owner\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"repoName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"repo_name\"},{\"name\":\"canonicalUrl\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"canonical_url\"},{\"name\":\"defaultBranch\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"default_branch\"},{\"name\":\"isPublic\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_public\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"snapshots\",\"kind\":\"object\",\"type\":\"SourceSnapshot\",\"relationName\":\"SourceRepoToSourceSnapshot\"}],\"dbName\":\"source_repos\"},\"SourceSnapshot\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sourceRepoId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"source_repo_id\"},{\"name\":\"requestedRef\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"requested_ref\"},{\"name\":\"resolvedRefType\",\"kind\":\"enum\",\"type\":\"ResolvedRefType\",\"dbName\":\"resolved_ref_type\"},{\"name\":\"commitSha\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"commit_sha\"},{\"name\":\"archiveFormat\",\"kind\":\"enum\",\"type\":\"ArchiveFormat\",\"dbName\":\"archive_format\"},{\"name\":\"archiveS3Key\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"archive_s3_key\"},{\"name\":\"archiveChecksumSha256\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"archive_checksum_sha256\"},{\"name\":\"archiveSizeBytes\",\"kind\":\"scalar\",\"type\":\"BigInt\",\"dbName\":\"archive_size_bytes\"},{\"name\":\"detectedLicenseSpdx\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"detected_license_spdx\"},{\"name\":\"detectedLicenseName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"detected_license_name\"},{\"name\":\"githubRepoNodeId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"github_repo_node_id\"},{\"name\":\"ingestStatus\",\"kind\":\"enum\",\"type\":\"SnapshotIngestStatus\",\"dbName\":\"ingest_status\"},{\"name\":\"ingestRulesVersion\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"ingest_rules_version\"},{\"name\":\"ingestedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"ingested_at\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"sourceRepo\",\"kind\":\"object\",\"type\":\"SourceRepo\",\"relationName\":\"SourceRepoToSourceSnapshot\"},{\"name\":\"files\",\"kind\":\"object\",\"type\":\"SourceFile\",\"relationName\":\"SourceFileToSourceSnapshot\"},{\"name\":\"codeBlocks\",\"kind\":\"object\",\"type\":\"CodeBlock\",\"relationName\":\"CodeBlockToSourceSnapshot\"},{\"name\":\"ingestJobs\",\"kind\":\"object\",\"type\":\"IngestJob\",\"relationName\":\"IngestJobToSourceSnapshot\"}],\"dbName\":\"source_snapshots\"},\"SourceFile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"snapshotId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"snapshot_id\"},{\"name\":\"path\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fileName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"file_name\"},{\"name\":\"extension\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"language\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mimeType\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"mime_type\"},{\"name\":\"sizeBytes\",\"kind\":\"scalar\",\"type\":\"BigInt\",\"dbName\":\"size_bytes\"},{\"name\":\"sha256\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"textS3Key\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"text_s3_key\"},{\"name\":\"isBinary\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_binary\"},{\"name\":\"isGenerated\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_generated\"},{\"name\":\"isExcluded\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_excluded\"},{\"name\":\"excludedReason\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"excluded_reason\"},{\"name\":\"parseStatus\",\"kind\":\"enum\",\"type\":\"FileParseStatus\",\"dbName\":\"parse_status\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"snapshot\",\"kind\":\"object\",\"type\":\"SourceSnapshot\",\"relationName\":\"SourceFileToSourceSnapshot\"},{\"name\":\"codeBlocks\",\"kind\":\"object\",\"type\":\"CodeBlock\",\"relationName\":\"CodeBlockToSourceFile\"}],\"dbName\":\"source_files\"},\"CodeBlock\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"snapshotId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"snapshot_id\"},{\"name\":\"fileId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"file_id\"},{\"name\":\"blockKind\",\"kind\":\"enum\",\"type\":\"CodeBlockKind\",\"dbName\":\"block_kind\"},{\"name\":\"symbolName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"symbol_name\"},{\"name\":\"parentSymbol\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"parent_symbol\"},{\"name\":\"language\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startLine\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"start_line\"},{\"name\":\"endLine\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"end_line\"},{\"name\":\"byteStart\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"byte_start\"},{\"name\":\"byteEnd\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"byte_end\"},{\"name\":\"contentHash\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"content_hash\"},{\"name\":\"contentText\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"content_text\"},{\"name\":\"extractionMode\",\"kind\":\"enum\",\"type\":\"ExtractionMode\",\"dbName\":\"extraction_mode\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"snapshot\",\"kind\":\"object\",\"type\":\"SourceSnapshot\",\"relationName\":\"CodeBlockToSourceSnapshot\"},{\"name\":\"file\",\"kind\":\"object\",\"type\":\"SourceFile\",\"relationName\":\"CodeBlockToSourceFile\"}],\"dbName\":\"code_blocks\"},\"IngestJob\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"snapshotId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"snapshot_id\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"IngestJobStatus\"},{\"name\":\"currentStep\",\"kind\":\"enum\",\"type\":\"IngestCurrentStep\",\"dbName\":\"current_step\"},{\"name\":\"retryCount\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"retry_count\"},{\"name\":\"errorCode\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"error_code\"},{\"name\":\"errorMessage\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"error_message\"},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"started_at\"},{\"name\":\"finishedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"finished_at\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"snapshot\",\"kind\":\"object\",\"type\":\"SourceSnapshot\",\"relationName\":\"IngestJobToSourceSnapshot\"}],\"dbName\":\"ingest_jobs\"}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"sourceRepo\",\"snapshot\",\"file\",\"codeBlocks\",\"_count\",\"files\",\"ingestJobs\",\"snapshots\",\"SourceRepo.findUnique\",\"SourceRepo.findUniqueOrThrow\",\"SourceRepo.findFirst\",\"SourceRepo.findFirstOrThrow\",\"SourceRepo.findMany\",\"data\",\"SourceRepo.createOne\",\"SourceRepo.createMany\",\"SourceRepo.createManyAndReturn\",\"SourceRepo.updateOne\",\"SourceRepo.updateMany\",\"SourceRepo.updateManyAndReturn\",\"create\",\"update\",\"SourceRepo.upsertOne\",\"SourceRepo.deleteOne\",\"SourceRepo.deleteMany\",\"having\",\"_min\",\"_max\",\"SourceRepo.groupBy\",\"SourceRepo.aggregate\",\"SourceSnapshot.findUnique\",\"SourceSnapshot.findUniqueOrThrow\",\"SourceSnapshot.findFirst\",\"SourceSnapshot.findFirstOrThrow\",\"SourceSnapshot.findMany\",\"SourceSnapshot.createOne\",\"SourceSnapshot.createMany\",\"SourceSnapshot.createManyAndReturn\",\"SourceSnapshot.updateOne\",\"SourceSnapshot.updateMany\",\"SourceSnapshot.updateManyAndReturn\",\"SourceSnapshot.upsertOne\",\"SourceSnapshot.deleteOne\",\"SourceSnapshot.deleteMany\",\"_avg\",\"_sum\",\"SourceSnapshot.groupBy\",\"SourceSnapshot.aggregate\",\"SourceFile.findUnique\",\"SourceFile.findUniqueOrThrow\",\"SourceFile.findFirst\",\"SourceFile.findFirstOrThrow\",\"SourceFile.findMany\",\"SourceFile.createOne\",\"SourceFile.createMany\",\"SourceFile.createManyAndReturn\",\"SourceFile.updateOne\",\"SourceFile.updateMany\",\"SourceFile.updateManyAndReturn\",\"SourceFile.upsertOne\",\"SourceFile.deleteOne\",\"SourceFile.deleteMany\",\"SourceFile.groupBy\",\"SourceFile.aggregate\",\"CodeBlock.findUnique\",\"CodeBlock.findUniqueOrThrow\",\"CodeBlock.findFirst\",\"CodeBlock.findFirstOrThrow\",\"CodeBlock.findMany\",\"CodeBlock.createOne\",\"CodeBlock.createMany\",\"CodeBlock.createManyAndReturn\",\"CodeBlock.updateOne\",\"CodeBlock.updateMany\",\"CodeBlock.updateManyAndReturn\",\"CodeBlock.upsertOne\",\"CodeBlock.deleteOne\",\"CodeBlock.deleteMany\",\"CodeBlock.groupBy\",\"CodeBlock.aggregate\",\"IngestJob.findUnique\",\"IngestJob.findUniqueOrThrow\",\"IngestJob.findFirst\",\"IngestJob.findFirstOrThrow\",\"IngestJob.findMany\",\"IngestJob.createOne\",\"IngestJob.createMany\",\"IngestJob.createManyAndReturn\",\"IngestJob.updateOne\",\"IngestJob.updateMany\",\"IngestJob.updateManyAndReturn\",\"IngestJob.upsertOne\",\"IngestJob.deleteOne\",\"IngestJob.deleteMany\",\"IngestJob.groupBy\",\"IngestJob.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"snapshotId\",\"IngestJobStatus\",\"status\",\"IngestCurrentStep\",\"currentStep\",\"retryCount\",\"errorCode\",\"errorMessage\",\"startedAt\",\"finishedAt\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"fileId\",\"CodeBlockKind\",\"blockKind\",\"symbolName\",\"parentSymbol\",\"language\",\"startLine\",\"endLine\",\"byteStart\",\"byteEnd\",\"contentHash\",\"contentText\",\"ExtractionMode\",\"extractionMode\",\"path\",\"fileName\",\"extension\",\"mimeType\",\"sizeBytes\",\"sha256\",\"textS3Key\",\"isBinary\",\"isGenerated\",\"isExcluded\",\"excludedReason\",\"FileParseStatus\",\"parseStatus\",\"sourceRepoId\",\"requestedRef\",\"ResolvedRefType\",\"resolvedRefType\",\"commitSha\",\"ArchiveFormat\",\"archiveFormat\",\"archiveS3Key\",\"archiveChecksumSha256\",\"archiveSizeBytes\",\"detectedLicenseSpdx\",\"detectedLicenseName\",\"githubRepoNodeId\",\"SnapshotIngestStatus\",\"ingestStatus\",\"ingestRulesVersion\",\"ingestedAt\",\"Provider\",\"provider\",\"owner\",\"repoName\",\"canonicalUrl\",\"defaultBranch\",\"isPublic\",\"every\",\"some\",\"none\",\"fileId_blockKind_symbolName_startLine_endLine\",\"snapshotId_path\",\"sourceRepoId_commitSha\",\"provider_owner_repoName\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "hgM0UA4KAADOAQAgYwAAxwEAMGQAABoAEGUAAMcBADBmAQAAAAFxQADNAQAhckAAzQEAIasBAADJAasBIqwBAQDKAQAhrQEBAMoBACGuAQEAAAABrwEBAMsBACGwASAAzAEAIbcBAADqAQAgAQAAAAEAIBgDAADnAQAgBgAA4AEAIAgAAOgBACAJAADpAQAgYwAA4gEAMGQAAAMAEGUAAOIBADBmAQDIAQAhcUAAzQEAIXJAAM0BACGZAQEAyAEAIZoBAQDLAQAhnAEAAOMBnAEjnQEBAMoBACGfAQAA5AGfASKgAQEAywEAIaEBAQDLAQAhogEEAOUBACGjAQEAywEAIaQBAQDLAQAhpQEBAMsBACGnAQAA5gGnASKoAQIA0wEAIakBQADUAQAhDQMAAOYCACAGAADlAgAgCAAA5wIAIAkAAOgCACCaAQAA6wEAIJwBAADrAQAgoAEAAOsBACChAQAA6wEAIKIBAADrAQAgowEAAOsBACCkAQAA6wEAIKUBAADrAQAgqQEAAOsBACAZAwAA5wEAIAYAAOABACAIAADoAQAgCQAA6QEAIGMAAOIBADBkAAADABBlAADiAQAwZgEAAAABcUAAzQEAIXJAAM0BACGZAQEAyAEAIZoBAQDLAQAhnAEAAOMBnAEjnQEBAMoBACGfAQAA5AGfASKgAQEAywEAIaEBAQDLAQAhogEEAOUBACGjAQEAywEAIaQBAQDLAQAhpQEBAMsBACGnAQAA5gGnASKoAQIA0wEAIakBQADUAQAhtgEAAOEBACADAAAAAwAgAQAABAAwAgAABQAgFgQAANUBACAGAADgAQAgYwAA3QEAMGQAAAcAEGUAAN0BADBmAQDIAQAhZwEAyAEAIXFAAM0BACFyQADNAQAhgwEBAMsBACGMAQEAygEAIY0BAQDKAQAhjgEBAMsBACGPAQEAywEAIZABBADeAQAhkQEBAMsBACGSAQEAywEAIZMBIADMAQAhlAEgAMwBACGVASAAzAEAIZYBAQDLAQAhmAEAAN8BmAEiCAQAAOMCACAGAADlAgAggwEAAOsBACCOAQAA6wEAII8BAADrAQAgkQEAAOsBACCSAQAA6wEAIJYBAADrAQAgFwQAANUBACAGAADgAQAgYwAA3QEAMGQAAAcAEGUAAN0BADBmAQAAAAFnAQDIAQAhcUAAzQEAIXJAAM0BACGDAQEAywEAIYwBAQDKAQAhjQEBAMoBACGOAQEAywEAIY8BAQDLAQAhkAEEAN4BACGRAQEAywEAIZIBAQDLAQAhkwEgAMwBACGUASAAzAEAIZUBIADMAQAhlgEBAMsBACGYAQAA3wGYASK1AQAA3AEAIAMAAAAHACABAAAIADACAAAJACAVBAAA1QEAIAUAANsBACBjAADXAQAwZAAACwAQZQAA1wEAMGYBAMgBACFnAQDIAQAhcUAAzQEAIXJAAM0BACF-AQDIAQAhgAEAANgBgAEigQEBAMsBACGCAQEAywEAIYMBAQDLAQAhhAECANMBACGFAQIA0wEAIYYBAgDZAQAhhwECANkBACGIAQEAygEAIYkBAQDKAQAhiwEAANoBiwEiBwQAAOMCACAFAADkAgAggQEAAOsBACCCAQAA6wEAIIMBAADrAQAghgEAAOsBACCHAQAA6wEAIBYEAADVAQAgBQAA2wEAIGMAANcBADBkAAALABBlAADXAQAwZgEAAAABZwEAyAEAIXFAAM0BACFyQADNAQAhfgEAyAEAIYABAADYAYABIoEBAQDLAQAhggEBAMsBACGDAQEAywEAIYQBAgDTAQAhhQECANMBACGGAQIA2QEAIYcBAgDZAQAhiAEBAMoBACGJAQEAygEAIYsBAADaAYsBIrQBAADWAQAgAwAAAAsAIAEAAAwAMAIAAA0AIAEAAAALACADAAAACwAgAQAADAAwAgAADQAgDwQAANUBACBjAADQAQAwZAAAEQAQZQAA0AEAMGYBAMgBACFnAQDIAQAhaQAA0QFpImsAANIBayJsAgDTAQAhbQEAywEAIW4BAMsBACFvQADUAQAhcEAA1AEAIXFAAM0BACFyQADNAQAhBQQAAOMCACBtAADrAQAgbgAA6wEAIG8AAOsBACBwAADrAQAgDwQAANUBACBjAADQAQAwZAAAEQAQZQAA0AEAMGYBAAAAAWcBAMgBACFpAADRAWkiawAA0gFrImwCANMBACFtAQDLAQAhbgEAywEAIW9AANQBACFwQADUAQAhcUAAzQEAIXJAAM0BACEDAAAAEQAgAQAAEgAwAgAAEwAgAQAAAAcAIAEAAAALACABAAAAEQAgAQAAAAMAIAEAAAABACANCgAAzgEAIGMAAMcBADBkAAAaABBlAADHAQAwZgEAyAEAIXFAAM0BACFyQADNAQAhqwEAAMkBqwEirAEBAMoBACGtAQEAygEAIa4BAQDKAQAhrwEBAMsBACGwASAAzAEAIQIKAADiAgAgrwEAAOsBACADAAAAGgAgAQAAGwAwAgAAAQAgAwAAABoAIAEAABsAMAIAAAEAIAMAAAAaACABAAAbADACAAABACAKCgAA4QIAIGYBAAAAAXFAAAAAAXJAAAAAAasBAAAAqwECrAEBAAAAAa0BAQAAAAGuAQEAAAABrwEBAAAAAbABIAAAAAEBEAAAHwAgCWYBAAAAAXFAAAAAAXJAAAAAAasBAAAAqwECrAEBAAAAAa0BAQAAAAGuAQEAAAABrwEBAAAAAbABIAAAAAEBEAAAIQAwARAAACEAMAoKAADUAgAgZgEA8QEAIXFAAPcBACFyQAD3AQAhqwEAANMCqwEirAEBAPEBACGtAQEA8QEAIa4BAQDxAQAhrwEBAPUBACGwASAAjAIAIQIAAAABACAQAAAkACAJZgEA8QEAIXFAAPcBACFyQAD3AQAhqwEAANMCqwEirAEBAPEBACGtAQEA8QEAIa4BAQDxAQAhrwEBAPUBACGwASAAjAIAIQIAAAAaACAQAAAmACACAAAAGgAgEAAAJgAgAwAAAAEAIBcAAB8AIBgAACQAIAEAAAABACABAAAAGgAgBAcAANACACAdAADSAgAgHgAA0QIAIK8BAADrAQAgDGMAAMMBADBkAAAtABBlAADDAQAwZgEAiQEAIXFAAI8BACFyQACPAQAhqwEAAMQBqwEirAEBAKMBACGtAQEAowEAIa4BAQCjAQAhrwEBAI0BACGwASAArgEAIQMAAAAaACABAAAsADAcAAAtACADAAAAGgAgAQAAGwAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAVAwAAzAIAIAYAAM4CACAIAADNAgAgCQAAzwIAIGYBAAAAAXFAAAAAAXJAAAAAAZkBAQAAAAGaAQEAAAABnAEAAACcAQOdAQEAAAABnwEAAACfAQKgAQEAAAABoQEBAAAAAaIBBAAAAAGjAQEAAAABpAEBAAAAAaUBAQAAAAGnAQAAAKcBAqgBAgAAAAGpAUAAAAABARAAADUAIBFmAQAAAAFxQAAAAAFyQAAAAAGZAQEAAAABmgEBAAAAAZwBAAAAnAEDnQEBAAAAAZ8BAAAAnwECoAEBAAAAAaEBAQAAAAGiAQQAAAABowEBAAAAAaQBAQAAAAGlAQEAAAABpwEAAACnAQKoAQIAAAABqQFAAAAAAQEQAAA3ADABEAAANwAwFQMAAKcCACAGAACpAgAgCAAAqAIAIAkAAKoCACBmAQDxAQAhcUAA9wEAIXJAAPcBACGZAQEA8QEAIZoBAQD1AQAhnAEAAKMCnAEjnQEBAPEBACGfAQAApAKfASKgAQEA9QEAIaEBAQD1AQAhogEEAKUCACGjAQEA9QEAIaQBAQD1AQAhpQEBAPUBACGnAQAApgKnASKoAQIA9AEAIakBQAD2AQAhAgAAAAUAIBAAADoAIBFmAQDxAQAhcUAA9wEAIXJAAPcBACGZAQEA8QEAIZoBAQD1AQAhnAEAAKMCnAEjnQEBAPEBACGfAQAApAKfASKgAQEA9QEAIaEBAQD1AQAhogEEAKUCACGjAQEA9QEAIaQBAQD1AQAhpQEBAPUBACGnAQAApgKnASKoAQIA9AEAIakBQAD2AQAhAgAAAAMAIBAAADwAIAIAAAADACAQAAA8ACADAAAABQAgFwAANQAgGAAAOgAgAQAAAAUAIAEAAAADACAOBwAAngIAIB0AAKECACAeAACgAgAgLwAAnwIAIDAAAKICACCaAQAA6wEAIJwBAADrAQAgoAEAAOsBACChAQAA6wEAIKIBAADrAQAgowEAAOsBACCkAQAA6wEAIKUBAADrAQAgqQEAAOsBACAUYwAAtgEAMGQAAEMAEGUAALYBADBmAQCJAQAhcUAAjwEAIXJAAI8BACGZAQEAiQEAIZoBAQCNAQAhnAEAALcBnAEjnQEBAKMBACGfAQAAuAGfASKgAQEAjQEAIaEBAQCNAQAhogEEALkBACGjAQEAjQEAIaQBAQCNAQAhpQEBAI0BACGnAQAAugGnASKoAQIAjAEAIakBQACOAQAhAwAAAAMAIAEAAEIAMBwAAEMAIAMAAAADACABAAAEADACAAAFACABAAAACQAgAQAAAAkAIAMAAAAHACABAAAIADACAAAJACADAAAABwAgAQAACAAwAgAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIBMEAACcAgAgBgAAnQIAIGYBAAAAAWcBAAAAAXFAAAAAAXJAAAAAAYMBAQAAAAGMAQEAAAABjQEBAAAAAY4BAQAAAAGPAQEAAAABkAEEAAAAAZEBAQAAAAGSAQEAAAABkwEgAAAAAZQBIAAAAAGVASAAAAABlgEBAAAAAZgBAAAAmAECARAAAEsAIBFmAQAAAAFnAQAAAAFxQAAAAAFyQAAAAAGDAQEAAAABjAEBAAAAAY0BAQAAAAGOAQEAAAABjwEBAAAAAZABBAAAAAGRAQEAAAABkgEBAAAAAZMBIAAAAAGUASAAAAABlQEgAAAAAZYBAQAAAAGYAQAAAJgBAgEQAABNADABEAAATQAwEwQAAI4CACAGAACPAgAgZgEA8QEAIWcBAPEBACFxQAD3AQAhckAA9wEAIYMBAQD1AQAhjAEBAPEBACGNAQEA8QEAIY4BAQD1AQAhjwEBAPUBACGQAQQAiwIAIZEBAQD1AQAhkgEBAPUBACGTASAAjAIAIZQBIACMAgAhlQEgAIwCACGWAQEA9QEAIZgBAACNApgBIgIAAAAJACAQAABQACARZgEA8QEAIWcBAPEBACFxQAD3AQAhckAA9wEAIYMBAQD1AQAhjAEBAPEBACGNAQEA8QEAIY4BAQD1AQAhjwEBAPUBACGQAQQAiwIAIZEBAQD1AQAhkgEBAPUBACGTASAAjAIAIZQBIACMAgAhlQEgAIwCACGWAQEA9QEAIZgBAACNApgBIgIAAAAHACAQAABSACACAAAABwAgEAAAUgAgAwAAAAkAIBcAAEsAIBgAAFAAIAEAAAAJACABAAAABwAgCwcAAIYCACAdAACJAgAgHgAAiAIAIC8AAIcCACAwAACKAgAggwEAAOsBACCOAQAA6wEAII8BAADrAQAgkQEAAOsBACCSAQAA6wEAIJYBAADrAQAgFGMAAKwBADBkAABZABBlAACsAQAwZgEAiQEAIWcBAIkBACFxQACPAQAhckAAjwEAIYMBAQCNAQAhjAEBAKMBACGNAQEAowEAIY4BAQCNAQAhjwEBAI0BACGQAQQArQEAIZEBAQCNAQAhkgEBAI0BACGTASAArgEAIZQBIACuAQAhlQEgAK4BACGWAQEAjQEAIZgBAACvAZgBIgMAAAAHACABAABYADAcAABZACADAAAABwAgAQAACAAwAgAACQAgAQAAAA0AIAEAAAANACADAAAACwAgAQAADAAwAgAADQAgAwAAAAsAIAEAAAwAMAIAAA0AIAMAAAALACABAAAMADACAAANACASBAAAhAIAIAUAAIUCACBmAQAAAAFnAQAAAAFxQAAAAAFyQAAAAAF-AQAAAAGAAQAAAIABAoEBAQAAAAGCAQEAAAABgwEBAAAAAYQBAgAAAAGFAQIAAAABhgECAAAAAYcBAgAAAAGIAQEAAAABiQEBAAAAAYsBAAAAiwECARAAAGEAIBBmAQAAAAFnAQAAAAFxQAAAAAFyQAAAAAF-AQAAAAGAAQAAAIABAoEBAQAAAAGCAQEAAAABgwEBAAAAAYQBAgAAAAGFAQIAAAABhgECAAAAAYcBAgAAAAGIAQEAAAABiQEBAAAAAYsBAAAAiwECARAAAGMAMAEQAABjADASBAAAggIAIAUAAIMCACBmAQDxAQAhZwEA8QEAIXFAAPcBACFyQAD3AQAhfgEA8QEAIYABAAD_AYABIoEBAQD1AQAhggEBAPUBACGDAQEA9QEAIYQBAgD0AQAhhQECAPQBACGGAQIAgAIAIYcBAgCAAgAhiAEBAPEBACGJAQEA8QEAIYsBAACBAosBIgIAAAANACAQAABmACAQZgEA8QEAIWcBAPEBACFxQAD3AQAhckAA9wEAIX4BAPEBACGAAQAA_wGAASKBAQEA9QEAIYIBAQD1AQAhgwEBAPUBACGEAQIA9AEAIYUBAgD0AQAhhgECAIACACGHAQIAgAIAIYgBAQDxAQAhiQEBAPEBACGLAQAAgQKLASICAAAACwAgEAAAaAAgAgAAAAsAIBAAAGgAIAMAAAANACAXAABhACAYAABmACABAAAADQAgAQAAAAsAIAoHAAD6AQAgHQAA_QEAIB4AAPwBACAvAAD7AQAgMAAA_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-AQAgHgAAvgEAIC8AAKkBACAwAAC-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-gIAIBgAAIADACC6AQAA-wIAILsBAAD_AgAgwAEAAAUAIAUXAAD4AgAgGAAA_QIAILoBAAD5AgAguwEAAPwCACDAAQAACQAgAxcAAPoCACC6AQAA-wIAIMABAAAFACADFwAA-AIAILoBAAD5AgAgwAEAAAkAIAAAAAAABb0BBAAAAAHDAQQAAAABxAEEAAAAAcUBBAAAAAHGAQQAAAABAb0BIAAAAAEBvQEAAACYAQIFFwAA8gIAIBgAAPYCACC6AQAA8wIAILsBAAD1AgAgwAEAAAUAIAsXAACQAgAwGAAAlQIAMLoBAACRAgAwuwEAAJICADC8AQAAkwIAIL0BAACUAgAwvgEAAJQCADC_AQAAlAIAMMABAACUAgAwwQEAAJYCADDCAQAAlwIAMBAEAACEAgAgZgEAAAABZwEAAAABcUAAAAABckAAAAABgAEAAACAAQKBAQEAAAABggEBAAAAAYMBAQAAAAGEAQIAAAABhQECAAAAAYYBAgAAAAGHAQIAAAABiAEBAAAAAYkBAQAAAAGLAQAAAIsBAgIAAAANACAXAACbAgAgAwAAAA0AIBcAAJsCACAYAACaAgAgARAAAPQCADAWBAAA1QEAIAUAANsBACBjAADXAQAwZAAACwAQZQAA1wEAMGYBAAAAAWcBAMgBACFxQADNAQAhckAAzQEAIX4BAMgBACGAAQAA2AGAASKBAQEAywEAIYIBAQDLAQAhgwEBAMsBACGEAQIA0wEAIYUBAgDTAQAhhgECANkBACGHAQIA2QEAIYgBAQDKAQAhiQEBAMoBACGLAQAA2gGLASK0AQAA1gEAIAIAAAANACAQAACaAgAgAgAAAJgCACAQAACZAgAgE2MAAJcCADBkAACYAgAQZQAAlwIAMGYBAMgBACFnAQDIAQAhcUAAzQEAIXJAAM0BACF-AQDIAQAhgAEAANgBgAEigQEBAMsBACGCAQEAywEAIYMBAQDLAQAhhAECANMBACGFAQIA0wEAIYYBAgDZAQAhhwECANkBACGIAQEAygEAIYkBAQDKAQAhiwEAANoBiwEiE2MAAJcCADBkAACYAgAQZQAAlwIAMGYBAMgBACFnAQDIAQAhcUAAzQEAIXJAAM0BACF-AQDIAQAhgAEAANgBgAEigQEBAMsBACGCAQEAywEAIYMBAQDLAQAhhAECANMBACGFAQIA0wEAIYYBAgDZAQAhhwECANkBACGIAQEAygEAIYkBAQDKAQAhiwEAANoBiwEiD2YBAPEBACFnAQDxAQAhcUAA9wEAIXJAAPcBACGAAQAA_wGAASKBAQEA9QEAIYIBAQD1AQAhgwEBAPUBACGEAQIA9AEAIYUBAgD0AQAhhgECAIACACGHAQIAgAIAIYgBAQDxAQAhiQEBAPEBACGLAQAAgQKLASIQBAAAggIAIGYBAPEBACFnAQDxAQAhcUAA9wEAIXJAAPcBACGAAQAA_wGAASKBAQEA9QEAIYIBAQD1AQAhgwEBAPUBACGEAQIA9AEAIYUBAgD0AQAhhgECAIACACGHAQIAgAIAIYgBAQDxAQAhiQEBAPEBACGLAQAAgQKLASIQBAAAhAIAIGYBAAAAAWcBAAAAAXFAAAAAAXJAAAAAAYABAAAAgAECgQEBAAAAAYIBAQAAAAGDAQEAAAABhAECAAAAAYUBAgAAAAGGAQIAAAABhwECAAAAAYgBAQAAAAGJAQEAAAABiwEAAACLAQIDFwAA8gIAILoBAADzAgAgwAEAAAUAIAQXAACQAgAwugEAAJECADC8AQAAkwIAIMABAACUAgAwAAAAAAABvQEAAACcAQMBvQEAAACfAQIFvQEEAAAAAcMBBAAAAAHEAQQAAAABxQEEAAAAAcYBBAAAAAEBvQEAAACnAQIFFwAA6gIAIBgAAPACACC6AQAA6wIAILsBAADvAgAgwAEAAAEAIAsXAADAAgAwGAAAxQIAMLoBAADBAgAwuwEAAMICADC8AQAAwwIAIL0BAADEAgAwvgEAAMQCADC_AQAAxAIAMMABAADEAgAwwQEAAMYCADDCAQAAxwIAMAsXAAC3AgAwGAAAuwIAMLoBAAC4AgAwuwEAALkCADC8AQAAugIAIL0BAACUAgAwvgEAAJQCADC_AQAAlAIAMMABAACUAgAwwQEAALwCADDCAQAAlwIAMAsXAACrAgAwGAAAsAIAMLoBAACsAgAwuwEAAK0CADC8AQAArgIAIL0BAACvAgAwvgEAAK8CADC_AQAArwIAMMABAACvAgAwwQEAALECADDCAQAAsgIAMApmAQAAAAFpAAAAaQJrAAAAawJsAgAAAAFtAQAAAAFuAQAAAAFvQAAAAAFwQAAAAAFxQAAAAAFyQAAAAAECAAAAEwAgFwAAtgIAIAMAAAATACAXAAC2AgAgGAAAtQIAIAEQAADuAgAwDwQAANUBACBjAADQAQAwZAAAEQAQZQAA0AEAMGYBAAAAAWcBAMgBACFpAADRAWkiawAA0gFrImwCANMBACFtAQDLAQAhbgEAywEAIW9AANQBACFwQADUAQAhcUAAzQEAIXJAAM0BACECAAAAEwAgEAAAtQIAIAIAAACzAgAgEAAAtAIAIA5jAACyAgAwZAAAswIAEGUAALICADBmAQDIAQAhZwEAyAEAIWkAANEBaSJrAADSAWsibAIA0wEAIW0BAMsBACFuAQDLAQAhb0AA1AEAIXBAANQBACFxQADNAQAhckAAzQEAIQ5jAACyAgAwZAAAswIAEGUAALICADBmAQDIAQAhZwEAyAEAIWkAANEBaSJrAADSAWsibAIA0wEAIW0BAMsBACFuAQDLAQAhb0AA1AEAIXBAANQBACFxQADNAQAhckAAzQEAIQpmAQDxAQAhaQAA8gFpImsAAPMBayJsAgD0AQAhbQEA9QEAIW4BAPUBACFvQAD2AQAhcEAA9gEAIXFAAPcBACFyQAD3AQAhCmYBAPEBACFpAADyAWkiawAA8wFrImwCAPQBACFtAQD1AQAhbgEA9QEAIW9AAPYBACFwQAD2AQAhcUAA9wEAIXJAAPcBACEKZgEAAAABaQAAAGkCawAAAGsCbAIAAAABbQEAAAABbgEAAAABb0AAAAABcEAAAAABcUAAAAABckAAAAABEAUAAIUCACBmAQAAAAFxQAAAAAFyQAAAAAF-AQAAAAGAAQAAAIABAoEBAQAAAAGCAQEAAAABgwEBAAAAAYQBAgAAAAGFAQIAAAABhgECAAAAAYcBAgAAAAGIAQEAAAABiQEBAAAAAYsBAAAAiwECAgAAAA0AIBcAAL8CACADAAAADQAgFwAAvwIAIBgAAL4CACABEAAA7QIAMAIAAAANACAQAAC-AgAgAgAAAJgCACAQAAC9AgAgD2YBAPEBACFxQAD3AQAhckAA9wEAIX4BAPEBACGAAQAA_wGAASKBAQEA9QEAIYIBAQD1AQAhgwEBAPUBACGEAQIA9AEAIYUBAgD0AQAhhgECAIACACGHAQIAgAIAIYgBAQDxAQAhiQEBAPEBACGLAQAAgQKLASIQBQAAgwIAIGYBAPEBACFxQAD3AQAhckAA9wEAIX4BAPEBACGAAQAA_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-Eiw_Ai1AAi5BCTFEEzJFGTNGAzRHAzVIAzZJAzdKAzhMAzlOCTpPGjtRAzxTCT1UGz5VAz9WA0BXCUFaHEJbIkNcBERdBEVeBEZfBEdgBEhiBElkCUplI0tnBExpCU1qJE5rBE9sBFBtCVFwJVJxK1NyBlRzBlV0BlZ1Bld2Blh4Bll6CVp7LFt9Blx_CV2AAS1egQEGX4IBBmCDAQlhhgEuYocBNA"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await __turbopack_context__.A("[externals]/node:buffer [external] (node:buffer, cjs, async loader)");
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async ()=>await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)"),
    getQueryCompilerWasmModule: async ()=>{
        const { wasm } = await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs [external] (@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["getPrismaClient"](config);
}
}),
"[project]/src/generated/prisma/internal/prismaNamespace.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnyNull",
    ()=>AnyNull,
    "CodeBlockScalarFieldEnum",
    ()=>CodeBlockScalarFieldEnum,
    "DbNull",
    ()=>DbNull,
    "Decimal",
    ()=>Decimal,
    "IngestJobScalarFieldEnum",
    ()=>IngestJobScalarFieldEnum,
    "JsonNull",
    ()=>JsonNull,
    "ModelName",
    ()=>ModelName,
    "NullTypes",
    ()=>NullTypes,
    "NullsOrder",
    ()=>NullsOrder,
    "PrismaClientInitializationError",
    ()=>PrismaClientInitializationError,
    "PrismaClientKnownRequestError",
    ()=>PrismaClientKnownRequestError,
    "PrismaClientRustPanicError",
    ()=>PrismaClientRustPanicError,
    "PrismaClientUnknownRequestError",
    ()=>PrismaClientUnknownRequestError,
    "PrismaClientValidationError",
    ()=>PrismaClientValidationError,
    "QueryMode",
    ()=>QueryMode,
    "SortOrder",
    ()=>SortOrder,
    "SourceFileScalarFieldEnum",
    ()=>SourceFileScalarFieldEnum,
    "SourceRepoScalarFieldEnum",
    ()=>SourceRepoScalarFieldEnum,
    "SourceSnapshotScalarFieldEnum",
    ()=>SourceSnapshotScalarFieldEnum,
    "Sql",
    ()=>Sql,
    "TransactionIsolationLevel",
    ()=>TransactionIsolationLevel,
    "defineExtension",
    ()=>defineExtension,
    "empty",
    ()=>empty,
    "getExtensionContext",
    ()=>getExtensionContext,
    "join",
    ()=>join,
    "prismaVersion",
    ()=>prismaVersion,
    "raw",
    ()=>raw,
    "sql",
    ()=>sql
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the client.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const PrismaClientKnownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientKnownRequestError"];
const PrismaClientUnknownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientUnknownRequestError"];
const PrismaClientRustPanicError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientRustPanicError"];
const PrismaClientInitializationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientInitializationError"];
const PrismaClientValidationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientValidationError"];
const sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["sqltag"];
const empty = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["empty"];
const join = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["join"];
const raw = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["raw"];
const Sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Sql"];
const Decimal = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Decimal"];
const getExtensionContext = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].getExtensionContext;
const prismaVersion = {
    client: "7.6.0",
    engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
const NullTypes = {
    DbNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].DbNull,
    JsonNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].JsonNull,
    AnyNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].AnyNull
};
const DbNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["DbNull"];
const JsonNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["JsonNull"];
const AnyNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["AnyNull"];
const ModelName = {
    SourceRepo: 'SourceRepo',
    SourceSnapshot: 'SourceSnapshot',
    SourceFile: 'SourceFile',
    CodeBlock: 'CodeBlock',
    IngestJob: 'IngestJob'
};
const TransactionIsolationLevel = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["makeStrictEnum"]({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
const SourceRepoScalarFieldEnum = {
    id: 'id',
    provider: 'provider',
    owner: 'owner',
    repoName: 'repoName',
    canonicalUrl: 'canonicalUrl',
    defaultBranch: 'defaultBranch',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const SourceSnapshotScalarFieldEnum = {
    id: 'id',
    sourceRepoId: 'sourceRepoId',
    requestedRef: 'requestedRef',
    resolvedRefType: 'resolvedRefType',
    commitSha: 'commitSha',
    archiveFormat: 'archiveFormat',
    archiveS3Key: 'archiveS3Key',
    archiveChecksumSha256: 'archiveChecksumSha256',
    archiveSizeBytes: 'archiveSizeBytes',
    detectedLicenseSpdx: 'detectedLicenseSpdx',
    detectedLicenseName: 'detectedLicenseName',
    githubRepoNodeId: 'githubRepoNodeId',
    ingestStatus: 'ingestStatus',
    ingestRulesVersion: 'ingestRulesVersion',
    ingestedAt: 'ingestedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const SourceFileScalarFieldEnum = {
    id: 'id',
    snapshotId: 'snapshotId',
    path: 'path',
    fileName: 'fileName',
    extension: 'extension',
    language: 'language',
    mimeType: 'mimeType',
    sizeBytes: 'sizeBytes',
    sha256: 'sha256',
    textS3Key: 'textS3Key',
    isBinary: 'isBinary',
    isGenerated: 'isGenerated',
    isExcluded: 'isExcluded',
    excludedReason: 'excludedReason',
    parseStatus: 'parseStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const CodeBlockScalarFieldEnum = {
    id: 'id',
    snapshotId: 'snapshotId',
    fileId: 'fileId',
    blockKind: 'blockKind',
    symbolName: 'symbolName',
    parentSymbol: 'parentSymbol',
    language: 'language',
    startLine: 'startLine',
    endLine: 'endLine',
    byteStart: 'byteStart',
    byteEnd: 'byteEnd',
    contentHash: 'contentHash',
    contentText: 'contentText',
    extractionMode: 'extractionMode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const IngestJobScalarFieldEnum = {
    id: 'id',
    snapshotId: 'snapshotId',
    status: 'status',
    currentStep: 'currentStep',
    retryCount: 'retryCount',
    errorCode: 'errorCode',
    errorMessage: 'errorMessage',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
const NullsOrder = {
    first: 'first',
    last: 'last'
};
const defineExtension = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].defineExtension;
}),
"[project]/src/generated/prisma/client.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma. Through it you get access to all the models, enums, and input types.
 * If you're looking for something you can import in the client-side of your application, please refer to the `browser.ts` file instead.
 *
 * 🟢 You can import this file directly.
 */ __turbopack_context__.s([
    "PrismaClient",
    ()=>PrismaClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/generated/prisma/internal/class.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/generated/prisma/internal/prismaNamespace.ts [app-route] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("src/generated/prisma/client.ts")}`;
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
;
globalThis['__dirname'] = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["dirname"]((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
;
;
;
;
const PrismaClient = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrismaClientClass"]();
;
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/generated/prisma/client.ts [app-route] (ecmascript) <locals>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("DATABASE_URL is not set. Copy .env.example to .env and start Postgres before using Prisma-backed routes.");
    }
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaPg"]({
        connectionString
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PrismaClient"]({
        adapter,
        log: ("TURBOPACK compile-time truthy", 1) ? [
            "warn",
            "error"
        ] : "TURBOPACK unreachable"
    });
}
const prisma = /*TURBOPACK member replacement*/ __turbopack_context__.g.__quescadePrisma__ ?? createPrismaClient();
if ("TURBOPACK compile-time truthy", 1) {
    /*TURBOPACK member replacement*/ __turbopack_context__.g.__quescadePrisma__ = prisma;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/github-api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "downloadGithubRepositoryArchive",
    ()=>downloadGithubRepositoryArchive,
    "getGithubRepositoryLicense",
    ()=>getGithubRepositoryLicense,
    "getGithubRepositoryMetadata",
    ()=>getGithubRepositoryMetadata,
    "resolveGithubRef",
    ()=>resolveGithubRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
;
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_API_VERSION = "2026-03-10";
async function getGithubRepositoryMetadata(owner, repoName) {
    const repo = await githubFetch(`/repos/${owner}/${repoName}`);
    if (repo.private) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("repo_not_public", "Only public GitHub repositories are supported right now.", 403);
    }
    return {
        nodeId: repo.node_id,
        defaultBranch: repo.default_branch,
        licenseSpdx: repo.license?.spdx_id ?? null,
        licenseName: repo.license?.name ?? null
    };
}
async function getGithubRepositoryLicense(owner, repoName) {
    const license = await githubFetch(`/repos/${owner}/${repoName}/license`, {
        allow404: true
    });
    if (!license) {
        return null;
    }
    return {
        spdxId: license.license?.spdx_id ?? null,
        name: license.license?.name ?? null
    };
}
async function resolveGithubRef(owner, repoName, requestedRef, defaultBranch) {
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
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("commit_resolution_failed", `Could not resolve ref "${requestedRef}" to a commit SHA.`, 422);
}
async function getBranch(owner, repoName, ref, allow404 = false) {
    return githubFetch(`/repos/${owner}/${repoName}/branches/${encodeURIComponent(ref)}`, {
        allow404
    });
}
async function getCommit(owner, repoName, ref, allow404 = false) {
    return githubFetch(`/repos/${owner}/${repoName}/commits/${encodeURIComponent(ref)}`, {
        allow404
    });
}
async function getTagCommitSha(owner, repoName, tag) {
    const ref = await githubFetch(`/repos/${owner}/${repoName}/git/ref/tags/${encodeURIComponent(tag)}`, {
        allow404: true
    });
    if (!ref) {
        return null;
    }
    if (ref.object.type === "commit") {
        return ref.object.sha;
    }
    const annotatedTag = await githubFetch(`/repos/${owner}/${repoName}/git/tags/${ref.object.sha}`);
    if (annotatedTag.object.type !== "commit") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("commit_resolution_failed", `Tag "${tag}" did not resolve to a commit.`, 422);
    }
    return annotatedTag.object.sha;
}
async function githubFetch(path, options) {
    const response = await fetch(`${GITHUB_API_BASE}${path}`, {
        method: "GET",
        headers: buildGithubHeaders(),
        cache: "no-store"
    });
    if (options?.allow404 && response.status === 404) {
        return null;
    }
    if (response.status === 404) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("repo_not_found", "GitHub repository or ref not found.", 404);
    }
    if (response.status === 403) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("github_access_denied", "GitHub denied the request. Add GITHUB_TOKEN or try again later.", 502);
    }
    if (!response.ok) {
        const text = await response.text();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("github_api_error", `GitHub API request failed with status ${response.status}: ${text}`, 502);
    }
    return await response.json();
}
function buildGithubHeaders() {
    const headers = {
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
async function downloadGithubRepositoryArchive(owner, repoName, ref, format = "zip") {
    const endpoint = format === "zip" ? `/repos/${owner}/${repoName}/zipball/${encodeURIComponent(ref)}` : `/repos/${owner}/${repoName}/tarball/${encodeURIComponent(ref)}`;
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
        method: "GET",
        headers: buildGithubHeaders(),
        cache: "no-store",
        redirect: "follow"
    });
    if (response.status === 404) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("archive_not_found", "Could not download the repository archive for the resolved ref.", 404);
    }
    if (response.status === 403) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("github_access_denied", "GitHub denied the archive request. Add GITHUB_TOKEN or try again later.", 502);
    }
    if (!response.ok) {
        const text = await response.text();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("github_archive_error", `GitHub archive download failed with status ${response.status}: ${text}`, 502);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.byteLength === 0) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("empty_archive", "GitHub returned an empty archive.", 502);
    }
    return buffer;
}
}),
"[project]/src/lib/github-url.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseGithubRepoUrl",
    ()=>parseGithubRepoUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
;
const GITHUB_HOSTS = new Set([
    "github.com",
    "www.github.com"
]);
function parseGithubRepoUrl(input) {
    let url;
    try {
        url = new URL(input);
    } catch  {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_repo_url", "The provided repository URL is not a valid GitHub URL.", 400);
    }
    if (!GITHUB_HOSTS.has(url.hostname)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_repo_url", "Only github.com repository URLs are supported.", 400);
    }
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_repo_url", "Repository URL must look like https://github.com/owner/repo.", 400);
    }
    const owner = decodeURIComponent(parts[0]);
    const repoName = stripGitSuffix(decodeURIComponent(parts[1]));
    if (!owner || !repoName) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_repo_url", "Repository URL must include both owner and repo name.", 400);
    }
    let refFromUrl;
    let refTypeFromUrl;
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
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_repo_url", "Paste the repository URL, not a file URL. Use the optional ref field for branch/tag/commit.", 400);
    }
    return {
        owner,
        repoName,
        canonicalUrl: `https://github.com/${owner}/${repoName}`,
        refFromUrl,
        refTypeFromUrl
    };
}
function stripGitSuffix(value) {
    return value.endsWith(".git") ? value.slice(0, -4) : value;
}
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[project]/src/lib/archive-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readStoredArchiveBuffer",
    ()=>readStoredArchiveBuffer,
    "storeArchiveBuffer",
    ()=>storeArchiveBuffer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
;
;
;
;
async function storeArchiveBuffer(input) {
    const root = getArchiveStorageRoot();
    const key = normalizeArchiveKey(input.key);
    const absolutePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(root, key);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(absolutePath), {
        recursive: true
    });
    await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(absolutePath, input.body);
    const sha256 = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(input.body).digest("hex");
    return {
        key,
        sizeBytes: input.body.byteLength,
        sha256,
        absolutePath
    };
}
async function readStoredArchiveBuffer(key) {
    const root = getArchiveStorageRoot();
    const normalizedKey = normalizeArchiveKey(key);
    const absolutePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(root, normalizedKey);
    try {
        return await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(absolutePath);
    } catch  {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("archive_not_found", `Stored archive not found for key "${normalizedKey}".`, 404);
    }
}
function getArchiveStorageRoot() {
    return process.env.ARCHIVE_STORAGE_ROOT?.trim() || __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), ".quescade-blob");
}
function normalizeArchiveKey(key) {
    const normalized = key.replace(/\\/g, "/").replace(/^\/+/, "");
    if (!normalized || normalized.includes("..")) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_archive_key", "Archive key is invalid.", 500);
    }
    return normalized;
}
}),
"[project]/src/lib/archive-ingest-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "persistPinnedArchiveForSnapshot",
    ()=>persistPinnedArchiveForSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$archive$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/archive-store.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function persistPinnedArchiveForSnapshot(input) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
        where: {
            id: input.jobId
        },
        data: {
            status: "running",
            currentStep: "download_archive",
            startedAt: new Date(),
            finishedAt: null,
            errorCode: null,
            errorMessage: null
        }
    });
    try {
        const archiveBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["downloadGithubRepositoryArchive"])(input.owner, input.repoName, input.commitSha, input.archiveFormat);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
            where: {
                id: input.jobId
            },
            data: {
                status: "running",
                currentStep: "upload_archive"
            }
        });
        const key = buildArchiveKey({
            owner: input.owner,
            repoName: input.repoName,
            commitSha: input.commitSha,
            archiveFormat: input.archiveFormat
        });
        const stored = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$archive$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storeArchiveBuffer"])({
            key,
            body: archiveBuffer
        });
        const snapshot = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].sourceSnapshot.update({
            where: {
                id: input.snapshotId
            },
            data: {
                archiveS3Key: stored.key,
                archiveChecksumSha256: stored.sha256,
                archiveSizeBytes: BigInt(stored.sizeBytes),
                ingestStatus: "archive_stored"
            }
        });
        const job = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
            where: {
                id: input.jobId
            },
            data: {
                status: "running",
                currentStep: "upload_archive",
                errorCode: null,
                errorMessage: null
            }
        });
        return {
            snapshot,
            job
        };
    } catch (error) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
            where: {
                id: input.jobId
            },
            data: {
                status: "failed",
                currentStep: "failed",
                finishedAt: new Date(),
                errorCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAppError"])(error) ? error.code : "archive_storage_failed",
                errorMessage: error instanceof Error ? error.message : "Unknown archive failure."
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].sourceSnapshot.update({
            where: {
                id: input.snapshotId
            },
            data: {
                ingestStatus: "failed"
            }
        });
        throw error;
    }
}
function buildArchiveKey(input) {
    const extension = input.archiveFormat === "zip" ? "zip" : "tar.gz";
    return [
        "repos",
        "github",
        input.owner,
        input.repoName,
        input.commitSha,
        `source.${extension}`
    ].join("/");
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/env.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const envSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    NODE_ENV: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "development",
        "test",
        "production"
    ]).default("development"),
    DATABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    BLOB_DRIVER: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "local",
        "s3"
    ]).default("local"),
    BLOB_LOCAL_ROOT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default(".quescade/blobs"),
    AWS_REGION: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default("ap-south-1"),
    S3_BUCKET_NAME: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    AWS_ACCESS_KEY_ID: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    AWS_SECRET_ACCESS_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    S3_ENDPOINT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    S3_FORCE_PATH_STYLE: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().transform((value)=>value === "true")
});
const env = envSchema.parse(process.env);
}),
"[project]/src/lib/storage/local-blob-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocalBlobStore",
    ()=>LocalBlobStore
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
class LocalBlobStore {
    rootDir;
    constructor(rootDir){
        this.rootDir = rootDir;
    }
    resolve(key) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), this.rootDir, key);
    }
    async putBuffer(input) {
        const filePath = this.resolve(input.key);
        await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(filePath), {
            recursive: true
        });
        await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, input.body);
    }
    async putText(key, text) {
        await this.putBuffer({
            key,
            body: Buffer.from(text, "utf8"),
            contentType: "text/plain; charset=utf-8"
        });
    }
    async getText(key) {
        try {
            const filePath = this.resolve(key);
            return await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, "utf8");
        } catch (error) {
            const nodeError = error;
            if (nodeError.code === "ENOENT") {
                return null;
            }
            throw error;
        }
    }
}
}),
"[project]/src/lib/storage/s3-blob-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "S3BlobStore",
    ()=>S3BlobStore
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__ = __turbopack_context__.i("[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs, [project]/node_modules/@aws-sdk/client-s3)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-route] (ecmascript)");
;
;
class S3BlobStore {
    client;
    bucketName;
    constructor(){
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].S3_BUCKET_NAME) {
            throw new Error("S3_BUCKET_NAME is required when BLOB_DRIVER=s3");
        }
        this.bucketName = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].S3_BUCKET_NAME;
        this.client = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["S3Client"]({
            region: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].AWS_REGION,
            endpoint: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].S3_ENDPOINT || undefined,
            forcePathStyle: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].S3_FORCE_PATH_STYLE
        });
    }
    async putBuffer(input) {
        await this.client.send(new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["PutObjectCommand"]({
            Bucket: this.bucketName,
            Key: input.key,
            Body: input.body,
            ContentType: input.contentType
        }));
    }
    async putText(key, text, contentType = "text/plain; charset=utf-8") {
        await this.putBuffer({
            key,
            body: Buffer.from(text, "utf8"),
            contentType
        });
    }
    async getText(key) {
        const response = await this.client.send(new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["GetObjectCommand"]({
            Bucket: this.bucketName,
            Key: key
        }));
        if (!response.Body) {
            return null;
        }
        return await response.Body.transformToString();
    }
}
}),
"[project]/src/lib/storage/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlobStore",
    ()=>getBlobStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2f$local$2d$blob$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage/local-blob-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2f$s3$2d$blob$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage/s3-blob-store.ts [app-route] (ecmascript)");
;
;
;
let singleton = null;
function getBlobStore() {
    if (singleton) {
        return singleton;
    }
    singleton = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].BLOB_DRIVER === "s3" ? new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2f$s3$2d$blob$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["S3BlobStore"]() : new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2f$local$2d$blob$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LocalBlobStore"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["env"].BLOB_LOCAL_ROOT);
    return singleton;
}
}),
"[project]/src/lib/manifest-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "buildSourceFileManifestFromStoredArchive",
    ()=>buildSourceFileManifestFromStoredArchive
]);
// import os from "node:os";
// import fs from "node:fs/promises";
// import path from "node:path";
// import crypto from "node:crypto";
// import AdmZip from "adm-zip";
// import { prisma } from "@/lib/db";
// import { AppError, isAppError } from "@/lib/errors";
// import { readStoredArchiveBuffer } from "@/lib/archive-store";
//
// type BuildManifestInput = {
//     snapshotId: string;
//     jobId: string;
//     archiveKey: string;
// };
//
// type ManifestRow = {
//     id: string;
//     snapshotId: string;
//     path: string;
//     fileName: string;
//     extension: string | null;
//     language: string | null;
//     mimeType: string | null;
//     sizeBytes: bigint;
//     sha256: string;
//     textS3Key: string | null;
//     isBinary: boolean;
//     isGenerated: boolean;
//     isExcluded: boolean;
//     excludedReason: string | null;
//     parseStatus: "pending" | "skipped";
//     createdAt: Date;
//     updatedAt: Date;
// };
//
// const EXCLUDED_DIRS = new Set([
//     "node_modules",
//     "dist",
//     "build",
//     ".next",
//     "coverage",
//     "target"
// ]);
//
// const EXCLUDED_FILES = new Set([
//     "package-lock.json",
//     "yarn.lock",
//     "pnpm-lock.yaml",
//     "bun.lockb",
//     "Cargo.lock"
// ]);
//
// const BINARY_EXTENSIONS = new Set([
//     ".png",
//     ".jpg",
//     ".jpeg",
//     ".gif",
//     ".webp",
//     ".ico",
//     ".pdf",
//     ".zip",
//     ".gz",
//     ".tar",
//     ".7z",
//     ".rar",
//     ".woff",
//     ".woff2",
//     ".ttf",
//     ".eot",
//     ".otf",
//     ".mp3",
//     ".mp4",
//     ".mov",
//     ".avi",
//     ".wasm",
//     ".so",
//     ".dll",
//     ".dylib",
//     ".exe",
//     ".bin",
//     ".class",
//     ".jar"
// ]);
//
// export async function buildSourceFileManifestFromStoredArchive(
//     input: BuildManifestInput
// ) {
//     await prisma.ingestJob.update({
//         where: { id: input.jobId },
//         data: {
//             status: "running",
//             currentStep: "unpack_archive",
//             startedAt: new Date(),
//             finishedAt: null,
//             errorCode: null,
//             errorMessage: null
//         }
//     });
//
//     const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "quescade-stage3-"));
//
//     try {
//         const archiveBuffer = await readStoredArchiveBuffer(input.archiveKey);
//         await extractZipArchiveSafely(archiveBuffer, tempDir);
//
//         await prisma.sourceSnapshot.update({
//             where: { id: input.snapshotId },
//             data: {
//                 ingestStatus: "unpacked"
//             }
//         });
//
//         await prisma.ingestJob.update({
//             where: { id: input.jobId },
//             data: {
//                 status: "running",
//                 currentStep: "classify_files"
//             }
//         });
//
//         const rows = await buildManifestRows({
//             snapshotId: input.snapshotId,
//             rootDir: tempDir
//         });
//
//         await prisma.ingestJob.update({
//             where: { id: input.jobId },
//             data: {
//                 status: "running",
//                 currentStep: "persist_manifest"
//             }
//         });
//
//         const now = new Date();
//
//         const result = await prisma.$transaction(async (tx) => {
//             await tx.sourceFile.deleteMany({
//                 where: { snapshotId: input.snapshotId }
//             });
//
//             if (rows.length > 0) {
//                 await tx.sourceFile.createMany({
//                     data: rows.map((row) => ({
//                         ...row,
//                         createdAt: now,
//                         updatedAt: now
//                     }))
//                 });
//             }
//
//             const snapshot = await tx.sourceSnapshot.update({
//                 where: { id: input.snapshotId },
//                 data: {
//                     ingestStatus: "manifest_built"
//                 }
//             });
//
//             const job = await tx.ingestJob.update({
//                 where: { id: input.jobId },
//                 data: {
//                     status: "completed",
//                     currentStep: "persist_manifest",
//                     finishedAt: new Date(),
//                     errorCode: null,
//                     errorMessage: null
//                 }
//             });
//
//             return {
//                 snapshot,
//                 job,
//                 fileCount: rows.length
//             };
//         });
//
//         return result;
//     } catch (error) {
//         await prisma.ingestJob.update({
//             where: { id: input.jobId },
//             data: {
//                 status: "failed",
//                 currentStep: "failed",
//                 finishedAt: new Date(),
//                 errorCode: isAppError(error) ? error.code : "manifest_build_failed",
//                 errorMessage:
//                     error instanceof Error ? error.message : "Unknown manifest failure."
//             }
//         });
//
//         await prisma.sourceSnapshot.update({
//             where: { id: input.snapshotId },
//             data: {
//                 ingestStatus: "failed"
//             }
//         });
//
//         throw error;
//     } finally {
//         await fs.rm(tempDir, { recursive: true, force: true });
//     }
// }
//
// async function extractZipArchiveSafely(buffer: Buffer, outputDir: string) {
//     const zip = new AdmZip(buffer);
//     const entries = zip.getEntries();
//
//     for (const entry of entries) {
//         const relativePath = normalizeArchiveEntryPath(entry.entryName);
//
//         if (!relativePath) {
//             continue;
//         }
//
//         const destination = path.resolve(outputDir, ...relativePath.split("/"));
//
//         if (
//             destination !== outputDir &&
//             !destination.startsWith(outputDir + path.sep)
//         ) {
//             throw new AppError(
//                 "unsafe_archive_path",
//                 `Archive entry escaped extraction root: ${entry.entryName}`,
//                 422
//             );
//         }
//
//         if (entry.isDirectory) {
//             await fs.mkdir(destination, { recursive: true });
//             continue;
//         }
//
//         await fs.mkdir(path.dirname(destination), { recursive: true });
//         await fs.writeFile(destination, entry.getData());
//     }
// }
//
// function normalizeArchiveEntryPath(entryName: string) {
//     const raw = entryName.replace(/\\/g, "/");
//     const stripped = raw.includes("/") ? raw.slice(raw.indexOf("/") + 1) : raw;
//     const normalized = path.posix.normalize(stripped).replace(/^\/+/, "");
//
//     if (!normalized || normalized === ".") {
//         return "";
//     }
//
//     if (
//         normalized === ".." ||
//         normalized.startsWith("../") ||
//         normalized.includes("/../")
//     ) {
//         throw new AppError(
//             "unsafe_archive_path",
//             `Archive entry contains invalid traversal: ${entryName}`,
//             422
//         );
//     }
//
//     return normalized;
// }
//
// async function buildManifestRows(input: {
//     snapshotId: string;
//     rootDir: string;
// }): Promise<ManifestRow[]> {
//     const absolutePaths = await walkFiles(input.rootDir);
//     const rows: ManifestRow[] = [];
//
//     for (const absolutePath of absolutePaths) {
//         const relativePath = toPosixPath(path.relative(input.rootDir, absolutePath));
//         const fileName = path.posix.basename(relativePath);
//         const extension = normalizeExtension(path.posix.extname(relativePath));
//
//         const buffer = await fs.readFile(absolutePath);
//         const isBinary =
//             BINARY_EXTENSIONS.has(extension ?? "") || looksBinary(buffer);
//         const isGenerated = detectGenerated(relativePath, buffer);
//         const exclusion = detectExclusion(relativePath, isBinary, isGenerated);
//         const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");
//
//         rows.push({
//             id: crypto.randomUUID(),
//             snapshotId: input.snapshotId,
//             path: relativePath,
//             fileName,
//             extension,
//             language: detectLanguage(extension),
//             mimeType: detectMimeType(extension, isBinary),
//             sizeBytes: BigInt(buffer.byteLength),
//             sha256,
//             textS3Key: null,
//             isBinary,
//             isGenerated,
//             isExcluded: exclusion.isExcluded,
//             excludedReason: exclusion.reason,
//             parseStatus: exclusion.isExcluded || isBinary ? "skipped" : "pending",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         });
//     }
//
//     return rows;
// }
//
// async function walkFiles(rootDir: string): Promise<string[]> {
//     const results: string[] = [];
//
//     async function visit(currentDir: string) {
//         const entries = await fs.readdir(currentDir, { withFileTypes: true });
//
//         for (const entry of entries) {
//             const fullPath = path.join(currentDir, entry.name);
//
//             if (entry.isDirectory()) {
//                 await visit(fullPath);
//             } else if (entry.isFile()) {
//                 results.push(fullPath);
//             }
//         }
//     }
//
//     await visit(rootDir);
//     return results;
// }
//
// function detectExclusion(
//     relativePath: string,
//     isBinary: boolean,
//     isGenerated: boolean
// ) {
//     const segments = relativePath.split("/");
//     const fileName = segments[segments.length - 1];
//
//     if (segments.some((segment) => EXCLUDED_DIRS.has(segment))) {
//         return {
//             isExcluded: true,
//             reason: "excluded_directory"
//         };
//     }
//
//     if (EXCLUDED_FILES.has(fileName)) {
//         return {
//             isExcluded: true,
//             reason: "lockfile"
//         };
//     }
//
//     if (isGenerated) {
//         return {
//             isExcluded: true,
//             reason: "generated_file"
//         };
//     }
//
//     if (isBinary) {
//         return {
//             isExcluded: true,
//             reason: "binary_file"
//         };
//     }
//
//     return {
//         isExcluded: false,
//         reason: null as string | null
//     };
// }
//
// function detectGenerated(relativePath: string, buffer: Buffer) {
//     const lowerPath = relativePath.toLowerCase();
//
//     if (
//         lowerPath.endsWith(".min.js") ||
//         lowerPath.endsWith(".min.css") ||
//         lowerPath.includes("/generated/")
//     ) {
//         return true;
//     }
//
//     const head = buffer.subarray(0, Math.min(buffer.length, 2048)).toString("utf8");
//     return (
//         head.includes("@generated") ||
//         head.includes("Code generated") ||
//         head.includes("DO NOT EDIT")
//     );
// }
//
// function looksBinary(buffer: Buffer) {
//     const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
//
//     for (const byte of sample) {
//         if (byte === 0) {
//             return true;
//         }
//     }
//
//     return false;
// }
//
// function detectLanguage(extension: string | null) {
//     switch (extension) {
//         case ".ts":
//             return "typescript";
//         case ".tsx":
//             return "typescript";
//         case ".js":
//             return "javascript";
//         case ".jsx":
//             return "javascript";
//         case ".py":
//             return "python";
//         case ".rs":
//             return "rust";
//         case ".md":
//             return "markdown";
//         case ".json":
//             return "json";
//         case ".toml":
//             return "toml";
//         case ".yml":
//         case ".yaml":
//             return "yaml";
//         default:
//             return null;
//     }
// }
//
// function detectMimeType(extension: string | null, isBinary: boolean) {
//     if (isBinary) {
//         return "application/octet-stream";
//     }
//
//     switch (extension) {
//         case ".ts":
//         case ".tsx":
//         case ".js":
//         case ".jsx":
//             return "text/plain";
//         case ".py":
//         case ".rs":
//         case ".md":
//         case ".toml":
//         case ".yml":
//         case ".yaml":
//         case ".json":
//             return "text/plain";
//         default:
//             return null;
//     }
// }
//
// function normalizeExtension(extension: string) {
//     return extension ? extension.toLowerCase() : null;
// }
//
// function toPosixPath(value: string) {
//     return value.replace(/\\/g, "/");
// }
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:os [external] (node:os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$adm$2d$zip$2f$adm$2d$zip$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/adm-zip/adm-zip.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$archive$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/archive-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage/index.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
const EXCLUDED_DIRS = new Set([
    "node_modules",
    "dist",
    "build",
    ".next",
    "coverage",
    "target"
]);
const EXCLUDED_FILES = new Set([
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "bun.lockb",
    "Cargo.lock"
]);
const BINARY_EXTENSIONS = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
    ".gz",
    ".tar",
    ".7z",
    ".rar",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".otf",
    ".mp3",
    ".mp4",
    ".mov",
    ".avi",
    ".wasm",
    ".so",
    ".dll",
    ".dylib",
    ".exe",
    ".bin",
    ".class",
    ".jar"
]);
async function buildSourceFileManifestFromStoredArchive(input) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
        where: {
            id: input.jobId
        },
        data: {
            status: "running",
            currentStep: "unpack_archive",
            startedAt: new Date(),
            finishedAt: null,
            errorCode: null,
            errorMessage: null
        }
    });
    const tempDir = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].mkdtemp(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].tmpdir(), "quescade-stage3-"));
    try {
        const archiveBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$archive$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readStoredArchiveBuffer"])(input.archiveKey);
        await extractZipArchiveSafely(archiveBuffer, tempDir);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].sourceSnapshot.update({
            where: {
                id: input.snapshotId
            },
            data: {
                ingestStatus: "unpacked"
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
            where: {
                id: input.jobId
            },
            data: {
                status: "running",
                currentStep: "classify_files"
            }
        });
        const rows = await buildManifestRows({
            snapshotId: input.snapshotId,
            rootDir: tempDir
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
            where: {
                id: input.jobId
            },
            data: {
                status: "running",
                currentStep: "persist_manifest"
            }
        });
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            await tx.sourceFile.deleteMany({
                where: {
                    snapshotId: input.snapshotId
                }
            });
            if (rows.length > 0) {
                await tx.sourceFile.createMany({
                    data: rows
                });
            }
            const snapshot = await tx.sourceSnapshot.update({
                where: {
                    id: input.snapshotId
                },
                data: {
                    ingestStatus: "manifest_built"
                }
            });
            const job = await tx.ingestJob.update({
                where: {
                    id: input.jobId
                },
                data: {
                    status: "completed",
                    currentStep: "persist_manifest",
                    finishedAt: new Date(),
                    errorCode: null,
                    errorMessage: null
                }
            });
            return {
                snapshot,
                job,
                fileCount: rows.length
            };
        });
        return result;
    } catch (error) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
            where: {
                id: input.jobId
            },
            data: {
                status: "failed",
                currentStep: "failed",
                finishedAt: new Date(),
                errorCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAppError"])(error) ? error.code : "manifest_build_failed",
                errorMessage: error instanceof Error ? error.message : "Unknown manifest failure."
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].sourceSnapshot.update({
            where: {
                id: input.snapshotId
            },
            data: {
                ingestStatus: "failed"
            }
        });
        throw error;
    } finally{
        await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].rm(tempDir, {
            recursive: true,
            force: true
        });
    }
}
async function extractZipArchiveSafely(buffer, outputDir) {
    const zip = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$adm$2d$zip$2f$adm$2d$zip$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](buffer);
    const entries = zip.getEntries();
    for (const entry of entries){
        const relativePath = normalizeArchiveEntryPath(entry.entryName);
        if (!relativePath) {
            continue;
        }
        const destination = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(outputDir, ...relativePath.split("/"));
        if (destination !== outputDir && !destination.startsWith(outputDir + __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("unsafe_archive_path", `Archive entry escaped extraction root: ${entry.entryName}`, 422);
        }
        if (entry.isDirectory) {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(destination, {
                recursive: true
            });
            continue;
        }
        await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(destination), {
            recursive: true
        });
        await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(destination, entry.getData());
    }
}
function normalizeArchiveEntryPath(entryName) {
    const raw = entryName.replace(/\\/g, "/");
    const stripped = raw.includes("/") ? raw.slice(raw.indexOf("/") + 1) : raw;
    const normalized = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].posix.normalize(stripped).replace(/^\/+/, "");
    if (!normalized || normalized === ".") {
        return "";
    }
    if (normalized === ".." || normalized.startsWith("../") || normalized.includes("/../")) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("unsafe_archive_path", `Archive entry contains invalid traversal: ${entryName}`, 422);
    }
    return normalized;
}
async function buildManifestRows(input) {
    const blobStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBlobStore"])();
    const absolutePaths = await walkFiles(input.rootDir);
    const rows = [];
    const now = new Date();
    for (const absolutePath of absolutePaths){
        const relativePath = toPosixPath(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(input.rootDir, absolutePath));
        const fileName = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].posix.basename(relativePath);
        const extension = normalizeExtension(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].posix.extname(relativePath));
        const buffer = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(absolutePath);
        const isBinary = BINARY_EXTENSIONS.has(extension ?? "") || looksBinary(buffer);
        const isGenerated = detectGenerated(relativePath, buffer);
        const exclusion = detectExclusion(relativePath, isBinary, isGenerated);
        const sha256 = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(buffer).digest("hex");
        let textS3Key = null;
        if (!isBinary) {
            const normalizedText = normalizeText(buffer);
            textS3Key = buildTextBlobKey({
                snapshotId: input.snapshotId,
                relativePath
            });
            await blobStore.putText(textS3Key, normalizedText);
        }
        rows.push({
            id: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomUUID(),
            snapshotId: input.snapshotId,
            path: relativePath,
            fileName,
            extension,
            language: detectLanguage(extension),
            mimeType: detectMimeType(extension, isBinary),
            sizeBytes: BigInt(buffer.byteLength),
            sha256,
            textS3Key,
            isBinary,
            isGenerated,
            isExcluded: exclusion.isExcluded,
            excludedReason: exclusion.reason,
            parseStatus: exclusion.isExcluded || isBinary ? "skipped" : "pending",
            createdAt: now,
            updatedAt: now
        });
    }
    return rows;
}
async function walkFiles(rootDir) {
    const results = [];
    async function visit(currentDir) {
        const entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readdir(currentDir, {
            withFileTypes: true
        });
        for (const entry of entries){
            const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(currentDir, entry.name);
            if (entry.isDirectory()) {
                await visit(fullPath);
            } else if (entry.isFile()) {
                results.push(fullPath);
            }
        }
    }
    await visit(rootDir);
    return results;
}
function detectExclusion(relativePath, isBinary, isGenerated) {
    const segments = relativePath.split("/");
    const fileName = segments[segments.length - 1];
    if (segments.some((segment)=>EXCLUDED_DIRS.has(segment))) {
        return {
            isExcluded: true,
            reason: "excluded_directory"
        };
    }
    if (EXCLUDED_FILES.has(fileName)) {
        return {
            isExcluded: true,
            reason: "lockfile"
        };
    }
    if (isGenerated) {
        return {
            isExcluded: true,
            reason: "generated_file"
        };
    }
    if (isBinary) {
        return {
            isExcluded: true,
            reason: "binary_file"
        };
    }
    return {
        isExcluded: false,
        reason: null
    };
}
function detectGenerated(relativePath, buffer) {
    const lowerPath = relativePath.toLowerCase();
    if (lowerPath.endsWith(".min.js") || lowerPath.endsWith(".min.css") || lowerPath.includes("/generated/")) {
        return true;
    }
    const head = buffer.subarray(0, Math.min(buffer.length, 2048)).toString("utf8");
    return head.includes("@generated") || head.includes("Code generated") || head.includes("DO NOT EDIT");
}
function looksBinary(buffer) {
    const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
    for (const byte of sample){
        if (byte === 0) {
            return true;
        }
    }
    return false;
}
function normalizeText(buffer) {
    let text = buffer.toString("utf8");
    if (text.charCodeAt(0) === 0xfeff) {
        text = text.slice(1);
    }
    return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}
function buildTextBlobKey(input) {
    const pathHash = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHash("sha1").update(`${input.snapshotId}\0${input.relativePath}`).digest("hex");
    const fileName = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].posix.basename(input.relativePath).replace(/[^\w.-]+/g, "_");
    return `snapshots/${input.snapshotId}/texts/${pathHash}-${fileName}.txt`;
}
function detectLanguage(extension) {
    switch(extension){
        case ".ts":
        case ".tsx":
            return "typescript";
        case ".js":
        case ".jsx":
            return "javascript";
        case ".py":
            return "python";
        case ".rs":
            return "rust";
        case ".md":
            return "markdown";
        case ".json":
            return "json";
        case ".toml":
            return "toml";
        case ".yml":
        case ".yaml":
            return "yaml";
        default:
            return null;
    }
}
function detectMimeType(extension, isBinary) {
    if (isBinary) {
        return "application/octet-stream";
    }
    switch(extension){
        case ".ts":
        case ".tsx":
        case ".js":
        case ".jsx":
        case ".py":
        case ".rs":
        case ".md":
        case ".toml":
        case ".yml":
        case ".yaml":
        case ".json":
            return "text/plain";
        default:
            return null;
    }
}
function normalizeExtension(extension) {
    return extension ? extension.toLowerCase() : null;
}
function toPosixPath(value) {
    return value.replace(/\\/g, "/");
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/src/lib/rust-parser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRustParser",
    ()=>getRustParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tree$2d$sitter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tree-sitter/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tree$2d$sitter$2d$rust$2f$bindings$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tree-sitter-rust/bindings/node/index.js [app-route] (ecmascript)");
;
;
let rustParser = null;
function getRustParser() {
    if (!rustParser) {
        rustParser = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tree$2d$sitter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        rustParser.setLanguage(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tree$2d$sitter$2d$rust$2f$bindings$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
    }
    return rustParser;
}
}),
"[project]/src/lib/rust-structural-extractor.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractRustStructuralBlocks",
    ()=>extractRustStructuralBlocks
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rust$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rust-parser.ts [app-route] (ecmascript)");
;
;
const STRUCTURAL_NODE_TYPES = new Set([
    "function_item",
    "struct_item",
    "enum_item",
    "trait_item",
    "impl_item",
    "mod_item",
    "type_item",
    "const_item",
    "static_item"
]);
const CONTEXT_NODE_TYPES = new Set([
    "mod_item",
    "trait_item",
    "impl_item"
]);
function extractRustStructuralBlocks(sourceText) {
    const parser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rust$2d$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRustParser"])();
    const tree = parser.parse(sourceText);
    const sourceBuffer = Buffer.from(sourceText, "utf8");
    const results = [];
    visitNode(tree.rootNode, []);
    return results;
    //TURBOPACK unreachable
    ;
    function visitNode(node, contextStack) {
        let currentContextStack = contextStack;
        if (STRUCTURAL_NODE_TYPES.has(node.type)) {
            const extracted = extractBlock(node, contextStack, sourceBuffer);
            if (extracted) {
                results.push(extracted);
                if (CONTEXT_NODE_TYPES.has(node.type)) {
                    currentContextStack = [
                        ...contextStack,
                        {
                            nodeType: node.type,
                            symbolName: extracted.symbolName
                        }
                    ];
                }
            }
        }
        for(let i = 0; i < node.namedChildCount; i += 1){
            const child = node.namedChild(i);
            if (child) {
                visitNode(child, currentContextStack);
            }
        }
    }
}
function extractBlock(node, contextStack, sourceBuffer) {
    const blockKind = mapBlockKind(node, contextStack);
    if (!blockKind) {
        return null;
    }
    const symbolName = getSymbolName(node, sourceBuffer);
    const parentSymbol = getNearestParentSymbol(contextStack);
    const contentText = sliceNodeText(node, sourceBuffer);
    const contentHash = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(contentText).digest("hex");
    return {
        blockKind,
        symbolName,
        parentSymbol,
        language: "rust",
        startLine: node.startPosition.row + 1,
        endLine: node.endPosition.row + 1,
        byteStart: node.startIndex,
        byteEnd: node.endIndex,
        contentHash,
        contentText,
        extractionMode: "semantic"
    };
}
function mapBlockKind(node, contextStack) {
    switch(node.type){
        case "function_item":
            {
                const parent = contextStack[contextStack.length - 1];
                if (parent?.nodeType === "impl_item" || parent?.nodeType === "trait_item") {
                    return "method";
                }
                return "function";
            }
        case "struct_item":
            return "struct";
        case "enum_item":
            return "enum";
        case "trait_item":
            return "trait";
        case "impl_item":
            return "impl";
        case "mod_item":
            return "mod";
        case "type_item":
            return "type";
        case "const_item":
            return "const";
        case "static_item":
            return "static";
        default:
            return null;
    }
}
function getSymbolName(node, sourceBuffer) {
    switch(node.type){
        case "function_item":
        case "struct_item":
        case "enum_item":
        case "trait_item":
        case "mod_item":
        case "type_item":
        case "const_item":
        case "static_item":
            {
                const nameNode = node.childForFieldName("name");
                return nameNode ? sliceNodeText(nameNode, sourceBuffer).trim() : null;
            }
        case "impl_item":
            return getImplDisplayName(node, sourceBuffer);
        default:
            return null;
    }
}
function getImplDisplayName(node, sourceBuffer) {
    const traitNode = node.childForFieldName("trait");
    const typeNode = node.childForFieldName("type");
    const traitText = traitNode ? compactWhitespace(sliceNodeText(traitNode, sourceBuffer)) : null;
    const typeText = typeNode ? compactWhitespace(sliceNodeText(typeNode, sourceBuffer)) : null;
    if (traitText && typeText) {
        return `impl ${traitText} for ${typeText}`;
    }
    if (typeText) {
        return `impl ${typeText}`;
    }
    const headerText = sliceImplHeader(node, sourceBuffer);
    return headerText ? compactWhitespace(headerText) : "impl";
}
function getNearestParentSymbol(contextStack) {
    for(let i = contextStack.length - 1; i >= 0; i -= 1){
        if (contextStack[i]?.symbolName) {
            return contextStack[i].symbolName;
        }
    }
    return null;
}
function sliceImplHeader(node, sourceBuffer) {
    const fullText = sliceNodeText(node, sourceBuffer);
    const braceIndex = fullText.indexOf("{");
    if (braceIndex === -1) {
        return fullText.trim();
    }
    return fullText.slice(0, braceIndex).trim();
}
function sliceNodeText(node, sourceBuffer) {
    return sourceBuffer.subarray(node.startIndex, node.endIndex).toString("utf8");
}
function compactWhitespace(value) {
    return value.replace(/\s+/g, " ").trim();
}
}),
"[project]/src/lib/block-extraction-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "extractStructuralCodeBlocksForSnapshot",
    ()=>extractStructuralCodeBlocksForSnapshot
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rust$2d$structural$2d$extractor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rust-structural-extractor.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function extractStructuralCodeBlocksForSnapshot(input) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
        where: {
            id: input.jobId
        },
        data: {
            status: "running",
            currentStep: "extract_blocks",
            startedAt: new Date(),
            finishedAt: null,
            errorCode: null,
            errorMessage: null
        }
    });
    try {
        const rustFiles = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].sourceFile.findMany({
            where: {
                snapshotId: input.snapshotId,
                language: "rust",
                isBinary: false,
                isExcluded: false
            },
            orderBy: {
                path: "asc"
            }
        });
        const blobStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBlobStore"])();
        const codeBlockRows = [];
        const parsedFileIds = [];
        const failedFileIds = [];
        const now = new Date();
        for (const file of rustFiles){
            try {
                if (!file.textS3Key) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("missing_file_text", `Rust file "${file.path}" has no persisted text content.`, 422);
                }
                const content = await blobStore.getText(file.textS3Key);
                if (typeof content !== "string" || content.length === 0) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("missing_file_text", `Rust file "${file.path}" returned empty text content.`, 422);
                }
                const blocks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rust$2d$structural$2d$extractor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractRustStructuralBlocks"])(content);
                for (const block of blocks){
                    codeBlockRows.push({
                        id: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomUUID(),
                        snapshotId: input.snapshotId,
                        fileId: file.id,
                        blockKind: block.blockKind,
                        symbolName: block.symbolName,
                        parentSymbol: block.parentSymbol,
                        language: block.language,
                        startLine: block.startLine,
                        endLine: block.endLine,
                        byteStart: block.byteStart,
                        byteEnd: block.byteEnd,
                        contentHash: block.contentHash,
                        contentText: block.contentText,
                        extractionMode: block.extractionMode,
                        createdAt: now,
                        updatedAt: now
                    });
                }
                parsedFileIds.push(file.id);
            } catch (error) {
                failedFileIds.push(file.id);
                console.error(`[block-extraction] Failed for ${file.path}:`, error instanceof Error ? error.message : error);
            }
        }
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
            await tx.codeBlock.deleteMany({
                where: {
                    snapshotId: input.snapshotId
                }
            });
            for(let i = 0; i < codeBlockRows.length; i += 250){
                const chunk = codeBlockRows.slice(i, i + 250);
                if (chunk.length > 0) {
                    await tx.codeBlock.createMany({
                        data: chunk
                    });
                }
            }
            if (parsedFileIds.length > 0) {
                await tx.sourceFile.updateMany({
                    where: {
                        id: {
                            in: parsedFileIds
                        }
                    },
                    data: {
                        parseStatus: "parsed"
                    }
                });
            }
            if (failedFileIds.length > 0) {
                await tx.sourceFile.updateMany({
                    where: {
                        id: {
                            in: failedFileIds
                        }
                    },
                    data: {
                        parseStatus: "failed"
                    }
                });
            }
            const snapshot = await tx.sourceSnapshot.update({
                where: {
                    id: input.snapshotId
                },
                data: {
                    ingestStatus: "blocks_extracted"
                }
            });
            const job = await tx.ingestJob.update({
                where: {
                    id: input.jobId
                },
                data: {
                    status: "completed",
                    currentStep: "extract_blocks",
                    finishedAt: new Date(),
                    errorCode: null,
                    errorMessage: null
                }
            });
            return {
                snapshot,
                job,
                extractedBlockCount: codeBlockRows.length,
                parsedFileCount: parsedFileIds.length,
                failedFileCount: failedFileIds.length
            };
        });
        return result;
    } catch (error) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].ingestJob.update({
            where: {
                id: input.jobId
            },
            data: {
                status: "failed",
                currentStep: "failed",
                finishedAt: new Date(),
                errorCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAppError"])(error) ? error.code : "block_extraction_failed",
                errorMessage: error instanceof Error ? error.message : "Unknown block extraction failure."
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].sourceSnapshot.update({
            where: {
                id: input.snapshotId
            },
            data: {
                ingestStatus: "failed"
            }
        });
        throw error;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/ingest-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ingestGithubRepository",
    ()=>ingestGithubRepository
]);
// import crypto from "node:crypto";
// import { prisma } from "@/lib/db";
// import {
//     getGithubRepositoryLicense,
//     getGithubRepositoryMetadata,
//     resolveGithubRef
// } from "@/lib/github-api";
// import { parseGithubRepoUrl } from "@/lib/github-url";
// import { persistPinnedArchiveForSnapshot } from "@/lib/archive-ingest-service";
// import { buildSourceFileManifestFromStoredArchive } from "@/lib/manifest-service";
//
// type IngestInput = {
//     repoUrl: string;
//     ref?: string;
// };
//
// const SNAPSHOT_DONE_STATUSES = new Set([
//     "manifest_built",
//     "blocks_extracted",
//     "completed"
// ]);
//
// export async function ingestGithubRepository(input: IngestInput) {
//     const parsed = parseGithubRepoUrl(input.repoUrl);
//     const requestedRef = normalizeRef(input.ref) ?? parsed.refFromUrl;
//
//     const repoMetadata = await getGithubRepositoryMetadata(
//         parsed.owner,
//         parsed.repoName
//     );
//
//     const licenseMetadata = await getGithubRepositoryLicense(
//         parsed.owner,
//         parsed.repoName
//     );
//
//     const resolvedRef = await resolveGithubRef(
//         parsed.owner,
//         parsed.repoName,
//         requestedRef,
//         repoMetadata.defaultBranch
//     );
//
//     const prep = await prisma.$transaction(async (tx) => {
//         const repo = await tx.sourceRepo.upsert({
//             where: {
//                 canonicalUrl: parsed.canonicalUrl
//             },
//             update: {
//                 defaultBranch: repoMetadata.defaultBranch,
//                 isPublic: true
//             },
//             create: {
//                 id: crypto.randomUUID(),
//                 provider: "github",
//                 owner: parsed.owner,
//                 repoName: parsed.repoName,
//                 canonicalUrl: parsed.canonicalUrl,
//                 defaultBranch: repoMetadata.defaultBranch,
//                 isPublic: true
//             }
//         });
//
//         let snapshot = await tx.sourceSnapshot.findUnique({
//             where: {
//                 sourceRepoId_commitSha: {
//                     sourceRepoId: repo.id,
//                     commitSha: resolvedRef.commitSha
//                 }
//             }
//         });
//
//         let reused = false;
//
//         if (!snapshot) {
//             snapshot = await tx.sourceSnapshot.create({
//                 data: {
//                     id: crypto.randomUUID(),
//                     sourceRepoId: repo.id,
//                     requestedRef: requestedRef ?? null,
//                     resolvedRefType: resolvedRef.resolvedRefType,
//                     commitSha: resolvedRef.commitSha,
//                     archiveFormat: "zip",
//                     detectedLicenseSpdx:
//                         licenseMetadata?.spdxId ?? repoMetadata.licenseSpdx ?? null,
//                     detectedLicenseName:
//                         licenseMetadata?.name ?? repoMetadata.licenseName ?? null,
//                     githubRepoNodeId: repoMetadata.nodeId,
//                     ingestStatus: "metadata_resolved",
//                     ingestRulesVersion: 1
//                 }
//             });
//         } else {
//             reused = true;
//
//             snapshot = await tx.sourceSnapshot.update({
//                 where: { id: snapshot.id },
//                 data: {
//                     requestedRef: requestedRef ?? snapshot.requestedRef,
//                     resolvedRefType: resolvedRef.resolvedRefType,
//                     detectedLicenseSpdx:
//                         licenseMetadata?.spdxId ?? snapshot.detectedLicenseSpdx,
//                     detectedLicenseName:
//                         licenseMetadata?.name ?? snapshot.detectedLicenseName,
//                     githubRepoNodeId: repoMetadata.nodeId
//                 }
//             });
//         }
//
//         if (
//             SNAPSHOT_DONE_STATUSES.has(snapshot.ingestStatus) &&
//             snapshot.archiveS3Key
//         ) {
//             return {
//                 repo,
//                 snapshot,
//                 job: null,
//                 reused: true
//             };
//         }
//
//         let job = await tx.ingestJob.findFirst({
//             where: {
//                 snapshotId: snapshot.id,
//                 status: {
//                     in: ["queued", "running"]
//                 }
//             },
//             orderBy: {
//                 createdAt: "desc"
//             }
//         });
//
//         if (!job) {
//             job = await tx.ingestJob.create({
//                 data: {
//                     id: crypto.randomUUID(),
//                     snapshotId: snapshot.id,
//                     status: "queued",
//                     currentStep: "queued",
//                     retryCount: 0
//                 }
//             });
//         }
//
//         return {
//             repo,
//             snapshot,
//             job,
//             reused
//         };
//     });
//
//     if (!prep.job) {
//         return {
//             repo: mapRepo(prep.repo),
//             snapshot: mapSnapshot(prep.snapshot),
//             job: null,
//             reused: prep.reused
//         };
//     }
//
//     let currentSnapshot = prep.snapshot;
//     let currentJob = prep.job;
//
//     if (!currentSnapshot.archiveS3Key) {
//         const archiveResult = await persistPinnedArchiveForSnapshot({
//             snapshotId: currentSnapshot.id,
//             jobId: currentJob.id,
//             owner: parsed.owner,
//             repoName: parsed.repoName,
//             commitSha: resolvedRef.commitSha,
//             archiveFormat: "zip"
//         });
//
//         currentSnapshot = archiveResult.snapshot;
//         currentJob = archiveResult.job;
//     }
//
//     if (currentSnapshot.ingestStatus !== "manifest_built") {
//         const manifestResult = await buildSourceFileManifestFromStoredArchive({
//             snapshotId: currentSnapshot.id,
//             jobId: currentJob.id,
//             archiveKey: currentSnapshot.archiveS3Key!
//         });
//
//         currentSnapshot = manifestResult.snapshot;
//         currentJob = manifestResult.job;
//     }
//
//     return {
//         repo: mapRepo(prep.repo),
//         snapshot: mapSnapshot(currentSnapshot),
//         job: mapJob(currentJob),
//         reused: prep.reused
//     };
// }
//
// function normalizeRef(ref?: string) {
//     const value = ref?.trim();
//     return value ? value : undefined;
// }
//
// function mapRepo(repo: any) {
//     return {
//         id: repo.id,
//         provider: repo.provider,
//         owner: repo.owner,
//         repoName: repo.repoName,
//         canonicalUrl: repo.canonicalUrl
//     };
// }
//
// function mapSnapshot(snapshot: any) {
//     return {
//         id: snapshot.id,
//         requestedRef: snapshot.requestedRef,
//         resolvedRefType: snapshot.resolvedRefType,
//         commitSha: snapshot.commitSha,
//         detectedLicenseSpdx: snapshot.detectedLicenseSpdx,
//         ingestStatus: snapshot.ingestStatus,
//         archiveS3Key: snapshot.archiveS3Key ?? null,
//         archiveChecksumSha256: snapshot.archiveChecksumSha256 ?? null,
//         archiveSizeBytes:
//             snapshot.archiveSizeBytes == null
//                 ? null
//                 : Number(snapshot.archiveSizeBytes),
//         createdAt: snapshot.createdAt,
//         ingestedAt: snapshot.ingestedAt ?? null
//     };
// }
//
// function mapJob(job: any) {
//     return {
//         id: job.id,
//         status: job.status,
//         currentStep: job.currentStep,
//         retryCount: job.retryCount,
//         createdAt: job.createdAt,
//         startedAt: job.startedAt ?? null,
//         finishedAt: job.finishedAt ?? null,
//         errorCode: job.errorCode ?? null,
//         errorMessage: job.errorMessage ?? null
//     };
// }
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$url$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-url.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$archive$2d$ingest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/archive-ingest-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$manifest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/manifest-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$block$2d$extraction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/block-extraction-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$archive$2d$ingest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$manifest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$block$2d$extraction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$archive$2d$ingest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$manifest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$block$2d$extraction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
const SNAPSHOT_DONE_STATUSES = new Set([
    "blocks_extracted",
    "completed"
]);
async function ingestGithubRepository(input) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$url$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseGithubRepoUrl"])(input.repoUrl);
    const requestedRef = normalizeRef(input.ref) ?? parsed.refFromUrl;
    const repoMetadata = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGithubRepositoryMetadata"])(parsed.owner, parsed.repoName);
    const licenseMetadata = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGithubRepositoryLicense"])(parsed.owner, parsed.repoName);
    const resolvedRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveGithubRef"])(parsed.owner, parsed.repoName, requestedRef, repoMetadata.defaultBranch);
    const prep = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
        const repo = await tx.sourceRepo.upsert({
            where: {
                canonicalUrl: parsed.canonicalUrl
            },
            update: {
                defaultBranch: repoMetadata.defaultBranch,
                isPublic: true
            },
            create: {
                id: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomUUID(),
                provider: "github",
                owner: parsed.owner,
                repoName: parsed.repoName,
                canonicalUrl: parsed.canonicalUrl,
                defaultBranch: repoMetadata.defaultBranch,
                isPublic: true
            }
        });
        let snapshot = await tx.sourceSnapshot.findUnique({
            where: {
                sourceRepoId_commitSha: {
                    sourceRepoId: repo.id,
                    commitSha: resolvedRef.commitSha
                }
            }
        });
        let reused = false;
        if (!snapshot) {
            snapshot = await tx.sourceSnapshot.create({
                data: {
                    id: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomUUID(),
                    sourceRepoId: repo.id,
                    requestedRef: requestedRef ?? null,
                    resolvedRefType: resolvedRef.resolvedRefType,
                    commitSha: resolvedRef.commitSha,
                    archiveFormat: "zip",
                    detectedLicenseSpdx: licenseMetadata?.spdxId ?? repoMetadata.licenseSpdx ?? null,
                    detectedLicenseName: licenseMetadata?.name ?? repoMetadata.licenseName ?? null,
                    githubRepoNodeId: repoMetadata.nodeId,
                    ingestStatus: "metadata_resolved",
                    ingestRulesVersion: 1
                }
            });
        } else {
            reused = true;
            snapshot = await tx.sourceSnapshot.update({
                where: {
                    id: snapshot.id
                },
                data: {
                    requestedRef: requestedRef ?? snapshot.requestedRef,
                    resolvedRefType: resolvedRef.resolvedRefType,
                    detectedLicenseSpdx: licenseMetadata?.spdxId ?? snapshot.detectedLicenseSpdx,
                    detectedLicenseName: licenseMetadata?.name ?? snapshot.detectedLicenseName,
                    githubRepoNodeId: repoMetadata.nodeId
                }
            });
        }
        if (snapshot.archiveS3Key && SNAPSHOT_DONE_STATUSES.has(snapshot.ingestStatus)) {
            return {
                repo,
                snapshot,
                job: null,
                reused: true
            };
        }
        let job = await tx.ingestJob.findFirst({
            where: {
                snapshotId: snapshot.id,
                status: {
                    in: [
                        "queued",
                        "running"
                    ]
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        if (!job) {
            job = await tx.ingestJob.create({
                data: {
                    id: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["default"].randomUUID(),
                    snapshotId: snapshot.id,
                    status: "queued",
                    currentStep: "queued",
                    retryCount: 0
                }
            });
        }
        return {
            repo,
            snapshot,
            job,
            reused
        };
    });
    if (!prep.job) {
        return {
            repo: mapRepo(prep.repo),
            snapshot: mapSnapshot(prep.snapshot),
            job: null,
            reused: prep.reused
        };
    }
    let currentSnapshot = prep.snapshot;
    let currentJob = prep.job;
    if (!currentSnapshot.archiveS3Key) {
        const archiveResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$archive$2d$ingest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["persistPinnedArchiveForSnapshot"])({
            snapshotId: currentSnapshot.id,
            jobId: currentJob.id,
            owner: parsed.owner,
            repoName: parsed.repoName,
            commitSha: resolvedRef.commitSha,
            archiveFormat: "zip"
        });
        currentSnapshot = archiveResult.snapshot;
        currentJob = archiveResult.job;
    }
    if (currentSnapshot.ingestStatus !== "manifest_built" && currentSnapshot.ingestStatus !== "blocks_extracted" && currentSnapshot.ingestStatus !== "completed") {
        const manifestResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$manifest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildSourceFileManifestFromStoredArchive"])({
            snapshotId: currentSnapshot.id,
            jobId: currentJob.id,
            archiveKey: currentSnapshot.archiveS3Key
        });
        currentSnapshot = manifestResult.snapshot;
        currentJob = manifestResult.job;
    }
    if (currentSnapshot.ingestStatus !== "blocks_extracted" && currentSnapshot.ingestStatus !== "completed") {
        const extractionResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$block$2d$extraction$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractStructuralCodeBlocksForSnapshot"])({
            snapshotId: currentSnapshot.id,
            jobId: currentJob.id
        });
        currentSnapshot = extractionResult.snapshot;
        currentJob = extractionResult.job;
    }
    return {
        repo: mapRepo(prep.repo),
        snapshot: mapSnapshot(currentSnapshot),
        job: mapJob(currentJob),
        reused: prep.reused
    };
}
function normalizeRef(ref) {
    const value = ref?.trim();
    return value ? value : undefined;
}
function mapRepo(repo) {
    return {
        id: repo.id,
        provider: repo.provider,
        owner: repo.owner,
        repoName: repo.repoName,
        canonicalUrl: repo.canonicalUrl
    };
}
function mapSnapshot(snapshot) {
    return {
        id: snapshot.id,
        requestedRef: snapshot.requestedRef,
        resolvedRefType: snapshot.resolvedRefType,
        commitSha: snapshot.commitSha,
        detectedLicenseSpdx: snapshot.detectedLicenseSpdx,
        ingestStatus: snapshot.ingestStatus,
        archiveS3Key: snapshot.archiveS3Key ?? null,
        archiveChecksumSha256: snapshot.archiveChecksumSha256 ?? null,
        archiveSizeBytes: snapshot.archiveSizeBytes == null ? null : Number(snapshot.archiveSizeBytes),
        createdAt: snapshot.createdAt,
        ingestedAt: snapshot.ingestedAt ?? null
    };
}
function mapJob(job) {
    return {
        id: job.id,
        status: job.status,
        currentStep: job.currentStep,
        retryCount: job.retryCount,
        createdAt: job.createdAt,
        startedAt: job.startedAt ?? null,
        finishedAt: job.finishedAt ?? null,
        errorCode: job.errorCode ?? null,
        errorMessage: job.errorMessage ?? null
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/repos/ingest/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contracts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/contracts.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/http.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ingest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ingest-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ingest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ingest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function POST(request) {
    try {
        const contentType = request.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]("invalid_content_type", "Content-Type must be application/json.", 415);
        }
        const body = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$contracts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ingestRequestSchema"].parse(await request.json());
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ingest$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ingestGithubRepository"])(body);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ok"])(result, {
            status: 200
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fail"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toAppError"])(error));
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ac_id~._.js.map