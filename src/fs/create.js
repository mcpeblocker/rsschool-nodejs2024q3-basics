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
 * create.js
 * - implement function that creates
 * new file fresh.txt with content
 * I am fresh and young
 * inside of the files folder
 * (if file already exists Error with message FS operation failed must be thrown)
 */
const create = async () => {
  const filename = join(__dirname, "files", "fresh.txt");
  const content = "I am fresh and young";
  if (await exists(filename)) {
    throw new Error("FS operation failed");
  }
  await fsPromises.appendFile(filename, content);
};

await create();
