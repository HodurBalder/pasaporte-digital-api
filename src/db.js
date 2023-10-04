const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mysql://root:root@localhost:3307/pasaporte-digital-api')

sequelize.sync()
    .then(async () => {
        console.info('[MySQL] (SUCCESS) Conexión establecida');
        const user = await User.findOne({ where: { role: 'admin' } });

        if (!user) {
        await User.create({
            role: 'admin',
            name: 'Admin',
            phone: '1234567890',
            email: `admin@${Config.brand}.com`,
            password: 'root',
        });
        }
    })
    .catch(error => {
        console.error('[MySQL] (ERROR) Error en la conexión:', error);
    });