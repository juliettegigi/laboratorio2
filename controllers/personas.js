const {Persona,Rol}=require('../models');

   

const personaPost=async(req,res)=>{
    try{
    const {nombre, documento, fechaNacimiento, genero, telefono, direccion}=req.body;
    const persona=await Persona.create({nombre, documento, fechaNacimiento, genero, telefono, direccion}); 
    
    
    res.status(201).json({msg:"POST. persona creada correctamente\n",persona})
    }
    catch(err){
        res.status(500).json({msg:"error "+err})
    }
}


module.exports={
    personaPost
 }
 