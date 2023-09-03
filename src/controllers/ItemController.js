const Item = require("../models/Item");
const Usuario = require("../models/Usuario");
const Auth = require("../config/auth");

async function create(req, res){
    try {
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        const item = await Item.create({UsuarioId: userId, ...req.body});
        return res.status(201).json({message: "Item cadastrado com sucesso!", item: item});
    } catch(err){
        return res.status(500).json({error: err});
    }
}

async function index(req, res){
    try{
        const items = await Item.findAll();
        return res.status(200).json({message: "Todos os itens listados", items: items});
    } catch(err) {
        return res.status(500).json({err});
    }
}

async function show(req, res){
    const {id} = req.params;
    try{
        const item = await Item.findByPk(id);
        return res.status(200).json({item});
    } catch(err){
        return res.status(500).json({err});
    }
}

async function update(req, res){
    const {id} = req.params;
    try{
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        if(userId == (await Item.findByPk(id)).UsuarioId){
            const [updated] = await Item.update(req.body, {where: {id: id}});
            if(updated) {
                const item = await Item.findByPk(id);
                return res.status(200).send(item);
            }
            throw new Error();
        } else{
            return res.status(500).json("Item não pertence ao usuário. Você deve ser o dono do item.");
        }

        
    }catch(err){
        return res.status(500).json("Item não encontrado.");
    }
}

async function destroy(req, res){
    const {id} = req.params;
    
    try{
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        if(userId == (await Item.findByPk(id)).UsuarioId || (await Usuario.findByPk(userId)).tipo == "Moderador"){
            const deleted = await Item.destroy({where: {id: id}});
            if(deleted){
                return res.status(200).json("Item deletado com sucesso.");
            }
            throw new Error();
        } else{
            return res.status(500).json("Item não pertence ao usuário. Você deve ser o dono do item ou moderador.");
        }
    } catch(err){
        return res.status(500).json("Item não encontrado.");
    }
}

module.exports = {
    create,
    show, 
    index,
    update, 
    destroy,
}