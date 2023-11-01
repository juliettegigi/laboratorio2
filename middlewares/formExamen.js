const { detValorRef } = require("../controllers/funciones/validaciones");
const { detGet} = require('../controllers/determinaciones');
const { tipoExamenesGet } = require('../controllers/tipoexamen');
const { tipoMuestrasGet } = require('../controllers/muestras');

const procesarBody = async(req, res, next) => {
    let msg = ""
    let err=""
    
    const {eNombre,muestras,tipoExamen,detalle,detExistentes,demora}=req.body
    const nuevoBody={eNombre,muestras,tipoExamen,detalle,detExistentes,demora};
    if(req.body.id){
         nuevoBody.id=req.body.id}
      
    nuevoBody.determinaciones=[]

    const determinacionesNombre = []
    for (const propiedad in req.body) {
       if (propiedad.startsWith("nombre")) {
                determinacionesNombre.push(propiedad);
            }
        }

      if(determinacionesNombre.length!==0){  nuevoBody.determinaciones = determinacionesNombre.map((nom,index) => {
            const obj = { hombre: {}, mujer: {}, embarazada: {} }
            const det = {}
            const [, b] = nom.split("y");
            det.nombre = req.body[nom];
            det.valorMin = req.body[`valorMiny${b}`]
            det.valorMax = req.body[`valorMaxy${b}`];
            det.unidadMedida = req.body[`unidadMediday${b}`];
            obj.determinacion = det;

            if(parseFloat(det.valorMin)>=parseFloat(det.valorMax))
               obj.errorDetValor=true;

            const valoresRefHombre = [];
            const valoresRefMujer = [];
            const valoresRefEmbarazada = [];
            for (const propiedad in req.body) {
                if (propiedad.startsWith("Hombre") && propiedad.endsWith(b)) {
                    valoresRefHombre.push(req.body[propiedad].map(elem=>parseFloat(elem)));
                    msg=detValorRef(valoresRefHombre,'Hombre',obj,index)
                    if(!err)
                       err=msg
                    
                } else if (propiedad.startsWith("Mujer") && propiedad.endsWith(b)) {
                    valoresRefMujer.push(req.body[propiedad].map(elem=>parseFloat(elem)));
                    msg=detValorRef(valoresRefMujer,'Mujer',obj,index)
                } else if (propiedad.startsWith("Embarazada") && propiedad.endsWith(b)) {

                    valoresRefEmbarazada.push(req.body[propiedad].map(elem=>parseFloat(elem)));
                    msg=detValorRef(valoresRefEmbarazada,'Embarazada',obj,index)
                }
            }
            obj.hombre = valoresRefHombre;
            obj.mujer = valoresRefMujer;
            obj.embarazada = valoresRefEmbarazada;
            return obj
        })}


        nuevoBody.msg=msg;
        req.body=nuevoBody;        
        if(msg){        
            let arrDet= await detGet();
            let arrMuestras= await tipoMuestrasGet();
            let arrTe= await tipoExamenesGet();    
            return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras,arrTe,modal:msg,form:req.body,ruta:"submit"})
        }
        else next();
    }




    const procesarBody2 =async(req,res,next) => {

  
        const { determinacionId } = req.body
        const obj = { hombre: [], mujer: [], embarazada: [] }
      
        function procesar( arr, sex, obj){
        const propH = [`${sex}BodyedadMin`, `${sex}BodyedadMax`, `${sex}BodyvalorMinimo`, `${sex}BodyvalorMaximo`];
        if (req.body[`${sex}BodyedadMin`]) {
          if (Array.isArray(req.body[`${sex}BodyedadMin`])) {
                       function parsear(prop,f){
                                req.body[prop] = req.body[prop].map(elem => {
                                  const p = f(elem)
                                  if (isNaN(p)) {
                                    if (!obj[`error${sex}NaN`]) {
                                      obj[`error${sex}NaN`] = true
                                    
                                    }
                                    return elem
                                  }
                                  return p
                                })
                                 }
                    for (let prop of propH) {
                      if(prop===`${sex}BodyedadMin` || prop===`${sex}BodyedadMax`)
                         parsear(prop,parseInt);
                      else parsear(prop,parseFloat)  
                    }
                    for (let i = 0; i < req.body[`${sex}BodyedadMax`].length; i++) {
                      arr[i] = []
                      for (let j = 0; j < 4; j++) {
                        arr[i].push(req.body[propH[j]][i])
                      }
                      detValorRef(arr, sex, obj, 0);
                    }
                  
                  }
          else {
            arr[0] = []
            let p=parseInt(req.body[`${sex}BodyedadMin`])
            if(isNaN(p)){
                arr[0].push(req.body[`${sex}BodyedadMin`]);
                if (!obj[`error${sex}NaN`]) {
                  obj[`error${sex}NaN`] = true
      
                }
              }
            else arr[0].push(p) 
            
            
            p=parseInt(req.body[`${sex}BodyedadMax`])
            if(isNaN(p)){
                arr[0].push(req.body[`${sex}BodyedadMax`]);
                if (!obj[`error${sex}NaN`]) {
                  obj[`error${sex}NaN`] = true
      
                }
              }
            else arr[0].push(p) 
      
            
            p=parseInt(req.body[`${sex}BodyvalorMinimo`])
            if(isNaN(p)){
                arr[0].push(req.body[`${sex}BodyvalorMinimo`]);
                if (!obj[`error${sex}NaN`]) {
                  obj[`error${sex}NaN`] = true
      
                }}
            else arr[0].push(p) 
      
            
            p=parseInt(req.body[`${sex}BodyvalorMaximo`])
            if(isNaN(p)){
                arr[0].push(req.body[`${sex}BodyvalorMaximo`]);
                if (!obj[`error${sex}NaN`]) {
                  obj[`error${sex}NaN`] = true
      
                }}
            else arr[0].push(p) 
      
            
            detValorRef(arr, sex, obj, 0);
          }
      
      
        }
      
        }
      
        procesar( obj.hombre, 'hombre', obj)
        procesar( obj.mujer, 'mujer', obj)
        procesar( obj.embarazada, 'embarazada', obj)
        if (Object.keys(obj).length > 3) {
          //los rangos se solapan errorhombre0,errormujer0,errormujer0
          let arrDet = await detGet();
          return res.render('tecnicoBioq/addRef2', { arrDet, obj })
        }
        else {
            
        req.obj=obj
            next()}
      }
      

module.exports = { procesarBody,procesarBody2 };