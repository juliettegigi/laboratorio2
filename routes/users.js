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

router.get('/inicio',[
    check("authorization","No token").notEmpty(),
    validarJWT,
    validarCampos
]
,async(req,res)=>{
    console.log("Por rediireccionar a personas/home");
    const token = req.header("token"); 
    res.cookie('authorization', token);
    const [{dataValues}]=await req.usuario.getRols();
    switch(dataValues.nombre){
        case "Paciente": res.redirect("/pacientes/home")
                         break;

}}
)


module.exports=router;