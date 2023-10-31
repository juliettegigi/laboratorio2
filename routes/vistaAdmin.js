const{Router}=require('express');
const Sequelize = require('sequelize');
const { getOrdenes } = require('../controllers/orden');
const {OrdenTrabajo,Usuario,Estado}=require('../models');
const { getEstadoOrden } = require('../controllers/estadoOrden');
const { check } = require('express-validator');
const { validarCampos0 } = require('../middlewares/validar-campos');
const { usuarioExiste } = require('../controllers/funciones/validaciones');



const router=Router()



router.get('/listaOrdenes', async(req,res)=>{
    /*Actualización de Orden de Trabajo (siempre y cuando todavía este en los estado "ingresada" y "esperando toma de muestra" y "Analítica") */
    const ordenes=await getOrdenes(['Informada','Esperando toma de muestra','Analitica']);
    res.render("administrativo/listaOrdenes",{ordenes})})



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


router.get('/',async(req,res)=>{
    res.render("administrativo/inicio",{modal:false})
})

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

