const fs = require('fs');
const csvtojson = require('csvtojson')

console.profile('1-event-transformstream')
const start = process.hrtime();
const readStream = fs.createReadStream('accounts.csv');

readStream.on('data', (chunk) => {
  console.log(`[Event] Received ${chunk.length} bytes of data.`);
  csvtojson({delimiter: ','}).fromString(chunk.toString()).then((json) => {
    console.log(json);
  });

});

readStream.on('end', () => {
  console.log('[Event] Finished reading the file.');
  console.profileEnd('1-event-transformstream')

  const end = process.hrtime(start);
  console.log(`Tempo de execução: ${end[0]}s ${end[1] / 1000000}ms`);
});

readStream.on('error', (error) => {
  console.error('[Event] An error occurred:', error);
});
