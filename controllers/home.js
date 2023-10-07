const{response}=require('express');
const {Usuario}=require("../models");

const bcryptjs=require('bcryptjs');
const { generarJWT } = require('./funciones/jwt');




const login=async(req,res=response)=>{
 const{email,contrasena}=req.body;
    //verificar si el email existe
    try{

      const usuario=await Usuario.findOne({where:{email}})
      if(!usuario)return res.status(400).json({msg:"Usuario no pertenece a la DB."})
      
     const passValida=bcryptjs.compareSync(contrasena,usuario.contrasena);
     if(!passValida) return res.status(400).json({msg:"Contraseña incorrecta."});   
    
     const token=await generarJWT(usuario.id);
     const roles=await usuario.getRols();
     console.log(roles[0].nombreRol);
     return res.render("layout",{usuario,token,roles})
    }
    catch(err){
        return res.json({msg:"error "+err})
    }
  
}




module.exports={login}