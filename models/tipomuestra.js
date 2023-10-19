'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TipoMuestra extends Model {
    static associate(models) {
      // Definir las asociaciones aquí

      // Un tipo de muestra puede estar asociado a muchos exámenes a través de la tabla de unión "muestras"
      TipoMuestra.belongsTo(models.Muestra)
    }
  }

  TipoMuestra.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoMuestra',
    tableName: 'tipomuestras',
    paranoid: true
  });

  return TipoMuestra;
};


/*
}'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoMuestra extends Model {

    static associate(models) {
      // define association here
    }
  }
  TipoMuestra.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoMuestra',    
    tableName:'tipomuestras',
    timestamps:false
  });
  return TipoMuestra;
};

*/