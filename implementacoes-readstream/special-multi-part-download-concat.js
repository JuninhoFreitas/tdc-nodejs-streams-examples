const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const axios = require("axios");
const fs = require("fs");

// Função executada em cada thread do worker
function downloadPartWorker(start, end, url, outputPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = { Range: `bytes=${start}-${end}` };
      const response = await axios.get(url, {
        headers,
        responseType: "stream",
      });
      const writeStream = fs.createWriteStream(outputPath);

      response.data.pipe(writeStream);

      writeStream.on("finish", () => {
        resolve();
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Função principal para baixar o arquivo em partes
async function downloadFileInParts(url, numParts, outputPath) {
  const contentLength = (await axios.head(url)).headers["content-length"];
  const partSize = Math.ceil(contentLength / numParts);

  const downloadPromises = [];
  const partsNames = [];

  for (let i = 0; i < numParts; i++) {
    const start = i * partSize;
    const end = (i + 1) * partSize - 1;
    const partPath = `${outputPath}.part${i + 1}`;

    // Inicia uma thread do worker para cada parte
    const worker = new Worker(__filename, {
      workerData: { start, end, url, partPath },
    });

    // Converte o evento 'message' do worker em uma Promise
    const workerPromise = new Promise((workerResolve, workerReject) => {
      worker.on("message", (message) => {
        if (message === "done") {
          workerResolve();
        }
      });

      worker.on("error", (error) => {
        workerReject(error);
      });
    });

    // Adiciona a Promise ao array de Promises
    downloadPromises.push(workerPromise);
  }

  // Aguarda todas as partes serem baixadas
  await Promise.all(downloadPromises);

  // Concatena as partes em um único arquivo
  const concatPromises = [];

  for (let i = 0; i < numParts; i++) {
    const partPath = `${outputPath}.part${i + 1}`;
    partsNames.push(partPath);
    const readStream = fs.createReadStream(partPath, {
      highWaterMark: 1024 * 1024,
    }); // ajuste o valor conforme necessário

    concatPromises.push(
      new Promise((resolve, reject) => {
        readStream
          .pipe(fs.createWriteStream(outputPath, { flags: "a" }))
          .on("finish", () => {
            resolve();
          })
          .on("error", (error) => {
            reject(error);
          });
      })
    );

    // Exclui a parte após concatenar (opcional)
  }

  // Espera a concatenação das partes
  await Promise.all(concatPromises);

  for (let i = 0; i < partsNames.length; i++) {
    fs.unlinkSync(partsNames[i]);
  }
}

// Se é o worker principal, execute downloadPartWorker e envie 'done' quando concluído
if (!isMainThread) {
  downloadPartWorker(
    workerData.start,
    workerData.end,
    workerData.url,
    workerData.partPath
  )
    .then(() => {
      parentPort.postMessage("done");
    })
    .catch((error) => {
      console.error(error);
    });
}

// Se é o worker principal, inicie o downloadFileInParts
if (isMainThread) {
  // URL do arquivo a ser baixado
  const fileUrl = "http://212.183.159.230/1GB.zip";

  // Número de partes para baixar em paralelo
  const numParts = 12;

  // Caminho de saída do arquivo
  const outputFilePath = "large-file.zip";

  // Chama a função principal para baixar o arquivo em partes
  downloadFileInParts(fileUrl, numParts, outputFilePath)
    .then(() => {
      console.log("Download concluído!");
    })
    .catch((error) => {
      console.error("Erro durante o download:", error.message);
    });
}
