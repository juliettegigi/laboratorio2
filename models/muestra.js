'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Muestra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Muestra.init({
    entregada: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Muestra',    
    tableName:'muestras',
    paranoid:true
  });
  return Muestra;
};