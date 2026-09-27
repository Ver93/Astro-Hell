import fs from "fs";
import path from "path";

const TARGET_FOLDERS = [
    "src",
];

const VALID_EXTENSIONS = [
    ".js",
    ".jsx",
    ".css"
];

const IGNORED_FOLDERS = new Set([
    "node_modules",
    "dist",
    "build",
    "out",
    ".git",
    ".next",
    ".vite",
    "coverage"
]);

let totalFiles = 0;

function countLinesInFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8");

    let count = 0;
    let inBlockComment = false;

    for (const line of content.split(/\r?\n/)) {
        let code = "";
        let i = 0;

        while (i < line.length) {
            const char = line[i];
            const next = line[i + 1];

            if (inBlockComment) {
                if (char === "*" && next === "/") {
                    inBlockComment = false;
                    i += 2;
                } else {
                    i++;
                }

                continue;
            }

            if (char === "/" && next === "*") {
                inBlockComment = true;
                i += 2;
                continue;
            }

            if (char === "/" && next === "/") {
                break;
            }

            code += char;
            i++;
        }

        if (code.trim().length > 0) {
            count++;
        }
    }

    return count;
}

function walkDir(dirPath) {
    let total = 0;

    const entries = fs.readdirSync(dirPath, {
        withFileTypes: true
    });

    for (const entry of entries) {
        if (
            entry.isDirectory() &&
            IGNORED_FOLDERS.has(entry.name)
        ) {
            continue;
        }

        const fullPath = path.join(
            dirPath,
            entry.name
        );

        if (entry.isDirectory()) {
            total += walkDir(fullPath);
            continue;
        }

        if (
            !VALID_EXTENSIONS.includes(
                path.extname(entry.name)
            )
        ) {
            continue;
        }

        const lines = countLinesInFile(fullPath);

        total += lines;
        totalFiles++;

        console.log(
            `${lines.toString().padStart(5)} ${path.relative(process.cwd(), fullPath)}`
        );
    }

    return total;
}

function main() {
    const root = process.cwd();

    let grandTotal = 0;

    for (const folder of TARGET_FOLDERS) {
        const folderPath = path.join(
            root,
            folder
        );

        if (!fs.existsSync(folderPath)) {
            console.log(
                `Skipping missing folder: ${folder}`
            );

            continue;
        }

        const beforeFiles = totalFiles;

        const count = walkDir(folderPath);

        const files = totalFiles - beforeFiles;

        grandTotal += count;

        console.log(
            `${folder}: ${count} code lines (${files} files)`
        );

        console.log("");
    }

    console.log("------------------------------");
    console.log(`FILES: ${totalFiles}`);
    console.log(`TOTAL: ${grandTotal} code lines`);
    console.log(`Mean: ${grandTotal / totalFiles}`);
}

main();