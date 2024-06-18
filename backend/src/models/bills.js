const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

module.exports = (sequelize) => {
  sequelize.define('Bills',{
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true, // Para hacer que la columna id sea autoincrementable
     
      allowNull:false,

    }, 
    total:{
        type:DataTypes.DOUBLE,
        defaultValue:0
    },
    state:{
      type:DataTypes.ENUM('finish','open','cancel') ,
      defaultValue: 'open',
      allowNull:false    
    },

    clientname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
 
 
  });
 
}

