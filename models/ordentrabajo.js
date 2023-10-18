'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrdenTrabajo extends Model {
    static associate(models) {
      // Definir las asociaciones aquí

      // Una orden de trabajo pertenece a un usuario (usuarioId es la clave externa en la tabla)
      OrdenTrabajo.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'Usuario', // El alias para la asociación
      });

      // Una orden de trabajo tiene muchos exámenes (a través de la tabla de unión examenordenes)
      OrdenTrabajo.belongsToMany(models.Examen, {
        through: 'examenordenes', // Nombre de la tabla de unión
        foreignKey: 'ordenId',
        as: 'Examenes', // El alias para la asociación
      });

      // Una orden de trabajo tiene muchos resultados
      OrdenTrabajo.hasMany(models.Resultado, {
        foreignKey: 'ordenId',
        as: 'Resultados', // El alias para la asociación
      });

      // Una orden de trabajo pertenece a un estado
      OrdenTrabajo.belongsTo(models.Estado, {
        foreignKey: 'estadoId',
        as: 'Estado', // El alias para la asociación
      });
    }
  }

  OrdenTrabajo.init({
    medico: DataTypes.STRING,
    diagnostico: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrdenTrabajo',
    tableName: 'ordentrabajos',
    paranoid: true
  });

  return OrdenTrabajo;
};



/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdenTrabajo extends Model {
 
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
*/