const { Op} = require('sequelize');
const bcryptjs=require('bcryptjs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// ...

app.use(bodyParser.urlencoded({ extended: false }));
const {Usuario,Rol,UsuarioRol}=require('../models');

   





const buscarPacientes = async( termino = '', res = response ) => {
try
{   
    // término puede ser: documento , apellido o email 
    //IE, me pueden buscar por documento, apellido, email

    
    const regex = new RegExp( termino, 'i' );
    // se forma una expresion regular con el termino, 
    //para que me busque todo lo que contenga al "termino"  ej: termino=fer ==> me buscaria "fernanda","fernando","fernandez",etc
    //'i' es insensible a si está en mayus o no 
    const pacientes = await Usuario.findAll({
        include: [ { model: Rol, through: UsuarioRol, where: { nombre: 'Paciente' }}],
        where: { [Op.or]: [ { documento: { [Op.regexp]: termino } },
                            { email: { [Op.regexp]: termino } },
                            { apellido: { [Op.regexp]: termino } }]
               },
        attributes: { exclude: ['contrasena'] }       
      });

    /* return res.json({
        cantidad:pacientes.length,
        pacientes
    }); */
    res.render('inicioAdmin',{ok:true,pacientes})
}
catch(err){
    console.log(err);
    return res.json({
        err
    });
}
}



///////////////////////////////////////////

const buscar=(req,res=response)=>{

//localhost:3000/buscar/documento||email||apellido
if(!req.params.termino)
  res.render('inicioAdmin',{ok:false,pacientes:null})
console.log("req.params,termino= ",req.params.termino);
   const{termino}=req.params;
   buscarPacientes(termino, res);
  
}


////////////////////////////////////////////

const actualizar=async(req,res)=>{
    
    
    const{documentoE,generoE,emailE,nombreE,apellidoE,fechaNacimientoE,telefonoE,direccionE,embarazoE}=req.body;// acá tengo el nuevo objeto, con las propiedades que quieren modificar
   let dni=req.body.documentoE;
   let documento=documentoE;
   let genero=generoE;
   let email=emailE;
   let nombre=nombreE;
   let apellido=apellidoE;
   let fechaNacimiento=fechaNacimientoE;
   let telefono=telefonoE;
   let direccion=direccionE;
   let embarazo=embarazoE;
   console.log(dni,"++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    let cantidad=0;
 try{
 const usuario = await Usuario.findOne({
    where: { documento: dni }
  });
  console.log("--------------------------------------------------");
  console.log({usuario});

  if (usuario) {
      cantidad=await usuario.update({
      documento,genero,email,nombre,apellido,fechaNacimiento,telefono,direccion,embarazo
    });
    if(cantidad!=0){
        return res.render("inicioAdmin",{pacientes:null,modal:"El paciente ha sido Actualizado"})
    }
       
  }


} catch (e) {
    return res.json({
        msg:  "No tenemos Registro Del Usuario con Dni "+dni

    
     }) 

   };

}

module.exports={
   buscar,actualizar
}