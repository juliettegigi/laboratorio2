'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Examen.init({
    nombre: DataTypes.STRING,
    detalle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Examen',
    tableName:'examenes',
    paranoid:true
  });
  return Examen;
};