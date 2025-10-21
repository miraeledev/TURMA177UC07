import { LivroModel } from "../models/LivroModel.js";
import AutoModel from "../models/AutorModel.js";
import CategoriaModel from "../models/CategoriaModel.js";

export default class LivroController {
    static listar (req, res) {
        const livros = LivroModel.listar();
        res.json(livros);
        try {
            const livros = LivroModel.listar();
            if (!livros) {
                res.status(400).json({message: "erro ao listar os livros"});
                return
            }
            res.status(200).json(livros);

        }
        catch (error) {
            res.status(500).json({message:"Erro ao listar os livros", error: error.message});

         }
    }

    static criar (req, res) {
        try {
            const {titulo, autorId, categoriaId, anoPublicacao, preco} = req.body;
            if (!titulo || !autorId || !categoriaId || !anoPublicacao || !preco) {
                res.status(400).json({message: "Todos os campos devem ser preenchidos"});
                return;
            }
            if (!AutoModel.buscarPorId(autorId)) {
                res.status(400).json({message: "Autor inválido"});
                return;
            }
            if (!CategoriaModel.buscarPorId(categoriaId)) {
                res.status(400).json({message: "Categoria inválida"});
                return;
            }
            if (Number(anoPublicacao) <= 1800 || Number(anoPublicacao) > new Date().getFullYear()) {
                res.status(400).json({ msg: "Ano inválido." });
                return;
            }
            if (Number(preco) <= 0) {
                res.status(400).json({ msg: "Preço deve ser maior que zero!" });
                return;
            }
            const livros = LivroModel.listar();
            const novoLivro = {
                            id: livros.length + 1,
                            titulo: titulo,
                            autorid: autorId,
                            categoriaId: categoriaId,
                            anoPublicacao: anoPublicacao,
                            ano: preco
                        };
                        LivroModel.criar(novoLivro);
                        res.status(201).json({ msg: "Livro adicionado com sucesso!", livro: novoLivro });

        }catch (error) {
            res.status(500).json({ msg: "Erro ao criar o livro", erro: error.message });

        }
        
}
}