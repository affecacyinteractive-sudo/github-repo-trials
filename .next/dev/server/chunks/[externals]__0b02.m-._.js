module.exports = [
"[externals]/fs/promises [external] (fs/promises, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/[externals]_fs_promises_022gqgn._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/fs/promises [external] (fs/promises, cjs)");
    });
});
}),
"[externals]/module [external] (module, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/[externals]_module_0t8qqlc._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/module [external] (module, cjs)");
    });
});
}),
];