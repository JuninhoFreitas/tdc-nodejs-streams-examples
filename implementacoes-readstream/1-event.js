const fs = require('fs');

console.profile('1-event')
const start = process.hrtime();
const readStream = fs.createReadStream('access.log');

readStream.on('data', (chunk) => {
  console.log(`[Event] Received ${chunk.length} bytes of data.`);
});

readStream.on('end', () => {
  console.log('[Event] Finished reading the file.');
  console.profileEnd('1-event')
  const end = process.hrtime(start);
  console.log(`Tempo de execução: ${end[0]}s ${end[1] / 1000000}ms`);
});

readStream.on('error', (error) => {
  console.error('[Event] An error occurred:', error);
});
