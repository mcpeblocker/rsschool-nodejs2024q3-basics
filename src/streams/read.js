import fs from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * read.js
 * - implement function that reads file fileToRead.txt content
 * using Readable Stream and
 * prints it's content into process.stdout
 */
const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");
  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  stream.on("data", (chunk) => {
    console.log(chunk);
  });
};

await read();
