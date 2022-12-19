import { getPath } from "../utils/getPath.js";
import * as fs from "fs";
import * as zlib from "zlib";
import * as path from "path";
import { access } from "node:fs/promises";
import { pipeline } from "stream/promises";

export const compressFile = async (
  currentPath,
  pathToFile,
  pathToDestination
) => {
  try {
    const fileToCompress = await getPath(currentPath, pathToFile);
    await access(fileToCompress).catch(() => {
      throw new Error();
    });

    const fileName = `${path.basename(fileToCompress)}.br`;
    const newFilePath = await getPath(currentPath, pathToDestination);

    const readStream = fs.createReadStream(fileToCompress, "utf-8");
    const writeStream = fs.createWriteStream(path.join(newFilePath, fileName));
    const archivator = zlib.createBrotliCompress({
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MIN_QUALITY,
      },
    });

    await pipeline(readStream, archivator, writeStream);
    console.log("Done!");
  } catch (err) {
    console.log("Operation failed");
  }
};
