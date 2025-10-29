import UsuarioModel from "../models/UsuarioModel.js";
import axios from "axios";

export default class UsuarioController {
    //Listar todos
    static listar(req, res) {
        try {
            const usuarios = UsuarioModel.listar();
            if (usuarios.length === 0) {
                res.status(200).json({ msg: "Nenhum usuário cadastrado" });
                return
            }
            if (!usuarios) {
                res.status(400).json({ msg: "Erro ao buscar ao listar os usuários" });
                return
            }
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ msg: "Erro interno", erro: error.message });
        }
    }
    //Buscar por id
    static buscarPorId(req, res) {
        try {
            const id = req.params.id
            const usuario = UsuarioModel.buscarPorId(id);
            if (!usuario) {
                res.status(404).json({ msg: "Usuario não encontrado!" });
                return
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ msg: "Erro interno", erro: error.message });
        }
    }
    //criar
    static async criar(req, res) {
        try {
            const { nome, cep, numero, telefone } = req.body;
            if (!nome || !cep || !numero || !telefone) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }
            const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (buscaCep.erro) {
                res.status(400).json({ msg: "CEP inválido!" });
                return;
            }
            // console.log(buscaCep);
            const novoUsuario = {
                id: Date.now(),
                nome: nome,
                telefone: telefone,
                cep: cep,
                rua: buscaCep.data.logradouro,
                numero: numero,
                bairro: buscaCep.data.bairro,
                cidade: buscaCep.data.localidade,
                estado: buscaCep.data.uf
            }
            const userCriado = UsuarioModel.criar(novoUsuario);
            res.status(201).json(userCriado);

        } catch (error) {
            res.status(500).json({ msg: "Erro interno", erro: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const id = req.params.id;
            const { nome, cep, numero, telefone } = req.body;
            if (!nome || !cep || !numero || !telefone) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }
            const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (buscaCep.erro) {
                res.status(400).json({ msg: "CEP inválido!" });
                return;
            }
            const dadosAtualizados = {
                nome: nome,
                telefone: telefone,
                cep: cep,
                rua: buscaCep.data.logradouro,
                numero: numero,
                bairro: buscaCep.data.bairro,
                cidade: buscaCep.data.localidade,
                estado: buscaCep.data.uf
            }
            const userAtualizado = UsuarioModel.atualizar(id, dadosAtualizados);
            if(!userAtualizado){
                res.status(404).json({msg: "Usuário não encontrado!"});
                return;
            }
            res.status(201).json({msg: "User atualizado com sucesso!", user: userAtualizado});

        } catch (error) {
            res.status(500).json({ msg: "Erro interno", erro: error.message });
        }
    }

    static deletar(req, res){
        try {
            const id = req.params.id;
            const userDelete = UsuarioModel.deletar(id);
            if(!userDelete){
                res.status(404).json({msg: "Usuário não encontrado"});
                return;
            }
            res.status(200).json({msg: "Usuário deletado com Sucesso!"});
        } catch (error) {
              res.status(500).json({ msg: "Erro interno", erro: error.message });
        }
    }

}   
    




