import { Transform } from "stream";

/**
 * transform.js
 * - implement function that reads data from process.stdin,
 * reverses text using Transform Stream
 * and then writes it into process.stdout
 */
const transform = async () => {
  // Write your code here
  const stream = new Transform({
    transform(data, _, callback) {
      const reversedData = data.toString().trim().split("").reverse().join("");
      this.push(reversedData + "\n");
      callback();
    },
  });

  process.stdin.pipe(stream).pipe(process.stdout);
  console.log("Write anything and move to the next line to get its reverse!");
};

await transform();
