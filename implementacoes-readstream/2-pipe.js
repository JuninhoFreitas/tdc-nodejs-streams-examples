const fs = require('fs');
const { Writable } = require('stream');

console.profile('2-pipe')
const start = process.hrtime();

const readStream = fs.createReadStream('access.log');

const writeStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(`[Pipe] Received ${chunk.length} bytes of data.`);
    callback();
  }
});

readStream.pipe(writeStream).on('finish', () => {
  console.log('[Pipe] Finished reading the file.');
  console.profileEnd('2-pipe')
  const end = process.hrtime(start);
  console.log(`Tempo de execução: ${end[0]}s ${end[1] / 1000000}ms`);
});
