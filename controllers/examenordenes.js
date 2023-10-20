const { Sequelize} = require('sequelize');
const {Examen}=require('../models');
//const {TipoMuestra}=require('../models');
const {ExamenOrden ,Muestra}=require('../models');



const examenOrdenPost = async (req, res) => {
const { OrdenTrabajoId,ExamenId,tipoMuestraId,entregada }=req.body;
/*
tipoMuestraId   Cuando una Usuario Elige un examen, tambien me devuelve 
el tipoMuestraId para ho haacer la busqueda de vuelta
entregada ;cuando buscan el examen  les sale los tipos de muestra que tiene que 
entregar en el caso que le falte entregar la variable entregada viene en falso .
*/
let ordenId=OrdenTrabajoId;
   
try { 
    await  ExamenOrden.create({OrdenTrabajoId,ExamenId});
    await Muestra.create({
    ordenId,
    tipoMuestraId,
    entregada,
  });

  return res.status(200).json({ msg: "Examen/orden y muestra registrados en la DB." });
} catch (error) {
    console.error('Error en examenOrdenPost :', error);
      return res.status(500).json({ error});
}


};

module.exports ={
    examenOrdenPost
}
