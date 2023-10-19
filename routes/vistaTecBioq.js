const{Router}=require('express');
const router=Router();

router.get('/determinacion',(req,res)=>{res.render("tecnicoBioq/formDeterminacion")})

module.exports=router
