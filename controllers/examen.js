const { Sequelize} = require('sequelize');
const {Examen}=require('../models');




const examenesver= async (req,res) => {
try {console.log("HOlas");
      const ex= await Examen.findAll();
      console.log(ex);
      return res.status(200).json(ex);
} catch (error) {
    return res.status(500).json({ error: 'No se pudieron obtener los exámenes' });

}







}








module.exports={
   examenesver
  }