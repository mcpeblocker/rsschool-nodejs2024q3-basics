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
 * delete.js
 * - implement function that deletes file fileToRemove.txt
 * (if there's no file fileToRemove.txt Error with message FS operation failed must be thrown)
 */
const remove = async () => {
  const pathname = join(__dirname, "files", "fileToRemove.txt");
  if (!(await exists(pathname))) {
    throw new Error("FS operation failed");
  }
  fsPromises.rm(pathname);
};

await remove();
