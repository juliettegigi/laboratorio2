const { Router } = require('express');
const { check } = require('express-validator');

const { detGet, detPost, detGetTodas, activarDeterminacion, desactivarDeterminacion } = require('../controllers/determinaciones');
const { tipoMuestrasGet, postMuestra, getVistaMuestra, activarMuestra, desactivarMuestra, muestrasGetTodos } = require('../controllers/muestras');
const router = Router();
const { ValorReferencia } = require("../models");
const { tipoExamenesGet } = require('../controllers/tipoexamen');
const { tieneOrden, examenesGet, examenPost, putExamen, activarExamen, examenesGetTodos } = require('../controllers/examenes');
const { postValorRef, refGetTodos, activarRef, desactivarRef, crearArregloValorRefyId } = require('../controllers/valorreferencia');
const { procesarBody, procesarBody2 } = require('../middlewares/formExamen');
const { validarCampos0 } = require('../middlewares/validar-campos');
const { detValorRef } = require('../controllers/funciones/validaciones');


router.get('/inicio', (req, res) => { 
  console.log(req.usuario.Rols);
  const soyPaciente=req.usuario.Rols.some(element => element.nombre==='Paciente')
  console.log(soyPaciente);
  res.render("tecnicoBioq/inicio", { modal: false ,soyPaciente}) })
//router.get('/inicio',(req,res)=>{res.render("inicioAdmin2/inicioAdmin2")})

router.get('/addet', async (req, res) => {
  return res.render("tecnicoBioq/formdeterminacion", { modal: false })
})





router.get('/activarDeterminacion', async (req, res) => {
  const determinaciones = await detGetTodas()
  res.render('tecnicoBioq/activarDeter', { determinaciones })
})



router.get('/addValorRef', async (req, res) => {
  let arrDet = await detGet();
  res.render('tecnicoBioq/addReferencia', { arrDet, modal: false })
})


router.get('/activarRef', async (req, res) => {
  let arrRef2 = await refGetTodos();
  const arrRef=[];
  for(ref of arrRef2){
           if(ref.deletedAt){
                      const obj={ hombre: [], mujer: [], embarazada: [] };
                      await crearArregloValorRefyId(ref.determinacionId,obj) 
                      const arr=[ref.edadMin,ref.edadMax,ref.valorMinimo,ref.valorMaximo]
                      switch(ref.sexo){
                        case 'M':obj.hombre.push(arr);
                                 detValorRef(obj['hombre'],'hombre', obj, 0);
                                 break;
                        case 'F': ref.embarazo?obj.embarazada.push(arr):obj.mujer.push(arr);
                                  if(ref.embarazo)
                                     detValorRef(obj['embarazada'],'embarazada', obj, 0);
                                  else
                                  detValorRef(obj['mujer'],'mujer', obj, 0);  
                      }
                      if (!(Object.keys(obj).length > 3))
                          arrRef.push(ref)
                 }
           else arrRef.push(ref)
  }
  res.render('tecnicoBioq/activarRef', { arrRef })
})
router.get('/activarMuestra', async (req, res) => {
  let muestras = await muestrasGetTodos();
  res.render('tecnicoBioq/activarMuestra', { muestras, modal: false })
})
router.get('/activarExamen',async (req, res) => {
  let examenes = await examenesGetTodos();
  res.render('tecnicoBioq/activarExamen', { examenes, modal: false })
})
router.post('/activarExamen', activarExamen)
router.post('/activarMuestra', activarMuestra)
router.post('/desactivarMuestra', desactivarMuestra)
router.post('/activarRef', activarRef)
router.post('/desactivarRef', desactivarRef)
router.post('/desactivarDeterminacion', desactivarDeterminacion)
router.post('/activarDeterminacion', activarDeterminacion)
router.post('/addMuestra', postMuestra)
router.post('/addValorRef', [
  check('sexo').notEmpty().withMessage('Valor requerido.').isIn(['F', 'M', 'O']).withMessage('Valor inválido'),
  check('embarazo').notEmpty().withMessage('Valor requerido.').isIn(['true', 'false']).withMessage('Valor inválido'),
  check('determinacionId').notEmpty().withMessage('Valor requerido.').isNumeric(),
  check('determinacion').notEmpty().withMessage('Valor requerido.'),
  check('edadMin').notEmpty().withMessage('Valor requerido.').isInt().withMessage('Valor inválido.'),
  check('edadMax').notEmpty().withMessage('Valor requerido.').isInt().withMessage('Valor inválido.'),
  check('valorMinimo').notEmpty().withMessage('Valor requerido.').isDecimal().withMessage('Valor inválido.'),
  check('valorMaximo').notEmpty().withMessage('Valor requerido.').isDecimal().withMessage('Valor inválido.'),
  async (req, res, next) => {
    let arrDet = await detGet();
    req.renderizar = (errors) => {
      res.render('tecnicoBioq/addReferencia', { arrDet, modal: false, errors, opc: req.body })
    }
    next();
  },
  validarCampos0],
  postValorRef)



 

router.get('/addValorRef2', async (req, res) => {
  const {determinacionId,determinacion}=req.query  
  if(determinacionId){
    const obj={ hombre: [], mujer: [], embarazada: [] };
    const idsRef={ hombre: [], mujer: [], embarazada: [] }

    await crearArregloValorRefyId(determinacionId,obj,idsRef)
    let arrDet = await detGet();
    
    return res.render('tecnicoBioq/addRef2', { arrDet,obj2:{met:"post",idsRef,obj,determinacion},determinacionId })
  }
  

  let arrDet = await detGet();
  return res.render('tecnicoBioq/addRef2', { arrDet,obj2:{met:"get",determinacionId} })
})







router.post('/addValorRef2', [
  procesarBody2,
  check('determinacionId').notEmpty().withMessage('Valor requerido.'),
  async (req, res, next) => {
    let arrDet = await detGet();
    req.renderizar = (errors) => {
      return res.render('tecnicoBioq/addRef2', { obj2:{met:"post",determinacionId:req.determinacionId,idRef:[]},arrDet, errors, obj: req.obj })
    }
    next();
  },
  validarCampos0
], async (req, res) => {
  const {determinacionId}=req.body;
  const arr=['hombre','mujer','embarazada']
  
  if(req.obj1){
    for(let elem of arr){
      if(req.obj1[elem]){      
        for(let valores of req.obj1[elem]){
         await ValorReferencia.create({determinacionId,edadMin:valores[0],edadMax:valores[1],sexo:elem==='hombre'?'M':'F',embarazo:elem==='embarazada',valorMinimo:valores[2],valorMaximo:valores[3]});
        }
      }}
   
  }
  if(req.obj2){

    for(let elem of arr){

      if(req.obj2[elem]){     
        for(let valores of req.obj2[elem]){
         await ValorReferencia.update({edadMin:valores[0],edadMax:valores[1],sexo:elem==='hombre'?'M':'F',embarazo:elem==='embarazada',valorMinimo:valores[2],valorMaximo:valores[3]},
                                     { where: { id: parseInt(valores[4])} });
        }
      }
    }
  }
  



  let arrDet = await detGet();
  return res.render('tecnicoBioq/inicio')
})





router.get('/addMuestra', getVistaMuestra)

router.put('/editar',  putExamen)




router.post('/edit', async (req, res) => {
  try {
    const examen = JSON.parse(req.body.examen)
    const obj = { id: examen.id, eNombre: examen.nombre, muestras: examen.tipoMuestraId, detalle: examen.detalle, tipoExamen: examen.tipoExamenId, demora: examen.demora }
    let dets = []
    if (examen.Determinacions) {
      dets = examen.Determinacions.map(elem => elem.id)
      obj.detExistentes = dets;
    }
    let arrDet = await detGet();
    let arrMuestras = await tipoMuestrasGet();
    let arrTe = await tipoExamenesGet();
    return res.render("tecnicoBioq/formExamen", { arrDet, arrMuestras, arrTe, modal: false, form: obj, ruta: "editar?_method=put" })
  }
  catch (err) {
    res.json({ err })//TODO: cambiar
  }

})


router.post('/addet', detPost)
router.get('/formExamen', async (req, res) => {
  let arrDet = await detGet();
  let arrMuestras = await tipoMuestrasGet();
  let arrTe = await tipoExamenesGet();
  return res.render("tecnicoBioq/formExamen", { arrDet, arrMuestras, arrTe, modal: false, form: null, ruta: '/submit' })
})
router.get('/actualizar', async (req, res) => {
  const { ok, examenes } = await examenesGet();

  res.render('tecnicoBioq/actualizarExamen', { examenes })
})

router.put('/actualizar/:id', 
  async (req, res) => {
    const { id } = req.id;
    const rta = await tieneOrden(id)
  })





router.post('/submit',  examenPost)


module.exports = router