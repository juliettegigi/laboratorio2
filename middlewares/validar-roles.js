const{response,request}=require('express');
const { check } = require('express-validator');
const {Usuario,Rol} = require('../models');


const tieneRole=(rolP)=>{
    return async(req,res,next)=>{
        
     const [{dataValues}]=await req.usuario.getRols();
     if(dataValues.nombreRol!=="Paciente")
        return res.status(401).render("error",{error:`El usuario no tiene el rol ${dataValues} necesario para acceder a la petición.`})   
     next();
      
        
        }
    
}




module.exports={
   tieneRole
}