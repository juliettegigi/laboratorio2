const{Router}=require('express');
const Sequelize = require('sequelize');
const { check } = require('express-validator');

const { detGet, detPost, detGetTodas,activarDeterminacion, desactivarDeterminacion } = require('../controllers/determinaciones');
const { tipoMuestrasGet, postMuestra, getVistaMuestra, activarMuestra, desactivarMuestra, muestrasGetTodos } = require('../controllers/muestras');
const router=Router();
const {Determinacion,Examen,TipoMuestra,TipoExamen,ValorReferencia,sequelize,ExamenDeterminacion}=require("../models");
const { tipoExamenesGet } = require('../controllers/tipoexamen');
const { tieneOrden, examenesGet, examenPost, putExamen } = require('../controllers/examenes');
const { postValorRef, refGetTodos, activarRef, desactivarRef } = require('../controllers/valorreferencia');
const { procesarBody } = require('../middlewares/formExamen');
const { validarCampos0 } = require('../middlewares/validar-campos');


router.get('/inicio',(req,res)=>{res.render("tecnicoBioq/inicio",{modal:false})})
//router.get('/inicio',(req,res)=>{res.render("inicioAdmin2/inicioAdmin2")})

router.get('/addet',async(req,res)=>{
            return res.render("tecnicoBioq/formdeterminacion",{modal:false})})





router.get('/activarDeterminacion',async(req,res)=>{
        console.log("lala");
        const determinaciones=await detGetTodas()
          res.render('tecnicoBioq/activarDeter',{determinaciones})
      })  
      


      router.get('/addValorRef',async(req,res)=>{
        let arrDet= await detGet();
        res.render('tecnicoBioq/addReferencia',{arrDet,modal:false})
     })
     router.get('/activarRef',async(req,res)=>{
      let arrRef=await refGetTodos();
      res.render('tecnicoBioq/activarRef',{arrRef})
     })
     router.get('/activarMuestra',async(req,res)=>{
        let muestras= await muestrasGetTodos();
        console.log(muestras);
        res.render('tecnicoBioq/activarMuestra',{muestras,modal:false})
     })
     router.post('/activarMuestra',activarMuestra)
     router.post('/desactivarMuestra',desactivarMuestra)
     router.post('/activarRef',activarRef)
     router.post('/desactivarRef',desactivarRef)
     router.post('/desactivarDeterminacion',desactivarDeterminacion)
     router.post('/activarDeterminacion',activarDeterminacion)
     router.post('/addMuestra',postMuestra)
     router.post('/addValorRef',[
                    check('sexo').notEmpty().withMessage('Valor requerido.').isIn(['F','M','O']).withMessage('Valor inválido'), 
                    check('embarazo').notEmpty().withMessage('Valor requerido.').isIn(['true','false']).withMessage('Valor inválido'),
                   check('determinacionId').notEmpty().withMessage('Valor requerido.').isNumeric(),
                    check('determinacion').notEmpty().withMessage('Valor requerido.'),
                    check('edadMin').notEmpty().withMessage('Valor requerido.').isInt().withMessage('Valor inválido.'),
                    check('edadMax').notEmpty().withMessage('Valor requerido.').isInt().withMessage('Valor inválido.'),
                    check('valorMinimo').notEmpty().withMessage('Valor requerido.').isDecimal().withMessage('Valor inválido.'),
                    check('valorMaximo').notEmpty().withMessage('Valor requerido.').isDecimal().withMessage('Valor inválido.'),
                    async(req, res, next) => {
                      let arrDet= await detGet();
                     req.renderizar=(errors)=>{
                      res.render('tecnicoBioq/addReferencia',{arrDet,modal:false,errors,opc:req.body})
                     } 
                      next(); 
                      },
                    validarCampos0],
                    postValorRef)
    
    
    router.get('/addValorRef2',async(req,res)=>{
      
      console.log("pepepep")
      
      let arrDet= await detGet();
      return res.render('tecnicoBioq/addRef2',{arrDet})
    })      
    
    router.post('/addValorRef2',async(req,res)=>{

      console.log(req.body)
      let arrDet= await detGet();
      return res.render('tecnicoBioq/addRef2',{arrDet})
    })      
    




     router.get('/addMuestra',getVistaMuestra)

    router.put('/editar',[procesarBody],putExamen)  




      router.post('/edit',async(req,res)=>{
  try{
    const examen=JSON.parse(req.body.examen)
    const obj={id:examen.id,eNombre:examen.nombre,muestras:examen.tipoMuestraId,detalle:examen.detalle,tipoExamen:examen.tipoExamenId, demora:examen.demora}
    let dets=[]
    if(examen.Determinacions){
      dets=examen.Determinacions.map(elem=>elem.id)
      obj.detExistentes=dets;
    }
    let arrDet= await detGet();
    let arrMuestras= await tipoMuestrasGet();
    let arrTe= await tipoExamenesGet();    
            return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras,arrTe,modal:false,form:obj,ruta:"editar?_method=put"})
  }
  catch(err){
    res.json({err})//TODO: cambiar
  }
  
})


router.post('/addet',detPost)            
router.get('/formExamen',async(req,res)=>{
    let arrDet= await detGet();
    let arrMuestras= await tipoMuestrasGet();
    let arrTe= await tipoExamenesGet();
   return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras,arrTe,modal:false,form:null,ruta:'/submit'})
})
  router.get('/actualizar',async(req,res)=>{
           const {ok,examenes}=await examenesGet();

    res.render('tecnicoBioq/actualizarExamen',{examenes})
  })

router.put('/actualizar/:id',[
  procesarBody,  
],
 async(req,res)=>{
         const{id}=req.id;
         const rta=await tieneOrden(id)
})





   router.post('/submit',[procesarBody],examenPost)

   
module.exports=router