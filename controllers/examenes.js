const {Examen,OrdenTrabajo,TipoExamen,TipoMuestra,Determinacion,ValorReferencia,sequelize,ExamenDeterminacion}=require('../models');

const Sequelize = require('sequelize');
const { detGet } = require('./determinaciones');
const { tipoMuestrasGet } = require('./muestras');
const { tipoExamenesGet } = require('./tipoexamen');


const examenesGet= async (req,res) => {
try { 
       let examenes= await Examen.findAll({include: [{ model:OrdenTrabajo },{ model:TipoMuestra },{ model:TipoExamen },{model:Determinacion}]});
       examenes= examenes.filter(examen=>examen.OrdenTrabajos.length===0)
      return {ok:true,examenes};
} catch (error) {
    return {ok:false,error};
        
}

}   

const tieneOrden=async(req,res)=>{
    try{
        console.log("holiiii")
        const{id}=req.params;
        const examen=await Examen.findByPk(id, 
            {include: [
                { model:OrdenTrabajo }
            ]
           }); 

        

        if(examen){
            if (examen.OrdenTrabajos.length===0) 
              return { ok:true,examen};
            else return { ok:false,examen};
        }
        else{ 
           
            return {msg:'no hay examen con ese id'};
        }

    }
    catch(error){
        console.log(error);
        return {msg:"Error en controllers/examenes/tieneOrden",error}
    }
}


const examenPost= async(req,res)=>{
    
    const t = await sequelize.transaction();
    try{
     const {eNombre,detalle,muestras,tipoExamen,determinaciones}=req.body
      const examen=await Examen.create({nombre:eNombre,detalle}, { transaction: t });
   
   
     for(let muestra of muestras){
                const m=await TipoMuestra.findByPk(muestra)
                 await m.addExamen(examen,{ transaction: t})
     }

     for(let teId of tipoExamen){
        const te=await TipoExamen.findByPk(teId)
         await te.addExamen(examen, { transaction: t })
}



    
    for(let obj of determinaciones){
     
        const det=await Determinacion.create({nombre:obj.determinacion.nombre,unidadMedida:obj.determinacion.unidadMedida,valorMin:obj.determinacion.valorMin,valorMax:obj.determinacion.valorMax,comentarios:""}, { transaction: t});
        
        await examen.addDeterminacion(det, { transaction: t })
        if(obj.hombre){
              for(let fila of obj.hombre){
                const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'H',embarazo:false,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
                await det.addValorReferencia(vr, { transaction: t })
              }
        }
        if(obj.mujer){
            for(let fila of obj.mujer){
              const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'F',embarazo:false,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
              await det.addValorReferencia(vr, { transaction: t })
            }
      }
      if(obj.embarazada){
        for(let fila of obj.mujer){
          const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'F',embarazo:true,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
          await det.addValorReferencia(vr, { transaction: t })
        }
  }
        
    }

   if(req.body.detExistentes){
             for(let det of req.body.detExistentes){
                   const p=await examen.addDeterminacion(det,{ transaction: t })
             }
   }

   await t.commit();

   return res.render("tecnicoBioq/inicio",{modal:"Examen agregado."})
  
  }catch (error) {
    console.log(error);
    await t.rollback();

    if (error.name === 'SequelizeUniqueConstraintError')
       req.body.nombreExiste=true
       
       let arrDet= await detGet();
       let arrMuestras= await tipoMuestrasGet();
       let arrTe= await tipoExamenesGet();
   return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras,arrTe,modal:false,form:req.body,ruta:"submit"})
  }

}



//------------------------------------------------------------------

const cargarmuestras=async (req, res) => {
    const id=req.body.examen1;
   

    
try {
    const tipomues = await TipoMuestra.findOne({
        where: {
          "id": id
        }
      });
      console.log(tipomues);
      return res.json(tipomues); 
} catch (error) {
    tipomues=[];
    return res.json(tipomues);
}



}








//------------------------------------------------------------------
const crearorden= async (req, res)=>{
    try {
        examen=await Examen.findAll();
        res.render('inicioOrden',{ok:false,k:true,examen1:examen}); 
    } catch (error) {
        examen=[];
        res.render('inicioOrden',{ok:false,k:true,examen1:examen}); 
    }
  

}



const putExamen=async(req,res)=>{
console.log("NUEVO BODY: ",req.body)
    const t = await sequelize.transaction();
    try{
    const{id,muestras,eNombre,detalle,tipoExamen,demora,detExistentes,determinaciones}=req.body;
    const valores={tipoMuestraId:muestras,nombre:eNombre,detalle,tipoExamenId:tipoExamen,demora}
    const examen=await Examen.findByPk(id)
    Examen.update(valores,{where:{id}}) 

    if(detExistentes && detExistentes.length!==0) {
      await ExamenDeterminacion.destroy({
        where: {
          examenId:id,
          determinacionId: {
            [Sequelize.Op.notIn]: detExistentes
          }
        }
      })


      let detNuevas=await ExamenDeterminacion.findAll({
        attributes: ['determinacionId'],
        where: {
          examenId:id,
          determinacionId: {
            [Sequelize.Op.in]: detExistentes,
          },
        },
      })
      detNuevas= detExistentes.filter(id=>{
         return !detNuevas.some((value)=>{
          return value.determinacionId==id})
        })

        for(let det of detNuevas){
        //  const dett=Determinacion.findByPk(det)
          console.log(examen)
          await examen.addDeterminacion(det, { transaction: t })
        }
    } 

    if(!detExistentes){
        await ExamenDeterminacion.destroy({
            where: {
              examenId:id
            }
          })
    
    }
    
    

    console.log(req.body.determinaciones[0])

    for(let obj of determinaciones){
   
      const det=await Determinacion.create({nombre:obj.determinacion.nombre,unidadMedida:obj.determinacion.unidadMedida,valorMin:obj.determinacion.valorMin,valorMax:obj.determinacion.valorMax,comentarios:""}, { transaction: t});
      
      await examen.addDeterminacion(det, { transaction: t })
      if(obj.hombre){
            for(let fila of obj.hombre){
              const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'H',embarazo:false,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
              await det.addValorReferencia(vr, { transaction: t })
            }
      }
      if(obj.mujer){
          for(let fila of obj.mujer){
            const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'F',embarazo:false,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
            await det.addValorReferencia(vr, { transaction: t })
          }
    }
    if(obj.embarazada){
      for(let fila of obj.mujer){
        const vr=await ValorReferencia.create({determinacionId:det.id,edadMin:fila[0],edadMax:fila[1],sexo:'F',embarazo:true,valorMinimo:fila[2],valorMaximo:fila[3]}, { transaction: t });
        await det.addValorReferencia(vr, { transaction: t })
      }
}
      
  }

  await t.commit();

  return res.render("tecnicoBioq/inicio",{modal:"Examen editado."}) 
  }

  catch(err){
    console.log(err);
    await t.rollback();
  }


  }



module.exports={
   examenesGet,examenPost,tieneOrden,crearorden,cargarmuestras,putExamen
  }