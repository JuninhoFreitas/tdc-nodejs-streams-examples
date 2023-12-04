const { pipeline } = require("stream/promises");
const fs = require("node:fs");
const zlib = require("node:zlib");

const readStream = fs.createReadStream("access.log");

async function* readFile() {
  for await (const chunk of readStream) {
    chunk.setEncoding('utf8')
    yield chunk;
  }
}

async function* gzip() {
  for await (const chunk of zlib.createGzip()) {
    yield chunk;
  }
}

async function* writeFile() {
  for await (const chunk of fs.createWriteStream("archive.tar.gz3")) {
    yield chunk;
  }
}

async function* run() {
  await pipeline(readStream, gzip, writeFile).then(() => {
    console.log("Finished reading the file.");
  }).catch(err=>{
    console.error("An error occurred:", err);
  })
}

(async()=>{
    for await (const chunk of run()) {
        console.log(chunk.toString())
        // Do something with the chunk if needed
    }
})

// async function* run() {
//   try {

//     for await (const chunk of readStream.pipe(gzipStream)) {
//       writeStream.write(chunk);
//       yield chunk;
//     }
//   } catch (err) {
//     console.error("Pipeline failed.", err);
//   }
//   console.log("Pipeline succeeded.");
// }

// (async () => {
//   for await (const chunk of run()) {
//     console.log(chunk.toString())
//     // Do something with the chunk if needed
//   }
// })();
