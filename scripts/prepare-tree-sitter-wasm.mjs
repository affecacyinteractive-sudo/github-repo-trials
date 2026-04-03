import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const parsersDir = path.join(publicDir, "parsers");

await fs.mkdir(parsersDir, { recursive: true });

const coreWasmCandidates = [
    path.join(root, "node_modules", "web-tree-sitter", "web-tree-sitter.wasm"),
    path.join(root, "node_modules", "web-tree-sitter", "debug", "web-tree-sitter.wasm")
];

const coreWasmSource = coreWasmCandidates.find((candidate) => existsSync(candidate));

if (!coreWasmSource) {
    throw new Error(
        [
            "Could not find web-tree-sitter.wasm in web-tree-sitter.",
            "Checked:",
            ...coreWasmCandidates.map((p) => `- ${p}`)
        ].join("\n")
    );
}

const coreWasmDest = path.join(publicDir, "web-tree-sitter.wasm");
await fs.copyFile(coreWasmSource, coreWasmDest);

const rustWasmCandidates = [
    path.join(root, "node_modules", "tree-sitter-wasms", "out", "tree-sitter-rust.wasm")
];

const rustWasmSource = rustWasmCandidates.find((candidate) => existsSync(candidate));

if (!rustWasmSource) {
    throw new Error(
        [
            "Could not find prebuilt tree-sitter-rust.wasm.",
            "Checked:",
            ...rustWasmCandidates.map((p) => `- ${p}`),
            "Make sure tree-sitter-wasms is installed."
        ].join("\n")
    );
}

const rustWasmDest = path.join(parsersDir, "tree-sitter-rust.wasm");
await fs.copyFile(rustWasmSource, rustWasmDest);

console.log("Prepared wasm assets:");
console.log(`- ${coreWasmDest}`);
console.log(`- ${rustWasmDest}`);