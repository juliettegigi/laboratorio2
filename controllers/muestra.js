const { Sequelize} = require('sequelize');
const {Examen}=require('../models');
//const {TipoMuestra}=require('../models');
const {ExamenOrden ,Muestras}=require('../models');



const muestraorden = async (req, res) => {
const { orden,examen,tipoMuestra,entregada }=req.body;
try { 
    const muestra=await  ExamenOrden.create({orden:orden,examen:examen});
   const muestraordenes= await  Muestras.create({orden:orden, tipoMuestra:tipoMuestra,entregada:entregada});
   console.log("..................................");
   return res.status(500).json({ error: 'siiiiiiiiiiiiiiiiiii'});
   
} catch (error) {
    console.error('Error al crear la orden de trabajo:', error);
      return res.status(500).json({ error: 'No se puede asociar el examen con la Orden'});
}


};

module.exports ={
    muestraorden
}
