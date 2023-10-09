const bcryptjs=require('bcryptjs');

const {Usuario,Rol}=require('../models');

   

const userPost=async(req,res)=>{
    try{
    
    const {nombre,apellido, documento, fechaNacimiento, genero, telefono, direccion,email}=req.body;
    const usuario=await Usuario.create({nombre,apellido, documento, fechaNacimiento, genero, telefono, direccion,nombreUsuario:documento,email,contrasena:documento}); 
    console.log("qqqqqqqqqqqqqqqqqqqqqq");
    res.status(201).json({msg:"POST. persona creada correctamente\n",usuario})
  
   // const usuario=await Usuario.create({nombreUsuario,email,contrasena});
    const rol=await Rol.findOne({where:{nombreRol}});
    await usuario.setRols(rol);
    await rol.setUsuarios(usuario);

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


