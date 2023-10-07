const bcryptjs=require('bcryptjs');

const {Usuario,Rol,Persona}=require('../models');

   

const userPost=async(req,res)=>{
    try{
    const {documento,nombreUsuario,email,contrasena}=req.body;
    const persona=await Persona.findOne({where:{documento}});
    if(!persona)
       return res.json({msg:"persona no registrada"})
  
    const usuario=await Usuario.create({nombreUsuario,email,contrasena});
    const rol=await Rol.findOne({where:{nombreRol:'Paciente'}});
    await persona.setUsuario(usuario);
    await usuario.setRols(rol);
    await rol.setUsuarios(usuario);
    //encriptar la pass
    const salt=bcryptjs.genSaltSync();
    usuario.contrasena=bcryptjs.hashSync(contrasena,salt);
    await usuario.save();
    
    
    
    res.status(201).json({msg:"POST. Usuario creado correctamente\n",usuario})
    }
    catch(err){
        res.status(500).json({msg:"error "+err})
    }
}









module.exports={
   userPost
}
