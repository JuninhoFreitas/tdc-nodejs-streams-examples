const {pipeline, Writable} = require('stream');
const fs = require('fs');

console.profile('3-pipeline')
const start = process.hrtime();
const readStream = fs.createReadStream('access.log');

const writeStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(`[Pipeline] Received ${chunk.length} bytes of data.`);
        callback();
    }
    });

pipeline(readStream, writeStream, (err) => {
    if (err) {
        console.error('[Pipeline] An error occurred:', err);
    } else {
        console.log('[Pipeline] Finished reading the file.');
        console.profileEnd('3-pipeline')
        const end = process.hrtime(start);
        console.log(`Tempo de execução: ${end[0]}s ${end[1] / 1000000}ms`);
    }
}
);
