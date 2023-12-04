const { Readable, Writable } = require('stream');

function createSimulatedReadableStream() {
  let counter = 1;
  let cumulativeSum = 0;

  return new Readable({
    objectMode: true,

    read() {
      while (counter <= 1000) {
        cumulativeSum += counter;
        const data = { value: counter, cumulativeSum };
        this.push(data)
        counter++;
      }

      this.push(null);
    },
  });
}

function createSimulatedWritableStream() {
  return new Writable({
    objectMode: true,

    write(chunk, encoding, callback) {
      setTimeout(() => {
        console.log(`Processed data: ${JSON.stringify(chunk)}`);
        callback();
      }, 100);
    },
  });
}

const readableStream = createSimulatedReadableStream();
const writableStream = createSimulatedWritableStream();

// Evento para lidar com a transferência de dados
readableStream.on('data', (data) => {
  writableStream.write(data);
});

// Tratadores de eventos 'end' e 'finish'
readableStream.on('end', () => {
  console.log('Read operation completed.');
  // Indica que não há mais dados para escrever
  writableStream.end();
});

writableStream.on('finish', () => {
  console.log('Write operation completed.');
});
