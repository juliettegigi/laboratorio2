const {TipoMuestra,Muestra,OrdenTrabajo}=require("../models");
const { ordenesGet, getListaOrden } = require("./orden");


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


const postMuestra=async(req,res)=>{
    console.log("--------------------------");
       console.log(req.body);
       const{ordenTrabajoId,tipoMuestraId}=req.body
       const entregada=req.body.entregada?true:false;
       await Muestra.create({ordenTrabajoId,tipoMuestraId,entregada})
       const tipoM= await tipoMuestrasGet();
        const ordenes= await getListaOrden();
       res.render('tecnicoBioq/addMuestra',{ordenes,tipoM,modal:"Muestra agregada."})
}

const getVistaMuestra=async(req,res)=>{

        const tipoM= await tipoMuestrasGet();
        const ordenes= await getListaOrden();
        res.render('tecnicoBioq/addMuestra',{ordenes,tipoM,modal:false})
}


const muestrasGetTodos=async()=>{
      return  await Muestra.findAll({paranoid:false,include:[{model:OrdenTrabajo},{model:TipoMuestra}]})
}

const activarMuestra=async(req,res)=>{
    const{id}=req.body;
    await Muestra.restore({where:{id}}) 
    const muestras=await muestrasGetTodos();
    res.render('tecnicoBioq/activarMuestra',{muestras})
}



const desactivarMuestra=async(req,res)=>{
    const{id}=req.body;

    await Muestra.destroy({ where: { id } });
    
    let muestras=await muestrasGetTodos();      
    res.render('tecnicoBioq/activarMuestra',{muestras})
}

module.exports={
   tipoMuestrasGet,postMuestra,getVistaMuestra,activarMuestra,desactivarMuestra,muestrasGetTodos
}
