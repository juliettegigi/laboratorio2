const Sequelize = require('sequelize');
const{response}=require('express');
const {Determinacion}=require("../models")



const detGetTodas=async()=>{
    try {
        const determinaciones = await Determinacion.findAll( { where: { deletedAt: { [Sequelize.Op.or]: [null, { [Sequelize.Op.not]: null }]}}});
        console.log(determinaciones);
        return determinaciones
      } catch (error) {
        console.error(error);
        return({ok:false})
      }
}

const detPost=async(req,res=response)=>{
     try{ 
        
        const {nombre,unidadMedida,valorMin,valorMax,comentarios}=req.body;
      await Determinacion.create({nombre,unidadMedida,valorMin,valorMax,comentarios});
      return res.render('tecnicoBioq/formDeterminacion',{modal:"Determinación agregada."})}
    catch{
        console.log(error);
        return res.json({msg:"Error al insertar una determinacion en la DB",error})
    }  


}

const detPostidexamen=async(req,res=response)=>{
    try{ const {examenId,nombre,unidadMedida,valorMin,valorMax,comentarios}=req.body;
     await Determinacion.create({nombre,unidadMedida,valorMin,valorMax,comentarios,examenId});
     return res.json({msg:"Determinacion insertada en la DB Con su Examen"})}
   catch{
       console.log(error);
       return res.json({msg:"Error al insertar una determinacion en la DB",error})
   }  


}





//-------------------------------------------------------------------


const detGet=async()=>{

try {
    const det=  await Determinacion.findAll();
    return det
      //return res.status(200).json(det);
} catch (error) {

    return res.status(500).json({ error: 'No se pudieron obtener la  determinacion' });

    //return res.status(500).json({ error: 'No se pudieron obtener a le determinacion' });
    return {error}

}


}

module.exports={
    detPost,
    detGet,
    detPostidexamen,
    detGetTodas
}

/*

{   "edadMin":" " ,
    "edadMax":" " ,
    "sexo":" " ,
    "embarazo":" " ,
    "valorMinimo":" " ,
    "valorMaximo":" "
}
*/