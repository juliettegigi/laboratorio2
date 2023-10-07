const {validationResult}=require('express-validator');

const validarCampos=(req,res,next)=>{
    const {errors}=validationResult(req);
    if(!(errors.length===0)){        
            if(errors[0].path==="email")
                return(res.render("index",{email:errors[0].msg,pass:"",emailValue:errors[0].value,passValue:errors[0].value}))
            
            
            return(res.render("index",{email:"",pass:errors[0].msg,emailValue:errors[0].value,passValue:errors[0].value}))
        
    }
       
    next() ;
}

module.exports={validarCampos};