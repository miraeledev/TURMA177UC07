// Importando com "default export"

import soma from './math/soma.js';
import pontencia from './math/utils.js';
// Importando com "named export"

import { multiplicao, divide } from './math/utils.js';
import { subtracao } from './math/subtracao.js';
import { percentual } from './math/percentual.js';

//Testando as funções 
console.log(`soma: ${soma(2, 3)}`);
console.log(`multiplicao: ${multiplicao(2, 3)}`);
console.log(`divide: ${divide(6, 3)}`);
console.log(`subtracao: ${subtracao(6, 3)}`);
console.log(`pontencia: ${pontencia(2, 3)}`);
console.log(`percentual: ${percentual(100, 10)}`);