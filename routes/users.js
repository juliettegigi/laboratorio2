const{Router}=require('express');
const {userPost}=require('../controllers/users');
const { check } = require('express-validator');
const{validarCampos,tieneRole,validarJWT} = require('../middlewares');

const router=Router();

router.post('/',userPost);

router.get('/home',[
    check("authorization","No token").notEmpty(),
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



router.get('/inicio'
,(req,res)=>{
    const token = req.header("token"); 
    res.cookie('token', token);
    res.redirect("/pacientes/home")
})


module.exports=router;