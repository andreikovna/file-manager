import { getPath } from "../utils/getPath.js";
import * as fs from "fs";
import * as zlib from "zlib";
import * as path from "path";
import { access } from "node:fs/promises";

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
    const fileName = `${path.basename(fileToCompress).split(".")[0]}.br`;
    const newFilePath = await getPath(currentPath, pathToDestination);
    const readStream = fs.createReadStream(fileToCompress, "utf-8");
    const writeStream = fs.createWriteStream(path.join(newFilePath, fileName));
    const archivator = zlib.createBrotliCompress();

    readStream
      .pipe(archivator)
      .pipe(writeStream)
      .on("finish", () => {
        fs.rm(fileToCompress, () => console.log("Done!"));
      });
  } catch (err) {
    console.log("Operation failed");
  }
};
