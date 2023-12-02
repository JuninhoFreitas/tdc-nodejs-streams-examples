const fs = require('fs');

// Caminho para o arquivo de exemplo
const filePath = './buffers/randomtext.txt';

// Criando uma stream de leitura de arquivo
const readStream = fs.createReadStream(filePath, {
    highWaterMark: 1000000*1024
});

// Evento 'data' é acionado quando um novo chunk de dados está disponível
readStream.on('data', (chunk) => {
  // Exibindo o tipo do chunk
    console.log(`Tipo do Chunk: ${chunk.constructor.name}`);
    console.log(`Typeof do Chunk: ${typeof chunk}`);
    console.log(`Tamanho do Chunk: ${chunk.length}`);
  
    const bufferPrototype = Object.getPrototypeOf(chunk);
    const properties = Object.getOwnPropertyNames(bufferPrototype);
    const functions = properties.filter(property => typeof bufferPrototype[property] === 'function');
    
    // Log each function name
    console.log('Methods: ', functions.length)
    functions.forEach(func => console.log(func));


    
});

// Evento 'end' é acionado quando toda a leitura é concluída
readStream.on('end', () => {
  console.log('Leitura concluída.');
});

// Evento 'error' é acionado em caso de erros
readStream.on('error', (error) => {
  console.error(`Erro: ${error.message}`);
});