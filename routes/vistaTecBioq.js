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
     router.post('/addValorRef',postValorRef)
     router.post('/addRef',postValorRef)
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