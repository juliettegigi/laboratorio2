const{Router}=require('express');
const { userPost}=require('../controllers/users');


const router=Router();


router.post('/',userPost);


module.exports=router;
