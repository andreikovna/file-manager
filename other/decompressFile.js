import * as fs from "fs";
import * as zlib from "zlib";
import { getPath } from "../utils/getPath.js";
import { access } from "node:fs/promises";

export const decompressFile = async (
  currentPath,
  pathToFile,
  pathToDestination
) => {
  try {
    const fileToDecompress = await getPath(currentPath, pathToFile);
    const decompressedPath = await getPath(currentPath, pathToDestination);
    await access(fileToDecompress).catch(() => {
        throw new Error();
      });
    const readStream = fs.createReadStream(fileToDecompress);
    const writeStream = fs.createWriteStream(decompressedPath);

    readStream
      .pipe(zlib.createBrotliDecompress())
      .pipe(writeStream)
      .on("finish", () => {
        fs.rm(fileToDecompress, () => console.log("Restored!"));
      });
  } catch (err) {
    console.log("Operation failed");
  }
};
