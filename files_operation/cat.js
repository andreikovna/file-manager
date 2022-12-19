import * as fs from "fs";
import { getPath } from "../utils/getPath.js";

export const cat = async (currentPath, filePath) => {
  const { stdout } = process;
  try {
    const fileToRead = getPath(currentPath, filePath);
    const readStream = fs.createReadStream(fileToRead, "utf-8");
    await new Promise((resolve, reject) => {
      readStream.on("data", (chunk) => {
        stdout.write(chunk);
      });
      readStream.on("error", () => {
        reject();
      });
      readStream.on("end", () => {
        console.log("\n");
        resolve();
      });
    });
  } catch (err) {
    console.log("Operation failed");
  }
};
