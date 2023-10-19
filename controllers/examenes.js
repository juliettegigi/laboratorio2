const { Sequelize} = require('sequelize');
const {Examen}=require('../models');




const examenesver= async (req,res) => {
try {console.log("HOlas");
      const ex= await Examen.findAll();
      console.log(ex);
      return res.status(200).json(ex);
} catch (error) {
    return res.status(500).json({ error: 'No se pudieron obtener los exámenes' });

}

}


const examenPost= async(req,res)=>{
    try{ 
    
        const {nombre,detalle,muestraId,examenId}=req.body;

    await Examen.create({nombre,detalle,muestraId,examenId});
    return res.json({msg:"Examen insertado en la DB."})}
  catch{
      return res.json({msg:"Error al insertar un examen en la DB"})
  }  
}













module.exports={
   examenesver,examenPost
  }