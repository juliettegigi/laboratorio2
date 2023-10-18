'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamenOrden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExamenOrden.init({
  }, {
    sequelize,
    modelName: 'ExamenOrden',    
    tableName:'examenordenes',
    paranoid:true
  });
  return ExamenOrden;
};