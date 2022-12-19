import * as fs from "fs";
import * as zlib from "zlib";
import { getPath } from "../utils/getPath.js";
import { access } from "node:fs/promises";
import path from "path";
import { pipeline } from "stream/promises";

export const decompressFile = async (
  currentPath,
  pathToFile,
  pathToDestination
) => {
  try {
    const fileToDecompress = await getPath(currentPath, pathToFile);
    await access(fileToDecompress).catch(() => {
      throw new Error();
    });
    const fileName = fileToDecompress.split(path.sep).pop().slice(0, -3);
    const decompressedPath = await getPath(currentPath, pathToDestination);
    const readStream = fs.createReadStream(fileToDecompress);
    const writeStream = fs.createWriteStream(path.join(decompressedPath, fileName));

    await pipeline(readStream, zlib.createBrotliDecompress(), writeStream);
    console.log("Restored!");
  } catch (err) {
    console.log("Operation failed", err);
  }
};
