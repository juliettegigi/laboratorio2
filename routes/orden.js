const{Router}=require('express');
const {ordenPost}=require('../controllers/orden');

const router=Router();

router.post('/',ordenPost);

module.exports=router;

