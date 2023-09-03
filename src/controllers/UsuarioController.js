const Usuario = require("../models/Usuario");
const Auth = require("../config/auth");
const nodemailer = require('nodemailer');

async function create(req, res){
    try {
        const { password } = req.body;
		const hashAndSalt = Auth.generatePassword(password);
		const salt = hashAndSalt.salt;
		const hash = hashAndSalt.hash;

        const usuario = await Usuario.create({
            nome: req.body.nome,
			dataNascimento: req.body.dataNascimento,
			email: req.body.email,
			telefone: req.body.telefone,
            tipo: req.body.tipo,
			hash: hash,
			salt: salt
        });

        var transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD
            }
        });

        var message = {
            from: "kadubanjar8@gmail.com",
            to: req.body.email,
            subject: `🎊🎊🎊 Seja bem-vindo, ${req.body.nome} 🎊🎊🎊`,
            text: "Ficamos muito felizes com o seu cadastro!!! \n\nEsperamos que tenha uma boa experiência no BlockByte!",
            html: "<h2>Ficamos muito felizes com o seu cadastro!!</h2></br><p>Esperamos que tenha uma boa experiência no BlockByte!</p>"
        };

        transport.sendMail(message)

        return res.status(201).json({message: "Usuário cadastrado com sucesso!", usuario: usuario});
    } catch(err){
        console.log(err)
        return res.status(500).json({error: err});
    }
}

async function index(req, res){
    try{
        const usuarios = await Usuario.findAll();
        return res.status(200).json({message: "Todos os usuários listados", usuarios: usuarios});
    } catch(err) {
        return res.status(500).json({err});
    }
}

async function show(req, res){
    const {id} = req.params;
    try{
        const usuario = await Usuario.findByPk(id);
        return res.status(200).json({usuario});
    } catch(err){
        return res.status(500).json({err});
    }
}

async function update(req, res){
    try{
        const token = Auth.getToken(req);
        const payload = Auth.decodeJwt(token);

        const id = payload.sub

        const [updated] = await Usuario.update(req.body, {where: {id: id}});
        if(updated) {
            const usuario = await Usuario.findByPk(id);
            return res.status(200).send(usuario);
        }
        throw new Error();
    }catch(err){
        return res.status(500).json("Usuário não encontrado.");
    }
}

async function destroy(req, res){
    const {id} = req.params;
    try{
        const deleted = await Usuario.destroy({where: {id: id}});
        if(deleted){
            return res.status(200).json("Usuário deletado com sucesso.");
        }
        throw new Error();
    } catch(err){
        return res.status(500).json("Usuário não encontrado.");
    }
}

module.exports = {
    create,
    show, 
    index,
    update, 
    destroy,
}