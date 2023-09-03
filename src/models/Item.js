const DataTypes = require("sequelize")
const sequelize = require("../config/sequelize");

const Item = sequelize.define("Item", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}, {timestamps: true});

Item.associate = (models) => {
    Item.belongsTo(models.Usuario);
};

module.exports = Item;