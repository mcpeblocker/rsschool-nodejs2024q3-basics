import fsPromises from "node:fs/promises";
import { createHmac } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
  const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");
  const content = await fsPromises.readFile(filePath, { encoding: "utf8" });

  const secret = "abcdefg";
  const hash = createHmac("sha256", secret).update(content).digest("hex");
  console.log(hash);
};

await calculateHash();
