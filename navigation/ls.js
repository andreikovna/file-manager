import { readdir } from "node:fs/promises";

export const nav_ls = async (currentPath) => {
  const columns = ["name", "type"];
  try {
    const files = await readdir(currentPath, { withFileTypes: true });
    const resultTable = files
      .map((file) => {
        return { name: file.name, type: file.isFile() ? "file" : "directory" };
      })
      .sort((a, b) => (a.name > b.name ? -1 : 1))
      .sort((a, b) => (a.type > b.type ? 1 : -1));
    console.table(resultTable, columns);
  } catch (err) {
    console.log("Operation failed");
  }
};
