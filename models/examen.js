'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {
    static associate(models) {
      // Definir las asociaciones aquí

      // Un examen puede tener muchos tipos de muestra
      Examen.belongsToMany(models.TipoMuestra, {
        through: 'muestras', // Nombre de la tabla de unión
        foreignKey: 'examenId',
        as: 'tiposMuestra', // El alias para la asociación
      });

      // Un examen puede estar asociado a muchas órdenes de trabajo a través de ExamenOrdenes
      Examen.belongsToMany(models.OrdenTrabajo, {
        through: 'examenordenes', // Nombre de la tabla de unión
        foreignKey: 'examenId',
        as: 'ordenesTrabajo', // El alias para la asociación
      });
    }
  }

  Examen.init({
    nombre: DataTypes.STRING,
    detalle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Examen',
    tableName: 'examenes',
    paranoid: true
  });

  return Examen;
};

/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {

    
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
*/