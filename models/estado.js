'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    static associate(models) {
      // Definir las asociaciones aquí

      // Un estado puede estar asociado a muchas órdenes de trabajo
      Estado.hasMany(models.OrdenTrabajo, {
        foreignKey: 'estadoId',
        as: 'ordenesTrabajo', // El alias para la asociación
      });
    }
  }

  Estado.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estado',
    tableName: 'estados',
    paranoid: true
  });

  return Estado;
};

/*
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  Estado.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estado',
    tableName:'estados',
  });
  return Estado;
};
*/