import path from "path";
import { nav_up } from "./up.js";
import { access } from "fs/promises";

export const nav_cd = async (prevPath, newPath) => {
  if (newPath === "..") {
    return nav_up(prevPath);
  }

  const currentPath = path.isAbsolute(newPath)
    ? newPath
    : path.join(prevPath, newPath);
    
  try {
    await access(currentPath);
    return currentPath;
  } catch (err) {
    console.log("Operation failed");
    return prevPath;
  }
};
