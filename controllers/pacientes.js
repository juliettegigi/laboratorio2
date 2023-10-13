const { Op} = require('sequelize');

const {Usuario,Rol,UsuarioRol}=require('../models');

   





const buscarPacientes = async( termino = '', res = response ) => {
try
{
    // término puede ser: documento , apellido o email 
    //IE, me pueden buscar por documento, apellido, email

    
    const regex = new RegExp( termino, 'i' );
    console.log({regex});
    // se forma una expresion regular con el termino, 
    //para que me busque todo lo que contenga al "termino"  ej: termino=fer ==> me buscaria "fernanda","fernando","fernandez",etc
    //'i' es insensible a si está en mayus o no 
    const pacientes = await Usuario.findAll({
        include: [ { model: Rol, through: UsuarioRol, where: { nombre: 'Paciente' }}],
        where: { [Op.or]: [ { documento: { [Op.regexp]: termino } },
                            { email: { [Op.regexp]: termino } },
                            { apellido: { [Op.regexp]: termino } }]
               }
      });

    res.json({
        cantidad:pacientes.length,
        pacientes
    });
}
catch(err){
    console.log(err);
    res.json({
        err
    });
}
}



///////////////////////////////////////////

const buscar=(req,res=response)=>{

//localhost:3000/buscar/documento||email||apellido
console.log("req.params,termino= ",req.params.termino);
   const{termino}=req.params;
   buscarPacientes(termino, res);
  
}





module.exports={
   buscar
}


/*

{
    "nombre":"nombre10",
    "apellido":"apellido10", 
    "documento":"documento10",
    "fechaNacimiento":"2023-11-11",
    "genero":"Otro",
    "telefono":"telefono10",
    "direccion":"direccion10",
    "email":"email10@gmail.com",
    "rol":"Bioquimico"
}


*/
