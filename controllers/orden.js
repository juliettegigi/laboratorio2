const { Sequelize} = require('sequelize');
const {OrdenTrabajo,Usuario,Estado}=require('../models');

const ordenPost = async (req, res) => {
    try {

      const { usuarioId,medico, diagnostico,estadoId } = req.body;

      const ordenTrabajo = await OrdenTrabajo.create({ usuarioId,medico,diagnostico,estadoId});

      return res.status(201).json(ordenTrabajo);
    } catch (error) {  
      console.error('Error al crear la orden de trabajo:', error);
      return res.status(500).json({ error: 'No se pudo crear la orden de trabajo' });
    }
   };


   const ordenesGet=async(req,res)=>{
    const orden= await OrdenTrabajo.findAll({ include: [{model: Usuario}],});
    res.render("inicioOrden",{orden: orden});
   }

    // const ordenes=await getOrdenes(['Informada','Esperando toma de muestra','Analitica']);
const getOrdenes=async(arr)=>{
  if (arr){
    return await OrdenTrabajo.findAll({ include: [{model: Usuario},{model: Estado,where:{nombre:arr}}]});
  }
   
  return await OrdenTrabajo.findAll({ include: [{model: Usuario},{model: Estado}]});
}
const ordenPostCris = async (req, res) => {
  let estadoId = 0;
  const muesE = req.body.muestrasEntregada;
  const muesN = req.body.muestrasNoEntregada;
   console.log(req.body);
  console.log(muesE, muesN, "que paso");
  if (muesN.length == 0 && muesE.length > 0) {
    console.log("estoy en analitica");
    estadoId = 1;
  } else {
    estadoId = 2;
    console.log("estoy en analitica");
  }

  try {
    const ordenTrabajo = await OrdenTrabajo.create(
      {
        usuarioId: req.body.idDocumento,
        medico: req.body.medico,
        diagnostico: req.body.diagnostico,
        estadoId: estadoId,
      }
  
    );

    return ordenTrabajo;
  } catch (error) {
    console.error('Error al crear la orden de trabajo:', error);
    throw error;
  }
};
const eliminarorden=async (req,res) => {
  console.log("asdas");
  res.render('inicioOrden',{k:false,j:true,ok:true});

  }  
   
   module.exports={
    ordenPost,ordenesGet,getOrdenes,ordenPostCris,eliminarorden 
  }
  
  
  
  /*
  {
     
    "usuarioId": 5,// Asocia la orden con un usuario
    "medico":"lisandro",
    "diagnostico":"Ver Sangre",
    "estadoId":1
  }
  */