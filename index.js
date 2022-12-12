import { dirname } from "path";
import { fileURLToPath } from "url";
import { EXIT, FO_SERVICE, NAV_SERVICE } from "./utils/constants.js";
import { getHomeDirectory } from "./utils/getHomeDirectory.js";
import { getUserName } from "./utils/getUserName.js";
import { nav_cd, nav_up, nav_ls } from "./navigation/index.js";
import { cat, add } from "./files_operation/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    const [command, argument] =
      receivedData.includes(`"`) || receivedData.includes(`'`)
        ? receivedData.split(/'|"/).map((item) => item.trim())
        : receivedData.split(" ").map((item) => item.trim());
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
