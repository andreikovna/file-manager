import { dirname } from "path";
import { argv, stdout, stdin } from "process";
import { fileURLToPath } from "url";
import { EXIT, NAV_SERVICE } from "./utils/constants";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = () => {
  const userName = argv[2].split("=")[1];
  let currentPath = __dirname;

  const logCurrentPath = (path) => `You are currently in ${path}`;
  stdout.write(
    `Welcome to the File Manager, ${userName}!\n\n${logCurrentPath(
      currentPath
    )}\n`
  );

  stdin.on("data", (data) => {
    const receivedData = data.toString().trim();
    switch (receivedData) {
      case EXIT: {
        process.exit();
      }
      case NAV_SERVICE.up: {
        stdout.write(`UPPPPP\n`);
      }
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
