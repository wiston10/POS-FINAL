const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

module.exports = (sequelize) => {
  sequelize.define('Phones',{
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true, // Para hacer que la columna id sea autoincrementable
     
      allowNull:false,
    }, 
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,       
    },

  },    
  {
     timestamps: false, // Desactivar las columnas createdAt y updatedAt
   })
}

