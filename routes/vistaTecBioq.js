const{Router}=require('express');
const { detGet } = require('../controllers/determinaciones');
const { tipoMuestrasGet } = require('../controllers/muestras');
const router=Router();
const {Determinacion,Examen,TipoMuestra,TipoExamen,ValorReferencia}=require("../models");
const { tipoExamenesGet } = require('../controllers/tipoexamen');


router.get('/inicio',(req,res)=>{res.render("tecnicoBioq/inicio")})
//router.get('/inicio',(req,res)=>{res.render("inicioAdmin2/inicioAdmin2")})
router.get('/formDeterminacion',(req,res)=>{res.render("tecnicoBioq/formDeterminacion")})
router.get('/formExamen',async(req,res)=>{
    let arrDet= await detGet();
    let arrMuestras= await tipoMuestrasGet();
    
    let arrTe= await tipoExamenesGet();
   return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras,arrTe})})


router.post('/submit',async(req,res)=>{
    console.log("---------------------------------------------------------");
    console.log(req.body);
    
    const examen=await Examen.create({nombre:req.body.eNombre,detalle:req.body.detalle});

     for(let muestra of req.body.muestras){
                const m=await TipoMuestra.findByPk(muestra)
                 m.addExamen(examen)
     }

     for(let teId of req.body.tipoExamen){
        const te=await TipoExamen.findByPk(teId)
         te.addExamen(examen)
}



    const determinacionesNombre=[]
    for (const propiedad in req.body) {
        if (propiedad.startsWith("nombre")) {
          determinacionesNombre.push(propiedad);
        }
      }
      

    const determinaciones=determinacionesNombre.map(nom=>{
        const obj={hombre:{},mujer:{},embarazada:{}}  
        const det={}
        const[,b]=nom.split("y");
        det.nombre=req.body[nom];
        det.valorMin=req.body[`valorMiny${b}`]
        det.valorMax=req.body[`valorMaxy${b}`];        
        det.unidadMedida=req.body[`unidadMediday${b}`];
        obj.determinacion=det;
        
        const valoresRefHombre=[];
        const valoresRefMujer=[];
        const valoresRefEmbarazada=[];
        for (const propiedad in req.body) {
            if (propiedad.startsWith("Hombre") && propiedad.endsWith(b)) {
              valoresRefHombre.push(req.body[propiedad]);
            }else if (propiedad.startsWith("Mujer") && propiedad.endsWith(b)) {
                valoresRefMujer.push(req.body[propiedad]);
              }else if (propiedad.startsWith("Embarazada") && propiedad.endsWith(b)) {
                valoresRefEmbarazada.push(req.body[propiedad]);
              }
          }
          console.log(valoresRefHombre);
        obj.hombre=valoresRefHombre;
        obj.mujer=valoresRefMujer;
        obj.embarazada=valoresRefEmbarazada;       

    
        return obj
    })

  console.log("DETERMINACIONESS ",determinaciones);
    for(let obj of determinaciones){
        const det=await Determinacion.create({nombre:obj.determinacion.nombre,unidadMedida:obj.determinacion.unidadMedida,valorMin:obj.determinacion.valorMin,valorMax:obj.determinacion.valorMax,comentarios:""});
        det.addExamen(examen)
        if(obj.hombre){
              for(let fila of obj.hombre){
                const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'H',embarazo,valorMinimo:fila[2],valorMaximo:fila[3]});
                det.addValorReferencia(vr)
              }
        }
        if(obj.mujer){
            for(let fila of obj.mujer){
              const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'F',embarazo,valorMinimo:fila[2],valorMaximo:fila[3]});
              det.addValorReferencia(vr)
            }
      }
      if(obj.embarazada){
        for(let fila of obj.mujer){
          const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'F',embarazo:true,valorMinimo:fila[2],valorMaximo:fila[3]});
          det.addValorReferencia(vr)
        }
  }
        
    }

   if(req.body.detExistentes){

   }

    let arrDet= await detGet();
    let arrMuestras= await tipoMuestrasGet();
   return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras})

})
module.exports=router