const {ValorReferencia,Determinacion}=require('../models');
const { detGet } = require('./determinaciones');

const valorReferenciaPost=async(req,res)=>{
    try {
        const {determinacionId,edadMin,edadMax,sexo,embarazo,valorMinimo,valorMaximo}=req.body;

        await ValorReferencia.create({determinacionId,edadMin,edadMax,sexo,embarazo,valorMinimo,valorMaximo});
        return res.json({msg:"valor de referencia insertada en la DB"})
    } catch (error) {
        console.log(error);
        return res.json({msg:"Error al insertar un valor de referencia en la DB",
                        error})
    }
}


const postValorRef=async(req,res)=>{

    const determinacionId= parseInt(req.body.determinacionId)
    const edadMin=parseInt(req.body.edadMin)
    const edadMax=parseInt(req.body.edadMax);
    const{sexo,embarazo}=req.body
    const valorMinimo=req.body.valorMinimo;
    const valorMaximo=req.body.valorMaximo;
    
   
    
    if(  edadMin>=edadMax || valorMinimo>=(valorMaximo)) {
        let arrDet= await detGet();
        return res.render('tecnicoBioq/addReferencia',{arrDet,modal:false,errors:[{msg:"Los rangos ingresados se solapan.",path:"solapa"}],opc:{determinacionId,edadMin,edadMax,sexo,embarazo,valorMinimo,valorMaximo}})
    }

    const vr=await ValorReferencia.findAll({where:{determinacionId,sexo}})
    console.log("-----------------------------------------------")
    console.log(req.body)
    console.log(vr)
    if(vr){
        for(valor of vr){
            if(valor.edadMax>= edadMin || valor.valorMaximo>= valorMinimo ){ 
                    let arrDet= await detGet();       
                    return res.render('tecnicoBioq/addReferencia',{arrDet,modal:false,errors:[{msg:"Los rangos ingresados se solapan con losvalores existentes.",path:"solapa",}],opc:{determinacionId,edadMin,edadMax,sexo,embarazo,valorMinimo,valorMaximo}})
            }                
        }
    }

            
    await ValorReferencia.create({determinacionId: parseInt(determinacionId, 10),edadMin,edadMax,sexo,embarazo,valorMinimo,valorMaximo})
    let arrDet= await detGet();
    res.render('tecnicoBioq/addReferencia',{arrDet,modal:"Valor de referencia agregado."})
 }


const refGetTodos=async(req,res)=>{
    try {
        const valorRef = await ValorReferencia.findAll( {paranoid:false,include: [{model: Determinacion}]});
        
        return valorRef
      } catch (error) {
        console.error(error);
        return({ok:false})
      }
}

const activarRef=async(req,res)=>{
    const{id}=req.body;
    await ValorReferencia.restore({where:{id}})
    let arrRef=await refGetTodos();
    res.render('tecnicoBioq/activarRef',{arrRef})
}


const desactivarRef=async(req,res)=>{
    const{id}=req.body;

    await ValorReferencia.destroy({ where: { id } });
    
    let arrRef=await refGetTodos();
    res.render('tecnicoBioq/activarRef',{arrRef})

}

module.exports={valorReferenciaPost,postValorRef,refGetTodos,activarRef,desactivarRef}


