const { pipeline } = require("stream/promises");
const { Writable } = require("stream");
const fs = require("fs");

(async function IIF() {
  console.profile("4-pipeline-async");
  const start = process.hrtime();
  const readStream = fs.createReadStream("access.log");
  const writeStream = new Writable({
    write(chunk, encoding, callback) {
      console.log(`[Pipeline-Async] Received ${chunk.length} bytes of data.`);
      callback();
    },
  });

  await pipeline(readStream, writeStream).catch((err) => {
    console.error("[Pipeline-Async] An error occurred:", err);
  });
  console.log("[Pipeline-Async] Finished reading the file.");
  console.profileEnd("4-pipeline-async");
  const end = process.hrtime(start);
  console.log(`Tempo de execução: ${end[0]}s ${end[1] / 1000000}ms`);
})();
