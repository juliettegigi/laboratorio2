'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExamenOrdenes extends Model {
    static associate(models) {
      // Definir las asociaciones aquí

      // ExamenOrdenes pertenece a una orden de trabajo
      ExamenOrdenes.belongsTo(models.OrdenTrabajo, {
        foreignKey: 'ordenId',
        as: 'orden', // El alias para la asociación
      });

      // ExamenOrdenes pertenece a un examen
      ExamenOrdenes.belongsTo(models.Examen, {
        foreignKey: 'examenId',
        as: 'examen', // El alias para la asociación
      });
    }
  }

  ExamenOrdenes.init({}, {
    sequelize,
    modelName: 'ExamenOrdenes',
    tableName: 'examenordenes',
    paranoid: true
  });

  return ExamenOrdenes;
};


/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamenOrden extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  ExamenOrden.init({
  }, {
    sequelize,
    modelName: 'ExamenOrden',    
    tableName:'examenordenes',
    paranoid:true
  });
  return ExamenOrden;
};

*/