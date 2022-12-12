import * as path from "path";

export const getPath = (currentPath, newPath) => {
  return path.isAbsolute(newPath)
    ? newPath
    : path.join(currentPath, newPath);
};
