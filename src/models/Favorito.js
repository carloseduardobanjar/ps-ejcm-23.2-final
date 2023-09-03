const DataTypes = require("sequelize")
const sequelize = require("../config/sequelize");

const Favorito = sequelize.define("Favorito", {

});

Favorito.associate = (models) => {
    Favorito.belongsTo(models.Usuario);
    Favorito.belongsTo(models.Item);
};

module.exports = Favorito;