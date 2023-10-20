const {TipoMuestra}=require("../models")


const tipoMuestrasGet=async()=>{
try {
    const muestras=  await TipoMuestra.findAll();
    return muestras
      //return res.status(200).json(det);
} catch (error) {
    //return res.status(500).json({ error: 'No se pudieron obtener a le determinacion' });
    return {error}
}


}

module.exports={
   tipoMuestrasGet
}
