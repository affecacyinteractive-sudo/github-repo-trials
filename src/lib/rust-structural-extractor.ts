// import crypto from "node:crypto";
// import type Parser from "tree-sitter";
// import { getRustParser } from "@/lib/rust-parser";
//
// export type RustStructuralBlock = {
//     blockKind:
//         | "function"
//         | "method"
//         | "struct"
//         | "enum"
//         | "trait"
//         | "impl"
//         | "mod"
//         | "type"
//         | "const"
//         | "static";
//     symbolName: string | null;
//     parentSymbol: string | null;
//     language: "rust";
//     startLine: number;
//     endLine: number;
//     byteStart: number;
//     byteEnd: number;
//     contentHash: string;
//     contentText: string;
//     extractionMode: "semantic";
// };
//
// type ContextEntry = {
//     nodeType: string;
//     symbolName: string | null;
// };
//
// const STRUCTURAL_NODE_TYPES = new Set([
//     "function_item",
//     "struct_item",
//     "enum_item",
//     "trait_item",
//     "impl_item",
//     "mod_item",
//     "type_item",
//     "const_item",
//     "static_item"
// ]);
//
// const CONTEXT_NODE_TYPES = new Set(["mod_item", "trait_item", "impl_item"]);
//
// export function extractRustStructuralBlocks(sourceText: string): RustStructuralBlock[] {
//     const parser = getRustParser();
//     const tree = parser.parse(sourceText);
//     const sourceBuffer = Buffer.from(sourceText, "utf8");
//     const results: RustStructuralBlock[] = [];
//
//     visitNode(tree.rootNode, []);
//
//     return results;
//
//     function visitNode(node: Parser.SyntaxNode, contextStack: ContextEntry[]) {
//         let currentContextStack = contextStack;
//
//         if (STRUCTURAL_NODE_TYPES.has(node.type)) {
//             const extracted = extractBlock(node, contextStack, sourceBuffer);
//
//             if (extracted) {
//                 results.push(extracted);
//
//                 if (CONTEXT_NODE_TYPES.has(node.type)) {
//                     currentContextStack = [
//                         ...contextStack,
//                         {
//                             nodeType: node.type,
//                             symbolName: extracted.symbolName
//                         }
//                     ];
//                 }
//             }
//         }
//
//         for (let i = 0; i < node.namedChildCount; i += 1) {
//             const child = node.namedChild(i);
//             if (child) {
//                 visitNode(child, currentContextStack);
//             }
//         }
//     }
// }
//
// function extractBlock(
//     node: Parser.SyntaxNode,
//     contextStack: ContextEntry[],
//     sourceBuffer: Buffer
// ): RustStructuralBlock | null {
//     const blockKind = mapBlockKind(node, contextStack);
//     if (!blockKind) {
//         return null;
//     }
//
//     const symbolName = getSymbolName(node, sourceBuffer);
//     const parentSymbol = getNearestParentSymbol(contextStack);
//     const contentText = sliceNodeText(node, sourceBuffer);
//     const contentHash = crypto.createHash("sha256").update(contentText).digest("hex");
//
//     return {
//         blockKind,
//         symbolName,
//         parentSymbol,
//         language: "rust",
//         startLine: node.startPosition.row + 1,
//         endLine: node.endPosition.row + 1,
//         byteStart: node.startIndex,
//         byteEnd: node.endIndex,
//         contentHash,
//         contentText,
//         extractionMode: "semantic"
//     };
// }
//
// function mapBlockKind(
//     node: Parser.SyntaxNode,
//     contextStack: ContextEntry[]
// ): RustStructuralBlock["blockKind"] | null {
//     switch (node.type) {
//         case "function_item": {
//             const parent = contextStack[contextStack.length - 1];
//             if (parent?.nodeType === "impl_item" || parent?.nodeType === "trait_item") {
//                 return "method";
//             }
//             return "function";
//         }
//         case "struct_item":
//             return "struct";
//         case "enum_item":
//             return "enum";
//         case "trait_item":
//             return "trait";
//         case "impl_item":
//             return "impl";
//         case "mod_item":
//             return "mod";
//         case "type_item":
//             return "type";
//         case "const_item":
//             return "const";
//         case "static_item":
//             return "static";
//         default:
//             return null;
//     }
// }
//
// function getSymbolName(node: Parser.SyntaxNode, sourceBuffer: Buffer) {
//     switch (node.type) {
//         case "function_item":
//         case "struct_item":
//         case "enum_item":
//         case "trait_item":
//         case "mod_item":
//         case "type_item":
//         case "const_item":
//         case "static_item": {
//             const nameNode = node.childForFieldName("name");
//             return nameNode ? sliceNodeText(nameNode, sourceBuffer).trim() : null;
//         }
//
//         case "impl_item":
//             return getImplDisplayName(node, sourceBuffer);
//
//         default:
//             return null;
//     }
// }
//
// function getImplDisplayName(node: Parser.SyntaxNode, sourceBuffer: Buffer) {
//     const traitNode = node.childForFieldName("trait");
//     const typeNode = node.childForFieldName("type");
//
//     const traitText = traitNode ? compactWhitespace(sliceNodeText(traitNode, sourceBuffer)) : null;
//     const typeText = typeNode ? compactWhitespace(sliceNodeText(typeNode, sourceBuffer)) : null;
//
//     if (traitText && typeText) {
//         return `impl ${traitText} for ${typeText}`;
//     }
//
//     if (typeText) {
//         return `impl ${typeText}`;
//     }
//
//     const headerText = sliceImplHeader(node, sourceBuffer);
//     return headerText ? compactWhitespace(headerText) : "impl";
// }
//
// function getNearestParentSymbol(contextStack: ContextEntry[]) {
//     for (let i = contextStack.length - 1; i >= 0; i -= 1) {
//         if (contextStack[i]?.symbolName) {
//             return contextStack[i].symbolName;
//         }
//     }
//
//     return null;
// }
//
// function sliceImplHeader(node: Parser.SyntaxNode, sourceBuffer: Buffer) {
//     const fullText = sliceNodeText(node, sourceBuffer);
//     const braceIndex = fullText.indexOf("{");
//     if (braceIndex === -1) {
//         return fullText.trim();
//     }
//
//     return fullText.slice(0, braceIndex).trim();
// }
//
// function sliceNodeText(node: Parser.SyntaxNode, sourceBuffer: Buffer) {
//     return sourceBuffer.subarray(node.startIndex, node.endIndex).toString("utf8");
// }
//
// function compactWhitespace(value: string) {
//     return value.replace(/\s+/g, " ").trim();
// }

import crypto from "node:crypto";
import { getRustParser } from "@/lib/rust-parser";

export type RustStructuralBlock = {
    blockKind:
        | "function"
        | "method"
        | "struct"
        | "enum"
        | "trait"
        | "impl"
        | "mod"
        | "type"
        | "const"
        | "static";
    symbolName: string | null;
    parentSymbol: string | null;
    language: "rust";
    startLine: number;
    endLine: number;
    byteStart: number;
    byteEnd: number;
    contentHash: string;
    contentText: string;
    extractionMode: "semantic";
};

type ContextEntry = {
    nodeType: string;
    symbolName: string | null;
};

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

const CONTEXT_NODE_TYPES = new Set(["mod_item", "trait_item", "impl_item"]);

export async function extractRustStructuralBlocks(
    sourceText: string
): Promise<RustStructuralBlock[]> {
    const parser = await getRustParser();
    const tree = parser.parse(sourceText);
    const sourceBuffer = Buffer.from(sourceText, "utf8");
    const results: RustStructuralBlock[] = [];

    visitNode(tree.rootNode, []);

    return results;

    function visitNode(node: any, contextStack: ContextEntry[]) {
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

        for (let i = 0; i < node.namedChildCount; i += 1) {
            const child = node.namedChild(i);
            if (child) {
                visitNode(child, currentContextStack);
            }
        }
    }
}

function extractBlock(
    node: any,
    contextStack: ContextEntry[],
    sourceBuffer: Buffer
): RustStructuralBlock | null {
    const blockKind = mapBlockKind(node, contextStack);
    if (!blockKind) {
        return null;
    }

    const symbolName = getSymbolName(node, sourceBuffer);
    const parentSymbol = getNearestParentSymbol(contextStack);
    const contentText = sliceNodeText(node, sourceBuffer);
    const contentHash = crypto.createHash("sha256").update(contentText).digest("hex");

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

function mapBlockKind(
    node: any,
    contextStack: ContextEntry[]
): RustStructuralBlock["blockKind"] | null {
    switch (node.type) {
        case "function_item": {
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

function getSymbolName(node: any, sourceBuffer: Buffer) {
    switch (node.type) {
        case "function_item":
        case "struct_item":
        case "enum_item":
        case "trait_item":
        case "mod_item":
        case "type_item":
        case "const_item":
        case "static_item": {
            const nameNode = node.childForFieldName("name");
            return nameNode ? sliceNodeText(nameNode, sourceBuffer).trim() : null;
        }

        case "impl_item":
            return getImplDisplayName(node, sourceBuffer);

        default:
            return null;
    }
}

function getImplDisplayName(node: any, sourceBuffer: Buffer) {
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

function getNearestParentSymbol(contextStack: ContextEntry[]) {
    for (let i = contextStack.length - 1; i >= 0; i -= 1) {
        if (contextStack[i]?.symbolName) {
            return contextStack[i].symbolName;
        }
    }

    return null;
}

function sliceImplHeader(node: any, sourceBuffer: Buffer) {
    const fullText = sliceNodeText(node, sourceBuffer);
    const braceIndex = fullText.indexOf("{");
    if (braceIndex === -1) {
        return fullText.trim();
    }

    return fullText.slice(0, braceIndex).trim();
}

function sliceNodeText(node: any, sourceBuffer: Buffer) {
    return sourceBuffer.subarray(node.startIndex, node.endIndex).toString("utf8");
}

function compactWhitespace(value: string) {
    return value.replace(/\s+/g, " ").trim();
}