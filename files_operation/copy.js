import { getPath } from "../utils/getPath.js";
import { stat, access } from "node:fs/promises";
import path from "path";
import fs from "fs";

export const copy = async (currentPath, pathToFile, newPath) => {
  const fileToCopy = getPath(currentPath, pathToFile);
  const newFileDirectory = getPath(currentPath, newPath);

  try {
    const isFile = (await stat(fileToCopy)).isFile();
    const fileName = path.basename(fileToCopy);
    const isDirectory = (await stat(newFileDirectory)).isDirectory();
    const newFilePath = path.join(newFileDirectory, fileName);
    const isFileExist = await access(newFilePath)
      .then(() => {
        console.log("Operation failed, file already exists\n");
        return true;
      })
      .catch(() => false);

    if (isFile && isDirectory && !isFileExist) {
      const readableStream = fs.createReadStream(fileToCopy);
      const writableStream = fs.createWriteStream(newFilePath);

      await new Promise((resolve, reject) => {
        readableStream.pipe(writableStream).on("close", () => {
          console.log(`File copied ${fileName}\n`);
          resolve();
        });
      });
    }
  } catch (err) {
    console.log("Operation failed\n");
  }
};
