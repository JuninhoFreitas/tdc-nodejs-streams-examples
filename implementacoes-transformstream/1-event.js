const fs = require('fs');
console.profile('1-event-transformstream');
const start = process.hrtime();
const readStream = fs.createReadStream('accounts.csv');
const writeStream = fs.createWriteStream('accounts.json');


readStream.on('data', (chunk) => {
  let textWithoutSpecialChars = chunk.toString().replace(/[^a-zA-Z0-9 ]/g, '')
  writeStream.write(textWithoutSpecialChars);
});

readStream.on('end', () => {
  writeStream.end();
  console.log('[Event] Finished reading the file.');
  console.profileEnd('1-event-transformstream');

  const end = process.hrtime(start);
  console.log(`Tempo de execução: ${end[0]}s ${end[1] / 1000000}ms`);
});

readStream.on('error', (error) => {
  console.error('[Event] An error occurred:', error);
});
