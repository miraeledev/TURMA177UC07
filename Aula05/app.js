import express from 'express';
const app = express();
const port = 3000;
//Middleware para parsear JSON
app.use(express.json());

//array que simule um banco de dados
let produtos = [
  { id: 1, nome: 'Arroz', preco: 10.5 },
  { id: 2, nome: 'Feijão', preco: 8.5 },
];

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

//READ - Listar todos os produtos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

//READ - Listar um produto pelo ID
app.get('/produtos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        res.status(404).json({ msg: "Produto não encontrado" });
  }res.status(200).json(produto);
 } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

//CREATE - Adicionar um novo produto
app.post('/produtos', (req, res) => {
  try {
    const { nome, preco } = req.body;
    //validação simples
    if (!nome || !preco) {
         res.status(400).json({ msg: "Nome e preço são obrigatórios!" });
    }
    const novoProduto = {
        id: produtos.length + 1,
        nome: nome,
        preco: Number(preco)
    };
    produtos.push(novoProduto);
    res.status(201).json({msg:"Produto criado com sucesso!", novoProduto});
  } catch (error) {
    res.status(500).json({ erro: error.message });
    
  }
});

//Delete - Remover um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        res.status(404).json({ msg: "Produto não encontrado" });
    }
    const removido = produtos.splice(index, 1);
    res.status(200).json({ msg: "Produto removido com sucesso!", removido });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
})

//UPDATE - Roata para atualizar um produto pelo ID
app.put('/produtos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;
    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        res.status(404).json({ msg: "Produto não encontrado" });
    }
    // Atualiza apenas se vierem novos valores
    if (nome) produto.nome = nome;
    if (preco) produto.preco = Number(preco);
    res.status(200).json({ msg: "Produto atualizado com sucesso!", produto });
    } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.listen(port, () => {
  console.log(`Aplicão rodando em http://localhost:${port}`);
});