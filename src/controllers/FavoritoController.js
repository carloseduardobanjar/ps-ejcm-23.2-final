const Auth = require("../config/auth");
const Favorito = require("../models/Favorito");
const Item = require("../models/Item");

async function create(req, res){
    try {
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        const {itemId} = req.params;

        favCriado = await Favorito.create({
            UsuarioId: userId,
            ItemId: itemId,
        });

        return res.status(201).json({message: "Favoritado com sucesso!", favorito: favCriado});
    } catch(err){
        return res.status(500).json({error: err});
    }
}

async function index(req, res){
    try{
        const favoritos = await Favorito.findAll();
        return res.status(200).json({message: "Todos os favoritos listados", favoritos: favoritos});
    } catch(err) {
        return res.status(500).json({err});
    }
}

async function show(req, res){
    const {id} = req.params;
    try{
        const fav = await Favorito.findByPk(id);
        return res.status(200).json({fav});
    } catch(err){
        return res.status(500).json({err});
    }
}

async function destroy(req, res){
    const {id} = req.params;
    try{
        const deleted = await Favorito.destroy({where: {id: id}});
        if(deleted){
            return res.status(200).json("Favorito removido com sucesso.");
        }
        throw new Error();
    } catch(err){
        return res.status(500).json("Favorito não encontrado.");
    }
}

async function lista(req, res){
    try{
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        const favoritosDoUsuario = await Favorito.findAll({where: {UsuarioId: userId}});

        let itensFavoritos = new Array();

        for(i = 0; i < favoritosDoUsuario.length; i++){
            itensFavoritos.push(await Item.findByPk(favoritosDoUsuario[i].ItemId))
        }

        return res.status(200).json(itensFavoritos);
    } catch(error) {
        return res.status(500).json({error});
    }
}

module.exports = {
    create,
    show, 
    index,
    destroy,
    lista,
}