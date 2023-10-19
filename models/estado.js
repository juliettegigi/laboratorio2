'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    static associate(models) {
      
      Estado.belongsTo(models.OrdenTrabajo)
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