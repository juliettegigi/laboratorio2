const { Op} = require('sequelize');


const {Usuario,Rol,UsuarioRol}=require('../models');

   





const buscarPacientes = async( termino = '', res = response ) => {
try
{      
    const pacientes = await Usuario.findAll({
        include: [ { model: Rol, through: UsuarioRol, where: { nombre: 'Paciente' }}],
        where: { [Op.or]: [ { documento: { [Op.regexp]: termino } },
                            { email: { [Op.regexp]: termino } },
                            { apellido: { [Op.regexp]: termino } }]
               },
        attributes: { exclude: ['contrasena'] }       
      });

    
    return res.render('inicioAdmin',{ok:true,pacientes,modal:"false",errors:{}})
}
catch(err){
  return res.render('inicioAdmin',{ok:false,pacientes:null,modal:"Error al buscar paciente."})
}
}



///////////////////////////////////////////

const buscar=(req,res=response)=>{

//localhost:3000/buscar/documento||email||apellido
if(!req.params.termino) return res.render('inicioAdmin',{ok:false,pacientes:null,modal:"Error al buscar paciente.",errors:{}})

const{termino}=req.params;
buscarPacientes(termino, res);
  
}


////////////////////////////////////////////

const actualizar=async(req,res)=>{
    
    
    const{documento,genero,email,nombre,apellido,fechaNacimiento,telefono,direccion,embarazo}=req.body;// acá tengo el nuevo objeto, con las propiedades que quieren modificar
   
    let cantidad=0;
 try{
 const usuario = await Usuario.findOne({
    where: { documento }
  });

  if (usuario) {
      cantidad=await usuario.update({
      documento,genero,email,nombre,apellido,fechaNacimiento,telefono,direccion,embarazo
    });
    if(cantidad!=0){
        return res.render("inicioAdmin",{pacientes:null,modal:"El paciente ha sido Actualizado",errors:{}})
    }
       
  }


} catch (e) {
    return res.render('inicioAdmin',{ok:false,pacientes:null,modal:"Error al actualizar paciente.",errors:{}})

   };

}

const encontrar = async (req, res) => {
  console.log(".......................................");
  try {
    const termino = req.query.term; // Obtener el término de búsqueda desde la solicitud GET
    // Realiza una búsqueda de pacientes en la base de datos
    const pacientes = await Usuario.findAll({
      include: [
        { 
          model: Rol, 
          through: UsuarioRol, 
          where: { nombre: 'Paciente' }
        }
      ],
      where: { 
        [Op.or]: [ 
          { documento: { [Op.regexp]: termino } },
          { email: { [Op.regexp]: termino } },
          { apellido: { [Op.regexp]: termino } }
        ]
      },
      attributes: { exclude: ['contrasena'] }
    });

    // Renderiza una vista llamada 'inicioAdmin' con los resultados de la búsqueda
    // y establece algunas variables de contexto como 'ok', 'pacientes', 'modal' y 'errors'
    return res.json(pacientes);
  } catch (err) {
    // Si ocurre un error durante la búsqueda, renderiza la vista 'inicioAdmin' con un mensaje de error
   pacientes=[];
  return res.json(pacientes);
  }
}
const verificar = async (req, res) => {
  const termino = req.body.documento;
  
  try {
     // Obtener el término de búsqueda desde la solicitud GET
    // Realiza una búsqueda de pacientes en la base de datos
    const pacientes = await Usuario.findAll({
      include: [
        { 
          model: Rol, 
          through: UsuarioRol, 
          where: { nombre: 'Paciente' }
        }
      ],
      where: { 
        [Op.or]: [ 
          { documento: { [Op.regexp]: termino } },
          { email: { [Op.regexp]: termino } },
          { apellido: { [Op.regexp]: termino } }
        ]
      },
      attributes: { exclude: ['contrasena'] }
    });

    // Renderiza una vista llamada 'inicioAdmin' con los resultados de la búsqueda
    // y establece algunas variables de contexto como 'ok', 'pacientes', 'modal' y 'errors'
    return res.json(pacientes);
  } catch (err) {
    // Si ocurre un error durante la búsqueda, renderiza la vista 'inicioAdmin' con un mensaje de error
   pacientes=[];
  return res.json(pacientes);
  }
}


module.exports={
   buscar,actualizar,encontrar,verificar
}