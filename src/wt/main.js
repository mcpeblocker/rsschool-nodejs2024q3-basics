/**
 * main.js 
 * - implement function that creates number of worker threads 
 * (equal to the number of host machine logical CPU cores) 
 * from file worker.js and able 
 * to send data to those threads and 
 * to receive result of the computation from them. 
 * You should send incremental number starting from 10 to each worker. 
 * For example: 
 * on host machine with 4 cores you should create 4 workers and 
 * send 10 to first worker, 
 * 11 to second worker, 
 * 12 to third worker, 
 * 13 to fourth worker. 
 * After all workers will finish, function should log array of results into console. 
 * The results are array of objects with 2 properties:
    status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
    data - value from worker in case of success or null in case of error in worker
    
 ! The results in the array must be in the same order that the workers were created
 */

import workers from "node:worker_threads";
import os from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  const cpus = os.cpus();
  const workerPath = join(__dirname, "worker.js");
  const results = cpus.map((_, i) => ({
    data: null,
    resolve: null,
  }));
  const promises = results.map(
    (_, i) =>
      new Promise((resolve) => {
        results[i].resolve = resolve;
      })
  );
  for (const index in results) {
    const n = parseInt(index) + 10;
    const worker = new workers.Worker(workerPath, { workerData: n });
    worker.once("message", (result) => {
      results[index].data = result;
    });
    worker.once("exit", (exitCode) => {
      const { resolve, data } = results[index];
      if (!resolve) return;
      if (exitCode === 1) {
        // worker has been terminated with error
        resolve({
          status: "error",
          data: null,
        });
      } else {
        resolve({
          status: "resolved",
          data,
        });
      }
    });
  }
  const finalResult = await Promise.all(promises);
  console.log(finalResult);
};

await performCalculations();
