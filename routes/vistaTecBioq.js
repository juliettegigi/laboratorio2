const{Router}=require('express');
const router=Router();

router.get('/inicio',(req,res)=>{res.render("tecnicoBioq/inicio")})

module.exports=router
