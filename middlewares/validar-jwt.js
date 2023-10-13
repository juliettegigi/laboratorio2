const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const {Usuario} = require('../models');


const validarJWT = async( req = request, res = response, next ) => {

   
   const token = req.query.token;

    try {
        
        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
       const usuario = await Usuario.findByPk(id);

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }
        
        req.usuario = usuario;
        next();

    } catch (error) {

        return  res.render("error",{error})
    }

}




module.exports = {
    validarJWT
}
