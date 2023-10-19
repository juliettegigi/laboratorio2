const{Router}=require('express');
const router=Router();

//router.get('/inicio',(req,res)=>{res.render("tecnicoBioq/inicio")})
router.get('/inicio',(req,res)=>{res.render("inicioAdmin2/inicioAdmin2")})
router.get('/formDeterminacion',(req,res)=>{res.render("tecnicoBioq/formDeterminacion")})
module.exports=router
