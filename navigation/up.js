import path from "path";

export const nav_up = (prevPath) => {
  const newPath = prevPath.split(path.sep);
  newPath.pop();
  return newPath.length > 1 ? newPath.join(path.sep) : `${newPath[0]}${path.sep}`;
};
