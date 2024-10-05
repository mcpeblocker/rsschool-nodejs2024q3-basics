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
 * list.js
 * - implement function that prints all array of filenames
 * from files folder into console
 * (if files folder doesn't exists Error with message FS operation failed must be thrown)
 */
const list = async () => {
  const pathname = join(__dirname, "files");
  if (!(await exists(pathname))) {
    throw new Error("FS operation failed");
  }
  const files = await fsPromises.readdir(pathname);
  console.log(files);
};

await list();
