const { detValorRef } = require("../controllers/funciones/validaciones");
const { detGet} = require('../controllers/determinaciones');
const { tipoExamenesGet } = require('../controllers/tipoexamen');
const { tipoMuestrasGet } = require('../controllers/muestras');

const procesarBody = async(req, res, next) => {
    console.log("-****************************************************************")
    console.log(req.body)
    let msg = ""
    let err=""
    
    const {eNombre,muestras,tipoExamen,detalle,detExistentes,demora}=req.body
    const nuevoBody={eNombre,muestras,tipoExamen,detalle,detExistentes,demora};
    if(req.body.id){
         nuevoBody.id=req.body.id}
      
    nuevoBody.determinaciones=[]

    console.log("---------------------------------------------------------");
    console.log(req.body);
    const determinacionesNombre = []
    for (const propiedad in req.body) {
       if (propiedad.startsWith("nombre")) {
                determinacionesNombre.push(propiedad);
            }
        }

        console.log("DETERMINACIONES NOMBRE: ", determinacionesNombre);
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
            console.log("qqqq",valoresRefEmbarazada)
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

module.exports = { procesarBody };