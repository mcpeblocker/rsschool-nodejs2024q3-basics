import zlib from "node:zlib";
import stream from "node:stream/promises";
import fs from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * compress.js
 * - implement function that compresses file fileToCompress.txt
 * to archive.gz using zlib and Streams API
 */
const compress = async () => {
  const filePath = join(__dirname, "files", "fileToCompress.txt");
  const compressionPath = join(__dirname, "files", "archive.gz");
  const sourceStream = fs.createReadStream(filePath);
  const destinationStream = fs.createWriteStream(compressionPath);
  const gzip = zlib.createGzip();

  await stream.pipeline(sourceStream, gzip, destinationStream);
};

await compress();
