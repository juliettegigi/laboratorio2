const { Sequelize} = require('sequelize');
const {Examen,OrdenTrabajo,TipoExamen,TipoMuestra,Determinacion}=require('../models');




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
    try{ 
    
        const {nombre,detalle,muestraId,examenId,demora}=req.body;

    await Examen.create({nombre,detalle,muestraId,examenId,demora});
    return res.json({msg:"Examen insertado en la DB."})}
  catch{
      return res.json({msg:"Error al insertar un examen en la DB"})
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







module.exports={
   examenesGet,examenPost,tieneOrden,crearorden,cargarmuestras
  }