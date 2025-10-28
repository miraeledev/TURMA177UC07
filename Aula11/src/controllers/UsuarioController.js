import UsuarioModel from "../models/UsuarioModel.js";
import axios from "axios";

export default class UsuarioController{
    //Listar todos
    static listar(req, res){
        try {
            const usuarios = UsuarioModel.listar();
            if(usuarios.length===0){
                res.status(200).json({msg: "Nenhum usuário cadastrado"});
                return
        }
        if(!usuarios){
            res.status(400).json({msg: "Erro ao buscar ao listar os usuários"});
            return
        }
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({msg: "Erro interno", erro: error.message});
    }      
        }
        //Buscar por id
        static buscarPorId(req, res) {
            try {
                const id = req.params.id
                const usuario = UsuarioModel.buscarPorId(id);
                if(!usuario){
                   res.status(404).json({msg: "Usuario não encontrado!"});
                   return 
                }
                res.status(200).json(usuario);   
            }
            catch (error) {
                res.status(500).json({msg: "Erro interno", erro: error.message})
            }
        }
        //criar
        static async criar(req, res) {
            try {
                const {nome, cep, numero, telefone} = req.body;
                if(!nome || !cep || !numero || !telefone){
                    res.status(400).json({msg: "todos os campos devem ser preenchidos!"});
                    return;
                }
                const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
                if(buscaCep.erro){
                    res.status(400).json({msg: "CEP inválido"});
                    return;
                }
                const novoUsuario = {
                    id: Date.now(),
                    nome: nome,
                    telefone: telefone,
                    cep: cep,
                    rua: buscaCep.logradouro,
                    numero: numero,
                    bairro: buscaCep.data.bairro,
                    cidade: buscaCep.data.cidade,
                    estado: buscaCep.data.estado
                }
                const userCriado = UsuarioModel.criar(novoUsuario);
                res.status(202).json(userCriado);
            
            } catch (error){
                res.status(500).json({msg: "Erro interno", erro: error.message});
            }
        }
}
