import { nav_up } from "./up.js";
import { access } from "fs/promises";
import { getPath } from "../utils/getPath.js";

export const nav_cd = async (prevPath, newPath) => {
  if (newPath === "..") {
    return nav_up(prevPath);
  }

  const currentPath = getPath(prevPath, newPath);
    
  try {
    await access(currentPath);
    return currentPath;
  } catch (err) {
    console.log("Operation failed");
    return prevPath;
  }
};
