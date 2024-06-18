require('dotenv').config({path:'../.env'});
const app = require('./src/app');
const {db}=require('./src/db')
const PORT = 3001; // Puerto para tu aplicación Node.js

db.sync({alter:true}).then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  }).catch(error => {
    console.error('Error al sincronizar con la base de datos:', error);
  });
  