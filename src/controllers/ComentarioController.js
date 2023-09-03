const Comentario = require("../models/Comentario");
const Usuario = require("../models/Usuario");
const Auth = require("../config/auth");

async function create(req, res){

    try {
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        const {itemId} = req.params;

        comentarioCriado = await Comentario.create({
            UsuarioId: userId,
            ItemId: itemId,
            texto: req.body.texto
        });

        return res.status(201).json({message: "Comentário cadastrado com sucesso!", comentario: comentarioCriado});
    } catch(err){
        return res.status(500).json({error: err});
    }
}

async function index(req, res){
    try{
        const comentarios = await Comentario.findAll();
        return res.status(200).json({message: "Todos os comentários listados", comentarios: comentarios});
    } catch(err) {
        return res.status(500).json({err});
    }
}

async function show(req, res){
    const {id} = req.params;
    try{
        const comentario = await Comentario.findByPk(id);
        return res.status(200).json({comentario});
    } catch(err){
        return res.status(500).json({err});
    }
}

async function update(req, res){
    const {id} = req.params;
    try{
        const [updated] = await Comentario.update(req.body, {where: {id: id}});
        if(updated) {
            const comentario = await Comentario.findByPk(id);
            return res.status(200).send(comentario);
        }
        throw new Error();
    }catch(err){
        return res.status(500).json("Comentário não encontrado.");
    }
}

async function destroy(req, res){
    const {id} = req.params;
    try{
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        if(userId == (await Comentario.findByPk(id)).UsuarioId || (await Usuario.findByPk(userId)).tipo == "Moderador"){
            const deleted = await Comentario.destroy({where: {id: id}});
            if(deleted){
                return res.status(200).json("Comentário deletado com sucesso.");
            }
            throw new Error();
        } else{
            return res.status(500).json("Comentário não pertence ao usuário. Você deve ser o dono do comentário ou moderador.");
        }
        
    } catch(err){
        return res.status(500).json("Comentário não encontrado.");
    }
}

async function lista(req, res){
    const {itemId} = req.params;

    try{
        const comentarios = await Comentario.findAll({where: {ItemId: itemId}});

        return res.status(200).json(comentarios);
    } catch(error) {
        return res.status(500).json({error});
    }
}

module.exports = {
    create,
    show, 
    index,
    update, 
    destroy,
    lista,
}