import zlib from "node:zlib";
import stream from "node:stream/promises";
import fs from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * decompress.js
 * - implement function that decompresses archive.gz
 * back to the fileToCompress.txt with same content
 * as before compression using zlib and Streams API
 */
const decompress = async () => {
  const filePath = join(__dirname, "files", "fileToCompress.txt");
  const compressionPath = join(__dirname, "files", "archive.gz");
  const sourceStream = fs.createReadStream(compressionPath);
  const destinationStream = fs.createWriteStream(filePath);
  const unzip = zlib.createUnzip();

  await stream.pipeline(sourceStream, unzip, destinationStream);
};

await decompress();
