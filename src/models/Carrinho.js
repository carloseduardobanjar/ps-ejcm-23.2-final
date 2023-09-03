const DataTypes = require("sequelize")
const sequelize = require("../config/sequelize");

const Carrinho = sequelize.define("Carrinho", {
    
}, {timestamps: true});

Carrinho.associate = (models) => {
    Carrinho.belongsTo(models.Usuario);
    Carrinho.belongsTo(models.Item);
};

module.exports = Carrinho;