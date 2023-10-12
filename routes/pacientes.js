const{Router}=require('express');
const { check } = require('express-validator');
const{validarCampos,tieneRole,validarJWT} = require('../middlewares');
const { personaPost } = require('../controllers/pacientes');

const router=Router();

router.post('/',personaPost);



router.get('/home',[
    check("token","No token").notEmpty(),
    validarJWT,
    validarCampos
],async(req,res)=>{
    const [{dataValues}]=await req.usuario.getRols();
    switch(dataValues.nombre){
        case "Paciente": res.render("inicioPaciente")
                         break;
        /* agregar los otros casos */                                  

    }
   
})


module.exports=router;