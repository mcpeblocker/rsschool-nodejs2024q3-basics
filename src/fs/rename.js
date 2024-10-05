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
 * rename.js
 * - implement function that renames file
 * wrongFilename.txt to properFilename with extension .md
 * (if there's no file wrongFilename.txt
 * or properFilename.md already exists
 * Error with message FS operation failed must be thrown)
 */
const rename = async () => {
  const sourcePath = join(__dirname, "files", "wrongFilename.txt");
  const destinationPath = join(__dirname, "files", "properFilename.md");
  if (!(await exists(sourcePath)) || (await exists(destinationPath))) {
    throw new Error("FS operation failed");
  }
  await fsPromises.rename(sourcePath, destinationPath);
};

await rename();
