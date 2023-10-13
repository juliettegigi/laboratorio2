const{Router}=require('express');
const { check } = require('express-validator');
const{validarCampos,tieneRole,validarJWT} = require('../middlewares');
const { personaPost } = require('../controllers/pacientes');

const router=Router();

router.post('/',personaPost);



router.get('/',
    validarJWT,
    async(req,res)=>{

    //res.render('inicioPaciente', { token: token });                                 
    res.render('inicioPaciente');
    }
   
)


module.exports=router;
