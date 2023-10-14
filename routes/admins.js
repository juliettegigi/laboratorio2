const{Router}=require('express');
const{validarJWT} = require('../middlewares')

const router=Router();


router.get('/',
    validarJWT,
    async(req,res)=>{                                
    res.render('inicioAdmin',{pacientes:[]});
    }
   
)


module.exports=router;
