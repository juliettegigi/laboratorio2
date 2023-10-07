const{Router}=require('express');
const {personaPost}=require('../controllers/personas');

const router=Router();

router.post('/',personaPost);




module.exports=router;