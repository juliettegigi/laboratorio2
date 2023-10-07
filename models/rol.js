'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.belongsToMany(models.Usuario,{through:"UsuarioRol"});
      Rol.hasMany(models.UsuarioRol);
    }
  }
  Rol.init({
    nombreRol: DataTypes.ENUM('Tecnico', 'Paciente', 'Bioquimico','Administrativo'),
  }, {
    sequelize,
    modelName: 'Rol',
    tableName:'roles',
    paranoid:true
  });
  return Rol;
};