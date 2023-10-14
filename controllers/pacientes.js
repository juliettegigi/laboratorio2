const { Op} = require('sequelize');

const {Usuario,Rol,UsuarioRol}=require('../models');

   





const buscarPacientes = async( termino = '', res = response ) => {
try
{    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
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
               }
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
    const {dni}=req.params;
    const{documento,genero,email,nombre,apellido,fechaNacimiento,telefono,direccion,embarazo}=req.body;// acá tengo el nuevo objeto, con las propiedades que quieren modificar
   
    let cantidad=0;
 //ahora necesito buscar al usuario al que le quieren hacer el update, lo busco pòr id, q me lo mandan en la url
 try{
 const usuario = await Usuario.findOne({
    where: { documento: dni }
  });
  console.log("--------------------------------------------------");
  console.log({usuario});

  if (usuario) {
    // Realiza las actualizaciones necesarias en el objeto 'usuario'
      cantidad=await usuario.update({
      // Campos que deseas actualizar
      documento,genero,email,nombre,apellido,fechaNacimiento,telefono,direccion,embarazo
    });
    if(cantidad!=0){
        console.log(usuario.nombre,"acaa............................................")
         return res.json({mensaje: "SE an actualizado "+cantidad+" campos"});
    }
    return res.json({mensaje: "No se actualizo ningun campo "});
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