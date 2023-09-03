const DataTypes = require("sequelize")
const sequelize = require("../config/sequelize");

const Comentario = sequelize.define("Comentario", {
    texto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {timestamps: true});

Comentario.associate = (models) => {
    Comentario.belongsTo(models.Usuario);
    Comentario.belongsTo(models.Item);
};

module.exports = Comentario;