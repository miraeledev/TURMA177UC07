import { livros } from "../models/LivroModel.js";


export default class LivroController {
    static listar(req, res) {
        res.status(200).json(livros);
    }
    static criar(req, res) {
        try {
            const { titulo, autor, ano } = req.body;
            if (!titulo || !autor || !ano) {
                res.status(400).json({ msg: "Preenche todos os campos." });
                return;
            }
            const livro = livros.findIndex(f => f.titulo.toLowerCase() === titulo.toLowerCase());
            if(livro !== -1) {
                res.status(400).json({ msg: "Título Já existente." });
                return;
            }
            if (Number(ano) <= 1000 || Number(ano) > new Date().getFullYear()) {
                res.status(400).json({ msg: "Ano inválido." });
                return;
            }
            const novoLivro = {
                id: livros.length + 1,
                titulo: titulo,
                autor: autor,
                ano: Number(ano)
            };
            livros.push(novoLivro);
            res.status(201).json({ msg: "Livro adicionado com sucesso!", livro: novoLivro });

        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar o livro", erro: error.message });

        }
    }


}