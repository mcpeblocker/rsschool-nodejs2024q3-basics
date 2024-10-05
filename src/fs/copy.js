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
 * copy.js
 * - implement function that copies
 * folder files files with all its content
 * into folder files_copy at the same level
 * (if files folder doesn't exists
 * or files_copy has already been created
 * Error with message FS operation failed must be thrown)
 */
const copy = async () => {
  const sourcePath = join(__dirname, "files");
  const destinationPath = join(__dirname, "files_copy");
  if (!(await exists(sourcePath)) || (await exists(destinationPath))) {
    throw new Error("FS operation failed");
  }
  await fsPromises.cp(sourcePath, destinationPath, { recursive: true });
};

await copy();
