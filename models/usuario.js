'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsToMany(models.Rol, {through:"UsuarioRol"})
      Usuario.hasMany(models.UsuarioRol);
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    documento:{type:DataTypes.STRING,
               unique:true
               },
    fechaNacimiento :DataTypes.DATEONLY,
    genero:DataTypes.ENUM('Masculino','Femenino','Otro'),
    telefono:DataTypes.STRING,
    direccion:DataTypes.STRING, 
    nombreUsuario:DataTypes.STRING,//
    email: DataTypes.STRING,
    contrasena: DataTypes.STRING
    
  },
    {
    sequelize,
    modelName: 'Usuario',
    tableName:'usuarios',
    paranoid:true,

  });
  return Usuario;
};