import { dirname } from "path";
import { fileURLToPath } from "url";
import { EXIT, NAV_SERVICE } from "./utils/constants.js";
import { getHomeDirectory } from "./utils/getHomeDirectory.js";
import { getUserName } from "./utils/getUserName.js";
import { nav_cd, nav_up, nav_ls } from "./navigation/index.js";

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
    const [command, argument] = receivedData
      .split(" ")
      .map((item) => item.trim());
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
      default: console.log('Operation failed');
      break;
    }

    console.log(`You are currently in ${currentPath}`);
  });

  process.on("SIGINT", function () {
    process.exit();
  });
  process.on("exit", () =>
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!`)
  );
};

app();
