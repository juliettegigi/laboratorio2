const{Router}=require('express');
const { check } = require('express-validator');
const{validarCampos,tieneRole,validarJWT} = require('../middlewares');
const { personaPost } = require('../controllers/pacientes');

const router=Router();

router.post('/',personaPost);

router.get('/home',[
    check("authorization","No token").notEmpty(),
    validarJWT,
    validarCampos
],async(req,res)=>{
    console.log("esttoy en personaHome");
     res.render("inicioPaciente")
                      
   
})




module.exports=router;