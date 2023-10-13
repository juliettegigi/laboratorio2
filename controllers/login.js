const{response}=require('express');
const Sequelize = require('sequelize');
const bcryptjs=require('bcryptjs');
const jwt = require('jsonwebtoken');

const {Usuario,Rol}=require("../models")
const { generarJWT } = require('./funciones/jwt');







const login=async(req,res=response)=>{
    if(!req.body.email)
       return res.render("index",{pass:"",email:""})
    const{email,contrasena,nombreRol}=req.body;
       //verificar si el email existe
       try{
           const usuario = await Usuario.findOne({
               where: {  [Sequelize.Op.or]: [ { email }, { documento: email } ] },
               include: [
                 {
                   model: Rol,
                   where: { nombre:nombreRol } 
                 }
               ]
             });

         if(!usuario)return res.render("index",{email:"Usuario o rol incorrecto.",pass:"",passValue:contrasena,emailValue:email})
         
        const passValida=await bcryptjs.compare(contrasena,usuario.contrasena);
        if(!passValida) return res.render("index",{email:"",pass:"Contraseña incorrecta.",passValue:contrasena,emailValue:email});   
       
        const token=await generarJWT(usuario.id);
       // const token = jwt.sign({ id:usuario.id }, process.env.SECRETORPRIVATEKEY);
       //res.header('Authorization', token);
       //res.redirect(`/pacientes`);
       res.redirect(`/pacientes?token=${token}`);
       }
       catch(error){
        console.log(error);
           return res.status(500).render("error",{error})
       }
     
   }
   

module.exports={login} 


