const{Router}=require('express');
const { check } = require('express-validator');

const { detGet, detPost, detGetTodas,activarDeterminacion, desactivarDeterminacion } = require('../controllers/determinaciones');
const { tipoMuestrasGet, postMuestra, getVistaMuestra, activarMuestra, desactivarMuestra, muestrasGetTodos } = require('../controllers/muestras');
const router=Router();
const {Determinacion,Examen,TipoMuestra,TipoExamen,ValorReferencia,sequelize}=require("../models");
const { tipoExamenesGet } = require('../controllers/tipoexamen');
const { tieneOrden, examenesGet } = require('../controllers/examenes');
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
router.post('/edit',async(req,res)=>{
  try{
    
    const examen=JSON.parse(req.body.examen)
    let arrTe= await tipoExamenesGet();
    let arrMuestras= await tipoMuestrasGet();
    res.render("tecnicoBioq/editExamen",{examen,arrTe,arrMuestras});
  }
  catch(err){
    res.json({err})
  }
  
})


router.post('/addet',detPost)            
router.get('/formExamen',async(req,res)=>{
    let arrDet= await detGet();
    let arrMuestras= await tipoMuestrasGet();
    let arrTe= await tipoExamenesGet();
   return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras,arrTe,modal:false,form:null})//{arrDet,arrMuestras,arrTe,modal:"Los datos ingresados son incorrectos.",form:req.body}
})
  router.get('/actualizar',async(req,res)=>{
           const {ok,examenes}=await examenesGet();

    res.render('tecnicoBioq/actualizarExamen',{examenes})
  })

router.put('/actualizar/:id',async(req,res)=>{
         const{id}=req.id;
         const rta=await tieneOrden(id)
})





   router.post('/submit',[
    procesarBody,  
  ],async(req,res)=>{
    
    const t = await sequelize.transaction();
    try{
     const {eNombre,detalle,muestras,tipoExamen,determinaciones}=req.body
      const examen=await Examen.create({nombre:eNombre,detalle}, { transaction: t });
   
   
     for(let muestra of muestras){
                const m=await TipoMuestra.findByPk(muestra)
                 await m.addExamen(examen,{ transaction: t})
     }

     for(let teId of tipoExamen){
        const te=await TipoExamen.findByPk(teId)
         await te.addExamen(examen, { transaction: t })
}



    
    for(let obj of determinaciones){
     
        const det=await Determinacion.create({nombre:obj.determinacion.nombre,unidadMedida:obj.determinacion.unidadMedida,valorMin:obj.determinacion.valorMin,valorMax:obj.determinacion.valorMax,comentarios:""}, { transaction: t});
        
        await examen.addDeterminacion(det, { transaction: t })
        if(obj.hombre){
              for(let fila of obj.hombre){
                const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'H',embarazo:false,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
                await det.addValorReferencia(vr, { transaction: t })
              }
        }
        if(obj.mujer){
            for(let fila of obj.mujer){
              const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'F',embarazo:false,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
              await det.addValorReferencia(vr, { transaction: t })
            }
      }
      if(obj.embarazada){
        for(let fila of obj.mujer){
          const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'F',embarazo:true,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
          await det.addValorReferencia(vr, { transaction: t })
        }
  }
        
    }

   if(req.body.detExistentes){
             for(let det of req.body.detExistentes){
                   const p=await examen.addDeterminacion(det,{ transaction: t })
             }
   }

   await t.commit();

   return res.render("tecnicoBioq/inicio",{modal:"Examen agregado."})
  
  }catch (error) {
    console.log(error);
    await t.rollback();

    if (error.name === 'SequelizeUniqueConstraintError')
       req.body.nombreExiste=true
       
       let arrDet= await detGet();
       let arrMuestras= await tipoMuestrasGet();
       let arrTe= await tipoExamenesGet(); 
   return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras,arrTe,modal:false,form:req.body})
  }

})
module.exports=router