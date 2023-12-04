const { pipeline } = require("node:stream/promises");
const fs = require("node:fs");
const zlib = require("node:zlib");

async function run() {
  await pipeline(
    fs.createReadStream("archive.tar"),
    zlib.createGzip(),
    fs.createWriteStream("archive.tar.gz")
  ).catch((err) => {
    console.error("Pipeline failed.", err);
  });

  console.log("Pipeline succeeded.");
}

run().catch(console.error);
