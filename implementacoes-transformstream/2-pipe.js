const fs = require('node:fs');
const zlib = require('node:zlib');
const readStream = fs.createReadStream('access.log2');
const zlibGzip = zlib.createGzip();
const writeStream = fs.createWriteStream('file.txt.gz');

readStream.pipe(zlibGzip).pipe(writeStream).on('error', (err)=>{
    console.error('Erro na Write Stream', err)
})


