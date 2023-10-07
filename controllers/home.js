const{response}=require('express');
const {Usuario,Rol}=require("../models");

const bcryptjs=require('bcryptjs');
const { generarJWT } = require('./funciones/jwt');




const login=async(req,res=response)=>{
 const{email,contrasena,nombreRol}=req.body;
    //verificar si el email existe
    try{

        const usuario = await Usuario.findOne({
            where: { email },
            include: [
              {
                model: Rol,
                where: { nombreRol } 
              }
            ]
          });
      if(!usuario)return res.render("index",{email:"Usuario o rol incorrecto.",pass:"",passValue:contrasena,emailValue:email})
      
     const passValida=bcryptjs.compareSync(contrasena,usuario.contrasena);
     if(!passValida) return res.render("index",{email:"",pass:"Contraseña incorrecta.",passValue:contrasena,emailValue:email});   
    
     const token=await generarJWT(usuario.id);
     const roles=await usuario.getRols();
     return res.render("layout",{usuario,token,roles})
    }
    catch(err){
        return res.json({msg:"error "+err})
    }
  
}




module.exports={login}