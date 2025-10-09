const fs = require('fs');
const path = require('path');

const argumentos = process.argv.slice(2);

const fileName = argumentos [0];
const filePath = path.resolve(fileName);

fs.stat(filepath, (err, stats) => {
    if (err) {
    console.error('Erro ao ler o diretório:', err);
    return;
    }
    console.log(`=== Informações do arquivo: ===`);
    console.log(`Caminho:`, ${filePath});
    console.log(`Tamanho: , ${stats.size}, bytes`);
    console.log(`Criado em:, ${stats.birthtime});
    console.log(`Modificado em:`, ${stats.mtime});
    console.log(`É um arquivo:`, ${stats.isFile()});

    });

