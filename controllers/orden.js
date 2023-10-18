const { Sequelize} = require('sequelize');
const {OrdenTrabajo}=require('../models');

const ordenlogin = async (req, res) => {
    try {
      // Extrae los datos necesarios del cuerpo de la solicitud
      const { usuarioId,medico, diagnostico } = req.body;
  
      // Crea la orden de trabajo en la base de datos
      const ordenTrabajo = await OrdenTrabajo.create({
        usuarioId, // Asocia la orden con un usuario
        medico,
        diagnostico,
        estadoId: 1, // Asigna el estado inicial (puedes cambiar esto según tus necesidades)
      });
  
      // Envía una respuesta de éxito con la orden de trabajo creada
      return res.status(201).json(ordenTrabajo);
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la creación
      console.error('Error al crear la orden de trabajo:', error);
      return res.status(500).json({ error: 'No se pudo crear la orden de trabajo' });
    }
   };
   
   module.exports={
    ordenlogin
  }
  
  /*
  {
     
    "usuarioId": 5,// Asocia la orden con un usuario
    "medico":"lisandro",
    "diagnostico":"Ver Sangre",
    "estadoId":1
  }
  */