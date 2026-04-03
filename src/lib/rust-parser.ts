// import Parser from "tree-sitter";
// import Rust from "tree-sitter-rust";
//
// let rustParser: Parser | null = null;
//
// export function getRustParser() {
//     if (!rustParser) {
//         rustParser = new Parser();
//         rustParser.setLanguage(Rust);
//     }
//
//     return rustParser;
// }

// import path from "node:path";
//
// let parserPromise: Promise<any> | null = null;
//
// export async function getRustParser() {
//     if (!parserPromise) {
//         parserPromise = (async () => {
//             const ParserModule = await import("web-tree-sitter");
//             const Parser = ParserModule.Parser ?? ParserModule.default?.Parser ?? ParserModule.default;
//             const Language = ParserModule.Language ?? ParserModule.default?.Language;
//
//             await Parser.init({
//                 locateFile() {
//                     return path.join(process.cwd(), "public", "web-tree-sitter.wasm");
//                 }
//             });
//
//             const rustLanguage = await Language.load(
//                 path.join(process.cwd(), "public", "parsers", "tree-sitter-rust.wasm")
//             );
//
//             const parser = new Parser();
//             parser.setLanguage(rustLanguage);
//
//             return parser;
//         })();
//     }
//
//     return parserPromise;
// }

import path from "node:path";

type WebTreeSitterModule = typeof import("web-tree-sitter");

let parserPromise: Promise<any> | null = null;

export async function getRustParser() {
    if (!parserPromise) {
        parserPromise = (async () => {
            try {
                const mod: WebTreeSitterModule = await import("web-tree-sitter");

                const ParserCtor =
                    (mod as any).Parser ??
                    (mod as any).default;

                const LanguageApi =
                    (mod as any).Language ??
                    (mod as any).Parser?.Language;

                const init =
                    typeof (mod as any).init === "function"
                        ? (mod as any).init
                        : typeof ParserCtor?.init === "function"
                            ? ParserCtor.init.bind(ParserCtor)
                            : null;

                if (!ParserCtor) {
                    throw new Error("web-tree-sitter Parser export was not found.");
                }

                if (!LanguageApi) {
                    throw new Error("web-tree-sitter Language export was not found.");
                }

                if (!init) {
                    throw new Error("web-tree-sitter init function was not found.");
                }

                await init({
                    locateFile() {
                        return path.join(process.cwd(), "public", "web-tree-sitter.wasm");
                    }
                });

                const rustLanguage = await LanguageApi.load(
                    path.join(process.cwd(), "public", "parsers", "tree-sitter-rust.wasm")
                );

                const parser = new ParserCtor();
                parser.setLanguage(rustLanguage);

                return parser;
            } catch (error) {
                parserPromise = null;
                throw error;
            }
        })();
    }

    return parserPromise;
}

export function resetRustParser() {
    parserPromise = null;
}