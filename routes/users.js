const{Router}=require('express');
const {userPost}=require('../controllers/users');
const { check } = require('express-validator');
const{validarCampos,esAdminRol,validarJWT} = require('../middlewares');

const router=Router();

router.post('/',userPost);




module.exports=router;