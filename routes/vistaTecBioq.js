const{Router}=require('express');
const { detGet } = require('../controllers/determinaciones');
const { tipoMuestrasGet } = require('../controllers/muestras');
const router=Router();

router.get('/inicio',(req,res)=>{res.render("tecnicoBioq/inicio")})
//router.get('/inicio',(req,res)=>{res.render("inicioAdmin2/inicioAdmin2")})
router.get('/formDeterminacion',(req,res)=>{res.render("tecnicoBioq/formDeterminacion")})
router.get('/formExamen',async(req,res)=>{
    let arrDet= await detGet();
    let arrMuestras= await tipoMuestrasGet();
    console.log(arrMuestras);
   return res.render("tecnicoBioq/formExamen",{arrDet,arrMuestras})})
module.exports=router