const { pipeline } = require("stream/promises");
const { Writable } = require("stream");
const fs = require("fs");

console.profile("5-async-generators");
const start = process.hrtime();
const readStream = fs.createReadStream("access.log");
const writeStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(`[Async-Generators] Received ${chunk.length} bytes of data.`);
    callback();
  },
});

async function* asyncGenerator() {
  yield* readStream;
}

(async function IIF() {
  await pipeline(asyncGenerator(), writeStream).catch((err) => {
    console.error("[Async-Generators] An error occurred:", err);
  });
  console.log("[Async-Generators] Finished reading the file.");
  console.profileEnd("5-async-generators");
  const end = process.hrtime(start);
  console.log(`Tempo de execução: ${end[0]}s ${end[1] / 1000000}ms`);
})();
