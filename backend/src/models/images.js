const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

module.exports = (sequelize) => {
  sequelize.define('Images',{
    id: {
      primaryKey: true,
      
      autoIncrement: true, // Para hacer que la columna id sea autoincrementable
      type: DataTypes.INTEGER
    }, 
    url:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{        
            isUrl: {
                msg: 'La URL debe ser un enlace válido.',
              },
        }
    }, 
 
  },    
  {
     timestamps: false, // Desactivar las columnas createdAt y updatedAt
   })
}

