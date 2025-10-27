import { musicas } from "../data/banco";

export default class MusicaModel {
   
    static listar(){
        return musicas;
    }

    static buscarPorId(id){
        return musicas.find(m=> m.id === Number(id));
    }

    static criar(musica){
        musicas.push(musica);
        return musica;
    }

    static atualizar(id, dados){
        const index = musicas.findIndex(m=> m.id === Number(id));
        if(index === -1){
            return null;
        }

        musicas[index] = {...musicas[index], ...dados};
        return musicas[index];
    }

    static deletar(id){
         const index = musicas.findIndex(m=> m.id === Number(id));
        if(index === -1){
            return false;
        }
        musicas.splice(index, 1);

        return true;
    }

}