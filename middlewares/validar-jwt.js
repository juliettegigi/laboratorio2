const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const {Usuario} = require('../models');


const validarJWT =async( req = request, res = response, next ) => {

   let token= req.headers['authorization'] || req.cookies.authorization ;
   
   console.log({token});
   console.log("a ver ......."+req.headers['authorization']);
   console.log("a ver...,,,2  "+req.cookies.authorization);
   if(token.startsWith('Bearer')){
    console.log("entro");
    token=token.slice(7,token.length);
   }
   if(token){
     jwt.verify(token,
               process.env.SECRETORPRIVATEKEY,
               async(err,decoded)=>{
                if(err)  return res.status(401).send({msg:'Token no es válido'})
                else {const {id}=decoded;
                      const usuario = await Usuario.findByPk(id);
                      if( !usuario ) {
                        return res.status(401).json({
                        msg: 'Token no válido - usuario no existe DB'
                        })
                      }
                      req.usuario = usuario;
                      next();   
                }
               }
               )

   }
   else return res.status(401).send({msg:'No se provee token Auth'});
}




module.exports = {
    validarJWT
}