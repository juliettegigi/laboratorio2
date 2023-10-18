'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Muestras extends Model {
    static associate(models) {
      // Definir las asociaciones aquí

      // Una muestra pertenece a una orden de trabajo
      Muestras.belongsTo(models.OrdenTrabajo, {
        foreignKey: 'ordenId',
        as: 'orden', // El alias para la asociación
      });

      // Una muestra puede estar asociada a un tipo de muestra
      Muestras.belongsTo(models.TipoMuestra, {
        foreignKey: 'tipoMuestraId',
        as: 'tipoMuestra', // El alias para la asociación
      });
    }
  }

  Muestras.init({
    ordenId: DataTypes.INTEGER,
    tipoMuestraId: DataTypes.INTEGER,
    entregada: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Muestras',
    tableName: 'muestras',
    paranoid: true
  });

  return Muestras;
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