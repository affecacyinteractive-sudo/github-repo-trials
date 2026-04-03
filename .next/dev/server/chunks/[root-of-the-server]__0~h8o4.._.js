module.exports = [
"[project]/node_modules/@prisma/debug/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Debug",
    ()=>Debug,
    "clearLogs",
    ()=>clearLogs,
    "default",
    ()=>index_default,
    "getLogs",
    ()=>getLogs
]);
var __defProp = Object.defineProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
// ../../node_modules/.pnpm/kleur@4.1.5/node_modules/kleur/colors.mjs
var colors_exports = {};
__export(colors_exports, {
    $: ()=>$,
    bgBlack: ()=>bgBlack,
    bgBlue: ()=>bgBlue,
    bgCyan: ()=>bgCyan,
    bgGreen: ()=>bgGreen,
    bgMagenta: ()=>bgMagenta,
    bgRed: ()=>bgRed,
    bgWhite: ()=>bgWhite,
    bgYellow: ()=>bgYellow,
    black: ()=>black,
    blue: ()=>blue,
    bold: ()=>bold,
    cyan: ()=>cyan,
    dim: ()=>dim,
    gray: ()=>gray,
    green: ()=>green,
    grey: ()=>grey,
    hidden: ()=>hidden,
    inverse: ()=>inverse,
    italic: ()=>italic,
    magenta: ()=>magenta,
    red: ()=>red,
    reset: ()=>reset,
    strikethrough: ()=>strikethrough,
    underline: ()=>underline,
    white: ()=>white,
    yellow: ()=>yellow
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
    ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
    isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
    enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
    let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
    let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
    return function(txt) {
        if (!$.enabled || txt == null) return txt;
        return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
    };
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
// src/index.ts
var MAX_ARGS_HISTORY = 100;
var COLORS = [
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "red"
];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ??= processEnv.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
var topProps = {
    enable (namespace) {
        if (typeof namespace === "string") {
            globalThis.DEBUG = namespace;
        }
    },
    disable () {
        const prev = globalThis.DEBUG;
        globalThis.DEBUG = "";
        return prev;
    },
    // this is the core logic to check if logging should happen or not
    enabled (namespace) {
        const listenedNamespaces = globalThis.DEBUG.split(",").map((s)=>{
            return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
        });
        const isListened = listenedNamespaces.some((listenedNamespace)=>{
            if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
            return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
        });
        const isExcluded = listenedNamespaces.some((listenedNamespace)=>{
            if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
            return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
        });
        return isListened && !isExcluded;
    },
    log: (...args)=>{
        const [namespace, format, ...rest] = args;
        const logWithFormatting = console.warn ?? console.log;
        logWithFormatting(`${namespace} ${format}`, ...rest);
    },
    formatters: {}
};
function debugCreate(namespace) {
    const instanceProps = {
        color: COLORS[lastColor++ % COLORS.length],
        enabled: topProps.enabled(namespace),
        namespace,
        log: topProps.log,
        extend: ()=>{}
    };
    const debugCall = (...args)=>{
        const { enabled, namespace: namespace2, color, log } = instanceProps;
        if (args.length !== 0) {
            argsHistory.push([
                namespace2,
                ...args
            ]);
        }
        if (argsHistory.length > MAX_ARGS_HISTORY) {
            argsHistory.shift();
        }
        if (topProps.enabled(namespace2) || enabled) {
            const stringArgs = args.map((arg)=>{
                if (typeof arg === "string") {
                    return arg;
                }
                return safeStringify(arg);
            });
            const ms = `+${Date.now() - lastTimestamp}ms`;
            lastTimestamp = Date.now();
            if (globalThis.DEBUG_COLORS) {
                log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
            } else {
                log(namespace2, ...stringArgs, ms);
            }
        }
    };
    return new Proxy(debugCall, {
        get: (_, prop)=>instanceProps[prop],
        set: (_, prop, value)=>instanceProps[prop] = value
    });
}
var Debug = new Proxy(debugCreate, {
    get: (_, prop)=>topProps[prop],
    set: (_, prop, value)=>topProps[prop] = value
});
function safeStringify(value, indent = 2) {
    const cache = /* @__PURE__ */ new Set();
    return JSON.stringify(value, (key, value2)=>{
        if (typeof value2 === "object" && value2 !== null) {
            if (cache.has(value2)) {
                return `[Circular *]`;
            }
            cache.add(value2);
        } else if (typeof value2 === "bigint") {
            return value2.toString();
        }
        return value2;
    }, indent);
}
function getLogs(numChars = 7500) {
    const logs = argsHistory.map(([namespace, ...args])=>{
        return `${namespace} ${args.map((arg)=>{
            if (typeof arg === "string") {
                return arg;
            } else {
                return JSON.stringify(arg);
            }
        }).join(" ")}`;
    }).join("\n");
    if (logs.length < numChars) {
        return logs;
    }
    return logs.slice(-numChars);
}
function clearLogs() {
    argsHistory.length = 0;
}
var index_default = Debug;
;
}),
"[project]/node_modules/@prisma/driver-adapter-utils/dist/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColumnTypeEnum",
    ()=>ColumnTypeEnum,
    "DriverAdapterError",
    ()=>DriverAdapterError,
    "bindAdapter",
    ()=>bindAdapter,
    "bindMigrationAwareSqlAdapterFactory",
    ()=>bindMigrationAwareSqlAdapterFactory,
    "bindSqlAdapterFactory",
    ()=>bindSqlAdapterFactory,
    "err",
    ()=>err,
    "isDriverAdapterError",
    ()=>isDriverAdapterError,
    "mockAdapter",
    ()=>mockAdapter,
    "mockAdapterErrors",
    ()=>mockAdapterErrors,
    "mockAdapterFactory",
    ()=>mockAdapterFactory,
    "mockMigrationAwareAdapterFactory",
    ()=>mockMigrationAwareAdapterFactory,
    "ok",
    ()=>ok
]);
// src/debug.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$debug$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/debug/dist/index.mjs [app-route] (ecmascript)");
;
// src/error.ts
var DriverAdapterError = class extends Error {
    name = "DriverAdapterError";
    cause;
    constructor(payload){
        super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
        this.cause = payload;
    }
};
function isDriverAdapterError(error) {
    return error["name"] === "DriverAdapterError" && typeof error["cause"] === "object";
}
// src/result.ts
function ok(value) {
    return {
        ok: true,
        value,
        map (fn) {
            return ok(fn(value));
        },
        flatMap (fn) {
            return fn(value);
        }
    };
}
function err(error) {
    return {
        ok: false,
        error,
        map () {
            return err(error);
        },
        flatMap () {
            return err(error);
        }
    };
}
// src/binder.ts
var debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$debug$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Debug"])("driver-adapter-utils");
var ErrorRegistryInternal = class {
    registeredErrors = [];
    consumeError(id) {
        return this.registeredErrors[id];
    }
    registerNewError(error) {
        let i = 0;
        while(this.registeredErrors[i] !== void 0){
            i++;
        }
        this.registeredErrors[i] = {
            error
        };
        return i;
    }
};
function copySymbolsFromSource(source, target) {
    const symbols = Object.getOwnPropertySymbols(source);
    const symbolObject = Object.fromEntries(symbols.map((symbol)=>[
            symbol,
            true
        ]));
    Object.assign(target, symbolObject);
}
var bindMigrationAwareSqlAdapterFactory = (adapterFactory)=>{
    const errorRegistry = new ErrorRegistryInternal();
    const boundFactory = {
        adapterName: adapterFactory.adapterName,
        provider: adapterFactory.provider,
        errorRegistry,
        connect: async (...args)=>{
            const ctx = await wrapAsync(errorRegistry, adapterFactory.connect.bind(adapterFactory))(...args);
            return ctx.map((ctx2)=>bindAdapter(ctx2, errorRegistry));
        },
        connectToShadowDb: async (...args)=>{
            const ctx = await wrapAsync(errorRegistry, adapterFactory.connectToShadowDb.bind(adapterFactory))(...args);
            return ctx.map((ctx2)=>bindAdapter(ctx2, errorRegistry));
        }
    };
    copySymbolsFromSource(adapterFactory, boundFactory);
    return boundFactory;
};
var bindSqlAdapterFactory = (adapterFactory)=>{
    const errorRegistry = new ErrorRegistryInternal();
    const boundFactory = {
        adapterName: adapterFactory.adapterName,
        provider: adapterFactory.provider,
        errorRegistry,
        connect: async (...args)=>{
            const ctx = await wrapAsync(errorRegistry, adapterFactory.connect.bind(adapterFactory))(...args);
            return ctx.map((ctx2)=>bindAdapter(ctx2, errorRegistry));
        }
    };
    copySymbolsFromSource(adapterFactory, boundFactory);
    return boundFactory;
};
var bindAdapter = (adapter, errorRegistry = new ErrorRegistryInternal())=>{
    const boundAdapter = {
        adapterName: adapter.adapterName,
        errorRegistry,
        queryRaw: wrapAsync(errorRegistry, adapter.queryRaw.bind(adapter)),
        executeRaw: wrapAsync(errorRegistry, adapter.executeRaw.bind(adapter)),
        executeScript: wrapAsync(errorRegistry, adapter.executeScript.bind(adapter)),
        dispose: wrapAsync(errorRegistry, adapter.dispose.bind(adapter)),
        provider: adapter.provider,
        startTransaction: async (...args)=>{
            const ctx = await wrapAsync(errorRegistry, adapter.startTransaction.bind(adapter))(...args);
            return ctx.map((ctx2)=>bindTransaction(errorRegistry, ctx2));
        }
    };
    if (adapter.getConnectionInfo) {
        boundAdapter.getConnectionInfo = wrapSync(errorRegistry, adapter.getConnectionInfo.bind(adapter));
    }
    return boundAdapter;
};
var bindTransaction = (errorRegistry, transaction)=>{
    const boundTransaction = {
        adapterName: transaction.adapterName,
        provider: transaction.provider,
        options: transaction.options,
        queryRaw: wrapAsync(errorRegistry, transaction.queryRaw.bind(transaction)),
        executeRaw: wrapAsync(errorRegistry, transaction.executeRaw.bind(transaction)),
        commit: wrapAsync(errorRegistry, transaction.commit.bind(transaction)),
        rollback: wrapAsync(errorRegistry, transaction.rollback.bind(transaction))
    };
    if (transaction.createSavepoint) {
        boundTransaction.createSavepoint = wrapAsync(errorRegistry, transaction.createSavepoint.bind(transaction));
    }
    if (transaction.rollbackToSavepoint) {
        boundTransaction.rollbackToSavepoint = wrapAsync(errorRegistry, transaction.rollbackToSavepoint.bind(transaction));
    }
    if (transaction.releaseSavepoint) {
        boundTransaction.releaseSavepoint = wrapAsync(errorRegistry, transaction.releaseSavepoint.bind(transaction));
    }
    return boundTransaction;
};
function wrapAsync(registry, fn) {
    return async (...args)=>{
        try {
            return ok(await fn(...args));
        } catch (error) {
            debug("[error@wrapAsync]", error);
            if (isDriverAdapterError(error)) {
                return err(error.cause);
            }
            const id = registry.registerNewError(error);
            return err({
                kind: "GenericJs",
                id
            });
        }
    };
}
function wrapSync(registry, fn) {
    return (...args)=>{
        try {
            return ok(fn(...args));
        } catch (error) {
            debug("[error@wrapSync]", error);
            if (isDriverAdapterError(error)) {
                return err(error.cause);
            }
            const id = registry.registerNewError(error);
            return err({
                kind: "GenericJs",
                id
            });
        }
    };
}
// src/const.ts
var ColumnTypeEnum = {
    // Scalars
    Int32: 0,
    Int64: 1,
    Float: 2,
    Double: 3,
    Numeric: 4,
    Boolean: 5,
    Character: 6,
    Text: 7,
    Date: 8,
    Time: 9,
    DateTime: 10,
    Json: 11,
    Enum: 12,
    Bytes: 13,
    Set: 14,
    Uuid: 15,
    // Arrays
    Int32Array: 64,
    Int64Array: 65,
    FloatArray: 66,
    DoubleArray: 67,
    NumericArray: 68,
    BooleanArray: 69,
    CharacterArray: 70,
    TextArray: 71,
    DateArray: 72,
    TimeArray: 73,
    DateTimeArray: 74,
    JsonArray: 75,
    EnumArray: 76,
    BytesArray: 77,
    UuidArray: 78,
    // Custom
    UnknownNumber: 128
};
// src/mock.ts
var mockAdapterErrors = {
    queryRaw: new Error("Not implemented: queryRaw"),
    executeRaw: new Error("Not implemented: executeRaw"),
    startTransaction: new Error("Not implemented: startTransaction"),
    executeScript: new Error("Not implemented: executeScript"),
    dispose: new Error("Not implemented: dispose")
};
function mockAdapter(provider) {
    return {
        provider,
        adapterName: "@prisma/adapter-mock",
        queryRaw: ()=>Promise.reject(mockAdapterErrors.queryRaw),
        executeRaw: ()=>Promise.reject(mockAdapterErrors.executeRaw),
        startTransaction: ()=>Promise.reject(mockAdapterErrors.startTransaction),
        executeScript: ()=>Promise.reject(mockAdapterErrors.executeScript),
        dispose: ()=>Promise.reject(mockAdapterErrors.dispose),
        [Symbol.for("adapter.mockAdapter")]: true
    };
}
function mockAdapterFactory(provider) {
    return {
        provider,
        adapterName: "@prisma/adapter-mock",
        connect: ()=>Promise.resolve(mockAdapter(provider)),
        [Symbol.for("adapter.mockAdapterFactory")]: true
    };
}
function mockMigrationAwareAdapterFactory(provider) {
    return {
        provider,
        adapterName: "@prisma/adapter-mock",
        connect: ()=>Promise.resolve(mockAdapter(provider)),
        connectToShadowDb: ()=>Promise.resolve(mockAdapter(provider)),
        [Symbol.for("adapter.mockMigrationAwareAdapterFactory")]: true
    };
}
;
}),
"[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg-587764f78a6c7a9c");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/node_modules/postgres-array/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const BACKSLASH = '\\';
const DQUOT = '"';
const LBRACE = '{';
const RBRACE = '}';
const LBRACKET = '[';
const EQUALS = '=';
const COMMA = ',';
/** When the raw value is this, it means a literal `null` */ const NULL_STRING = 'NULL';
/**
 * Parses an array according to
 * https://www.postgresql.org/docs/17/arrays.html#ARRAYS-IO
 *
 * Trusts the data (mostly), so only hook up to trusted Postgres servers.
 */ function makeParseArrayWithTransform(transform) {
    const haveTransform = transform != null;
    return function parseArray(str) {
        const rbraceIndex = str.length - 1;
        if (rbraceIndex === 1) {
            return [];
        }
        if (str[rbraceIndex] !== RBRACE) {
            throw new Error('Invalid array text - must end with }');
        }
        // If starts with `[`, it is specifying the index boundas. Skip past first `=`.
        let position = 0;
        if (str[position] === LBRACKET) {
            position = str.indexOf(EQUALS) + 1;
        }
        if (str[position++] !== LBRACE) {
            throw new Error('Invalid array text - must start with {');
        }
        const output = [];
        let current = output;
        const stack = [];
        let currentStringStart = position;
        let currentString = '';
        let expectValue = true;
        for(; position < rbraceIndex; ++position){
            let char = str[position];
            // > The array output routine will put double quotes around element values if
            // > they are empty strings, contain curly braces, delimiter characters, double
            // > quotes, backslashes, or white space, or match the word NULL. Double quotes
            // > and backslashes embedded in element values will be backslash-escaped.
            if (char === DQUOT) {
                // It's escaped
                currentStringStart = ++position;
                let dquot = str.indexOf(DQUOT, currentStringStart);
                let backSlash = str.indexOf(BACKSLASH, currentStringStart);
                while(backSlash !== -1 && backSlash < dquot){
                    position = backSlash;
                    const part = str.slice(currentStringStart, position);
                    currentString += part;
                    currentStringStart = ++position;
                    if (dquot === position++) {
                        // This was an escaped doublequote; find the next one!
                        dquot = str.indexOf(DQUOT, position);
                    }
                    // Either way, find the next backslash
                    backSlash = str.indexOf(BACKSLASH, position);
                }
                position = dquot;
                const part = str.slice(currentStringStart, position);
                currentString += part;
                current.push(haveTransform ? transform(currentString) : currentString);
                currentString = '';
                expectValue = false;
            } else if (char === LBRACE) {
                const newArray = [];
                current.push(newArray);
                stack.push(current);
                current = newArray;
                currentStringStart = position + 1;
                expectValue = true;
            } else if (char === COMMA) {
                expectValue = true;
            } else if (char === RBRACE) {
                expectValue = false;
                const arr = stack.pop();
                if (arr === undefined) {
                    throw new Error("Invalid array text - too many '}'");
                }
                current = arr;
            } else if (expectValue) {
                currentStringStart = position;
                while((char = str[position]) !== COMMA && char !== RBRACE && position < rbraceIndex){
                    ++position;
                }
                const part = str.slice(currentStringStart, position--);
                current.push(part === NULL_STRING ? null : haveTransform ? transform(part) : part);
                expectValue = false;
            } else {
                throw new Error('Was expecting delimeter');
            }
        }
        return output;
    };
}
const parseArray = makeParseArrayWithTransform();
exports.parse = (source, transform)=>transform != null ? makeParseArrayWithTransform(transform)(source) : parseArray(source);
}),
"[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "PrismaPg",
    ()=>PrismaPgAdapterFactory
]);
// src/pg.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$debug$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/debug/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/driver-adapter-utils/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postgres$2d$array$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postgres-array/index.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
// package.json
var name = "@prisma/adapter-pg";
// src/constants.ts
var FIRST_NORMAL_OBJECT_ID = 16384;
;
;
;
var { types } = __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"];
var { builtins: ScalarColumnType, getTypeParser } = types;
var AdditionalScalarColumnType = {
    NAME: 19
};
var ArrayColumnType = {
    BIT_ARRAY: 1561,
    BOOL_ARRAY: 1e3,
    BYTEA_ARRAY: 1001,
    BPCHAR_ARRAY: 1014,
    CHAR_ARRAY: 1002,
    CIDR_ARRAY: 651,
    DATE_ARRAY: 1182,
    FLOAT4_ARRAY: 1021,
    FLOAT8_ARRAY: 1022,
    INET_ARRAY: 1041,
    INT2_ARRAY: 1005,
    INT4_ARRAY: 1007,
    INT8_ARRAY: 1016,
    JSONB_ARRAY: 3807,
    JSON_ARRAY: 199,
    MONEY_ARRAY: 791,
    NUMERIC_ARRAY: 1231,
    OID_ARRAY: 1028,
    TEXT_ARRAY: 1009,
    TIMESTAMP_ARRAY: 1115,
    TIMESTAMPTZ_ARRAY: 1185,
    TIME_ARRAY: 1183,
    UUID_ARRAY: 2951,
    VARBIT_ARRAY: 1563,
    VARCHAR_ARRAY: 1015,
    XML_ARRAY: 143
};
var UnsupportedNativeDataType = class _UnsupportedNativeDataType extends Error {
    // map of type codes to type names
    static typeNames = {
        16: "bool",
        17: "bytea",
        18: "char",
        19: "name",
        20: "int8",
        21: "int2",
        22: "int2vector",
        23: "int4",
        24: "regproc",
        25: "text",
        26: "oid",
        27: "tid",
        28: "xid",
        29: "cid",
        30: "oidvector",
        32: "pg_ddl_command",
        71: "pg_type",
        75: "pg_attribute",
        81: "pg_proc",
        83: "pg_class",
        114: "json",
        142: "xml",
        194: "pg_node_tree",
        269: "table_am_handler",
        325: "index_am_handler",
        600: "point",
        601: "lseg",
        602: "path",
        603: "box",
        604: "polygon",
        628: "line",
        650: "cidr",
        700: "float4",
        701: "float8",
        705: "unknown",
        718: "circle",
        774: "macaddr8",
        790: "money",
        829: "macaddr",
        869: "inet",
        1033: "aclitem",
        1042: "bpchar",
        1043: "varchar",
        1082: "date",
        1083: "time",
        1114: "timestamp",
        1184: "timestamptz",
        1186: "interval",
        1266: "timetz",
        1560: "bit",
        1562: "varbit",
        1700: "numeric",
        1790: "refcursor",
        2202: "regprocedure",
        2203: "regoper",
        2204: "regoperator",
        2205: "regclass",
        2206: "regtype",
        2249: "record",
        2275: "cstring",
        2276: "any",
        2277: "anyarray",
        2278: "void",
        2279: "trigger",
        2280: "language_handler",
        2281: "internal",
        2283: "anyelement",
        2287: "_record",
        2776: "anynonarray",
        2950: "uuid",
        2970: "txid_snapshot",
        3115: "fdw_handler",
        3220: "pg_lsn",
        3310: "tsm_handler",
        3361: "pg_ndistinct",
        3402: "pg_dependencies",
        3500: "anyenum",
        3614: "tsvector",
        3615: "tsquery",
        3642: "gtsvector",
        3734: "regconfig",
        3769: "regdictionary",
        3802: "jsonb",
        3831: "anyrange",
        3838: "event_trigger",
        3904: "int4range",
        3906: "numrange",
        3908: "tsrange",
        3910: "tstzrange",
        3912: "daterange",
        3926: "int8range",
        4072: "jsonpath",
        4089: "regnamespace",
        4096: "regrole",
        4191: "regcollation",
        4451: "int4multirange",
        4532: "nummultirange",
        4533: "tsmultirange",
        4534: "tstzmultirange",
        4535: "datemultirange",
        4536: "int8multirange",
        4537: "anymultirange",
        4538: "anycompatiblemultirange",
        4600: "pg_brin_bloom_summary",
        4601: "pg_brin_minmax_multi_summary",
        5017: "pg_mcv_list",
        5038: "pg_snapshot",
        5069: "xid8",
        5077: "anycompatible",
        5078: "anycompatiblearray",
        5079: "anycompatiblenonarray",
        5080: "anycompatiblerange"
    };
    type;
    constructor(code){
        super();
        this.type = _UnsupportedNativeDataType.typeNames[code] || "Unknown";
        this.message = `Unsupported column type ${this.type}`;
    }
};
function fieldToColumnType(fieldTypeId) {
    switch(fieldTypeId){
        case ScalarColumnType.INT2:
        case ScalarColumnType.INT4:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int32;
        case ScalarColumnType.INT8:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int64;
        case ScalarColumnType.FLOAT4:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Float;
        case ScalarColumnType.FLOAT8:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Double;
        case ScalarColumnType.BOOL:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Boolean;
        case ScalarColumnType.DATE:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Date;
        case ScalarColumnType.TIME:
        case ScalarColumnType.TIMETZ:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Time;
        case ScalarColumnType.TIMESTAMP:
        case ScalarColumnType.TIMESTAMPTZ:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DateTime;
        case ScalarColumnType.NUMERIC:
        case ScalarColumnType.MONEY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Numeric;
        case ScalarColumnType.JSON:
        case ScalarColumnType.JSONB:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Json;
        case ScalarColumnType.UUID:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Uuid;
        case ScalarColumnType.OID:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int64;
        case ScalarColumnType.BPCHAR:
        case ScalarColumnType.TEXT:
        case ScalarColumnType.VARCHAR:
        case ScalarColumnType.BIT:
        case ScalarColumnType.VARBIT:
        case ScalarColumnType.INET:
        case ScalarColumnType.CIDR:
        case ScalarColumnType.XML:
        case AdditionalScalarColumnType.NAME:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Text;
        case ScalarColumnType.BYTEA:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Bytes;
        case ArrayColumnType.INT2_ARRAY:
        case ArrayColumnType.INT4_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int32Array;
        case ArrayColumnType.FLOAT4_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].FloatArray;
        case ArrayColumnType.FLOAT8_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DoubleArray;
        case ArrayColumnType.NUMERIC_ARRAY:
        case ArrayColumnType.MONEY_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].NumericArray;
        case ArrayColumnType.BOOL_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].BooleanArray;
        case ArrayColumnType.CHAR_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].CharacterArray;
        case ArrayColumnType.BPCHAR_ARRAY:
        case ArrayColumnType.TEXT_ARRAY:
        case ArrayColumnType.VARCHAR_ARRAY:
        case ArrayColumnType.VARBIT_ARRAY:
        case ArrayColumnType.BIT_ARRAY:
        case ArrayColumnType.INET_ARRAY:
        case ArrayColumnType.CIDR_ARRAY:
        case ArrayColumnType.XML_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].TextArray;
        case ArrayColumnType.DATE_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DateArray;
        case ArrayColumnType.TIME_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].TimeArray;
        case ArrayColumnType.TIMESTAMP_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DateTimeArray;
        case ArrayColumnType.TIMESTAMPTZ_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].DateTimeArray;
        case ArrayColumnType.JSON_ARRAY:
        case ArrayColumnType.JSONB_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].JsonArray;
        case ArrayColumnType.BYTEA_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].BytesArray;
        case ArrayColumnType.UUID_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].UuidArray;
        case ArrayColumnType.INT8_ARRAY:
        case ArrayColumnType.OID_ARRAY:
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Int64Array;
        default:
            if (fieldTypeId >= FIRST_NORMAL_OBJECT_ID) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ColumnTypeEnum"].Text;
            }
            throw new UnsupportedNativeDataType(fieldTypeId);
    }
}
function normalize_array(element_normalizer) {
    return (str)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postgres$2d$array$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse"])(str, element_normalizer);
}
function normalize_numeric(numeric) {
    return numeric;
}
function normalize_date(date) {
    return date;
}
function normalize_timestamp(time) {
    return `${time.replace(" ", "T")}+00:00`;
}
function normalize_timestamptz(time) {
    return time.replace(" ", "T").replace(/[+-]\d{2}(:\d{2})?$/, "+00:00");
}
function normalize_time(time) {
    return time;
}
function normalize_timez(time) {
    return time.replace(/[+-]\d{2}(:\d{2})?$/, "");
}
function normalize_money(money) {
    return money.slice(1);
}
function normalize_xml(xml) {
    return xml;
}
function toJson(json) {
    return json;
}
var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
var normalizeByteaArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
function convertBytes(serializedBytes) {
    return parsePgBytes(serializedBytes);
}
function normalizeBit(bit) {
    return bit;
}
var customParsers = {
    [ScalarColumnType.NUMERIC]: normalize_numeric,
    [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
    [ScalarColumnType.TIME]: normalize_time,
    [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
    [ScalarColumnType.TIMETZ]: normalize_timez,
    [ScalarColumnType.DATE]: normalize_date,
    [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
    [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
    [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
    [ScalarColumnType.TIMESTAMPTZ]: normalize_timestamptz,
    [ArrayColumnType.TIMESTAMPTZ_ARRAY]: normalize_array(normalize_timestamptz),
    [ScalarColumnType.MONEY]: normalize_money,
    [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
    [ScalarColumnType.JSON]: toJson,
    [ArrayColumnType.JSON_ARRAY]: normalize_array(toJson),
    [ScalarColumnType.JSONB]: toJson,
    [ArrayColumnType.JSONB_ARRAY]: normalize_array(toJson),
    [ScalarColumnType.BYTEA]: convertBytes,
    [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
    [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
    [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
    [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
function mapArg(arg, argType) {
    if (arg === null) {
        return null;
    }
    if (Array.isArray(arg) && argType.arity === "list") {
        return arg.map((value)=>mapArg(value, argType));
    }
    if (typeof arg === "string" && argType.scalarType === "datetime") {
        arg = new Date(arg);
    }
    if (arg instanceof Date) {
        switch(argType.dbType){
            case "TIME":
            case "TIMETZ":
                return formatTime(arg);
            case "DATE":
                return formatDate(arg);
            default:
                return formatDateTime(arg);
        }
    }
    if (typeof arg === "string" && argType.scalarType === "bytes") {
        return Buffer.from(arg, "base64");
    }
    if (ArrayBuffer.isView(arg)) {
        return new Uint8Array(arg.buffer, arg.byteOffset, arg.byteLength);
    }
    return arg;
}
function formatDateTime(date) {
    const pad = (n, z = 2)=>String(n).padStart(z, "0");
    const ms = date.getUTCMilliseconds();
    return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
function formatDate(date) {
    const pad = (n, z = 2)=>String(n).padStart(z, "0");
    return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());
}
function formatTime(date) {
    const pad = (n, z = 2)=>String(n).padStart(z, "0");
    const ms = date.getUTCMilliseconds();
    return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
// src/errors.ts
var TLS_ERRORS = /* @__PURE__ */ new Set([
    "UNABLE_TO_GET_ISSUER_CERT",
    "UNABLE_TO_GET_CRL",
    "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
    "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
    "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
    "CERT_SIGNATURE_FAILURE",
    "CRL_SIGNATURE_FAILURE",
    "CERT_NOT_YET_VALID",
    "CERT_HAS_EXPIRED",
    "CRL_NOT_YET_VALID",
    "CRL_HAS_EXPIRED",
    "ERROR_IN_CERT_NOT_BEFORE_FIELD",
    "ERROR_IN_CERT_NOT_AFTER_FIELD",
    "ERROR_IN_CRL_LAST_UPDATE_FIELD",
    "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
    "DEPTH_ZERO_SELF_SIGNED_CERT",
    "SELF_SIGNED_CERT_IN_CHAIN",
    "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
    "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
    "CERT_CHAIN_TOO_LONG",
    "CERT_REVOKED",
    "INVALID_CA",
    "INVALID_PURPOSE",
    "CERT_UNTRUSTED",
    "CERT_REJECTED",
    "HOSTNAME_MISMATCH",
    "ERR_TLS_CERT_ALTNAME_FORMAT",
    "ERR_TLS_CERT_ALTNAME_INVALID"
]);
var SOCKET_ERRORS = /* @__PURE__ */ new Set([
    "ENOTFOUND",
    "ECONNREFUSED",
    "ECONNRESET",
    "ETIMEDOUT"
]);
function convertDriverError(error) {
    if (isSocketError(error)) {
        return mapSocketError(error);
    }
    if (isTlsError(error)) {
        return {
            kind: "TlsConnectionError",
            reason: error.message
        };
    }
    if (isDriverError(error)) {
        return {
            originalCode: error.code,
            originalMessage: error.message,
            ...mapDriverError(error)
        };
    }
    throw error;
}
function mapDriverError(error) {
    switch(error.code){
        case "22001":
            return {
                kind: "LengthMismatch",
                column: error.column
            };
        case "22003":
            return {
                kind: "ValueOutOfRange",
                cause: error.message
            };
        case "22P02":
            return {
                kind: "InvalidInputValue",
                message: error.message
            };
        case "23505":
            {
                const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
                return {
                    kind: "UniqueConstraintViolation",
                    constraint: fields !== void 0 ? {
                        fields
                    } : void 0
                };
            }
        case "23502":
            {
                const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
                return {
                    kind: "NullConstraintViolation",
                    constraint: fields !== void 0 ? {
                        fields
                    } : void 0
                };
            }
        case "23503":
            {
                let constraint;
                if (error.column) {
                    constraint = {
                        fields: [
                            error.column
                        ]
                    };
                } else if (error.constraint) {
                    constraint = {
                        index: error.constraint
                    };
                }
                return {
                    kind: "ForeignKeyConstraintViolation",
                    constraint
                };
            }
        case "3D000":
            return {
                kind: "DatabaseDoesNotExist",
                db: error.message.split(" ").at(1)?.split('"').at(1)
            };
        case "28000":
            return {
                kind: "DatabaseAccessDenied",
                db: error.message.split(",").find((s)=>s.startsWith(" database"))?.split('"').at(1)
            };
        case "28P01":
            return {
                kind: "AuthenticationFailed",
                user: error.message.split(" ").pop()?.split('"').at(1)
            };
        case "40001":
            return {
                kind: "TransactionWriteConflict"
            };
        case "42P01":
            return {
                kind: "TableDoesNotExist",
                table: error.message.split(" ").at(1)?.split('"').at(1)
            };
        case "42703":
            {
                const rawColumn = error.message.match(/^column (.+) does not exist$/)?.at(1);
                return {
                    kind: "ColumnNotFound",
                    column: rawColumn?.replace(/"((?:""|[^"])*)"/g, (_, id)=>id.replaceAll('""', '"'))
                };
            }
        case "42P04":
            return {
                kind: "DatabaseAlreadyExists",
                db: error.message.split(" ").at(1)?.split('"').at(1)
            };
        case "53300":
            return {
                kind: "TooManyConnections",
                cause: error.message
            };
        default:
            return {
                kind: "postgres",
                code: error.code ?? "N/A",
                severity: error.severity ?? "N/A",
                message: error.message,
                detail: error.detail,
                column: error.column,
                hint: error.hint
            };
    }
}
function isDriverError(error) {
    return typeof error.code === "string" && typeof error.message === "string" && typeof error.severity === "string" && (typeof error.detail === "string" || error.detail === void 0) && (typeof error.column === "string" || error.column === void 0) && (typeof error.hint === "string" || error.hint === void 0);
}
function mapSocketError(error) {
    switch(error.code){
        case "ENOTFOUND":
        case "ECONNREFUSED":
            return {
                kind: "DatabaseNotReachable",
                host: error.address ?? error.hostname,
                port: error.port
            };
        case "ECONNRESET":
            return {
                kind: "ConnectionClosed"
            };
        case "ETIMEDOUT":
            return {
                kind: "SocketTimeout"
            };
    }
}
function isSocketError(error) {
    return typeof error.code === "string" && typeof error.syscall === "string" && typeof error.errno === "number" && SOCKET_ERRORS.has(error.code);
}
function isTlsError(error) {
    if (typeof error.code === "string") {
        return TLS_ERRORS.has(error.code);
    }
    switch(error.message){
        case "The server does not support SSL connections":
        case "There was an error establishing an SSL connection":
            return true;
    }
    return false;
}
// src/pg.ts
var types2 = __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].types;
var debug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$debug$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Debug"])("prisma:driver-adapter:pg");
var PgQueryable = class {
    constructor(client, pgOptions){
        this.client = client;
        this.pgOptions = pgOptions;
    }
    provider = "postgres";
    adapterName = name;
    /**
   * Execute a query given as SQL, interpolating the given parameters.
   */ async queryRaw(query) {
        const tag = "[js::query_raw]";
        debug(`${tag} %O`, query);
        const { fields, rows } = await this.performIO(query);
        const columnNames = fields.map((field)=>field.name);
        let columnTypes = [];
        try {
            columnTypes = fields.map((field)=>fieldToColumnType(field.dataTypeID));
        } catch (e) {
            if (e instanceof UnsupportedNativeDataType) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DriverAdapterError"]({
                    kind: "UnsupportedNativeDataType",
                    type: e.type
                });
            }
            throw e;
        }
        const udtParser = this.pgOptions?.userDefinedTypeParser;
        if (udtParser) {
            for(let i = 0; i < fields.length; i++){
                const field = fields[i];
                if (field.dataTypeID >= FIRST_NORMAL_OBJECT_ID && !Object.hasOwn(customParsers, field.dataTypeID)) {
                    for(let j = 0; j < rows.length; j++){
                        rows[j][i] = await udtParser(field.dataTypeID, rows[j][i], this);
                    }
                }
            }
        }
        return {
            columnNames,
            columnTypes,
            rows
        };
    }
    /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */ async executeRaw(query) {
        const tag = "[js::execute_raw]";
        debug(`${tag} %O`, query);
        return (await this.performIO(query)).rowCount ?? 0;
    }
    /**
   * Run a query against the database, returning the result set.
   * Should the query fail due to a connection error, the connection is
   * marked as unhealthy.
   */ async performIO(query) {
        const { sql, args } = query;
        const values = args.map((arg, i)=>mapArg(arg, query.argTypes[i]));
        try {
            const result = await this.client.query({
                name: this.pgOptions?.statementNameGenerator?.(query),
                text: sql,
                values,
                rowMode: "array",
                types: {
                    getTypeParser: (oid, format)=>{
                        if (format === "text" && customParsers[oid]) {
                            return customParsers[oid];
                        }
                        return types2.getTypeParser(oid, format);
                    }
                }
            }, values);
            return result;
        } catch (e) {
            this.onError(e);
        }
    }
    onError(error) {
        debug("Error in performIO: %O", error);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$driver$2d$adapter$2d$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DriverAdapterError"](convertDriverError(error));
    }
};
var PgTransaction = class extends PgQueryable {
    constructor(client, options, pgOptions, cleanup){
        super(client, pgOptions);
        this.options = options;
        this.pgOptions = pgOptions;
        this.cleanup = cleanup;
    }
    async commit() {
        debug(`[js::commit]`);
        this.cleanup?.();
        this.client.release();
    }
    async rollback() {
        debug(`[js::rollback]`);
        this.cleanup?.();
        this.client.release();
    }
    async createSavepoint(name2) {
        await this.executeRaw({
            sql: `SAVEPOINT ${name2}`,
            args: [],
            argTypes: []
        });
    }
    async rollbackToSavepoint(name2) {
        await this.executeRaw({
            sql: `ROLLBACK TO SAVEPOINT ${name2}`,
            args: [],
            argTypes: []
        });
    }
    async releaseSavepoint(name2) {
        await this.executeRaw({
            sql: `RELEASE SAVEPOINT ${name2}`,
            args: [],
            argTypes: []
        });
    }
};
var PrismaPgAdapter = class extends PgQueryable {
    constructor(client, pgOptions, release){
        super(client);
        this.pgOptions = pgOptions;
        this.release = release;
    }
    async startTransaction(isolationLevel) {
        const options = {
            usePhantomQuery: false
        };
        const tag = "[js::startTransaction]";
        debug("%s options: %O", tag, options);
        const conn = await this.client.connect().catch((error)=>this.onError(error));
        const onError = (err)=>{
            debug(`Error from pool connection: ${err.message} %O`, err);
            this.pgOptions?.onConnectionError?.(err);
        };
        conn.on("error", onError);
        const cleanup = ()=>{
            conn.removeListener("error", onError);
        };
        try {
            const tx = new PgTransaction(conn, options, this.pgOptions, cleanup);
            await tx.executeRaw({
                sql: "BEGIN",
                args: [],
                argTypes: []
            });
            if (isolationLevel) {
                await tx.executeRaw({
                    sql: `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
                    args: [],
                    argTypes: []
                });
            }
            return tx;
        } catch (error) {
            cleanup();
            conn.release(error);
            this.onError(error);
        }
    }
    async executeScript(script) {
        const statements = script.split(";").map((stmt)=>stmt.trim()).filter((stmt)=>stmt.length > 0);
        for (const stmt of statements){
            try {
                await this.client.query(stmt);
            } catch (error) {
                this.onError(error);
            }
        }
    }
    getConnectionInfo() {
        return {
            schemaName: this.pgOptions?.schema,
            supportsRelationJoins: true
        };
    }
    async dispose() {
        return this.release?.();
    }
    underlyingDriver() {
        return this.client;
    }
};
var PrismaPgAdapterFactory = class {
    constructor(poolOrConfig, options){
        this.options = options;
        if (poolOrConfig instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].Pool) {
            this.externalPool = poolOrConfig;
            this.config = poolOrConfig.options;
        } else if (typeof poolOrConfig === "string") {
            this.externalPool = null;
            this.config = {
                connectionString: poolOrConfig
            };
        } else {
            this.externalPool = null;
            this.config = poolOrConfig;
        }
    }
    provider = "postgres";
    adapterName = name;
    config;
    externalPool;
    async connect() {
        const client = this.externalPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].Pool(this.config);
        const onIdleClientError = (err)=>{
            debug(`Error from idle pool client: ${err.message} %O`, err);
            this.options?.onPoolError?.(err);
        };
        client.on("error", onIdleClientError);
        return new PrismaPgAdapter(client, this.options, async ()=>{
            if (this.externalPool) {
                if (this.options?.disposeExternalPool) {
                    await this.externalPool.end();
                    this.externalPool = null;
                } else {
                    this.externalPool.removeListener("error", onIdleClientError);
                }
            } else {
                await client.end();
            }
        });
    }
    async connectToShadowDb() {
        const conn = await this.connect();
        const database = `prisma_migrate_shadow_db_${globalThis.crypto.randomUUID()}`;
        await conn.executeScript(`CREATE DATABASE "${database}"`);
        const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].Pool({
            ...this.config,
            database
        });
        return new PrismaPgAdapter(client, void 0, async ()=>{
            await conn.executeScript(`DROP DATABASE "${database}"`);
            await client.end();
        });
    }
};
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client-2c3a283f134fdcb6/runtime/client", () => require("@prisma/client-2c3a283f134fdcb6/runtime/client"));

module.exports = mod;
}),
"[project]/node_modules/adm-zip/util/constants.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    /* The local file header */ LOCHDR: 30,
    LOCSIG: 0x04034b50,
    LOCVER: 4,
    LOCFLG: 6,
    LOCHOW: 8,
    LOCTIM: 10,
    LOCCRC: 14,
    LOCSIZ: 18,
    LOCLEN: 22,
    LOCNAM: 26,
    LOCEXT: 28,
    /* The Data descriptor */ EXTSIG: 0x08074b50,
    EXTHDR: 16,
    EXTCRC: 4,
    EXTSIZ: 8,
    EXTLEN: 12,
    /* The central directory file header */ CENHDR: 46,
    CENSIG: 0x02014b50,
    CENVEM: 4,
    CENVER: 6,
    CENFLG: 8,
    CENHOW: 10,
    CENTIM: 12,
    CENCRC: 16,
    CENSIZ: 20,
    CENLEN: 24,
    CENNAM: 28,
    CENEXT: 30,
    CENCOM: 32,
    CENDSK: 34,
    CENATT: 36,
    CENATX: 38,
    CENOFF: 42,
    /* The entries in the end of central directory */ ENDHDR: 22,
    ENDSIG: 0x06054b50,
    ENDSUB: 8,
    ENDTOT: 10,
    ENDSIZ: 12,
    ENDOFF: 16,
    ENDCOM: 20,
    END64HDR: 20,
    END64SIG: 0x07064b50,
    END64START: 4,
    END64OFF: 8,
    END64NUMDISKS: 16,
    ZIP64SIG: 0x06064b50,
    ZIP64HDR: 56,
    ZIP64LEAD: 12,
    ZIP64SIZE: 4,
    ZIP64VEM: 12,
    ZIP64VER: 14,
    ZIP64DSK: 16,
    ZIP64DSKDIR: 20,
    ZIP64SUB: 24,
    ZIP64TOT: 32,
    ZIP64SIZB: 40,
    ZIP64OFF: 48,
    ZIP64EXTRA: 56,
    /* Compression methods */ STORED: 0,
    SHRUNK: 1,
    REDUCED1: 2,
    REDUCED2: 3,
    REDUCED3: 4,
    REDUCED4: 5,
    IMPLODED: 6,
    // 7 reserved for Tokenizing compression algorithm
    DEFLATED: 8,
    ENHANCED_DEFLATED: 9,
    PKWARE: 10,
    // 11 reserved by PKWARE
    BZIP2: 12,
    // 13 reserved by PKWARE
    LZMA: 14,
    // 15-17 reserved by PKWARE
    IBM_TERSE: 18,
    IBM_LZ77: 19,
    AES_ENCRYPT: 99,
    /* General purpose bit flag */ // values can obtained with expression 2**bitnr
    FLG_ENC: 1,
    FLG_COMP1: 2,
    FLG_COMP2: 4,
    FLG_DESC: 8,
    FLG_ENH: 16,
    FLG_PATCH: 32,
    FLG_STR: 64,
    // Bits 7-10: Currently unused.
    FLG_EFS: 2048,
    // Bit 12: Reserved by PKWARE for enhanced compression.
    // Bit 13: encrypted the Central Directory (patented).
    // Bits 14-15: Reserved by PKWARE.
    FLG_MSK: 4096,
    /* Load type */ FILE: 2,
    BUFFER: 1,
    NONE: 0,
    /* 4.5 Extensible data fields */ EF_ID: 0,
    EF_SIZE: 2,
    /* Header IDs */ ID_ZIP64: 0x0001,
    ID_AVINFO: 0x0007,
    ID_PFS: 0x0008,
    ID_OS2: 0x0009,
    ID_NTFS: 0x000a,
    ID_OPENVMS: 0x000c,
    ID_UNIX: 0x000d,
    ID_FORK: 0x000e,
    ID_PATCH: 0x000f,
    ID_X509_PKCS7: 0x0014,
    ID_X509_CERTID_F: 0x0015,
    ID_X509_CERTID_C: 0x0016,
    ID_STRONGENC: 0x0017,
    ID_RECORD_MGT: 0x0018,
    ID_X509_PKCS7_RL: 0x0019,
    ID_IBM1: 0x0065,
    ID_IBM2: 0x0066,
    ID_POSZIP: 0x4690,
    EF_ZIP64_OR_32: 0xffffffff,
    EF_ZIP64_OR_16: 0xffff,
    EF_ZIP64_SUNCOMP: 0,
    EF_ZIP64_SCOMP: 8,
    EF_ZIP64_RHO: 16,
    EF_ZIP64_DSN: 24
};
}),
"[project]/node_modules/adm-zip/util/errors.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const errors = {
    /* Header error messages */ INVALID_LOC: "Invalid LOC header (bad signature)",
    INVALID_CEN: "Invalid CEN header (bad signature)",
    INVALID_END: "Invalid END header (bad signature)",
    /* Descriptor */ DESCRIPTOR_NOT_EXIST: "No descriptor present",
    DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
    DESCRIPTOR_FAULTY: "Descriptor data is malformed",
    /* ZipEntry error messages*/ NO_DATA: "Nothing to decompress",
    BAD_CRC: "CRC32 checksum failed {0}",
    FILE_IN_THE_WAY: "There is a file in the way: {0}",
    UNKNOWN_METHOD: "Invalid/unsupported compression method",
    /* Inflater error messages */ AVAIL_DATA: "inflate::Available inflate data did not terminate",
    INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
    TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
    INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
    INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
    INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
    INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
    INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
    INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
    INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
    /* ADM-ZIP error messages */ CANT_EXTRACT_FILE: "Could not extract the file",
    CANT_OVERRIDE: "Target file already exists",
    DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
    NO_ZIP: "No zip file was loaded",
    NO_ENTRY: "Entry doesn't exist",
    DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
    FILE_NOT_FOUND: 'File not found: "{0}"',
    NOT_IMPLEMENTED: "Not implemented",
    INVALID_FILENAME: "Invalid filename",
    INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
    INVALID_PASS_PARAM: "Incompatible password parameter",
    WRONG_PASSWORD: "Wrong Password",
    /* ADM-ZIP */ COMMENT_TOO_LONG: "Comment is too long",
    EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
};
// template
function E(message) {
    return function(...args) {
        if (args.length) {
            message = message.replace(/\{(\d)\}/g, (_, n)=>args[n] || '');
        }
        return new Error('ADM-ZIP: ' + message);
    };
}
// Init errors with template
for (const msg of Object.keys(errors)){
    exports[msg] = E(errors[msg]);
}
}),
"[project]/node_modules/adm-zip/util/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const fsystem = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const pth = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const Constants = __turbopack_context__.r("[project]/node_modules/adm-zip/util/constants.js [app-route] (ecmascript)");
const Errors = __turbopack_context__.r("[project]/node_modules/adm-zip/util/errors.js [app-route] (ecmascript)");
const isWin = typeof process === "object" && "win32" === process.platform;
const is_Obj = (obj)=>typeof obj === "object" && obj !== null;
// generate CRC32 lookup table
const crcTable = new Uint32Array(256).map((t, c)=>{
    for(let k = 0; k < 8; k++){
        if ((c & 1) !== 0) {
            c = 0xedb88320 ^ c >>> 1;
        } else {
            c >>>= 1;
        }
    }
    return c >>> 0;
});
// UTILS functions
function Utils(opts) {
    this.sep = pth.sep;
    this.fs = fsystem;
    if (is_Obj(opts)) {
        // custom filesystem
        if (is_Obj(opts.fs) && typeof opts.fs.statSync === "function") {
            this.fs = opts.fs;
        }
    }
}
module.exports = Utils;
// INSTANTIABLE functions
Utils.prototype.makeDir = function(/*String*/ folder) {
    const self = this;
    // Sync - make directories tree
    function mkdirSync(/*String*/ fpath) {
        let resolvedPath = fpath.split(self.sep)[0];
        fpath.split(self.sep).forEach(function(name) {
            if (!name || name.substr(-1, 1) === ":") return;
            resolvedPath += self.sep + name;
            var stat;
            try {
                stat = self.fs.statSync(resolvedPath);
            } catch (e) {
                if (e.message && e.message.startsWith('ENOENT')) {
                    self.fs.mkdirSync(resolvedPath);
                } else {
                    throw e;
                }
            }
            if (stat && stat.isFile()) throw Errors.FILE_IN_THE_WAY(`"${resolvedPath}"`);
        });
    }
    mkdirSync(folder);
};
Utils.prototype.writeFileTo = function(/*String*/ path, /*Buffer*/ content, /*Boolean*/ overwrite, /*Number*/ attr) {
    const self = this;
    if (self.fs.existsSync(path)) {
        if (!overwrite) return false; // cannot overwrite
        var stat = self.fs.statSync(path);
        if (stat.isDirectory()) {
            return false;
        }
    }
    var folder = pth.dirname(path);
    if (!self.fs.existsSync(folder)) {
        self.makeDir(folder);
    }
    var fd;
    try {
        fd = self.fs.openSync(path, "w", 0o666); // 0666
    } catch (e) {
        self.fs.chmodSync(path, 0o666);
        fd = self.fs.openSync(path, "w", 0o666);
    }
    if (fd) {
        try {
            self.fs.writeSync(fd, content, 0, content.length, 0);
        } finally{
            self.fs.closeSync(fd);
        }
    }
    self.fs.chmodSync(path, attr || 0o666);
    return true;
};
Utils.prototype.writeFileToAsync = function(/*String*/ path, /*Buffer*/ content, /*Boolean*/ overwrite, /*Number*/ attr, /*Function*/ callback) {
    if (typeof attr === "function") {
        callback = attr;
        attr = undefined;
    }
    const self = this;
    self.fs.exists(path, function(exist) {
        if (exist && !overwrite) return callback(false);
        self.fs.stat(path, function(err, stat) {
            if (exist && stat.isDirectory()) {
                return callback(false);
            }
            var folder = pth.dirname(path);
            self.fs.exists(folder, function(exists) {
                if (!exists) self.makeDir(folder);
                self.fs.open(path, "w", 0o666, function(err, fd) {
                    if (err) {
                        self.fs.chmod(path, 0o666, function() {
                            self.fs.open(path, "w", 0o666, function(err, fd) {
                                self.fs.write(fd, content, 0, content.length, 0, function() {
                                    self.fs.close(fd, function() {
                                        self.fs.chmod(path, attr || 0o666, function() {
                                            callback(true);
                                        });
                                    });
                                });
                            });
                        });
                    } else if (fd) {
                        self.fs.write(fd, content, 0, content.length, 0, function() {
                            self.fs.close(fd, function() {
                                self.fs.chmod(path, attr || 0o666, function() {
                                    callback(true);
                                });
                            });
                        });
                    } else {
                        self.fs.chmod(path, attr || 0o666, function() {
                            callback(true);
                        });
                    }
                });
            });
        });
    });
};
Utils.prototype.findFiles = function(/*String*/ path) {
    const self = this;
    function findSync(/*String*/ dir, /*RegExp*/ pattern, /*Boolean*/ recursive) {
        if (typeof pattern === "boolean") {
            recursive = pattern;
            pattern = undefined;
        }
        let files = [];
        self.fs.readdirSync(dir).forEach(function(file) {
            const path = pth.join(dir, file);
            const stat = self.fs.statSync(path);
            if (!pattern || pattern.test(path)) {
                files.push(pth.normalize(path) + (stat.isDirectory() ? self.sep : ""));
            }
            if (stat.isDirectory() && recursive) files = files.concat(findSync(path, pattern, recursive));
        });
        return files;
    }
    return findSync(path, undefined, true);
};
/**
 * Callback for showing if everything was done.
 *
 * @callback filelistCallback
 * @param {Error} err - Error object
 * @param {string[]} list - was request fully completed
 */ /**
 *
 * @param {string} dir
 * @param {filelistCallback} cb
 */ Utils.prototype.findFilesAsync = function(dir, cb) {
    const self = this;
    let results = [];
    self.fs.readdir(dir, function(err, list) {
        if (err) return cb(err);
        let list_length = list.length;
        if (!list_length) return cb(null, results);
        list.forEach(function(file) {
            file = pth.join(dir, file);
            self.fs.stat(file, function(err, stat) {
                if (err) return cb(err);
                if (stat) {
                    results.push(pth.normalize(file) + (stat.isDirectory() ? self.sep : ""));
                    if (stat.isDirectory()) {
                        self.findFilesAsync(file, function(err, res) {
                            if (err) return cb(err);
                            results = results.concat(res);
                            if (!--list_length) cb(null, results);
                        });
                    } else {
                        if (!--list_length) cb(null, results);
                    }
                }
            });
        });
    });
};
Utils.prototype.getAttributes = function() {};
Utils.prototype.setAttributes = function() {};
// STATIC functions
// crc32 single update (it is part of crc32)
Utils.crc32update = function(crc, byte) {
    return crcTable[(crc ^ byte) & 0xff] ^ crc >>> 8;
};
Utils.crc32 = function(buf) {
    if (typeof buf === "string") {
        buf = Buffer.from(buf, "utf8");
    }
    let len = buf.length;
    let crc = ~0;
    for(let off = 0; off < len;)crc = Utils.crc32update(crc, buf[off++]);
    // xor and cast as uint32 number
    return ~crc >>> 0;
};
Utils.methodToString = function(/*Number*/ method) {
    switch(method){
        case Constants.STORED:
            return "STORED (" + method + ")";
        case Constants.DEFLATED:
            return "DEFLATED (" + method + ")";
        default:
            return "UNSUPPORTED (" + method + ")";
    }
};
/**
 * removes ".." style path elements
 * @param {string} path - fixable path
 * @returns string - fixed filepath
 */ Utils.canonical = function(/*string*/ path) {
    if (!path) return "";
    // trick normalize think path is absolute
    const safeSuffix = pth.posix.normalize("/" + path.split("\\").join("/"));
    return pth.join(".", safeSuffix);
};
/**
 * fix file names in achive
 * @param {string} path - fixable path
 * @returns string - fixed filepath
 */ Utils.zipnamefix = function(path) {
    if (!path) return "";
    // trick normalize think path is absolute
    const safeSuffix = pth.posix.normalize("/" + path.split("\\").join("/"));
    return pth.posix.join(".", safeSuffix);
};
/**
 *
 * @param {Array} arr
 * @param {function} callback
 * @returns
 */ Utils.findLast = function(arr, callback) {
    if (!Array.isArray(arr)) throw new TypeError("arr is not array");
    const len = arr.length >>> 0;
    for(let i = len - 1; i >= 0; i--){
        if (callback(arr[i], i, arr)) {
            return arr[i];
        }
    }
    return void 0;
};
// make abolute paths taking prefix as root folder
Utils.sanitize = function(/*string*/ prefix, /*string*/ name) {
    prefix = pth.resolve(pth.normalize(prefix));
    var parts = name.split("/");
    for(var i = 0, l = parts.length; i < l; i++){
        var path = pth.normalize(pth.join(prefix, parts.slice(i, l).join(pth.sep)));
        if (path.indexOf(prefix) === 0) {
            return path;
        }
    }
    return pth.normalize(pth.join(prefix, pth.basename(name)));
};
// converts buffer, Uint8Array, string types to buffer
Utils.toBuffer = function toBuffer(/*buffer, Uint8Array, string*/ input, /* function */ encoder) {
    if (Buffer.isBuffer(input)) {
        return input;
    } else if (input instanceof Uint8Array) {
        return Buffer.from(input);
    } else {
        // expect string all other values are invalid and return empty buffer
        return typeof input === "string" ? encoder(input) : Buffer.alloc(0);
    }
};
Utils.readBigUInt64LE = function(/*Buffer*/ buffer, /*int*/ index) {
    const lo = buffer.readUInt32LE(index);
    const hi = buffer.readUInt32LE(index + 4);
    return hi * 0x100000000 + lo;
};
Utils.fromDOS2Date = function(val) {
    return new Date((val >> 25 & 0x7f) + 1980, Math.max((val >> 21 & 0x0f) - 1, 0), Math.max(val >> 16 & 0x1f, 1), val >> 11 & 0x1f, val >> 5 & 0x3f, (val & 0x1f) << 1);
};
Utils.fromDate2DOS = function(val) {
    let date = 0;
    let time = 0;
    if (val.getFullYear() > 1979) {
        date = (val.getFullYear() - 1980 & 0x7f) << 9 | val.getMonth() + 1 << 5 | val.getDate();
        time = val.getHours() << 11 | val.getMinutes() << 5 | val.getSeconds() >> 1;
    }
    return date << 16 | time;
};
Utils.isWin = isWin; // Do we have windows system
Utils.crcTable = crcTable;
}),
"[project]/node_modules/adm-zip/util/fattr.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const pth = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
module.exports = function(/*String*/ path, /*Utils object*/ { fs }) {
    var _path = path || "", _obj = newAttr(), _stat = null;
    function newAttr() {
        return {
            directory: false,
            readonly: false,
            hidden: false,
            executable: false,
            mtime: 0,
            atime: 0
        };
    }
    if (_path && fs.existsSync(_path)) {
        _stat = fs.statSync(_path);
        _obj.directory = _stat.isDirectory();
        _obj.mtime = _stat.mtime;
        _obj.atime = _stat.atime;
        _obj.executable = (0o111 & _stat.mode) !== 0; // file is executable who ever har right not just owner
        _obj.readonly = (0o200 & _stat.mode) === 0; // readonly if owner has no write right
        _obj.hidden = pth.basename(_path)[0] === ".";
    } else {
        console.warn("Invalid path: " + _path);
    }
    return {
        get directory () {
            return _obj.directory;
        },
        get readOnly () {
            return _obj.readonly;
        },
        get hidden () {
            return _obj.hidden;
        },
        get mtime () {
            return _obj.mtime;
        },
        get atime () {
            return _obj.atime;
        },
        get executable () {
            return _obj.executable;
        },
        decodeAttributes: function() {},
        encodeAttributes: function() {},
        toJSON: function() {
            return {
                path: _path,
                isDirectory: _obj.directory,
                isReadOnly: _obj.readonly,
                isHidden: _obj.hidden,
                isExecutable: _obj.executable,
                mTime: _obj.mtime,
                aTime: _obj.atime
            };
        },
        toString: function() {
            return JSON.stringify(this.toJSON(), null, "\t");
        }
    };
};
}),
"[project]/node_modules/adm-zip/util/decoder.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    efs: true,
    encode: (data)=>Buffer.from(data, "utf8"),
    decode: (data)=>data.toString("utf8")
};
}),
"[project]/node_modules/adm-zip/util/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/adm-zip/util/utils.js [app-route] (ecmascript)");
module.exports.Constants = __turbopack_context__.r("[project]/node_modules/adm-zip/util/constants.js [app-route] (ecmascript)");
module.exports.Errors = __turbopack_context__.r("[project]/node_modules/adm-zip/util/errors.js [app-route] (ecmascript)");
module.exports.FileAttr = __turbopack_context__.r("[project]/node_modules/adm-zip/util/fattr.js [app-route] (ecmascript)");
module.exports.decoder = __turbopack_context__.r("[project]/node_modules/adm-zip/util/decoder.js [app-route] (ecmascript)");
}),
"[project]/node_modules/adm-zip/headers/entryHeader.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Utils = __turbopack_context__.r("[project]/node_modules/adm-zip/util/index.js [app-route] (ecmascript)"), Constants = Utils.Constants;
/* The central directory file header */ module.exports = function() {
    var _verMade = 20, _version = 10, _flags = 0, _method = 0, _time = 0, _crc = 0, _compressedSize = 0, _size = 0, _fnameLen = 0, _extraLen = 0, _comLen = 0, _diskStart = 0, _inattr = 0, _attr = 0, _offset = 0;
    _verMade |= Utils.isWin ? 0x0a00 : 0x0300;
    // Set EFS flag since filename and comment fields are all by default encoded using UTF-8.
    // Without it file names may be corrupted for other apps when file names use unicode chars
    _flags |= Constants.FLG_EFS;
    const _localHeader = {
        extraLen: 0
    };
    // casting
    const uint32 = (val1)=>Math.max(0, val1) >>> 0;
    const uint16 = (val1)=>Math.max(0, val1) & 0xffff;
    const uint8 = (val1)=>Math.max(0, val1) & 0xff;
    _time = Utils.fromDate2DOS(new Date());
    return {
        get made () {
            return _verMade;
        },
        set made (val){
            _verMade = val;
        },
        get version () {
            return _version;
        },
        set version (val){
            _version = val;
        },
        get flags () {
            return _flags;
        },
        set flags (val){
            _flags = val;
        },
        get flags_efs () {
            return (_flags & Constants.FLG_EFS) > 0;
        },
        set flags_efs (val){
            if (val) {
                _flags |= Constants.FLG_EFS;
            } else {
                _flags &= ~Constants.FLG_EFS;
            }
        },
        get flags_desc () {
            return (_flags & Constants.FLG_DESC) > 0;
        },
        set flags_desc (val){
            if (val) {
                _flags |= Constants.FLG_DESC;
            } else {
                _flags &= ~Constants.FLG_DESC;
            }
        },
        get method () {
            return _method;
        },
        set method (val){
            switch(val){
                case Constants.STORED:
                    this.version = 10;
                case Constants.DEFLATED:
                default:
                    this.version = 20;
            }
            _method = val;
        },
        get time () {
            return Utils.fromDOS2Date(this.timeval);
        },
        set time (val){
            val = new Date(val);
            this.timeval = Utils.fromDate2DOS(val);
        },
        get timeval () {
            return _time;
        },
        set timeval (val){
            _time = uint32(val);
        },
        get timeHighByte () {
            return uint8(_time >>> 8);
        },
        get crc () {
            return _crc;
        },
        set crc (val){
            _crc = uint32(val);
        },
        get compressedSize () {
            return _compressedSize;
        },
        set compressedSize (val){
            _compressedSize = uint32(val);
        },
        get size () {
            return _size;
        },
        set size (val){
            _size = uint32(val);
        },
        get fileNameLength () {
            return _fnameLen;
        },
        set fileNameLength (val){
            _fnameLen = val;
        },
        get extraLength () {
            return _extraLen;
        },
        set extraLength (val){
            _extraLen = val;
        },
        get extraLocalLength () {
            return _localHeader.extraLen;
        },
        set extraLocalLength (val){
            _localHeader.extraLen = val;
        },
        get commentLength () {
            return _comLen;
        },
        set commentLength (val){
            _comLen = val;
        },
        get diskNumStart () {
            return _diskStart;
        },
        set diskNumStart (val){
            _diskStart = uint32(val);
        },
        get inAttr () {
            return _inattr;
        },
        set inAttr (val){
            _inattr = uint32(val);
        },
        get attr () {
            return _attr;
        },
        set attr (val){
            _attr = uint32(val);
        },
        // get Unix file permissions
        get fileAttr () {
            return (_attr || 0) >> 16 & 0xfff;
        },
        get offset () {
            return _offset;
        },
        set offset (val){
            _offset = uint32(val);
        },
        get encrypted () {
            return (_flags & Constants.FLG_ENC) === Constants.FLG_ENC;
        },
        get centralHeaderSize () {
            return Constants.CENHDR + _fnameLen + _extraLen + _comLen;
        },
        get realDataOffset () {
            return _offset + Constants.LOCHDR + _localHeader.fnameLen + _localHeader.extraLen;
        },
        get localHeader () {
            return _localHeader;
        },
        loadLocalHeaderFromBinary: function(/*Buffer*/ input) {
            var data = input.slice(_offset, _offset + Constants.LOCHDR);
            // 30 bytes and should start with "PK\003\004"
            if (data.readUInt32LE(0) !== Constants.LOCSIG) {
                throw Utils.Errors.INVALID_LOC();
            }
            // version needed to extract
            _localHeader.version = data.readUInt16LE(Constants.LOCVER);
            // general purpose bit flag
            _localHeader.flags = data.readUInt16LE(Constants.LOCFLG);
            // desc flag
            _localHeader.flags_desc = (_localHeader.flags & Constants.FLG_DESC) > 0;
            // compression method
            _localHeader.method = data.readUInt16LE(Constants.LOCHOW);
            // modification time (2 bytes time, 2 bytes date)
            _localHeader.time = data.readUInt32LE(Constants.LOCTIM);
            // uncompressed file crc-32 valu
            _localHeader.crc = data.readUInt32LE(Constants.LOCCRC);
            // compressed size
            _localHeader.compressedSize = data.readUInt32LE(Constants.LOCSIZ);
            // uncompressed size
            _localHeader.size = data.readUInt32LE(Constants.LOCLEN);
            // filename length
            _localHeader.fnameLen = data.readUInt16LE(Constants.LOCNAM);
            // extra field length
            _localHeader.extraLen = data.readUInt16LE(Constants.LOCEXT);
            // read extra data
            const extraStart = _offset + Constants.LOCHDR + _localHeader.fnameLen;
            const extraEnd = extraStart + _localHeader.extraLen;
            return input.slice(extraStart, extraEnd);
        },
        loadFromBinary: function(/*Buffer*/ data) {
            // data should be 46 bytes and start with "PK 01 02"
            if (data.length !== Constants.CENHDR || data.readUInt32LE(0) !== Constants.CENSIG) {
                throw Utils.Errors.INVALID_CEN();
            }
            // version made by
            _verMade = data.readUInt16LE(Constants.CENVEM);
            // version needed to extract
            _version = data.readUInt16LE(Constants.CENVER);
            // encrypt, decrypt flags
            _flags = data.readUInt16LE(Constants.CENFLG);
            // compression method
            _method = data.readUInt16LE(Constants.CENHOW);
            // modification time (2 bytes time, 2 bytes date)
            _time = data.readUInt32LE(Constants.CENTIM);
            // uncompressed file crc-32 value
            _crc = data.readUInt32LE(Constants.CENCRC);
            // compressed size
            _compressedSize = data.readUInt32LE(Constants.CENSIZ);
            // uncompressed size
            _size = data.readUInt32LE(Constants.CENLEN);
            // filename length
            _fnameLen = data.readUInt16LE(Constants.CENNAM);
            // extra field length
            _extraLen = data.readUInt16LE(Constants.CENEXT);
            // file comment length
            _comLen = data.readUInt16LE(Constants.CENCOM);
            // volume number start
            _diskStart = data.readUInt16LE(Constants.CENDSK);
            // internal file attributes
            _inattr = data.readUInt16LE(Constants.CENATT);
            // external file attributes
            _attr = data.readUInt32LE(Constants.CENATX);
            // LOC header offset
            _offset = data.readUInt32LE(Constants.CENOFF);
        },
        localHeaderToBinary: function() {
            // LOC header size (30 bytes)
            var data = Buffer.alloc(Constants.LOCHDR);
            // "PK\003\004"
            data.writeUInt32LE(Constants.LOCSIG, 0);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.LOCVER);
            // general purpose bit flag
            data.writeUInt16LE(_flags, Constants.LOCFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.LOCHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.LOCTIM);
            // uncompressed file crc-32 value
            data.writeUInt32LE(_crc, Constants.LOCCRC);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.LOCSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.LOCLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.LOCNAM);
            // extra field length
            data.writeUInt16LE(_localHeader.extraLen, Constants.LOCEXT);
            return data;
        },
        centralHeaderToBinary: function() {
            // CEN header size (46 bytes)
            var data = Buffer.alloc(Constants.CENHDR + _fnameLen + _extraLen + _comLen);
            // "PK\001\002"
            data.writeUInt32LE(Constants.CENSIG, 0);
            // version made by
            data.writeUInt16LE(_verMade, Constants.CENVEM);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.CENVER);
            // encrypt, decrypt flags
            data.writeUInt16LE(_flags, Constants.CENFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.CENHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.CENTIM);
            // uncompressed file crc-32 value
            data.writeUInt32LE(_crc, Constants.CENCRC);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.CENSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.CENLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.CENNAM);
            // extra field length
            data.writeUInt16LE(_extraLen, Constants.CENEXT);
            // file comment length
            data.writeUInt16LE(_comLen, Constants.CENCOM);
            // volume number start
            data.writeUInt16LE(_diskStart, Constants.CENDSK);
            // internal file attributes
            data.writeUInt16LE(_inattr, Constants.CENATT);
            // external file attributes
            data.writeUInt32LE(_attr, Constants.CENATX);
            // LOC header offset
            data.writeUInt32LE(_offset, Constants.CENOFF);
            return data;
        },
        toJSON: function() {
            const bytes = function(nr) {
                return nr + " bytes";
            };
            return {
                made: _verMade,
                version: _version,
                flags: _flags,
                method: Utils.methodToString(_method),
                time: this.time,
                crc: "0x" + _crc.toString(16).toUpperCase(),
                compressedSize: bytes(_compressedSize),
                size: bytes(_size),
                fileNameLength: bytes(_fnameLen),
                extraLength: bytes(_extraLen),
                commentLength: bytes(_comLen),
                diskNumStart: _diskStart,
                inAttr: _inattr,
                attr: _attr,
                offset: _offset,
                centralHeaderSize: bytes(Constants.CENHDR + _fnameLen + _extraLen + _comLen)
            };
        },
        toString: function() {
            return JSON.stringify(this.toJSON(), null, "\t");
        }
    };
};
}),
"[project]/node_modules/adm-zip/headers/mainHeader.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Utils = __turbopack_context__.r("[project]/node_modules/adm-zip/util/index.js [app-route] (ecmascript)"), Constants = Utils.Constants;
/* The entries in the end of central directory */ module.exports = function() {
    var _volumeEntries = 0, _totalEntries = 0, _size = 0, _offset = 0, _commentLength = 0;
    return {
        get diskEntries () {
            return _volumeEntries;
        },
        set diskEntries (/*Number*/ val){
            _volumeEntries = _totalEntries = val;
        },
        get totalEntries () {
            return _totalEntries;
        },
        set totalEntries (/*Number*/ val){
            _totalEntries = _volumeEntries = val;
        },
        get size () {
            return _size;
        },
        set size (/*Number*/ val){
            _size = val;
        },
        get offset () {
            return _offset;
        },
        set offset (/*Number*/ val){
            _offset = val;
        },
        get commentLength () {
            return _commentLength;
        },
        set commentLength (/*Number*/ val){
            _commentLength = val;
        },
        get mainHeaderSize () {
            return Constants.ENDHDR + _commentLength;
        },
        loadFromBinary: function(/*Buffer*/ data) {
            // data should be 22 bytes and start with "PK 05 06"
            // or be 56+ bytes and start with "PK 06 06" for Zip64
            if ((data.length !== Constants.ENDHDR || data.readUInt32LE(0) !== Constants.ENDSIG) && (data.length < Constants.ZIP64HDR || data.readUInt32LE(0) !== Constants.ZIP64SIG)) {
                throw Utils.Errors.INVALID_END();
            }
            if (data.readUInt32LE(0) === Constants.ENDSIG) {
                // number of entries on this volume
                _volumeEntries = data.readUInt16LE(Constants.ENDSUB);
                // total number of entries
                _totalEntries = data.readUInt16LE(Constants.ENDTOT);
                // central directory size in bytes
                _size = data.readUInt32LE(Constants.ENDSIZ);
                // offset of first CEN header
                _offset = data.readUInt32LE(Constants.ENDOFF);
                // zip file comment length
                _commentLength = data.readUInt16LE(Constants.ENDCOM);
            } else {
                // number of entries on this volume
                _volumeEntries = Utils.readBigUInt64LE(data, Constants.ZIP64SUB);
                // total number of entries
                _totalEntries = Utils.readBigUInt64LE(data, Constants.ZIP64TOT);
                // central directory size in bytes
                _size = Utils.readBigUInt64LE(data, Constants.ZIP64SIZE);
                // offset of first CEN header
                _offset = Utils.readBigUInt64LE(data, Constants.ZIP64OFF);
                _commentLength = 0;
            }
        },
        toBinary: function() {
            var b = Buffer.alloc(Constants.ENDHDR + _commentLength);
            // "PK 05 06" signature
            b.writeUInt32LE(Constants.ENDSIG, 0);
            b.writeUInt32LE(0, 4);
            // number of entries on this volume
            b.writeUInt16LE(_volumeEntries, Constants.ENDSUB);
            // total number of entries
            b.writeUInt16LE(_totalEntries, Constants.ENDTOT);
            // central directory size in bytes
            b.writeUInt32LE(_size, Constants.ENDSIZ);
            // offset of first CEN header
            b.writeUInt32LE(_offset, Constants.ENDOFF);
            // zip file comment length
            b.writeUInt16LE(_commentLength, Constants.ENDCOM);
            // fill comment memory with spaces so no garbage is left there
            b.fill(" ", Constants.ENDHDR);
            return b;
        },
        toJSON: function() {
            // creates 0x0000 style output
            const offset = function(nr, len) {
                let offs = nr.toString(16).toUpperCase();
                while(offs.length < len)offs = "0" + offs;
                return "0x" + offs;
            };
            return {
                diskEntries: _volumeEntries,
                totalEntries: _totalEntries,
                size: _size + " bytes",
                offset: offset(_offset, 4),
                commentLength: _commentLength
            };
        },
        toString: function() {
            return JSON.stringify(this.toJSON(), null, "\t");
        }
    };
}; // Misspelled
}),
"[project]/node_modules/adm-zip/headers/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

exports.EntryHeader = __turbopack_context__.r("[project]/node_modules/adm-zip/headers/entryHeader.js [app-route] (ecmascript)");
exports.MainHeader = __turbopack_context__.r("[project]/node_modules/adm-zip/headers/mainHeader.js [app-route] (ecmascript)");
}),
"[project]/node_modules/adm-zip/methods/deflater.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = function(/*Buffer*/ inbuf) {
    var zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
    var opts = {
        chunkSize: (parseInt(inbuf.length / 1024) + 1) * 1024
    };
    return {
        deflate: function() {
            return zlib.deflateRawSync(inbuf, opts);
        },
        deflateAsync: function(/*Function*/ callback) {
            var tmp = zlib.createDeflateRaw(opts), parts = [], total = 0;
            tmp.on("data", function(data) {
                parts.push(data);
                total += data.length;
            });
            tmp.on("end", function() {
                var buf = Buffer.alloc(total), written = 0;
                buf.fill(0);
                for(var i = 0; i < parts.length; i++){
                    var part = parts[i];
                    part.copy(buf, written);
                    written += part.length;
                }
                callback && callback(buf);
            });
            tmp.end(inbuf);
        }
    };
};
}),
"[project]/node_modules/adm-zip/methods/inflater.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const version = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
module.exports = function(/*Buffer*/ inbuf, /*number*/ expectedLength) {
    var zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
    const option = version >= 15 && expectedLength > 0 ? {
        maxOutputLength: expectedLength
    } : {};
    return {
        inflate: function() {
            return zlib.inflateRawSync(inbuf, option);
        },
        inflateAsync: function(/*Function*/ callback) {
            var tmp = zlib.createInflateRaw(option), parts = [], total = 0;
            tmp.on("data", function(data) {
                parts.push(data);
                total += data.length;
            });
            tmp.on("end", function() {
                var buf = Buffer.alloc(total), written = 0;
                buf.fill(0);
                for(var i = 0; i < parts.length; i++){
                    var part = parts[i];
                    part.copy(buf, written);
                    written += part.length;
                }
                callback && callback(buf);
            });
            tmp.end(inbuf);
        }
    };
};
}),
"[project]/node_modules/adm-zip/methods/zipcrypto.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// node crypt, we use it for generate salt
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { randomFillSync } = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const Errors = __turbopack_context__.r("[project]/node_modules/adm-zip/util/errors.js [app-route] (ecmascript)");
// generate CRC32 lookup table
const crctable = new Uint32Array(256).map((t, crc)=>{
    for(let j = 0; j < 8; j++){
        if (0 !== (crc & 1)) {
            crc = crc >>> 1 ^ 0xedb88320;
        } else {
            crc >>>= 1;
        }
    }
    return crc >>> 0;
});
// C-style uInt32 Multiply (discards higher bits, when JS multiply discards lower bits)
const uMul = (a, b)=>Math.imul(a, b) >>> 0;
// crc32 byte single update (actually same function is part of utils.crc32 function :) )
const crc32update = (pCrc32, bval)=>{
    return crctable[(pCrc32 ^ bval) & 0xff] ^ pCrc32 >>> 8;
};
// function for generating salt for encrytion header
const genSalt = ()=>{
    if ("function" === typeof randomFillSync) {
        return randomFillSync(Buffer.alloc(12));
    } else {
        // fallback if function is not defined
        return genSalt.node();
    }
};
// salt generation with node random function (mainly as fallback)
genSalt.node = ()=>{
    const salt = Buffer.alloc(12);
    const len = salt.length;
    for(let i = 0; i < len; i++)salt[i] = Math.random() * 256 & 0xff;
    return salt;
};
// general config
const config = {
    genSalt
};
// Class Initkeys handles same basic ops with keys
function Initkeys(pw) {
    const pass = Buffer.isBuffer(pw) ? pw : Buffer.from(pw);
    this.keys = new Uint32Array([
        0x12345678,
        0x23456789,
        0x34567890
    ]);
    for(let i = 0; i < pass.length; i++){
        this.updateKeys(pass[i]);
    }
}
Initkeys.prototype.updateKeys = function(byteValue) {
    const keys = this.keys;
    keys[0] = crc32update(keys[0], byteValue);
    keys[1] += keys[0] & 0xff;
    keys[1] = uMul(keys[1], 134775813) + 1;
    keys[2] = crc32update(keys[2], keys[1] >>> 24);
    return byteValue;
};
Initkeys.prototype.next = function() {
    const k = (this.keys[2] | 2) >>> 0; // key
    return uMul(k, k ^ 1) >> 8 & 0xff; // decode
};
function make_decrypter(/*Buffer*/ pwd) {
    // 1. Stage initialize key
    const keys = new Initkeys(pwd);
    // return decrypter function
    return function(/*Buffer*/ data) {
        // result - we create new Buffer for results
        const result = Buffer.alloc(data.length);
        let pos = 0;
        // process input data
        for (let c of data){
            //c ^= keys.next();
            //result[pos++] = c; // decode & Save Value
            result[pos++] = keys.updateKeys(c ^ keys.next()); // update keys with decoded byte
        }
        return result;
    };
}
function make_encrypter(/*Buffer*/ pwd) {
    // 1. Stage initialize key
    const keys = new Initkeys(pwd);
    // return encrypting function, result and pos is here so we dont have to merge buffers later
    return function(/*Buffer*/ data, /*Buffer*/ result, /* Number */ pos = 0) {
        // result - we create new Buffer for results
        if (!result) result = Buffer.alloc(data.length);
        // process input data
        for (let c of data){
            const k = keys.next(); // save key byte
            result[pos++] = c ^ k; // save val
            keys.updateKeys(c); // update keys with decoded byte
        }
        return result;
    };
}
function decrypt(/*Buffer*/ data, /*Object*/ header, /*String, Buffer*/ pwd) {
    if (!data || !Buffer.isBuffer(data) || data.length < 12) {
        return Buffer.alloc(0);
    }
    // 1. We Initialize and generate decrypting function
    const decrypter = make_decrypter(pwd);
    // 2. decrypt salt what is always 12 bytes and is a part of file content
    const salt = decrypter(data.slice(0, 12));
    // if bit 3 (0x08) of the general-purpose flags field is set, check salt[11] with the high byte of the header time
    // 2 byte data block (as per Info-Zip spec), otherwise check with the high byte of the header entry
    const verifyByte = (header.flags & 0x8) === 0x8 ? header.timeHighByte : header.crc >>> 24;
    //3. does password meet expectations
    if (salt[11] !== verifyByte) {
        throw Errors.WRONG_PASSWORD();
    }
    // 4. decode content
    return decrypter(data.slice(12));
}
// lets add way to populate salt, NOT RECOMMENDED for production but maybe useful for testing general functionality
function _salter(data) {
    if (Buffer.isBuffer(data) && data.length >= 12) {
        // be aware - currently salting buffer data is modified
        config.genSalt = function() {
            return data.slice(0, 12);
        };
    } else if (data === "node") {
        // test salt generation with node random function
        config.genSalt = genSalt.node;
    } else {
        // if value is not acceptable config gets reset.
        config.genSalt = genSalt;
    }
}
function encrypt(/*Buffer*/ data, /*Object*/ header, /*String, Buffer*/ pwd, /*Boolean*/ oldlike = false) {
    // 1. test data if data is not Buffer we make buffer from it
    if (data == null) data = Buffer.alloc(0);
    // if data is not buffer be make buffer from it
    if (!Buffer.isBuffer(data)) data = Buffer.from(data.toString());
    // 2. We Initialize and generate encrypting function
    const encrypter = make_encrypter(pwd);
    // 3. generate salt (12-bytes of random data)
    const salt = config.genSalt();
    salt[11] = header.crc >>> 24 & 0xff;
    // old implementations (before PKZip 2.04g) used two byte check
    if (oldlike) salt[10] = header.crc >>> 16 & 0xff;
    // 4. create output
    const result = Buffer.alloc(data.length + 12);
    encrypter(salt, result);
    // finally encode content
    return encrypter(data, result, 12);
}
module.exports = {
    decrypt,
    encrypt,
    _salter
};
}),
"[project]/node_modules/adm-zip/methods/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

exports.Deflater = __turbopack_context__.r("[project]/node_modules/adm-zip/methods/deflater.js [app-route] (ecmascript)");
exports.Inflater = __turbopack_context__.r("[project]/node_modules/adm-zip/methods/inflater.js [app-route] (ecmascript)");
exports.ZipCrypto = __turbopack_context__.r("[project]/node_modules/adm-zip/methods/zipcrypto.js [app-route] (ecmascript)");
}),
"[project]/node_modules/adm-zip/zipEntry.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Utils = __turbopack_context__.r("[project]/node_modules/adm-zip/util/index.js [app-route] (ecmascript)"), Headers = __turbopack_context__.r("[project]/node_modules/adm-zip/headers/index.js [app-route] (ecmascript)"), Constants = Utils.Constants, Methods = __turbopack_context__.r("[project]/node_modules/adm-zip/methods/index.js [app-route] (ecmascript)");
module.exports = function(/** object */ options, /*Buffer*/ input) {
    var _centralHeader = new Headers.EntryHeader(), _entryName = Buffer.alloc(0), _comment = Buffer.alloc(0), _isDirectory = false, uncompressedData = null, _extra = Buffer.alloc(0), _extralocal = Buffer.alloc(0), _efs = true;
    // assign options
    const opts = options;
    const decoder = typeof opts.decoder === "object" ? opts.decoder : Utils.decoder;
    _efs = decoder.hasOwnProperty("efs") ? decoder.efs : false;
    function getCompressedDataFromZip() {
        //if (!input || !Buffer.isBuffer(input)) {
        if (!input || !(input instanceof Uint8Array)) {
            return Buffer.alloc(0);
        }
        _extralocal = _centralHeader.loadLocalHeaderFromBinary(input);
        return input.slice(_centralHeader.realDataOffset, _centralHeader.realDataOffset + _centralHeader.compressedSize);
    }
    function crc32OK(data1) {
        // if bit 3 (0x08) of the general-purpose flags field is set, then the CRC-32 and file sizes are not known when the local header is written
        if (!_centralHeader.flags_desc && !_centralHeader.localHeader.flags_desc) {
            if (Utils.crc32(data1) !== _centralHeader.localHeader.crc) {
                return false;
            }
        } else {
            const descriptor = {};
            const dataEndOffset = _centralHeader.realDataOffset + _centralHeader.compressedSize;
            // no descriptor after compressed data, instead new local header
            if (input.readUInt32LE(dataEndOffset) == Constants.LOCSIG || input.readUInt32LE(dataEndOffset) == Constants.CENSIG) {
                throw Utils.Errors.DESCRIPTOR_NOT_EXIST();
            }
            // get decriptor data
            if (input.readUInt32LE(dataEndOffset) == Constants.EXTSIG) {
                // descriptor with signature
                descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC);
                descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ);
                descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN);
            } else if (input.readUInt16LE(dataEndOffset + 12) === 0x4b50) {
                // descriptor without signature (we check is new header starting where we expect)
                descriptor.crc = input.readUInt32LE(dataEndOffset + Constants.EXTCRC - 4);
                descriptor.compressedSize = input.readUInt32LE(dataEndOffset + Constants.EXTSIZ - 4);
                descriptor.size = input.readUInt32LE(dataEndOffset + Constants.EXTLEN - 4);
            } else {
                throw Utils.Errors.DESCRIPTOR_UNKNOWN();
            }
            // check data integrity
            if (descriptor.compressedSize !== _centralHeader.compressedSize || descriptor.size !== _centralHeader.size || descriptor.crc !== _centralHeader.crc) {
                throw Utils.Errors.DESCRIPTOR_FAULTY();
            }
            if (Utils.crc32(data1) !== descriptor.crc) {
                return false;
            }
        // @TODO: zip64 bit descriptor fields
        // if bit 3 is set and any value in local header "zip64 Extended information" extra field are set 0 (place holder)
        // then 64-bit descriptor format is used instead of 32-bit
        // central header - "zip64 Extended information" extra field should store real values and not place holders
        }
        return true;
    }
    function decompress(/*Boolean*/ async, /*Function*/ callback, /*String, Buffer*/ pass) {
        if (typeof callback === "undefined" && typeof async === "string") {
            pass = async;
            async = void 0;
        }
        if (_isDirectory) {
            if (async && callback) {
                callback(Buffer.alloc(0), Utils.Errors.DIRECTORY_CONTENT_ERROR()); //si added error.
            }
            return Buffer.alloc(0);
        }
        var compressedData = getCompressedDataFromZip();
        if (compressedData.length === 0) {
            // File is empty, nothing to decompress.
            if (async && callback) callback(compressedData);
            return compressedData;
        }
        if (_centralHeader.encrypted) {
            if ("string" !== typeof pass && !Buffer.isBuffer(pass)) {
                throw Utils.Errors.INVALID_PASS_PARAM();
            }
            compressedData = Methods.ZipCrypto.decrypt(compressedData, _centralHeader, pass);
        }
        var data1 = Buffer.alloc(_centralHeader.size);
        switch(_centralHeader.method){
            case Utils.Constants.STORED:
                compressedData.copy(data1);
                if (!crc32OK(data1)) {
                    if (async && callback) callback(data1, Utils.Errors.BAD_CRC()); //si added error
                    throw Utils.Errors.BAD_CRC();
                } else {
                    //si added otherwise did not seem to return data.
                    if (async && callback) callback(data1);
                    return data1;
                }
            case Utils.Constants.DEFLATED:
                var inflater = new Methods.Inflater(compressedData, _centralHeader.size);
                if (!async) {
                    const result = inflater.inflate(data1);
                    result.copy(data1, 0);
                    if (!crc32OK(data1)) {
                        throw Utils.Errors.BAD_CRC(`"${decoder.decode(_entryName)}"`);
                    }
                    return data1;
                } else {
                    inflater.inflateAsync(function(result) {
                        result.copy(result, 0);
                        if (callback) {
                            if (!crc32OK(result)) {
                                callback(result, Utils.Errors.BAD_CRC()); //si added error
                            } else {
                                callback(result);
                            }
                        }
                    });
                }
                break;
            default:
                if (async && callback) callback(Buffer.alloc(0), Utils.Errors.UNKNOWN_METHOD());
                throw Utils.Errors.UNKNOWN_METHOD();
        }
    }
    function compress(/*Boolean*/ async, /*Function*/ callback) {
        if ((!uncompressedData || !uncompressedData.length) && Buffer.isBuffer(input)) {
            // no data set or the data wasn't changed to require recompression
            if (async && callback) callback(getCompressedDataFromZip());
            return getCompressedDataFromZip();
        }
        if (uncompressedData.length && !_isDirectory) {
            var compressedData;
            // Local file header
            switch(_centralHeader.method){
                case Utils.Constants.STORED:
                    _centralHeader.compressedSize = _centralHeader.size;
                    compressedData = Buffer.alloc(uncompressedData.length);
                    uncompressedData.copy(compressedData);
                    if (async && callback) callback(compressedData);
                    return compressedData;
                default:
                case Utils.Constants.DEFLATED:
                    var deflater = new Methods.Deflater(uncompressedData);
                    if (!async) {
                        var deflated = deflater.deflate();
                        _centralHeader.compressedSize = deflated.length;
                        return deflated;
                    } else {
                        deflater.deflateAsync(function(data1) {
                            compressedData = Buffer.alloc(data1.length);
                            _centralHeader.compressedSize = data1.length;
                            data1.copy(compressedData);
                            callback && callback(compressedData);
                        });
                    }
                    deflater = null;
                    break;
            }
        } else if (async && callback) {
            callback(Buffer.alloc(0));
        } else {
            return Buffer.alloc(0);
        }
    }
    function readUInt64LE(buffer, offset) {
        return Utils.readBigUInt64LE(buffer, offset);
    }
    function parseExtra(data1) {
        try {
            var offset = 0;
            var signature, size, part;
            while(offset + 4 < data1.length){
                signature = data1.readUInt16LE(offset);
                offset += 2;
                size = data1.readUInt16LE(offset);
                offset += 2;
                part = data1.slice(offset, offset + size);
                offset += size;
                if (Constants.ID_ZIP64 === signature) {
                    parseZip64ExtendedInformation(part);
                }
            }
        } catch (error) {
            throw Utils.Errors.EXTRA_FIELD_PARSE_ERROR();
        }
    }
    //Override header field values with values from the ZIP64 extra field
    function parseZip64ExtendedInformation(data1) {
        var size, compressedSize, offset, diskNumStart;
        if (data1.length >= Constants.EF_ZIP64_SCOMP) {
            size = readUInt64LE(data1, Constants.EF_ZIP64_SUNCOMP);
            if (_centralHeader.size === Constants.EF_ZIP64_OR_32) {
                _centralHeader.size = size;
            }
        }
        if (data1.length >= Constants.EF_ZIP64_RHO) {
            compressedSize = readUInt64LE(data1, Constants.EF_ZIP64_SCOMP);
            if (_centralHeader.compressedSize === Constants.EF_ZIP64_OR_32) {
                _centralHeader.compressedSize = compressedSize;
            }
        }
        if (data1.length >= Constants.EF_ZIP64_DSN) {
            offset = readUInt64LE(data1, Constants.EF_ZIP64_RHO);
            if (_centralHeader.offset === Constants.EF_ZIP64_OR_32) {
                _centralHeader.offset = offset;
            }
        }
        if (data1.length >= Constants.EF_ZIP64_DSN + 4) {
            diskNumStart = data1.readUInt32LE(Constants.EF_ZIP64_DSN);
            if (_centralHeader.diskNumStart === Constants.EF_ZIP64_OR_16) {
                _centralHeader.diskNumStart = diskNumStart;
            }
        }
    }
    return {
        get entryName () {
            return decoder.decode(_entryName);
        },
        get rawEntryName () {
            return _entryName;
        },
        set entryName (val){
            _entryName = Utils.toBuffer(val, decoder.encode);
            var lastChar = _entryName[_entryName.length - 1];
            _isDirectory = lastChar === 47 || lastChar === 92;
            _centralHeader.fileNameLength = _entryName.length;
        },
        get efs () {
            if (typeof _efs === "function") {
                return _efs(this.entryName);
            } else {
                return _efs;
            }
        },
        get extra () {
            return _extra;
        },
        set extra (val){
            _extra = val;
            _centralHeader.extraLength = val.length;
            parseExtra(val);
        },
        get comment () {
            return decoder.decode(_comment);
        },
        set comment (val){
            _comment = Utils.toBuffer(val, decoder.encode);
            _centralHeader.commentLength = _comment.length;
            if (_comment.length > 0xffff) throw Utils.Errors.COMMENT_TOO_LONG();
        },
        get name () {
            var n = decoder.decode(_entryName);
            return _isDirectory ? n.substr(n.length - 1).split("/").pop() : n.split("/").pop();
        },
        get isDirectory () {
            return _isDirectory;
        },
        getCompressedData: function() {
            return compress(false, null);
        },
        getCompressedDataAsync: function(/*Function*/ callback) {
            compress(true, callback);
        },
        setData: function(value) {
            uncompressedData = Utils.toBuffer(value, Utils.decoder.encode);
            if (!_isDirectory && uncompressedData.length) {
                _centralHeader.size = uncompressedData.length;
                _centralHeader.method = Utils.Constants.DEFLATED;
                _centralHeader.crc = Utils.crc32(value);
                _centralHeader.changed = true;
            } else {
                // folders and blank files should be stored
                _centralHeader.method = Utils.Constants.STORED;
            }
        },
        getData: function(pass) {
            if (_centralHeader.changed) {
                return uncompressedData;
            } else {
                return decompress(false, null, pass);
            }
        },
        getDataAsync: function(/*Function*/ callback, pass) {
            if (_centralHeader.changed) {
                callback(uncompressedData);
            } else {
                decompress(true, callback, pass);
            }
        },
        set attr (attr){
            _centralHeader.attr = attr;
        },
        get attr () {
            return _centralHeader.attr;
        },
        set header (/*Buffer*/ data){
            _centralHeader.loadFromBinary(data);
        },
        get header () {
            return _centralHeader;
        },
        packCentralHeader: function() {
            _centralHeader.flags_efs = this.efs;
            _centralHeader.extraLength = _extra.length;
            // 1. create header (buffer)
            var header = _centralHeader.centralHeaderToBinary();
            var addpos = Utils.Constants.CENHDR;
            // 2. add file name
            _entryName.copy(header, addpos);
            addpos += _entryName.length;
            // 3. add extra data
            _extra.copy(header, addpos);
            addpos += _centralHeader.extraLength;
            // 4. add file comment
            _comment.copy(header, addpos);
            return header;
        },
        packLocalHeader: function() {
            let addpos = 0;
            _centralHeader.flags_efs = this.efs;
            _centralHeader.extraLocalLength = _extralocal.length;
            // 1. construct local header Buffer
            const localHeaderBuf = _centralHeader.localHeaderToBinary();
            // 2. localHeader - crate header buffer
            const localHeader = Buffer.alloc(localHeaderBuf.length + _entryName.length + _centralHeader.extraLocalLength);
            // 2.1 add localheader
            localHeaderBuf.copy(localHeader, addpos);
            addpos += localHeaderBuf.length;
            // 2.2 add file name
            _entryName.copy(localHeader, addpos);
            addpos += _entryName.length;
            // 2.3 add extra field
            _extralocal.copy(localHeader, addpos);
            addpos += _extralocal.length;
            return localHeader;
        },
        toJSON: function() {
            const bytes = function(nr) {
                return "<" + (nr && nr.length + " bytes buffer" || "null") + ">";
            };
            return {
                entryName: this.entryName,
                name: this.name,
                comment: this.comment,
                isDirectory: this.isDirectory,
                header: _centralHeader.toJSON(),
                compressedData: bytes(input),
                data: bytes(uncompressedData)
            };
        },
        toString: function() {
            return JSON.stringify(this.toJSON(), null, "\t");
        }
    };
};
}),
"[project]/node_modules/adm-zip/zipFile.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const ZipEntry = __turbopack_context__.r("[project]/node_modules/adm-zip/zipEntry.js [app-route] (ecmascript)");
const Headers = __turbopack_context__.r("[project]/node_modules/adm-zip/headers/index.js [app-route] (ecmascript)");
const Utils = __turbopack_context__.r("[project]/node_modules/adm-zip/util/index.js [app-route] (ecmascript)");
module.exports = function(/*Buffer|null*/ inBuffer, /** object */ options) {
    var entryList = [], entryTable = {}, _comment = Buffer.alloc(0), mainHeader = new Headers.MainHeader(), loadedEntries = false;
    var password = null;
    const temporary = new Set();
    // assign options
    const opts = options;
    const { noSort, decoder } = opts;
    if (inBuffer) {
        // is a memory buffer
        readMainHeader(opts.readEntries);
    } else {
        // none. is a new file
        loadedEntries = true;
    }
    function makeTemporaryFolders() {
        const foldersList = new Set();
        // Make list of all folders in file
        for (const elem of Object.keys(entryTable)){
            const elements = elem.split("/");
            elements.pop(); // filename
            if (!elements.length) continue; // no folders
            for(let i = 0; i < elements.length; i++){
                const sub = elements.slice(0, i + 1).join("/") + "/";
                foldersList.add(sub);
            }
        }
        // create missing folders as temporary
        for (const elem of foldersList){
            if (!(elem in entryTable)) {
                const tempfolder = new ZipEntry(opts);
                tempfolder.entryName = elem;
                tempfolder.attr = 0x10;
                tempfolder.temporary = true;
                entryList.push(tempfolder);
                entryTable[tempfolder.entryName] = tempfolder;
                temporary.add(tempfolder);
            }
        }
    }
    function readEntries() {
        loadedEntries = true;
        entryTable = {};
        if (mainHeader.diskEntries > (inBuffer.length - mainHeader.offset) / Utils.Constants.CENHDR) {
            throw Utils.Errors.DISK_ENTRY_TOO_LARGE();
        }
        entryList = new Array(mainHeader.diskEntries); // total number of entries
        var index = mainHeader.offset; // offset of first CEN header
        for(var i = 0; i < entryList.length; i++){
            var tmp = index, entry = new ZipEntry(opts, inBuffer);
            entry.header = inBuffer.slice(tmp, tmp += Utils.Constants.CENHDR);
            entry.entryName = inBuffer.slice(tmp, tmp += entry.header.fileNameLength);
            if (entry.header.extraLength) {
                entry.extra = inBuffer.slice(tmp, tmp += entry.header.extraLength);
            }
            if (entry.header.commentLength) entry.comment = inBuffer.slice(tmp, tmp + entry.header.commentLength);
            index += entry.header.centralHeaderSize;
            entryList[i] = entry;
            entryTable[entry.entryName] = entry;
        }
        temporary.clear();
        makeTemporaryFolders();
    }
    function readMainHeader(/*Boolean*/ readNow) {
        var i = inBuffer.length - Utils.Constants.ENDHDR, max = Math.max(0, i - 0xffff), n = max, endStart = inBuffer.length, endOffset = -1, commentEnd = 0;
        // option to search header form entire file
        const trailingSpace = typeof opts.trailingSpace === "boolean" ? opts.trailingSpace : false;
        if (trailingSpace) max = 0;
        for(i; i >= n; i--){
            if (inBuffer[i] !== 0x50) continue; // quick check that the byte is 'P'
            if (inBuffer.readUInt32LE(i) === Utils.Constants.ENDSIG) {
                // "PK\005\006"
                endOffset = i;
                commentEnd = i;
                endStart = i + Utils.Constants.ENDHDR;
                // We already found a regular signature, let's look just a bit further to check if there's any zip64 signature
                n = i - Utils.Constants.END64HDR;
                continue;
            }
            if (inBuffer.readUInt32LE(i) === Utils.Constants.END64SIG) {
                // Found a zip64 signature, let's continue reading the whole zip64 record
                n = max;
                continue;
            }
            if (inBuffer.readUInt32LE(i) === Utils.Constants.ZIP64SIG) {
                // Found the zip64 record, let's determine it's size
                endOffset = i;
                endStart = i + Utils.readBigUInt64LE(inBuffer, i + Utils.Constants.ZIP64SIZE) + Utils.Constants.ZIP64LEAD;
                break;
            }
        }
        if (endOffset == -1) throw Utils.Errors.INVALID_FORMAT();
        mainHeader.loadFromBinary(inBuffer.slice(endOffset, endStart));
        if (mainHeader.commentLength) {
            _comment = inBuffer.slice(commentEnd + Utils.Constants.ENDHDR);
        }
        if (readNow) readEntries();
    }
    function sortEntries() {
        if (entryList.length > 1 && !noSort) {
            entryList.sort((a, b)=>a.entryName.toLowerCase().localeCompare(b.entryName.toLowerCase()));
        }
    }
    return {
        /**
         * Returns an array of ZipEntry objects existent in the current opened archive
         * @return Array
         */ get entries () {
            if (!loadedEntries) {
                readEntries();
            }
            return entryList.filter((e)=>!temporary.has(e));
        },
        /**
         * Archive comment
         * @return {String}
         */ get comment () {
            return decoder.decode(_comment);
        },
        set comment (val){
            _comment = Utils.toBuffer(val, decoder.encode);
            mainHeader.commentLength = _comment.length;
        },
        getEntryCount: function() {
            if (!loadedEntries) {
                return mainHeader.diskEntries;
            }
            return entryList.length;
        },
        forEach: function(callback) {
            this.entries.forEach(callback);
        },
        /**
         * Returns a reference to the entry with the given name or null if entry is inexistent
         *
         * @param entryName
         * @return ZipEntry
         */ getEntry: function(/*String*/ entryName) {
            if (!loadedEntries) {
                readEntries();
            }
            return entryTable[entryName] || null;
        },
        /**
         * Adds the given entry to the entry list
         *
         * @param entry
         */ setEntry: function(/*ZipEntry*/ entry) {
            if (!loadedEntries) {
                readEntries();
            }
            entryList.push(entry);
            entryTable[entry.entryName] = entry;
            mainHeader.totalEntries = entryList.length;
        },
        /**
         * Removes the file with the given name from the entry list.
         *
         * If the entry is a directory, then all nested files and directories will be removed
         * @param entryName
         * @returns {void}
         */ deleteFile: function(/*String*/ entryName, withsubfolders = true) {
            if (!loadedEntries) {
                readEntries();
            }
            const entry = entryTable[entryName];
            const list = this.getEntryChildren(entry, withsubfolders).map((child)=>child.entryName);
            list.forEach(this.deleteEntry);
        },
        /**
         * Removes the entry with the given name from the entry list.
         *
         * @param {string} entryName
         * @returns {void}
         */ deleteEntry: function(/*String*/ entryName) {
            if (!loadedEntries) {
                readEntries();
            }
            const entry = entryTable[entryName];
            const index = entryList.indexOf(entry);
            if (index >= 0) {
                entryList.splice(index, 1);
                delete entryTable[entryName];
                mainHeader.totalEntries = entryList.length;
            }
        },
        /**
         *  Iterates and returns all nested files and directories of the given entry
         *
         * @param entry
         * @return Array
         */ getEntryChildren: function(/*ZipEntry*/ entry, subfolders = true) {
            if (!loadedEntries) {
                readEntries();
            }
            if (typeof entry === "object") {
                if (entry.isDirectory && subfolders) {
                    const list = [];
                    const name = entry.entryName;
                    for (const zipEntry of entryList){
                        if (zipEntry.entryName.startsWith(name)) {
                            list.push(zipEntry);
                        }
                    }
                    return list;
                } else {
                    return [
                        entry
                    ];
                }
            }
            return [];
        },
        /**
         *  How many child elements entry has
         *
         * @param {ZipEntry} entry
         * @return {integer}
         */ getChildCount: function(entry) {
            if (entry && entry.isDirectory) {
                const list = this.getEntryChildren(entry);
                return list.includes(entry) ? list.length - 1 : list.length;
            }
            return 0;
        },
        /**
         * Returns the zip file
         *
         * @return Buffer
         */ compressToBuffer: function() {
            if (!loadedEntries) {
                readEntries();
            }
            sortEntries();
            const dataBlock = [];
            const headerBlocks = [];
            let totalSize = 0;
            let dindex = 0;
            mainHeader.size = 0;
            mainHeader.offset = 0;
            let totalEntries = 0;
            for (const entry of this.entries){
                // compress data and set local and entry header accordingly. Reason why is called first
                const compressedData = entry.getCompressedData();
                entry.header.offset = dindex;
                // 1. construct local header
                const localHeader = entry.packLocalHeader();
                // 2. offsets
                const dataLength = localHeader.length + compressedData.length;
                dindex += dataLength;
                // 3. store values in sequence
                dataBlock.push(localHeader);
                dataBlock.push(compressedData);
                // 4. construct central header
                const centralHeader = entry.packCentralHeader();
                headerBlocks.push(centralHeader);
                // 5. update main header
                mainHeader.size += centralHeader.length;
                totalSize += dataLength + centralHeader.length;
                totalEntries++;
            }
            totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
            // point to end of data and beginning of central directory first record
            mainHeader.offset = dindex;
            mainHeader.totalEntries = totalEntries;
            dindex = 0;
            const outBuffer = Buffer.alloc(totalSize);
            // write data blocks
            for (const content of dataBlock){
                content.copy(outBuffer, dindex);
                dindex += content.length;
            }
            // write central directory entries
            for (const content of headerBlocks){
                content.copy(outBuffer, dindex);
                dindex += content.length;
            }
            // write main header
            const mh = mainHeader.toBinary();
            if (_comment) {
                _comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
            }
            mh.copy(outBuffer, dindex);
            // Since we update entry and main header offsets,
            // they are no longer valid and we have to reset content
            // (Issue 64)
            inBuffer = outBuffer;
            loadedEntries = false;
            return outBuffer;
        },
        toAsyncBuffer: function(/*Function*/ onSuccess, /*Function*/ onFail, /*Function*/ onItemStart, /*Function*/ onItemEnd) {
            try {
                if (!loadedEntries) {
                    readEntries();
                }
                sortEntries();
                const dataBlock = [];
                const centralHeaders = [];
                let totalSize = 0;
                let dindex = 0;
                let totalEntries = 0;
                mainHeader.size = 0;
                mainHeader.offset = 0;
                const compress2Buffer = function(entryLists) {
                    if (entryLists.length > 0) {
                        const entry = entryLists.shift();
                        const name = entry.entryName + entry.extra.toString();
                        if (onItemStart) onItemStart(name);
                        entry.getCompressedDataAsync(function(compressedData) {
                            if (onItemEnd) onItemEnd(name);
                            entry.header.offset = dindex;
                            // 1. construct local header
                            const localHeader = entry.packLocalHeader();
                            // 2. offsets
                            const dataLength = localHeader.length + compressedData.length;
                            dindex += dataLength;
                            // 3. store values in sequence
                            dataBlock.push(localHeader);
                            dataBlock.push(compressedData);
                            // central header
                            const centalHeader = entry.packCentralHeader();
                            centralHeaders.push(centalHeader);
                            mainHeader.size += centalHeader.length;
                            totalSize += dataLength + centalHeader.length;
                            totalEntries++;
                            compress2Buffer(entryLists);
                        });
                    } else {
                        totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
                        // point to end of data and beginning of central directory first record
                        mainHeader.offset = dindex;
                        mainHeader.totalEntries = totalEntries;
                        dindex = 0;
                        const outBuffer = Buffer.alloc(totalSize);
                        dataBlock.forEach(function(content) {
                            content.copy(outBuffer, dindex); // write data blocks
                            dindex += content.length;
                        });
                        centralHeaders.forEach(function(content) {
                            content.copy(outBuffer, dindex); // write central directory entries
                            dindex += content.length;
                        });
                        const mh = mainHeader.toBinary();
                        if (_comment) {
                            _comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
                        }
                        mh.copy(outBuffer, dindex); // write main header
                        // Since we update entry and main header offsets, they are no
                        // longer valid and we have to reset content using our new buffer
                        // (Issue 64)
                        inBuffer = outBuffer;
                        loadedEntries = false;
                        onSuccess(outBuffer);
                    }
                };
                compress2Buffer(Array.from(this.entries));
            } catch (e) {
                onFail(e);
            }
        }
    };
};
}),
"[project]/node_modules/adm-zip/adm-zip.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const Utils = __turbopack_context__.r("[project]/node_modules/adm-zip/util/index.js [app-route] (ecmascript)");
const pth = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const ZipEntry = __turbopack_context__.r("[project]/node_modules/adm-zip/zipEntry.js [app-route] (ecmascript)");
const ZipFile = __turbopack_context__.r("[project]/node_modules/adm-zip/zipFile.js [app-route] (ecmascript)");
const get_Bool = (...val)=>Utils.findLast(val, (c)=>typeof c === "boolean");
const get_Str = (...val)=>Utils.findLast(val, (c)=>typeof c === "string");
const get_Fun = (...val)=>Utils.findLast(val, (c)=>typeof c === "function");
const defaultOptions = {
    // option "noSort" : if true it disables files sorting
    noSort: false,
    // read entries during load (initial loading may be slower)
    readEntries: false,
    // default method is none
    method: Utils.Constants.NONE,
    // file system
    fs: null
};
module.exports = function(/**String*/ input, /** object */ options) {
    let inBuffer = null;
    // create object based default options, allowing them to be overwritten
    const opts = Object.assign(Object.create(null), defaultOptions);
    // test input variable
    if (input && "object" === typeof input) {
        // if value is not buffer we accept it to be object with options
        if (!(input instanceof Uint8Array)) {
            Object.assign(opts, input);
            input = opts.input ? opts.input : undefined;
            if (opts.input) delete opts.input;
        }
        // if input is buffer
        if (Buffer.isBuffer(input)) {
            inBuffer = input;
            opts.method = Utils.Constants.BUFFER;
            input = undefined;
        }
    }
    // assign options
    Object.assign(opts, options);
    // instanciate utils filesystem
    const filetools = new Utils(opts);
    if (typeof opts.decoder !== "object" || typeof opts.decoder.encode !== "function" || typeof opts.decoder.decode !== "function") {
        opts.decoder = Utils.decoder;
    }
    // if input is file name we retrieve its content
    if (input && "string" === typeof input) {
        // load zip file
        if (filetools.fs.existsSync(input)) {
            opts.method = Utils.Constants.FILE;
            opts.filename = input;
            inBuffer = filetools.fs.readFileSync(input);
        } else {
            throw Utils.Errors.INVALID_FILENAME();
        }
    }
    // create variable
    const _zip = new ZipFile(inBuffer, opts);
    const { canonical, sanitize, zipnamefix } = Utils;
    function getEntry(/**Object*/ entry) {
        if (entry && _zip) {
            var item;
            // If entry was given as a file name
            if (typeof entry === "string") item = _zip.getEntry(pth.posix.normalize(entry));
            // if entry was given as a ZipEntry object
            if (typeof entry === "object" && typeof entry.entryName !== "undefined" && typeof entry.header !== "undefined") item = _zip.getEntry(entry.entryName);
            if (item) {
                return item;
            }
        }
        return null;
    }
    function fixPath(zipPath) {
        const { join, normalize, sep } = pth.posix;
        // convert windows file separators and normalize
        return join(pth.isAbsolute(zipPath) ? "/" : '.', normalize(sep + zipPath.split("\\").join(sep) + sep));
    }
    function filenameFilter(filterfn) {
        if (filterfn instanceof RegExp) {
            // if filter is RegExp wrap it
            return function(rx) {
                return function(filename) {
                    return rx.test(filename);
                };
            }(filterfn);
        } else if ("function" !== typeof filterfn) {
            // if filter is not function we will replace it
            return ()=>true;
        }
        return filterfn;
    }
    // keep last character on folders
    const relativePath = (local, entry)=>{
        let lastChar = entry.slice(-1);
        lastChar = lastChar === filetools.sep ? filetools.sep : "";
        return pth.relative(local, entry) + lastChar;
    };
    return {
        /**
         * Extracts the given entry from the archive and returns the content as a Buffer object
         * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
         * @param {Buffer|string} [pass] - password
         * @return Buffer or Null in case of error
         */ readFile: function(entry, pass) {
            var item = getEntry(entry);
            return item && item.getData(pass) || null;
        },
        /**
         * Returns how many child elements has on entry (directories) on files it is always 0
         * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
         * @returns {integer}
         */ childCount: function(entry) {
            const item = getEntry(entry);
            if (item) {
                return _zip.getChildCount(item);
            }
        },
        /**
         * Asynchronous readFile
         * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
         * @param {callback} callback
         *
         * @return Buffer or Null in case of error
         */ readFileAsync: function(entry, callback) {
            var item = getEntry(entry);
            if (item) {
                item.getDataAsync(callback);
            } else {
                callback(null, "getEntry failed for:" + entry);
            }
        },
        /**
         * Extracts the given entry from the archive and returns the content as plain text in the given encoding
         * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
         * @param {string} encoding - Optional. If no encoding is specified utf8 is used
         *
         * @return String
         */ readAsText: function(entry, encoding) {
            var item = getEntry(entry);
            if (item) {
                var data = item.getData();
                if (data && data.length) {
                    return data.toString(encoding || "utf8");
                }
            }
            return "";
        },
        /**
         * Asynchronous readAsText
         * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
         * @param {callback} callback
         * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
         *
         * @return String
         */ readAsTextAsync: function(entry, callback, encoding) {
            var item = getEntry(entry);
            if (item) {
                item.getDataAsync(function(data, err) {
                    if (err) {
                        callback(data, err);
                        return;
                    }
                    if (data && data.length) {
                        callback(data.toString(encoding || "utf8"));
                    } else {
                        callback("");
                    }
                });
            } else {
                callback("");
            }
        },
        /**
         * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
         *
         * @param {ZipEntry|string} entry
         * @returns {void}
         */ deleteFile: function(entry, withsubfolders = true) {
            // @TODO: test deleteFile
            var item = getEntry(entry);
            if (item) {
                _zip.deleteFile(item.entryName, withsubfolders);
            }
        },
        /**
         * Remove the entry from the file or directory without affecting any nested entries
         *
         * @param {ZipEntry|string} entry
         * @returns {void}
         */ deleteEntry: function(entry) {
            // @TODO: test deleteEntry
            var item = getEntry(entry);
            if (item) {
                _zip.deleteEntry(item.entryName);
            }
        },
        /**
         * Adds a comment to the zip. The zip must be rewritten after adding the comment.
         *
         * @param {string} comment
         */ addZipComment: function(comment) {
            // @TODO: test addZipComment
            _zip.comment = comment;
        },
        /**
         * Returns the zip comment
         *
         * @return String
         */ getZipComment: function() {
            return _zip.comment || "";
        },
        /**
         * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
         * The comment cannot exceed 65535 characters in length
         *
         * @param {ZipEntry} entry
         * @param {string} comment
         */ addZipEntryComment: function(entry, comment) {
            var item = getEntry(entry);
            if (item) {
                item.comment = comment;
            }
        },
        /**
         * Returns the comment of the specified entry
         *
         * @param {ZipEntry} entry
         * @return String
         */ getZipEntryComment: function(entry) {
            var item = getEntry(entry);
            if (item) {
                return item.comment || "";
            }
            return "";
        },
        /**
         * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
         *
         * @param {ZipEntry} entry
         * @param {Buffer} content
         */ updateFile: function(entry, content) {
            var item = getEntry(entry);
            if (item) {
                item.setData(content);
            }
        },
        /**
         * Adds a file from the disk to the archive
         *
         * @param {string} localPath File to add to zip
         * @param {string} [zipPath] Optional path inside the zip
         * @param {string} [zipName] Optional name for the file
         * @param {string} [comment] Optional file comment
         */ addLocalFile: function(localPath1, zipPath, zipName, comment) {
            if (filetools.fs.existsSync(localPath1)) {
                // fix ZipPath
                zipPath = zipPath ? fixPath(zipPath) : "";
                // p - local file name
                const p = pth.win32.basename(pth.win32.normalize(localPath1));
                // add file name into zippath
                zipPath += zipName ? zipName : p;
                // read file attributes
                const _attr = filetools.fs.statSync(localPath1);
                // get file content
                const data = _attr.isFile() ? filetools.fs.readFileSync(localPath1) : Buffer.alloc(0);
                // if folder
                if (_attr.isDirectory()) zipPath += filetools.sep;
                // add file into zip file
                this.addFile(zipPath, data, comment, _attr);
            } else {
                throw Utils.Errors.FILE_NOT_FOUND(localPath1);
            }
        },
        /**
         * Callback for showing if everything was done.
         *
         * @callback doneCallback
         * @param {Error} err - Error object
         * @param {boolean} done - was request fully completed
         */ /**
         * Adds a file from the disk to the archive
         *
         * @param {(object|string)} options - options object, if it is string it us used as localPath.
         * @param {string} options.localPath - Local path to the file.
         * @param {string} [options.comment] - Optional file comment.
         * @param {string} [options.zipPath] - Optional path inside the zip
         * @param {string} [options.zipName] - Optional name for the file
         * @param {doneCallback} callback - The callback that handles the response.
         */ addLocalFileAsync: function(options, callback) {
            options = typeof options === "object" ? options : {
                localPath: options
            };
            const localPath1 = pth.resolve(options.localPath);
            const { comment } = options;
            let { zipPath, zipName } = options;
            const self = this;
            filetools.fs.stat(localPath1, function(err, stats) {
                if (err) return callback(err, false);
                // fix ZipPath
                zipPath = zipPath ? fixPath(zipPath) : "";
                // p - local file name
                const p = pth.win32.basename(pth.win32.normalize(localPath1));
                // add file name into zippath
                zipPath += zipName ? zipName : p;
                if (stats.isFile()) {
                    filetools.fs.readFile(localPath1, function(err, data) {
                        if (err) return callback(err, false);
                        self.addFile(zipPath, data, comment, stats);
                        return setImmediate(callback, undefined, true);
                    });
                } else if (stats.isDirectory()) {
                    zipPath += filetools.sep;
                    self.addFile(zipPath, Buffer.alloc(0), comment, stats);
                    return setImmediate(callback, undefined, true);
                }
            });
        },
        /**
         * Adds a local directory and all its nested files and directories to the archive
         *
         * @param {string} localPath - local path to the folder
         * @param {string} [zipPath] - optional path inside zip
         * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
         */ addLocalFolder: function(localPath1, zipPath, filter) {
            // Prepare filter
            filter = filenameFilter(filter);
            // fix ZipPath
            zipPath = zipPath ? fixPath(zipPath) : "";
            // normalize the path first
            localPath1 = pth.normalize(localPath1);
            if (filetools.fs.existsSync(localPath1)) {
                const items = filetools.findFiles(localPath1);
                const self = this;
                if (items.length) {
                    for (const filepath of items){
                        const p = pth.join(zipPath, relativePath(localPath1, filepath));
                        if (filter(p)) {
                            self.addLocalFile(filepath, pth.dirname(p));
                        }
                    }
                }
            } else {
                throw Utils.Errors.FILE_NOT_FOUND(localPath1);
            }
        },
        /**
         * Asynchronous addLocalFolder
         * @param {string} localPath
         * @param {callback} callback
         * @param {string} [zipPath] optional path inside zip
         * @param {RegExp|function} [filter] optional RegExp or Function if files match will
         *               be included.
         */ addLocalFolderAsync: function(localPath1, callback, zipPath, filter) {
            // Prepare filter
            filter = filenameFilter(filter);
            // fix ZipPath
            zipPath = zipPath ? fixPath(zipPath) : "";
            // normalize the path first
            localPath1 = pth.normalize(localPath1);
            var self = this;
            filetools.fs.open(localPath1, "r", function(err) {
                if (err && err.code === "ENOENT") {
                    callback(undefined, Utils.Errors.FILE_NOT_FOUND(localPath1));
                } else if (err) {
                    callback(undefined, err);
                } else {
                    var items = filetools.findFiles(localPath1);
                    var i = -1;
                    var next = function() {
                        i += 1;
                        if (i < items.length) {
                            var filepath = items[i];
                            var p = relativePath(localPath1, filepath).split("\\").join("/"); //windows fix
                            p = p.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""); // accent fix
                            if (filter(p)) {
                                filetools.fs.stat(filepath, function(er0, stats) {
                                    if (er0) callback(undefined, er0);
                                    if (stats.isFile()) {
                                        filetools.fs.readFile(filepath, function(er1, data) {
                                            if (er1) {
                                                callback(undefined, er1);
                                            } else {
                                                self.addFile(zipPath + p, data, "", stats);
                                                next();
                                            }
                                        });
                                    } else {
                                        self.addFile(zipPath + p + "/", Buffer.alloc(0), "", stats);
                                        next();
                                    }
                                });
                            } else {
                                process.nextTick(()=>{
                                    next();
                                });
                            }
                        } else {
                            callback(true, undefined);
                        }
                    };
                    next();
                }
            });
        },
        /**
         * Adds a local directory and all its nested files and directories to the archive
         *
         * @param {object | string} options - options object, if it is string it us used as localPath.
         * @param {string} options.localPath - Local path to the folder.
         * @param {string} [options.zipPath] - optional path inside zip.
         * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
         * @param {function|string} [options.namefix] - optional function to help fix filename
         * @param {doneCallback} callback - The callback that handles the response.
         *
         */ addLocalFolderAsync2: function(options, callback) {
            const self = this;
            options = typeof options === "object" ? options : {
                localPath: options
            };
            localPath = pth.resolve(fixPath(options.localPath));
            let { zipPath, filter, namefix } = options;
            if (filter instanceof RegExp) {
                filter = function(rx) {
                    return function(filename) {
                        return rx.test(filename);
                    };
                }(filter);
            } else if ("function" !== typeof filter) {
                filter = function() {
                    return true;
                };
            }
            // fix ZipPath
            zipPath = zipPath ? fixPath(zipPath) : "";
            // Check Namefix function
            if (namefix == "latin1") {
                namefix = (str)=>str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""); // accent fix (latin1 characers only)
            }
            if (typeof namefix !== "function") namefix = (str)=>str;
            // internal, create relative path + fix the name
            const relPathFix = (entry)=>pth.join(zipPath, namefix(relativePath(localPath, entry)));
            const fileNameFix = (entry)=>pth.win32.basename(pth.win32.normalize(namefix(entry)));
            filetools.fs.open(localPath, "r", function(err) {
                if (err && err.code === "ENOENT") {
                    callback(undefined, Utils.Errors.FILE_NOT_FOUND(localPath));
                } else if (err) {
                    callback(undefined, err);
                } else {
                    filetools.findFilesAsync(localPath, function(err, fileEntries) {
                        if (err) return callback(err);
                        fileEntries = fileEntries.filter((dir)=>filter(relPathFix(dir)));
                        if (!fileEntries.length) callback(undefined, false);
                        setImmediate(fileEntries.reverse().reduce(function(next, entry) {
                            return function(err, done) {
                                if (err || done === false) return setImmediate(next, err, false);
                                self.addLocalFileAsync({
                                    localPath: entry,
                                    zipPath: pth.dirname(relPathFix(entry)),
                                    zipName: fileNameFix(entry)
                                }, next);
                            };
                        }, callback));
                    });
                }
            });
        },
        /**
         * Adds a local directory and all its nested files and directories to the archive
         *
         * @param {string} localPath - path where files will be extracted
         * @param {object} props - optional properties
         * @param {string} [props.zipPath] - optional path inside zip
         * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
         * @param {function|string} [props.namefix] - optional function to help fix filename
         */ addLocalFolderPromise: function(localPath1, props) {
            return new Promise((resolve, reject)=>{
                this.addLocalFolderAsync2(Object.assign({
                    localPath: localPath1
                }, props), (err, done)=>{
                    if (err) reject(err);
                    if (done) resolve(this);
                });
            });
        },
        /**
         * Allows you to create a entry (file or directory) in the zip file.
         * If you want to create a directory the entryName must end in / and a null buffer should be provided.
         * Comment and attributes are optional
         *
         * @param {string} entryName
         * @param {Buffer | string} content - file content as buffer or utf8 coded string
         * @param {string} [comment] - file comment
         * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
         */ addFile: function(entryName, content, comment, attr) {
            entryName = zipnamefix(entryName);
            let entry = getEntry(entryName);
            const update = entry != null;
            // prepare new entry
            if (!update) {
                entry = new ZipEntry(opts);
                entry.entryName = entryName;
            }
            entry.comment = comment || "";
            const isStat = "object" === typeof attr && attr instanceof filetools.fs.Stats;
            // last modification time from file stats
            if (isStat) {
                entry.header.time = attr.mtime;
            }
            // Set file attribute
            var fileattr = entry.isDirectory ? 0x10 : 0; // (MS-DOS directory flag)
            // extended attributes field for Unix
            // set file type either S_IFDIR / S_IFREG
            let unix = entry.isDirectory ? 0x4000 : 0x8000;
            if (isStat) {
                // File attributes from file stats
                unix |= 0xfff & attr.mode;
            } else if ("number" === typeof attr) {
                // attr from given attr values
                unix |= 0xfff & attr;
            } else {
                // Default values:
                unix |= entry.isDirectory ? 0o755 : 0o644; // permissions (drwxr-xr-x) or (-r-wr--r--)
            }
            fileattr = (fileattr | unix << 16) >>> 0; // add attributes
            entry.attr = fileattr;
            entry.setData(content);
            if (!update) _zip.setEntry(entry);
            return entry;
        },
        /**
         * Returns an array of ZipEntry objects representing the files and folders inside the archive
         *
         * @param {string} [password]
         * @returns Array
         */ getEntries: function(password) {
            _zip.password = password;
            return _zip ? _zip.entries : [];
        },
        /**
         * Returns a ZipEntry object representing the file or folder specified by ``name``.
         *
         * @param {string} name
         * @return ZipEntry
         */ getEntry: function(/**String*/ name) {
            return getEntry(name);
        },
        getEntryCount: function() {
            return _zip.getEntryCount();
        },
        forEach: function(callback) {
            return _zip.forEach(callback);
        },
        /**
         * Extracts the given entry to the given targetPath
         * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
         *
         * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
         * @param {string} targetPath - Target folder where to write the file
         * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
         * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
         * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
         * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
         *
         * @return Boolean
         */ extractEntryTo: function(entry, targetPath, maintainEntryPath, overwrite, keepOriginalPermission, outFileName) {
            overwrite = get_Bool(false, overwrite);
            keepOriginalPermission = get_Bool(false, keepOriginalPermission);
            maintainEntryPath = get_Bool(true, maintainEntryPath);
            outFileName = get_Str(keepOriginalPermission, outFileName);
            var item = getEntry(entry);
            if (!item) {
                throw Utils.Errors.NO_ENTRY();
            }
            var entryName = canonical(item.entryName);
            var target = sanitize(targetPath, outFileName && !item.isDirectory ? outFileName : maintainEntryPath ? entryName : pth.basename(entryName));
            if (item.isDirectory) {
                var children = _zip.getEntryChildren(item);
                children.forEach(function(child) {
                    if (child.isDirectory) return;
                    var content = child.getData();
                    if (!content) {
                        throw Utils.Errors.CANT_EXTRACT_FILE();
                    }
                    var name = canonical(child.entryName);
                    var childName = sanitize(targetPath, maintainEntryPath ? name : pth.basename(name));
                    // The reverse operation for attr depend on method addFile()
                    const fileAttr = keepOriginalPermission ? child.header.fileAttr : undefined;
                    filetools.writeFileTo(childName, content, overwrite, fileAttr);
                });
                return true;
            }
            var content = item.getData(_zip.password);
            if (!content) throw Utils.Errors.CANT_EXTRACT_FILE();
            if (filetools.fs.existsSync(target) && !overwrite) {
                throw Utils.Errors.CANT_OVERRIDE();
            }
            // The reverse operation for attr depend on method addFile()
            const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
            filetools.writeFileTo(target, content, overwrite, fileAttr);
            return true;
        },
        /**
         * Test the archive
         * @param {string} [pass]
         */ test: function(pass) {
            if (!_zip) {
                return false;
            }
            for(var entry in _zip.entries){
                try {
                    if (entry.isDirectory) {
                        continue;
                    }
                    var content = _zip.entries[entry].getData(pass);
                    if (!content) {
                        return false;
                    }
                } catch (err) {
                    return false;
                }
            }
            return true;
        },
        /**
         * Extracts the entire archive to the given location
         *
         * @param {string} targetPath Target location
         * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
         *                  Default is FALSE
         * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
         *                  Default is FALSE
         * @param {string|Buffer} [pass] password
         */ extractAllTo: function(targetPath, overwrite, keepOriginalPermission, pass) {
            keepOriginalPermission = get_Bool(false, keepOriginalPermission);
            pass = get_Str(keepOriginalPermission, pass);
            overwrite = get_Bool(false, overwrite);
            if (!_zip) throw Utils.Errors.NO_ZIP();
            _zip.entries.forEach(function(entry) {
                var entryName = sanitize(targetPath, canonical(entry.entryName));
                if (entry.isDirectory) {
                    filetools.makeDir(entryName);
                    return;
                }
                var content = entry.getData(pass);
                if (!content) {
                    throw Utils.Errors.CANT_EXTRACT_FILE();
                }
                // The reverse operation for attr depend on method addFile()
                const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
                filetools.writeFileTo(entryName, content, overwrite, fileAttr);
                try {
                    filetools.fs.utimesSync(entryName, entry.header.time, entry.header.time);
                } catch (err) {
                    throw Utils.Errors.CANT_EXTRACT_FILE();
                }
            });
        },
        /**
         * Asynchronous extractAllTo
         *
         * @param {string} targetPath Target location
         * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
         *                  Default is FALSE
         * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
         *                  Default is FALSE
         * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
         */ extractAllToAsync: function(targetPath, overwrite, keepOriginalPermission, callback) {
            callback = get_Fun(overwrite, keepOriginalPermission, callback);
            keepOriginalPermission = get_Bool(false, keepOriginalPermission);
            overwrite = get_Bool(false, overwrite);
            if (!callback) {
                return new Promise((resolve, reject)=>{
                    this.extractAllToAsync(targetPath, overwrite, keepOriginalPermission, function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(this);
                        }
                    });
                });
            }
            if (!_zip) {
                callback(Utils.Errors.NO_ZIP());
                return;
            }
            targetPath = pth.resolve(targetPath);
            // convert entryName to
            const getPath = (entry)=>sanitize(targetPath, pth.normalize(canonical(entry.entryName)));
            const getError = (msg, file)=>new Error(msg + ': "' + file + '"');
            // separate directories from files
            const dirEntries = [];
            const fileEntries = [];
            _zip.entries.forEach((e)=>{
                if (e.isDirectory) {
                    dirEntries.push(e);
                } else {
                    fileEntries.push(e);
                }
            });
            // Create directory entries first synchronously
            // this prevents race condition and assures folders are there before writing files
            for (const entry of dirEntries){
                const dirPath = getPath(entry);
                // The reverse operation for attr depend on method addFile()
                const dirAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
                try {
                    filetools.makeDir(dirPath);
                    if (dirAttr) filetools.fs.chmodSync(dirPath, dirAttr);
                    // in unix timestamp will change if files are later added to folder, but still
                    filetools.fs.utimesSync(dirPath, entry.header.time, entry.header.time);
                } catch (er) {
                    callback(getError("Unable to create folder", dirPath));
                }
            }
            fileEntries.reverse().reduce(function(next, entry) {
                return function(err) {
                    if (err) {
                        next(err);
                    } else {
                        const entryName = pth.normalize(canonical(entry.entryName));
                        const filePath = sanitize(targetPath, entryName);
                        entry.getDataAsync(function(content, err_1) {
                            if (err_1) {
                                next(err_1);
                            } else if (!content) {
                                next(Utils.Errors.CANT_EXTRACT_FILE());
                            } else {
                                // The reverse operation for attr depend on method addFile()
                                const fileAttr = keepOriginalPermission ? entry.header.fileAttr : undefined;
                                filetools.writeFileToAsync(filePath, content, overwrite, fileAttr, function(succ) {
                                    if (!succ) {
                                        next(getError("Unable to write file", filePath));
                                    }
                                    filetools.fs.utimes(filePath, entry.header.time, entry.header.time, function(err_2) {
                                        if (err_2) {
                                            next(getError("Unable to set times", filePath));
                                        } else {
                                            next();
                                        }
                                    });
                                });
                            }
                        });
                    }
                };
            }, callback)();
        },
        /**
         * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
         *
         * @param {string} targetFileName
         * @param {function} callback
         */ writeZip: function(targetFileName, callback) {
            if (arguments.length === 1) {
                if (typeof targetFileName === "function") {
                    callback = targetFileName;
                    targetFileName = "";
                }
            }
            if (!targetFileName && opts.filename) {
                targetFileName = opts.filename;
            }
            if (!targetFileName) return;
            var zipData = _zip.compressToBuffer();
            if (zipData) {
                var ok = filetools.writeFileTo(targetFileName, zipData, true);
                if (typeof callback === "function") callback(!ok ? new Error("failed") : null, "");
            }
        },
        /**
         *
         * @param {string} targetFileName
         * @param {object} [props]
         * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
         * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.

         * @returns {Promise<void>}
         */ writeZipPromise: function(/**String*/ targetFileName, /* object */ props) {
            const { overwrite, perm } = Object.assign({
                overwrite: true
            }, props);
            return new Promise((resolve, reject)=>{
                // find file name
                if (!targetFileName && opts.filename) targetFileName = opts.filename;
                if (!targetFileName) reject("ADM-ZIP: ZIP File Name Missing");
                this.toBufferPromise().then((zipData)=>{
                    const ret = (done)=>done ? resolve(done) : reject("ADM-ZIP: Wasn't able to write zip file");
                    filetools.writeFileToAsync(targetFileName, zipData, overwrite, perm, ret);
                }, reject);
            });
        },
        /**
         * @returns {Promise<Buffer>} A promise to the Buffer.
         */ toBufferPromise: function() {
            return new Promise((resolve, reject)=>{
                _zip.toAsyncBuffer(resolve, reject);
            });
        },
        /**
         * Returns the content of the entire zip file as a Buffer object
         *
         * @prop {function} [onSuccess]
         * @prop {function} [onFail]
         * @prop {function} [onItemStart]
         * @prop {function} [onItemEnd]
         * @returns {Buffer}
         */ toBuffer: function(onSuccess, onFail, onItemStart, onItemEnd) {
            if (typeof onSuccess === "function") {
                _zip.toAsyncBuffer(onSuccess, onFail, onItemStart, onItemEnd);
                return null;
            }
            return _zip.compressToBuffer();
        }
    };
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0~h8o4.._.js.map