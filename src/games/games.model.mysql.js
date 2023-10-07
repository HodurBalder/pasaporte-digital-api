const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../sequelize");
const { v4: uuidv4 } = require('uuid');
const Users = require('../users/users.modelMySql')

const Games = sequelize.define("Games", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    gameName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playCount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    level: {
        type: DataTypes.STRING,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    code: {
        type: DataTypes.STRING,
    },
    additionalData: {
        type: DataTypes.JSON,
    },
    updated: {
        type: DataTypes.DATE,
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
},
{
    timestamps: false,
}
);

Games.belongsTo(Users, {
    foreignKey: "userId",
    targetKey: "id",
});

module.exports = Games;
