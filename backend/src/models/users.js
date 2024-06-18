const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

module.exports = (sequelize) => {
  sequelize.define('Users',{
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true, // Para hacer que la columna id sea autoincrementable
     
      allowNull:false,
    }, 
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
         
         len: {
            args: [6, 255], // El nombre debe tener al menos 3 caracteres
            msg: 'minimo la contraseña debe ser de 6 caracteres',
          },
        }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isValidName(value) {
          if (!/^[A-Za-z\s]+$/.test(value)) {
            throw new Error('El nombre no puede contener números ni caracteres especiales.');
          }
        },
       len: {
          args: [3, 255], // El nombre debe tener al menos 3 caracteres
          msg: 'El nombre debe tener al menos 3 caracteres y menor a 255 caracteres.',
        },
      }

    },
    gmail: {
      type: DataTypes.STRING,
      
      
      
    },
    photo:{
      type:DataTypes.STRING,
      defaultValue:'',
    },
    category:{
      type:DataTypes.ENUM('user','store','admin') ,
      defaultValue: 'user',
      
    },
 
  },    
  {
     timestamps: false, // Desactivar las columnas createdAt y updatedAt
   })
}

