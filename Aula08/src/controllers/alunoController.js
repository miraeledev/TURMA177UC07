import {alunos} from '../models/alunoModel.js';

export default class AlunoController {
    static listar(req, res) {
        res.status(200).json(alunos);
    }
    static criar(req, res) {
        try {
            const { nome, idade, curso, matricula } = req.body;
            if (!nome || !idade || !curso || !matricula) {
                res.status(400).json({ msg: "Preencha todos os campos." });
                return;
            }
            const aluno = alunos.findIndex(a => a.matricula === matricula);
            if (aluno !== -1) {
                res.status(400).json({ msg: "Matrícula já existente." });
                return;
            }
            if (Number(idade) < 16 || Number(idade) > 100) {
                res.status(400).json({ msg: "Idade inválida." });
                return;
            }
            const novoAluno = {
                id: alunos.length + 1,
                nome: nome,
                idade: Number(idade),
                curso: curso,
                matricula: matricula
            };
            alunos.push(novoAluno);
            res.status(201).json({ msg: "Aluno adicionado com sucesso!", aluno: novoAluno });
        }
        catch (error) {
            res.status(500).json({ msg: "Erro no servidor.", error: error.message });
        }
    }
    static listarPorId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const aluno = alunos.find(a => a.id === id);
            if (!aluno) {
                res.status(400).json({ msg: "Aluno não encontrado." });
                return;
            }
            res.status(200).json(aluno);
        } catch (error) {
            res.status(500).json({ msg: "Erro no servidor.", error: error.message });
        }
    }
    static atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { nome, idade, curso, matricula } = req.body;
            const aluno = alunos.find(a => a.id === id);
            if (!aluno) {
                res.status(400).json({ msg: "Aluno não encontrado." });
                return;
            }
            if (!nome || !idade || !curso || !matricula) {
                res.status(400).json({ msg: "Preenche todos os campos." });
                return;
            }
            if (Number(idade) < 16) {
                res.status(400).json({ msg: "Idade inválida." });
                return;
            }
            if (alunos.findIndex(a => a.matricula === matricula && a.id !== id) !== -1) {
                res.status(400).json({ msg: "Matrícula já existente." });
                return;
            }
            aluno.nome = nome;
            aluno.idade = Number(idade);
            aluno.curso = curso;
            aluno.matricula = matricula;
            res.status(200).json({ msg: "Aluno atualizado com sucesso!", aluno: aluno });

        } catch (error) {
            res.status(500).json({ msg: "Erro no servidor.", error: error.message });
        }
    }
    static deletar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const alunoIndex = alunos.findIndex(a => a.id === id);
            if (alunoIndex === -1) {
                res.status(400).json({ msg: "Aluno não encontrado." });
                return;
            }
            alunos.splice(alunoIndex, 1);
            res.status(200).json({ msg: "Aluno deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro no servidor.", error: error.message });
        }
    }
    static buscarPorCurso(req, res) {
        try {
            const curso = req.params.curso.toLowerCase();
            const alunosFiltrados = alunos.filter(a => a.curso.toLowerCase().includes(curso));
            if (alunosFiltrados.length === 0) {
                res.status(400).json({ msg: "Nenhum aluno encontrado para o curso informado." });
                return;
            }
            res.status(200).json(alunosFiltrados);
        }
        catch (error) {
            res.status(500).json({ msg: "Erro no servidor.", error: error.message });
        }
    }

}



