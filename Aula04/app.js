import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

//Rota com send (texto simples)
app.get('/texto', (req, res) => {
  res.send('resposta em texto simples');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

//Rota com json
app.get('/json', (req, res) => {
  res.json({ mensagem: 'resposta em json', tempo: Date.now() });
});

//Rota com status + json
app.post('/criar', (req, res) => {
  res.status(201).json({ sucesso: true, mesagem: 'Recurso criado!' });
});

//Rota com erro
app.get('/erro', (req, res) => {
  res.status(400).json({ erro: 'Requisição Inválida!' });
});

//Rota com redirecionamento
app.get('/redirect', (req, res) => {
  res.redirect('/json');
});

//Rota sem conteúdo
app.get('/redirect', (req, res) => {
  res.sendStatus(204);
});

//Crei uma rota /produtos que retorna um array json de produtos.

app.get('/produtos', (req, res) => {
  const produtos = [
    { id: 1, nome: 'Produto A', preco: 10.0 },
    { id: 2, nome: 'Produto B', preco: 20.0 },
    { id: 3, nome: 'Produto C', preco: 30.0 },
  ];
  res.json(produtos);
});


//Crie uma rota /downlead que retorna um arquivo local de exemplo (use res.download()).
app.get('/download', (req, res) => {
    const caminho = path.join(__dirname, 'exemplo.txt');
    res.download(caminho, 'arquivo_exemplo.txt', (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err);
            res.status(500).send('Erro ao fazer o download.');
        }
    });
});
