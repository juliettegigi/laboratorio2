'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Determinacion extends Model {
    
    static associate(models) {
      Determinacion.hasMany(models.ValorReferencia)
    }
  }
  Determinacion.init({
    nombre: DataTypes.STRING,
    unidadMedida:DataTypes.STRING,
    valorMin: DataTypes.DECIMAL(10,2),
    valorMax: DataTypes.DECIMAL(10,2),
    examenId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Determinacion',
    tableName:'determinaciones',
    paranoid:true,
  });
  return Determinacion;
};