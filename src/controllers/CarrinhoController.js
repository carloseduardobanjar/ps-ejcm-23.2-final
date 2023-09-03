const Item = require("../models/Item");
const Carrinho = require("../models/Carrinho");
const Auth = require("../config/auth");

async function create (req, res) {
    const {itemId} = req.params;
    try{
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        const carrinho = await Carrinho.findOne({where: {ItemId: itemId}});
        if(carrinho){
            return res.status(500).json({error: 'Esse item já foi adicionado em algum carrinho.', carrinho: carrinho})
        }

        carrinhoCriado = await Carrinho.create({
            UsuarioId: userId,
            ItemId: itemId
        });

        return res.status(200).json({mensagem: "Item adicionado ao carrinho", carrinho: carrinhoCriado});

    } catch (error) {
        return res.status(500).json({error});
    }
}

async function index(req, res){
    try{
        const carrinhos = await Carrinho.findAll();
        return res.status(200).json({message: "Todos os carrinhos listados", carrinhos: carrinhos});
    } catch(err) {
        return res.status(500).json({err});
    }
}

async function show(req, res){
    const {id} = req.params;
    try{
        const carrinho = await Carrinho.findByPk(id);
        return res.status(200).json({carrinho});
    } catch(err){
        return res.status(500).json({err});
    }
}

async function destroy(req, res){
    const {itemId} = req.params;
    try{
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const userId = payload.sub

        const carrinho = await Carrinho.findOne({where: {UsuarioId: userId, ItemId: itemId}});
        await carrinho.destroy();
        return res.status(200).json("Item removido do carrinho!");
    } catch(error) {
        return res.status(500).json({error});
    }
}

async function listaCarrinho(req, res){
    const {userId} = req.params;

    try{
        const carrinho = await Carrinho.findAll({where: {UsuarioId: userId}});
        let itensNoCarrinho = new Array();

        for(i = 0; i < carrinho.length; i++){
            itensNoCarrinho.push(await Item.findByPk(carrinho[i].ItemId))
        }

        return res.status(200).json(itensNoCarrinho);
    } catch(error) {
        return res.status(500).json({error});
    }
}

module.exports = {
    create,
    show, 
    index,
    destroy,
    listaCarrinho,
}