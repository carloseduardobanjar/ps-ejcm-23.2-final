const DataTypes = require("sequelize")
const sequelize = require("../config/sequelize");

const Usuario = sequelize.define("Usuario", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataNascimento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hash: {
		type: DataTypes.STRING,
	},
	salt: {
		type: DataTypes.STRING
	},
    //TODO inserir endereço
}, {timestamps: true});

module.exports = Usuario;