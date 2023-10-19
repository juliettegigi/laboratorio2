'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {
    static associate(models) {
      
      Examen.hasOne(models.TipoMuestra)
      Examen.hasOne(models.TipoExamen)
      Examen.belongsToMany(models.OrdenTrabajo, {through: 'ExamenOrden'})
      Examen.hasMany(models.ExamenOrden)
    }
  }

  Examen.init({
     tipoMuestraId:DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    detalle: DataTypes.TEXT,
    tipoExamenId:DataTypes.INTEGER
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