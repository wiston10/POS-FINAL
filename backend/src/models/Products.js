const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

module.exports = (sequelize) => {
  sequelize.define('Products',{
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
    store:{
        type:DataTypes.INTEGER
    },

    category:{
      type:DataTypes.ENUM('metal','pastico','hogar','madera','deportes') ,
      defaultValue: 'metal',
      allowNull:false
      
    },
    state:{
        type:DataTypes.ENUM('active',"archived","delete"),
        defaultValue:"active",
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
 
  },    
  {
     timestamps: false, // Desactivar las columnas createdAt y updatedAt
   })
}

