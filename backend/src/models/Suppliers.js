const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

module.exports = (sequelize) => {
  sequelize.define('Suppliers',{
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true, // Para hacer que la columna id sea autoincrementable
     
      allowNull:false,
    }, 
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{  
         
         len: {
            args: [2, 255], // El nombre debe tener al menos 3 caracteres
            msg: 'minimo el producto debe tener dos caracteres',
          },
        }
    },

    direction:{
      type:DataTypes.STRING, 
      allowNull:false
    },
    
    description:{
        type:DataTypes.STRING,
         
    },
    city:{
      type:DataTypes.STRING,
      allowNull:false
    }
 
  },    
  {
     timestamps: false, // Desactivar las columnas createdAt y updatedAt
   })
}