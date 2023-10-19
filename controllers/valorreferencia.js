const {ValorReferencia}=require('../models')

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

module.exports={valorReferenciaPost}


