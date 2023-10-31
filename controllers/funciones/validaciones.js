const { Usuario } = require('../../models');

const emailExiste = async (email = "") => {
    const existeEmail = await Usuario.findOne({
        where: { email }
    });
    if (existeEmail) {

        throw new Error(`El correo ${email} ya existe en la DB`);
    }

    if (existeEmail) {
        console.log(existeEmail);
        return existeEmail
    }

}




const detValorRef = (arrValoresRef, de,obj,index) => {
    let msg=""
    const i = arrValoresRef.length
   
    if(!( (arrValoresRef[i-1][0]<arrValoresRef[i-1][1]) && 
          (arrValoresRef[i-1][2]<arrValoresRef[i-1][3])
          )
          ){

           
        msg= `Los rangos de valores de referencia de ${de} se solapan`
                       
    }else
     
    if (i > 1 &&  arrValoresRef.some((elem,index)=>{
        
       
        return( i-1!=index &&(
                ((elem[0]<=arrValoresRef[i-1][0]) && (arrValoresRef[i-1][0]<=elem[1]))||
                ((elem[0]<=arrValoresRef[i-1][1]) && (arrValoresRef[i-1][1]<=elem[1])) ||
                ((elem[2]<=arrValoresRef[i-1][2]) && (arrValoresRef[i-1][2]<=elem[3])) ||
                ((elem[2]<=arrValoresRef[i-1][3]) && (arrValoresRef[i-1][3]<=elem[3])))
        )
            })
    ) {

       
        msg=`Los rangos de edades de ${de} se solapan.`
    }
    if(msg) {
        if(!obj[`error${de}${index}`]){
            obj[`error${de}${index}`]=true
        }
    }
    return msg
}



const usuarioExiste=async(usuario,{req})=>{
        const existeUser=await Usuario.findOne({where:{documento:usuario}})
        if(!existeUser){
           throw new Error(`No hay registro del usuario.`);
        }
        else req.user=existeUser
}

module.exports = {
    emailExiste, detValorRef,usuarioExiste
}


