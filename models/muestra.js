'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Muestra extends Model {
    static associate(models) {
      // Definir las asociaciones aquí

      // Una muestra pertenece a una orden de trabajo
      Muestra.belongsTo(models.OrdenTrabajo, {
        foreignKey: 'ordenId',
        as: 'orden', // El alias para la asociación
      });

      // Una muestra puede estar asociada a un tipo de muestra
      Muestra.hasOne(models.tipoMuestra);
  }
}

  Muestra.init({
    ordenId: DataTypes.INTEGER,
    tipoMuestraId: DataTypes.INTEGER,
    entregada: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Muestras',
    tableName: 'muestras',
    paranoid: true
  });

  return Muestra;
};


/*
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Muestra extends Model {
  
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

*/