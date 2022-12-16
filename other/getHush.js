import { promises as fs } from "fs";
import { createHash } from "crypto";
import { getPath } from "../utils/getPath.js";

export const getHush = async (currentPath, path) => {
  try {
    const pathToFile = await getPath(currentPath, path);
    const fileToCalculate = await fs.readFile(pathToFile, "utf8");
    const result = createHash("sha256").update(fileToCalculate).digest("hex");
    await new Promise((resolve) => {
      console.log(result);
      resolve();
    });
  } catch (err) {
    console.log("Operation failed");
  }
};
