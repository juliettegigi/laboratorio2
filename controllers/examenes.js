const { Sequelize} = require('sequelize');
const {Examen,OrdenTrabajo}=require('../models');




const examenesGet= async (req,res) => {
try {console.log("HOlas");
      const ex= await Examen.findAll();
      console.log(ex);
      return res.status(200).json(ex);
} catch (error) {
    return res.status(500).json({ error: 'No se pudieron obtener los exámenes' });
        
}

}   

const tieneOrden=async(req,res)=>{
    try{
        console.log("holiiii")
        const{id}=req.params;
        const examen=await Examen.findByPk(id, 
            {include: [
                { model:OrdenTrabajo },
            ]
           }); 

        

        if(examen){
            if (examen.OrdenTrabajos.length===0) 
              return res.json({ msg:"El examen no tiene orden relacionada.",examen});
            else return res.json({ msg:"El examen tiene orden relacionada.",examen});
        }
        else{ 
           
            return res.json({msg:'no hay examen con ese id'});
        }

    }
    catch(error){
        console.log(error);
        res.json({msg:"Error en controllers/examenes/tieneOrden",error})
    }
}


const examenPost= async(req,res)=>{
    try{ 
    
        const {nombre,detalle,muestraId,examenId}=req.body;

    await Examen.create({nombre,detalle,muestraId,examenId});
    return res.json({msg:"Examen insertado en la DB."})}
  catch{
      return res.json({msg:"Error al insertar un examen en la DB"})
  }  
}



//------------------------------------------------------------------










//------------------------------------------------------------------









module.exports={
   examenesGet,examenPost,tieneOrden
  }