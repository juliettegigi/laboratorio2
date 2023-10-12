const bcryptjs=require('bcryptjs');
const { Sequelize } = require('sequelize');
const {Usuario,Rol}=require('../models');



const personaPost=async(req,res)=>{
    const t = await Usuario.sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVEL_READ_COMMITTED });
    //const t = await Usuario.sequelize.transaction();
    try{
        const {nombre,apellido, documento, fechaNacimiento, genero, telefono, direccion,email}=req.body;
        const contrasena=documento;
        const usuario=await Usuario.create({contrasena,email,nombre,apellido, documento, fechaNacimiento, genero, telefono, direccion},
        { transaction: t }); 
        
      
        const rol=await Rol.findOne({where:{nombre:"Persona"}});
        await usuario.setRols(rol,{ transaction: t });
        await rol.setUsuarios(usuario,{ transaction: t });
    
        const salt=bcryptjs.genSaltSync();
        usuario.contrasena=bcryptjs.hashSync(contrasena,salt);
        await usuario.save({ transaction: t }
        );  
        
        await t.commit();
        return res.status(201).json({msg:"POST. Usuario creado correctamente\n",usuario})
        }
        catch(err){
            await t.rollback();
            return res.status(500).json({msg:"error "+err})
        }
}

module.exports={personaPost}