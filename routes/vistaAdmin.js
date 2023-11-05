const{Router}=require('express');
const { Sequelize} = require('sequelize');
const bcryptjs=require('bcryptjs');
const { getOrdenes } = require('../controllers/orden');
const {OrdenTrabajo,Usuario,Estado,Rol}=require('../models');
const { getEstadoOrden } = require('../controllers/estadoOrden');
const { check } = require('express-validator');
const { validarCampos0 } = require('../middlewares/validar-campos');
const { usuarioExiste, emailExiste } = require('../controllers/funciones/validaciones');
const { listaDePacientes } = require('../controllers/pacientes');



const router=Router()



router.get('/listaOrdenes', async(req,res)=>{
    /*Actualización de Orden de Trabajo (siempre y cuando todavía este en los estado "ingresada" y "esperando toma de muestra" y "Analítica") */
    const ordenes=await getOrdenes(['Informada','Esperando toma de muestra','Analitica']);
    res.render("administrativo/listaOrdenes",{ordenes})
})



router.get('/editar',async(req,res)=>{

    const {ordenId}=req.query;
    if(ordenId){
        const orden=await OrdenTrabajo.findByPk(ordenId,{ include: [{model: Usuario, attributes: {exclude: ['contrasena']}},
                                                                    {model: Estado}]});
        
        const estados=await getEstadoOrden();
        return res.render("administrativo/actualizar",{orden,estados})
    }
    return res.json({p:""})
})


router.get('/inicio',async(req,res)=>{
    res.render("inicioAdmin2/inicioAdmin2",{modal:false})
})

///////////////////////////////////////////////////////////////////////////////////////////////////// PACIENTES
router.get('/inicio/personas',async(req,res)=>{
    const pacientes=await listaDePacientes()
    res.render("gestionPacientes/inicio",{modal:false,pacientes})
})





router.get('/editarPaciente',async(req,res)=>{
    const {id} = req.query
    const user=await Usuario.findByPk(id,{include:{model:Rol}})
   

    return res.render('gestionPacientes/add', { ruta:`/vistaAdmin/editarPaciente?_method=put`,form:{embarazo:user.embarazo,id,nombre:user.nombre,apellido:user.apellido,documento:user.documento,fechaNacimiento:user.fechaNacimiento,genero:user.genero,telefono:user.telefono,direccion:user.direccion,email:user.email}})

    
})


router.put('/editarPaciente',async(req,res)=>{
         const pacientes=await listaDePacientes()
            const {id,nombre,apellido,documento,matricula,fechaNacimiento,genero,telefono,direccion,email,embarazo}=req.body
            await Usuario.update({nombre,apellido,documento,matricula,fechaNacimiento,genero,telefono,direccion,email,embarazo},{where:{id}})
            return res.render("gestionPacientes/inicio",{pacientes})
})






router.get('/add',(req,res)=>{
    res.render('gestionPacientes/add')
})

router.post('/add',[ 
    check('nombre','introduzca caracteres válidos , por favor').matches(/^[A-Za-zÁ-Úä-üñÑ]+( [A-Za-zÁ-Úä-üñÑ]+)*$/),
check('apellido','Introduzca caracteres válidos , por favor').matches(/^[A-Za-zÁ-Úä-üñÑ]+( [A-Za-zÁ-Úä-üñÑ]+)*$/).notEmpty(),
check('documento','Sólo permitimos documentos de 7-9 dígitos.').notEmpty().matches(/^\d{7,9}$/),
check('fechaNacimiento').notEmpty().withMessage('Campo requerido'),
check('embarazo').notEmpty().withMessage('Campo requerido'),
check('genero').notEmpty().isIn(['Otro', 'Femenino', 'Masculino']).withMessage('Seleccione una opción'),
check('telefono').notEmpty().withMessage('Campo requerido'),
check('direccion').isString().notEmpty().withMessage('Campo requerido.'),
check('email',"El correo no es válido").isEmail(),
check('email').custom(emailExiste),
async (req, res, next) => {
    req.renderizar = async(errors) => {
      return res.render('gestionPacientes/add', { obj:{errors },form:req.body})
    }
    next();
  },
validarCampos0
],

async(req,res)=>{
    const t = await Usuario.sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVEL_READ_COMMITTED });
  
    try {
      
      const { nombre, apellido, documento, fechaNacimiento, genero, telefono, direccion, email, matricula,embarazo, rol } = req.body;
      const contrasena = documento;
      const usuario = await Usuario.create({contrasena,email,nombre,apellido,documento,fechaNacimiento,genero,telefono,direccion,matricula,embarazo}, { transaction: t });
   
     
     
            const r = await Rol.findOne({ where: { nombre: 'Paciente' } });
            await usuario.addRol(r, { transaction: t });
        
  
      const salt=bcryptjs.genSaltSync();
      usuario.contrasena=bcryptjs.hashSync(contrasena,salt);
      await usuario.save({ transaction: t });  
      await t.commit();
      const pacientes=await listaDePacientes()
      return res.render("gestionPacientes/inicio",{modal:false,pacientes})
    } catch (err) {
      await t.rollback();
      console.log(err);
      
      return res.render('gestionPacientes/add', {form:req.body })
    }
     
})

//////////////////////////////////////////////////////////////////////////////////////////

router.put('/editar',
[check('usuario').notEmpty().withMessage('Valor requerido.'),
check('usuario').custom(usuarioExiste),
check('medico').notEmpty().withMessage('Valor requerido.'),
check('diagnostico').notEmpty().withMessage('Valor requerido.'),
check('estadoId').notEmpty().withMessage('Valor requerido.'),
async(req, res, next) => {
    const orden=await OrdenTrabajo.findByPk(req.body.id,{ include: [{model: Usuario, attributes: {exclude: ['contrasena']}},
    {model: Estado}]});
    const estados=await getEstadoOrden();
   req.renderizar=(errors)=>{
    res.render('administrativo/actualizar',{estados,errors,orden})
   } 
    next(); 
    },
validarCampos0
]
,async(req,res)=>{
try{

    const{id,medico,diagnostico,estadoId}=req.body
    const nuevosValores={ usuarioId:req.user.id,estadoId,medico,diagnostico}
    OrdenTrabajo.update(nuevosValores, {where: {id}})
    res.render("administrativo/inicio",{modal:"Orden de trabajo actualizada"})
}
catch(err){
    console.log(err);
}
})

module.exports=router

