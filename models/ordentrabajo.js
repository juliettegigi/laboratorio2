'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenTrabajo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrdenTrabajo.init({
    medico: DataTypes.STRING,
    diagnostico: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrdenTrabajo',    
    tableName:'ordentrabajos',
    paranoid:true
  });
  return OrdenTrabajo;
};