import cp from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args = []) => {
  const filePath = join(__dirname, "files", "script.js");
  const child = cp.execFile("node", [filePath, ...args]);
  child.stdout.on("data", (data) => {
    console.log(`Child process:\n${data.toString()}`);
  });
  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
  });
  process.stdin.on("data", (data) => {
    child.stdin.write(data);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, 2, 3, "Hello, world!"]);
