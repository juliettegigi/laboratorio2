const { Op} = require('sequelize');


const {Usuario,Rol,UsuarioRol,OrdenTrabajo}=require('../models');

   





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
const verificare = async (req, res) => {
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
    console.log(pacientes[0].id);
    const data={
      id:pacientes[0].id,
      documento:pacientes[0].documento
    };
    console.log(data);
    return res.json(data);
  } catch (err) {
    // Si ocurre un error durante la búsqueda, renderiza la vista 'inicioAdmin' con un mensaje de error
   pacientes=[];
  return res.json(pacientes);
  }
}
const buscarinout = async (req, res) => {
  console.log("hola");
  try {
    const termino = req.query.term; // Obtener el término de búsqueda desde la solicitud GET

    // Realiza una búsqueda de pacientes en la base de datos
    const pacientesPromise = Usuario.findAll({
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
        ],
      },
      attributes: { exclude: ['contrasena'] }
    });
 
    // Realiza una búsqueda de órdenes en la base de datos
    const ordenesPromise = OrdenTrabajo.findAll({
      where: {
        [Op.or]: [
          { id: { [Op.regexp]: termino } }, // Buscar por ID de orden
          { usuarioId: { [Op.regexp]:pacientesPromise.id  } } // Buscar por ID de paciente
        ]
      }
    });

    // Ejecuta ambas consultas de forma concurrente
    const [pacientes, ordenes] = await Promise.all([pacientesPromise, ordenesPromise]);
   
   
    
    // Crea un objeto JSON que contiene ambas listas de resultados
    const resultados = {
      pacientes: pacientes,
      ordenes: ordenes,
  
    };

    // Responde con el objeto JSON que contiene ambas listas de resultados
    return res.json(resultados);
  } catch (err) {
    // Si ocurre un error durante la búsqueda, maneja el error apropiadamente
    console.error(err);
    return res.status(500).json({ error: 'Error en la búsqueda' });
  }
}
const buscarordenes = async (req, res) => {
  const usuarioId = req.query.term;
  

 
   try {
    const ordenes = await OrdenTrabajo.findAll({
      where: {
        usuarioId: usuarioId
      }
    });

    const resultados = {
      ordenes: ordenes
    };

    return res.json(resultados);
   } catch (error) {
   
 
      
      return res.status(500).json({ error: 'Error en la búsqueda' });
    
   }
      
   

    }
    const buscarpaciente = async (req, res) => {
      const usuarioId = req.query.term;
       console.log(usuarioId);
      try {
        const paciente = await Usuario.findOne({
          where: {
            id: usuarioId // Cambia "usuarioId" a "id" para que coincida con la columna en la base de datos
          }
        });
    
        if (paciente) {
          const resultados = {
            paciente
          };
    
          return res.json(resultados);
        } else {
          return res.status(404).json({ error: 'Paciente no encontrado' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en la búsqueda' });
      }
    }

module.exports={
   buscar,actualizar,encontrar,verificar,buscarinout,buscarordenes,buscarpaciente,verificare
}