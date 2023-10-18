const{Router}=require('express');

const {ordenlogin}=require('../controllers/orden');

const router=Router();

router.post('/',ordenlogin);

module.exports=router;

