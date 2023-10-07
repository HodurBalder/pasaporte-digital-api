const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../sequelize"); 
const Messages = require("./codes.messages");
const { v4: uuidv4 } = require('uuid'); 

const Codes = sequelize.define("Codes", {
    id: {
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: () => uuidv4(), 
    },
    gameName: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.STRING
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    updated: {
        type: DataTypes.DATE
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    }
},
{
    timestamps: false, 
});

Codes.beforeCreate(async (code, options) => {
    code.updated = new Date();
});

Codes.afterCreate((code, options) => {
    
    
});

Codes.afterUpdate((code, options) => {
    
    
});

Codes.afterDestroy((code, options) => {
    
    
});

module.exports = Codes;
