const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../sequelize");
const { v4: uuidv4 } = require('uuid');
const Users = require('../users/users.modelMySql')

const Sessions = sequelize.define("Sessions", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        },
    userId: {
        type: DataTypes.UUID,
    },
    token: {
        type: DataTypes.STRING,
    },
    expired: {
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

Sessions.belongsTo(Users, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = Sessions;
