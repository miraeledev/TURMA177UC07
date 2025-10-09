import express from 'express';
const app = express();
app.use(express.json());
const port = 3000;
let receitas = [
    {
        id: 1, nome: 'Bolo de Cenoura', ingredientes: ["cenoura", "açúcar", "Óleo", "farinha", "ovos"],
        modoPreparo: "Bata os ingredientes no liquidificador, adicione farinha e leve ao forno por 40 minutos.",
        tempoPreparo: 60
    },
    {
        id: 2, nome: 'Bolo de Chocolate', ingredientes: ["chocolate em Pó", "açúcar", "manteiga", "farinha", "ovos", "leite", "fermento"],
        modoPreparo: "Bata os ingredientes na batedeira, adicione farinha e leve ao forno por 40 minutos.",
        tempoPreparo: 60
    },
];

app.get('/receitas', (req, res) => {
    res.status(200).json(receitas);
});

app.get('/receitas/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const receita = receitas.find(p => p.id === id);
        if (!receita) {
            res.status(404).json({ msg: "Receita não encontrado" });
        } res.status(200).json(receita);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.post('/receitas', (req, res) => {
    try {
        const { nome, ingredientes, modoPreparo, tempoPreparo } = req.body;
        if (!nome || !ingredientes || !modoPreparo || !tempoPreparo) {
            res.status(400).json({ msg: "Todos os campos são obrigatórios!" });
            return;
        }
        if (tempoPreparo <= 0) {
            res.status(400).json({ msg: "O tempo de preparo deve ser maior que zero!" });
            return;
        }
         const receita = receitas.find(r => r.nome.toUpperCase() === nome.toUpperCase());
    if (receita) {
        res.status(400).json({ msg: " Já existe uma receita com esse nome." });
        return;
  }
        const novaReceita = {
            id: receitas.length + 1,
            nome: nome,
            ingredientes: ingredientes,
            modoPreparo: modoPreparo,
            tempoPreparo: Number(tempoPreparo)
        };
        receitas.push(novaReceita);
        res.status(201).json({ msg: "Receita criada com sucesso!", novaReceita });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});


app.put('/receitas/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, ingredientes, modoPreparo, tempoPreparo } = req.body;
        const receita = receitas.find(r => r.id === id);
        if (!nome || !ingredientes || !modoPreparo || !tempoPreparo) {
            res.status(404).json({ msg: "Receitas não encontrado" });
        }
if (nome) receita.nome = nome;
    if (ingredientes) receita.ingredientes = ingredientes;
    if (modoPreparo) receita.modoPreparo = modoPreparo;
    if (tempoPreparo) receita.tempoPreparo = Number(tempoPreparo);

    res.status(200).json({ msg: "Receitas atualizado com sucesso!", receita });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.delete('/receitas/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = receitas.findIndex(r => r.id === id);
        if (index === -1) {
            res.status(404).json({ msg: "Receita não encontrada" });
        }
        const removido = receitas.splice(index, 1);
        res.status(200).json({ msg: "Receita removido com sucesso!", removido });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
app.get('/receitas/ingrediente/:ingrediente', (req, res) => {
try {
        const ingrediente = req.params.ingrediente.toLowerCase();
        const receitasFiltradas = receitas.filter(r => r.ingredientes.some(i => i.toLowerCase() === ingrediente));
        if (receitasFiltradas.length === 0) {
            res.status(404).json({ msg: "Nenhuma receita encontrada com esse ingrediente" });
            return;
        }
        res.status(200).json(receitasFiltradas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }

});


app.listen(port, () => {
    console.log(`Aplicão rodando em http://localhost:${port}`);
});