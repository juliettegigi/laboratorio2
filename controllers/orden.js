const { Sequelize} = require('sequelize');
const {OrdenTrabajo,Usuario}=require('../models');

const ordenPost = async (req, res) => {
    try {

      const { usuarioId,medico, diagnostico,estadoId } = req.body;

      const ordenTrabajo = await OrdenTrabajo.create({ usuarioId,medico,diagnostico,estadoId});

      return res.status(201).json(ordenTrabajo);
    } catch (error) {  
      console.error('Error al crear la orden de trabajo:', error);
      return res.status(500).json({ error: 'No se pudo crear la orden de trabajo' });
    }
   };


   const ordenesGet=async()=>{
    return await OrdenTrabajo.findAll({ include: [{model: Usuario}],});
   }
   
   module.exports={
    ordenPost,ordenesGet
  }
  
  /*
  {
     
    "usuarioId": 5,// Asocia la orden con un usuario
    "medico":"lisandro",
    "diagnostico":"Ver Sangre",
    "estadoId":1
  }
  */