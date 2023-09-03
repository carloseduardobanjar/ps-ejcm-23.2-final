const Express = require('express');
const router = Express();
const UsuarioController = require("../controllers/UsuarioController");
const ItemController = require("../controllers/ItemController");
const CarrinhoController = require("../controllers/CarrinhoController");
const ComentarioController = require("../controllers/ComentarioController");
const FavoritoController = require("../controllers/FavoritoController");
const AuthController = require("../controllers/AuthController");
const passport = require("passport");

router.use("/private", passport.authenticate('jwt', {session: false}));

router.post('/login', AuthController.login);

//rotas para o usuário
router.post("/usuario", UsuarioController.create);
router.get("/usuario/:id", UsuarioController.show);
router.get("/usuario", UsuarioController.index);
router.put("/private/usuario", UsuarioController.update);
router.delete("/usuario/:id", UsuarioController.destroy);

//rotas para o item
router.post("/private/item", ItemController.create);
router.get("/item/:id", ItemController.show);
router.get("/item", ItemController.index);
router.put("/private/item/:id", ItemController.update);
router.delete("/private/item/:id", ItemController.destroy);

//rotas para o carrinho
router.post("/private/carrinho/item/:itemId", CarrinhoController.create);
router.get("/carrinho/:id", CarrinhoController.show);
router.get("/carrinho", CarrinhoController.index);
router.delete("/private/carrinho/item/:itemId", CarrinhoController.destroy);
router.get("/carrinho/lista/:userId", CarrinhoController.listaCarrinho); //Lista todos os itens que estão no carrinho de um usuário

//rotas para o comentário
router.post("/private/comentario/item/:itemId", ComentarioController.create);
router.get("/comentario/:id", ComentarioController.show);
router.get("/comentario", ComentarioController.index);
router.put("/private/comentario/:id", ComentarioController.update);
router.delete("/private/comentario/:id", ComentarioController.destroy);
router.get("/comentario/lista/:itemId", ComentarioController.lista); //Lista os comentários de um item

//rotas para o favorito
router.post("/private/favorito/item/:itemId", FavoritoController.create);
router.get("/favorito/:id", FavoritoController.show);
router.get("/favorito", FavoritoController.index);
router.delete("/private/favorito/:id", FavoritoController.destroy);
router.get("/private/favorito/lista", FavoritoController.lista); //Lista os itens favoritos de um usuário

module.exports = router;