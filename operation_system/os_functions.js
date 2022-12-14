import { OS_SERVICE } from "../utils/constants.js";
import os from "node:os";
import { getHomeDirectory } from "../utils/getHomeDirectory.js";

export const os_functions = (command) => {
  switch (command) {
    case OS_SERVICE.eol: {
      console.log(`End-Of-Line: ${JSON.stringify(os.EOL)}`);
      break;
    }
    case OS_SERVICE.cpus: {
      const CPUs = os.cpus();
      console.log(`Overall amount of CPUS: ${CPUs.length}`);
      console.table(
        CPUs.map((cpu) => {
          return { model: cpu.model, speed: Math.floor(cpu.speed / 1000) };
        })
      );
      break;
    }
    case OS_SERVICE.homedir: {
      console.log(`Current homedir: ${getHomeDirectory()}`);
      break;
    }
    case OS_SERVICE.username: {
      console.log(`Current system user name: ${os.userInfo().username}`);
      break;
    }
    case OS_SERVICE.architecture: {
      console.log(`CPU architecture: ${os.arch()}`);
      break;
    }
    default:
      console.log("Operation failed");
      break;
  }
};
