import { copy } from "./copy.js";
import { del } from "./delete.js";

export const move = async (currentPath, pathToFile, pathToNewDirectory) => {
  try {
    await copy(currentPath, pathToFile, pathToNewDirectory);
    await del(currentPath, pathToFile);
    console.log("File Moved");
  } catch (err) {
    console.log("Operation Failed");
  }
};
