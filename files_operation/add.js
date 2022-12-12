import fs from "fs";
import path from "path";
import { access } from "node:fs/promises";

export const add = async (currentPath, newFile) => {
  try {
    const fileToCreate = path.join(currentPath, newFile);
    const isFileExist = await access(fileToCreate)
      .then(() => true)
      .catch(() => false);
    if (!isFileExist) {
      const writeStream = fs.createWriteStream(fileToCreate);
      writeStream.end();
      console.log(`File ${newFile} was created`);
      
    } else {
        throw new Error();
    }
  } catch (err) {
    console.log(`File ${newFile} already exists`);
    console.log("Operation failed");
  }
};
