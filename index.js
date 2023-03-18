import {
  COMPRESS,
  DECOMPRESS,
  EXIT,
  FO_SERVICE,
  HASH,
  NAV_SERVICE,
  OS,
} from "./utils/constants.js";
import { getHomeDirectory } from "./utils/getHomeDirectory.js";
import { getUserName } from "./utils/getUserName.js";
import { nav_cd, nav_up, nav_ls } from "./navigation/index.js";
import { cat, add, rename, copy, del, move } from "./files_operation/index.js";
import { os_functions } from "./operation_system/os_functions.js";
import { getHush } from "./other/getHush.js";
import { compressFile } from "./other/compressFile.js";
import { decompressFile } from "./other/decompressFile.js";
import { renameAll } from "./files_operation/renameFunction.js";

const { stdout, stdin } = process;

const app = async () => {
  let currentPath = getHomeDirectory();
  const userName = getUserName();
  const logCurrentPath = (path) => `You are currently in ${path}`;

  stdout.write(
    `Welcome to the File Manager, ${userName}!\n${logCurrentPath(
      currentPath
    )}\n`
  );

  stdin.on("data", async (data) => {
    const receivedData = data.toString().trim();
    let command;
    let argument;
    let argument2;
    let argumentsLine = receivedData.split(" ").map((item) => item.trim());
    command = argumentsLine.shift();
    argumentsLine = argumentsLine.join(" ").trim();

    const quotasFound = [...argumentsLine.matchAll(/["]/g)].length;
    if (quotasFound % 2 > 0) {
      console.log("Operation failed");
      command = null;
    } else {
      const smth = argumentsLine.includes(`"`)
        ? argumentsLine
            .split(`"`)
            .filter((item) => item !== "" && item !== " ")
            .map((item) => item.trim())
        : argumentsLine.split(" ").map((item) => item.trim());
      [argument, argument2] = smth;
    }

    switch (command) {
      case EXIT: {
        process.exit();
      }
      case NAV_SERVICE.up: {
        currentPath = nav_up(currentPath);
        break;
      }
      case NAV_SERVICE.cd: {
        currentPath = await nav_cd(currentPath, argument);
        break;
      }
      case NAV_SERVICE.ls: {
        await nav_ls(currentPath);
        break;
      }
      case FO_SERVICE.cat: {
        await cat(currentPath, argument);
        break;
      }
      case FO_SERVICE.add: {
        await add(currentPath, argument);
        break;
      }
      case FO_SERVICE.rename: {
        await rename(currentPath, argument, argument2);
        break;
      }
      case FO_SERVICE.renameAll: {
        await renameAll(currentPath);
        break;
      }
      case FO_SERVICE.copy: {
        await copy(currentPath, argument, argument2);
        break;
      }
      case FO_SERVICE.delete: {
        await del(currentPath, argument);
        break;
      }
      case FO_SERVICE.move: {
        await move(currentPath, argument, argument2);
        break;
      }
      case OS: {
        os_functions(argument);
        break;
      }
      case HASH: {
        await getHush(currentPath, argument);
        break;
      }
      case COMPRESS: {
        await compressFile(currentPath, argument, argument2);
        break;
      }
      case DECOMPRESS: {
        await decompressFile(currentPath, argument, argument2);
        break;
      }
      default:
        console.log("Operation failed");
        break;
    }

    console.log(`You are currently in ${currentPath}`);
  });

  process.on("SIGINT", function () {
    process.exit();
  });
  process.on("exit", () =>
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  );
};

app();
