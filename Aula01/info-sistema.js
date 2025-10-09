//Importando módulos nativos do Node.js
//"os" fornece informações sobre o sistema operacional
const os = require('os');
//"path" Permite manipular e trabalhar com caminhos de arquivos e diretórios
const path = require('path');
//"fs" Permite interagir com o sistema de arquivos (ler, escrever, criar, deletar arquivos e diretórios)
const fs = require('fs');
const { log } = require('console');

//Exibindo informações do sistema operacional
console.log('=== Informações do sistema ===');
console.log(`Plataforma:`,os.platform()); //Exibe o sistema operacional
console.log(`Arquitetura:`,os.arch()); //Exibe a arquitetura do processador
console.log(`Memória total:`, Math.round (os.totalmem() /1024 /1024 /1024)+ 'GB');//Exibe a memória total disponível
console.log(`Memória total:`, Math.round (os.freemem() /1024 /1024 /1024)+ 'GB'); //Exibe a memória livre disponível


//Exibindo informações de arquivos e diretórios
console.log('=== INFORMAÇÕES DE CAMINHO ===');
console.log('Diretório atual:', __dirname); //Caminho absoluto do diretório atual
console.log('Arquivo atual:', __filename); //Caminho absoluto do arquivo atual
console.log('Extensão do arquivo', path.extname(__filename)); //Extensão do arquivo atual


console.log('\n === ARQUIVOS NO DIRETÓRIO ===');
fs.readdir('.' , (err, files) => {
    if (err) {
    console.error('Erro ao ler o diretório:', err);
    return;
    }
    files.forEach(file => {
        console.log('📁', file);
    });
});

