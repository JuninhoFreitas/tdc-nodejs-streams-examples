const fs = require('fs');
const faker = require('faker');

// Gera um endereço IP aleatório
function generateRandomIP() {
  return `192.168.0.${faker.datatype.number({ min: 1, max: 255 })}`;
}

// Gera uma rota aleatória
function generateRandomRoute() {
  return `/api/recurso${faker.datatype.number({ min: 1, max: 10 })}`;
}

// Gera uma linha de log com endereço IP e rota
function generateLogLine() {
  const ip = generateRandomIP({});
  const route = generateRandomRoute();
  return `${ip} - - [${new Date().toISOString()}] "GET ${route} HTTP/1.1" 200 ${faker.datatype.number({ min: 100, max: 1000 })}`;
}

// Gera um arquivo de log com um número especificado de linhas
function generateLogFile(fileName, numLines) {
  let logData = '';

  for (let i = 0; i < numLines; i++) {
    logData += generateLogLine() + '\n';
  }

  fs.writeFileSync(fileName, logData);
}

// Gera o arquivo de log fictício chamado access.log com 1000 linhas
generateLogFile('access.log', 1e6);
