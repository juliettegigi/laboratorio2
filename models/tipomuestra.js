'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TipoMuestra extends Model {
    static associate(models) {
      // Definir las asociaciones aquí

      // Un tipo de muestra puede estar asociado a muchos exámenes a través de la tabla de unión "muestras"
      TipoMuestra.belongsToMany(models.Examen, {
        through: 'muestras', // Nombre de la tabla de unión
        foreignKey: 'tipoMuestraId',
        as: 'examenes', // El alias para la asociación
      });
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