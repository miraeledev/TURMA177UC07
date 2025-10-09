const argumentos = process.argv.slice(2);
const n1 = parseFloat(argumentos[0]);
const n2 = parseFloat(argumentos[1]);

const soma = n1 + n2;
const subtracao = n1 - n2;
const multiplicacao = n1 * n2;
const divisao = n1 / n2;

console.log(`Soma: ${soma}`);
console.log(`Subtração: ${subtracao}`);
console.log(`Multiplicação: ${multiplicacao}`);
console.log(`Divisão: ${divisao.toFixed(2)}`);

