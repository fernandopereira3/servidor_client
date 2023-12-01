const Sequelize = require('sequelize');
const sequelize = new Sequelize('usuariosdb','fernando','umbrella', {
    host: "localhost", 
    dialect: "mariadb",

    pool: {
        max: 4,
        min: 0,
        idle: 10000
    },

});

sequelize
.authenticate()
.then(function(){
    console.log("CONECTADO...")
})
.catch(err => {
    logger.error('Erro ao se conetar com o BD:', err);
   });

   //teste 