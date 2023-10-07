const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Importa la función v4 de UUID
const Messages = require("./users.messages");
const Methods = require("../methods");

const sequelize = require("../sequelize");

const Users = sequelize.define("Users", 
    {
        id: {
        type: DataTypes.UUID, // Utilizamos UUID como tipo de datos
        primaryKey: true, // Esto lo hace clave primaria
        defaultValue: () => uuidv4(), // Asigna un nuevo UUID al crear un registro
        },
        role: {
        type: DataTypes.STRING,
        defaultValue: "user",
        },
        name: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: {
        type: DataTypes.STRING,
        select: false, // Esto excluye la contraseña de las consultas por defecto
        },
        updated: DataTypes.DATE,
        created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    },
    {
        timestamps: false, // Esto desactiva automáticamente la creación de createdAt y updatedAt
    }
);

Users.beforeCreate(async (user, options) => {
    user.updated = new Date();

    user.setDataValue("updatedAt", new Date());
    if (user.password) user.password = Methods.bcryptHash(user.password);
});

module.exports = Users;