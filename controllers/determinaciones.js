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
const detGet=async()=>{
try {
    const det=  await Determinacion.findAll();
    console.log(det);
    return det
      //return res.status(200).json(det);
} catch (error) {
    //return res.status(500).json({ error: 'No se pudieron obtener a le determinacion' });
    return {error}
}


}

module.exports={
    detPost,
    detGet
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