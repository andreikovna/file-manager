import { getPath } from "../utils/getPath.js";
import path from "path";
import { rename as renameFile, access } from "node:fs/promises";

export const rename = async (currentPath, pathToFile, newFileName) => {
   try {
    const fileToRename = getPath(currentPath, pathToFile);
    const newFilePath = path.join(path.dirname(fileToRename), newFileName);
    await access(fileToRename);
    const isNewFileExist = await access(newFilePath)
      .then(() => true)
      .catch(() => false);
    if (!isNewFileExist) {
      await renameFile(fileToRename, newFilePath);
      console.log(`File was renamed to ${newFileName}`);
    } else {
        throw new Error();
    }
  } catch (err) {
    console.log("Operation failed");
  }
};
