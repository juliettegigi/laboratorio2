'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Determinacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Determinacion.init({
    nombre: DataTypes.STRING,
    unidadMedida:DataTypes.STRING,
    valorMin: DataTypes.DECIMAL(10,2),
    valorMax: DataTypes(10,2),
  }, {
    sequelize,
    modelName: 'Determinacion',
    tableName:'determinaciones',
    paranoid:true,
  });
  return Determinacion;
};