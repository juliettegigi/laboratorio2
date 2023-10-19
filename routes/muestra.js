const{Router}=require('express');
const {muestraorden}=require('../controllers/muestra');
const router=Router();

router.get('/',muestraorden);

module.exports=router;

