const fs = require('fs');
const csvtojson = require('csvtojson');

console.profile('1-event-transformstream');
const start = process.hrtime();
const readStream = fs.createReadStream('accounts.csv');
const writeStream = fs.createWriteStream('accounts.json');
const converter = csvtojson({ noheader: false }).fromStream(readStream);

readStream.on('data', (chunk) => {
  console.log(`[Event] Received ${chunk.length} bytes of data.`);
  converter.subscribe(json => {
    writeStream.write(JSON.stringify(json));
  })
  converter.pipe(writeStream);
});

readStream.on('end', () => {
  console.log('[Event] Finished reading the file.');
  console.profileEnd('1-event-transformstream');

  const end = process.hrtime(start);
  console.log(`Tempo de execução: ${end[0]}s ${end[1] / 1000000}ms`);
});

readStream.on('error', (error) => {
  console.error('[Event] An error occurred:', error);
});