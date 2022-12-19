import { rm, access } from "node:fs/promises";
import { getPath } from "../utils/getPath.js";

export const del = async (currentPath, pathToDelete) => {
  const filePathToDelete = getPath(currentPath, pathToDelete);
  await access(filePathToDelete)
    .then(async () => {
        await rm(filePathToDelete);
        console.log('File deleted');
    })
    .catch(() => {
      console.log("Operation failed");
    });
};
