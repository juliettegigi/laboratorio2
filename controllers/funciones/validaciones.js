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
     
    if (i > 1 && ((arrValoresRef[i - 1][0] <= arrValoresRef[i - 2][1]) ||
                  (arrValoresRef[i - 1][0] >= arrValoresRef[i - 1][1])
                 )
    ) {
        msg=`Los rangos de edades de ${de} se solapan.`
    }else
    if (( (i > 1)  &&( 
                   (arrValoresRef[i - 1][0] <= arrValoresRef[i - 2][1]
                   ) || 
                   (arrValoresRef[i - 1][2] <= arrValoresRef[i - 2][3])
                   )
        )) {
        msg= `Los rangos de valor de ${de} se solapan.`
    }
    if(msg) {
        if(!obj[`error${de}${index}`]){
            obj[`error${de}${index}`]=true
        }
    }
    return msg
}

module.exports = {
    emailExiste, detValorRef
}


