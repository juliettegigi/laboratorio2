const{response}=require('express');
const {Determinacion}=require("../models")


const detPost=async(req,res=response)=>{
     try{ const {nombre,unidadMedida,valorMin,valorMax,comentarios}=req.body;
      await Determinacion.create({nombre,unidadMedida,valorMin,valorMax,comentarios});
      return res.json({msg:"Determinacion insertada en la DB."})}
    catch{
        console.log(error);
        return res.json({msg:"Error al insertar una determinacion en la DB",error})
    }  


}
//insert con  Id de exament--------------------------------------------------------
// ya esta anexada la DETERMINACION A SU EXAMEN 
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
const detGet=async(req,res)=>{
try {
    const det=  await Determinacion.findAll();
    console.log(det);
      return res.status(200).json(det);
} catch (error) {
    return res.status(500).json({ error: 'No se pudieron obtener la  determinacion' });
}


}

module.exports={
    detPost,
    detGet,
    detPostidexamen
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