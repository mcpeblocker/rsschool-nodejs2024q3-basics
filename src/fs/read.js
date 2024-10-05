import fsPromises from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const exists = async (pathname) => {
  try {
    await fsPromises.access(pathname);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * read.js
 * - implement function that prints
 * content of the fileToRead.txt into console
 * (if there's no file fileToRead.txt Error with message FS operation failed must be thrown)
 */
const read = async () => {
  const pathname = join(__dirname, "files", "fileToRead.txt");
  if (!(await exists(pathname))) {
    throw new Error("FS operation failed");
  }
  const content = await fsPromises.readFile(pathname, { encoding: "utf8" });
  console.log(content);
};

await read();
