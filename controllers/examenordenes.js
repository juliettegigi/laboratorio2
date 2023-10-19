const { Sequelize} = require('sequelize');
const {Examen}=require('../models');
//const {TipoMuestra}=require('../models');
const {ExamenOrden ,Muestras}=require('../models');



const examenOrdenPost = async (req, res) => {
const { OrdenTrabajoId,ExamenId }=req.body;
try { 
    await  ExamenOrden.create({OrdenTrabajoId,ExamenId});
   return res.status(200).json({ msg: "examen/orden registrado en la DB."});
   
} catch (error) {
    console.error('Error en examenOrdenPost :', error);
      return res.status(500).json({ error});
}


};

module.exports ={
    examenOrdenPost
}
