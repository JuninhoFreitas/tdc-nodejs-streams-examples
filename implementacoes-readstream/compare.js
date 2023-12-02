const fs = require('fs');
const { Writable } = require('stream');
const {pipeline} = require('stream/promises');
const Benchmark = require('benchmark');

var suite = new Benchmark.Suite;
 
// add tests
suite.add('event', function() {
    const readStream = fs.createReadStream('./implementacoes/access.log');

    readStream.on('data', (chunk) => {
    //   console.log(`[Event] Received ${chunk.length} bytes of data.`);
    });
    
    readStream.on('end', () => {
      console.log('[Event] Finished reading the file.');
    });
    
    readStream.on('error', (error) => {
      console.error('[Event] An error occurred:', error);
    });
    
})
.add('pipe', function(){
    const readStream = fs.createReadStream('./implementacoes/access.log');

const writeStream = new Writable({
  write(chunk, encoding, callback) {
    // console.log(`[Pipe] Received ${chunk.length} bytes of data.`);
    callback();
  }
});

readStream.pipe(writeStream).on('finish', () => {
  console.log('[Pipe] Finished reading the file.');
});

})
.add('pipeline', function() {
    const readStream = fs.createReadStream('./implementacoes/access.log');

    const writeStream = new Writable({
        write(chunk, encoding, callback) {
            // console.log(`[Pipeline] Received ${chunk.length} bytes of data.`);
            callback();
        }
        });
    
    pipeline(readStream, writeStream, (err) => {
        if (err) {
            console.error('[Pipeline] An error occurred:', err);
        } else {
            console.log('[Pipeline] Finished reading the file.');
        }
    }
    );
    
})
.add('pipeline-async', async function(){
    const readStream = fs.createReadStream('./implementacoes/access.log');
    const writeStream = new Writable({
        write(chunk, encoding, callback) {
            // console.log(`[Pipeline-Async] Received ${chunk.length} bytes of data.`);
            callback();
        }
        });
    
    await pipeline(readStream, writeStream).catch((err) => {
        console.error('[Pipeline-Async] An error occurred:', err);
    });
    console.log('[Pipeline-Async] Finished reading the file.');
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': false });