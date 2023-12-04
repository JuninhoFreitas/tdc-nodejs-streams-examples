const { pipeline } = require("stream");
const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("archive.tar")

pipeline(
    readStream,
  fs.createReadStream("archive.tar"),
  zlib.createGzip(),
  fs.createWriteStream("archive.tar.gz"),
  (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.log("Pipeline succeeded.");
    }
  } 
);

readStream.on('error', (err)=>{
    console.error('Erro na Read Stream', err)
});