const { Sequelize } = require('sequelize')
const Services = require('./servicesMySql')
const Config = require('./config')

module.exports  = new Promise(async (resolve, reject) => {
    const sequelizeWithoutDB = new Sequelize('mysql://root:root@localhost:3307');

    try {
        // Crea la base de datos si no existe
        await sequelizeWithoutDB.query('CREATE DATABASE IF NOT EXISTS pasaporte_digital');
        console.info('[MySQL] (SUCCESS) Base de datos creada o existe');

        // Ahora que la base de datos existe, puedes configurar la conexión a ella
        const sequelize = new Sequelize('mysql://root:root@localhost:3307/pasaporte_digital');

        sequelize.sync({ force: true })
            .then(async () => {
                console.info('[MySQL] (SUCCESS) Conexión establecida');

                const user = await Services.Users.Model.findOne({ where: { role: 'admin' } });

                if (!user) {
                    await Services.Users.createUser({
                        role: 'admin',
                        name: 'Admin',
                        phone: '1234567890',
                        email: `admin@${Config.brand}.com`,
                        password: 'root',
                    });
                }

                resolve();
            })
            .catch(error => {
                console.error('[MySQL] (ERROR) Error en la conexión:', error);
                reject(error);
            });
        resolve()
    } catch (error) {
        console.error('[MySQL] (ERROR) Error al crear o verificar la base de datos:', error);
        reject(error);
    }
});