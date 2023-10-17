const{Router}=require('express');
const{validarJWT} = require('../middlewares')

const router=Router();


router.get('/',
    validarJWT,
    async(req,res)=>{ 

        if(req.session.errorsInsertar){
        const errors = req.session.errorsInsertar;
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",errors);
        req.session.errorsInsertar = null; // Limpia los errores después de mostrarlos
        return res.render("inicioAdmin", { ok: false, pacientes: null, modal: false, errors });
          }
          
       return res.render('inicioAdmin',{ok:false,pacientes:null,modal:false,errors:[]});
    }
   
)


module.exports=router;
