import fs from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * write.js
 * - implement function that writes process.stdin data
 * into file fileToWrite.txt content
 * using Writable Stream
 */
const write = async () => {
  const filePath = join(__dirname, "files", "fileToWrite.txt");
  const stream = fs.createWriteStream(filePath, { encoding: "utf8" });
  process.stdin.pipe(stream);
  console.log(
    "The input console has been piped into the file.\n * Any line you write here will appear in fileToWrite.txt after you move on to the next line"
  );
  console.log("Use Ctr+C combination to end the input");
};

await write();
