import * as path from "path";

export const getPath = (currentPath, newPath) => {
  if (!newPath) return;
  if (newPath.length === 2 && newPath[1] === ':') {
    return `${newPath}\\`;
  }
  return path.isAbsolute(newPath)
    ? newPath
    : path.join(currentPath, newPath);
};
