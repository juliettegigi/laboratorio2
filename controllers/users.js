const bcryptjs=require('bcryptjs');
const { Sequelize} = require('sequelize');

const {Usuario,Rol}=require('../models');

   

const userPost = async (req, res) => {
    const t = await Usuario.sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVEL_READ_COMMITTED });
  
    try {
      const { nombre, apellido, documento, fechaNacimiento, genero, telefono, direccion, email, matricula,embarazo, rol } = req.body;
      const contrasena = documento;
      // Crear el usuario
      const usuario = await Usuario.create({contrasena,email,nombre,apellido,documento,fechaNacimiento,genero,telefono,direccion,matricula,embarazo}, { transaction: t });
  
     
     
      const r = await Rol.findOne({ where: { nombre: rol } });
      console.log(nombre);
      if (!r) {
        await t.rollback();
        return res.status(400).json({ msg: "Error: El rol no existe." });
      }
  
      
      await usuario.addRol(r, { transaction: t });
  
      const salt=bcryptjs.genSaltSync();
      usuario.contrasena=bcryptjs.hashSync(contrasena,salt);
      await usuario.save({ transaction: t });  
      await t.commit();
  
      return res.status(201).json({ msg: "POST. Usuario creado correctamente\n", usuario });
    } catch (err) {
      await t.rollback();
      return res.status(500).json({ msg: "error " + err });
    }
  };








module.exports={
   userPost
}


/*

{
    "nombre":"nombre10",
    "apellido":"apellido10", 
    "documento":"documento10",
    "fechaNacimiento":"2023-11-11",
    "genero":"Otro",
    "telefono":"telefono10",
    "direccion":"direccion10",
    "email":"email10@gmail.com",
    "rol":"Bioquimico"
}


*/
