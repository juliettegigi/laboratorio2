'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Persona.hasOne(models.Usuario);
    }
  }
  Persona.init({
    nombre: DataTypes.STRING,
    documento:{type:DataTypes.STRING,
               unique:true
               },
    fechaNacimiento :DataTypes.DATEONLY,
    genero:DataTypes.ENUM('Masculino','Femenino','Otro'),
    telefono:DataTypes.STRING,
    direccion:DataTypes.STRING,          

  }, {
    sequelize,
    modelName: 'Persona',
    tableName:'personas',
    paranoid:true,
  });
  return Persona;
};