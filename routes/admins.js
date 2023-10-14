const{Router}=require('express');
const{validarJWT} = require('../middlewares')

const router=Router();


router.get('/',
    validarJWT,
    async(req,res)=>{                                
       return res.render('inicioAdmin');
    }
   
)


module.exports=router;
