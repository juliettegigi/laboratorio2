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


module.exports={
    detPost
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