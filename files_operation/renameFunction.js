// import { readdir } from "node:fs/promises";
// import { rename as renameFile } from "node:fs/promises";

// const pathToRead = './files_operation';
// const columns = ["name", "type"];

// const files = await readdir(pathToRead, { withFileTypes: true });
// const resultTable = files
//   .map((file) => {
//     return { name: file.name };
//   })
//   .sort((a, b) => (a.name > b.name ? -1 : 1))

//   files.forEach(async (file) => {
//     await renameFile(file, newFilePath);
//   })
// console.table(resultTable, columns);

import path from "path";
import { rename as renameFile, access } from "node:fs/promises";
import { readdir } from "node:fs/promises";

export const renameAll = async (currentPath) => {
  console.log(currentPath);
  try {
    const files = await readdir(currentPath, { withFileTypes: true });
    const sorted = files.sort((a, b) => a.name - b.name);
    const nameArr = sorted.map((item, index) => {
      if (index === 0) {
        return "a";
      } else if (index % 3 === 1) {
        return "b";
      } else if (index % 3 === 0) {
        return "a";
      } else {
        return "c";
      }
    });

    const withNumbers = nameArr.map((item, index) => {
      const number = index / 3 + 1;
      return Math.floor(number) + item;
    });

    sorted.forEach(async (file, index) => {
      const newFileName = `${withNumbers[index]}${path.extname(file.name)}`;
      const currentFilePath = path.join(currentPath, file.name);
      const newFilePath = path.join(currentPath, newFileName);
      await renameFile(currentFilePath, newFilePath);
    });
  } catch (err) {
    console.log("Operation failed");
  }
};
