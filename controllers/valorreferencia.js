const {ValorReferencia}=require('../models');
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
    let {determinacionId,edadMin,edadMax,sexo,embarazo,valorMinimo,valorMaximo}=req.body;
     console.log(determinacionId); 
    await ValorReferencia.create({determinacionId: parseInt(req.body.determinacionId, 10),edadMin,edadMax,sexo,embarazo,valorMinimo,valorMaximo})
    let arrDet= await detGet();
    res.render('tecnicoBioq/addReferencia',{arrDet,modal:"Valor de referencia agregado."})
 }

module.exports={valorReferenciaPost,postValorRef}


