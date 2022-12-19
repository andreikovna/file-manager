import { getPath } from "../utils/getPath.js";
import * as fs from "fs";
import * as zlib from "zlib";
import { access } from "node:fs/promises";
import { pipeline } from "stream/promises";

export const compressFile = async (
  currentPath,
  pathToFile,
  pathToDestination
) => {
  try {
    const fileToCompress = await getPath(currentPath, pathToFile);
    const newFilePath = await getPath(currentPath, pathToDestination);
    await access(fileToCompress).catch(() => {
      throw new Error();
    });

    const readStream = fs.createReadStream(fileToCompress, "utf-8");
    const writeStream = fs.createWriteStream(newFilePath);
    const archivator = zlib.createBrotliCompress({
      params: {
        [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
      },
    });
    await pipeline(readStream, archivator, writeStream);
    console.log("Done!");
  } catch (err) {
    console.log("Operation failed");
  }
};
