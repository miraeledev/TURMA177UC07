import express from "express";
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/saudacao/:nome', (req, res) => {
    const nome = req.params.nome;
  res.send(`Meu nome é ${nome}!`);
})

app.get('/tchau', (req, res) => {
  res.send('Já vou!')
})

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
})