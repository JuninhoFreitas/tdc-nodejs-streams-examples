const http = require('http');

const actualTime = () => {return 'Timestamp:' + new Date().toTimeString() + '\n'}

const server = http.createServer((req, res) => {
  if (req.url === '/exemplo') {
    res.write('Olá, mundo! '+ actualTime())
    setTimeout(() => {
      res.write('Tchau, mundo! '+ actualTime());
      res.end();
      console.log('Requisição concluída.');
    }, 1000);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
