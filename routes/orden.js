const{Router}=require('express');
const {ordenPost,ordenesGet,eliminarorden,ordenPostCris}=require('../controllers/orden');

const router=Router();

router.post('/',ordenPost);
router.get('/',ordenesGet);
router.post('/',ordenPostCris);
router.post('/eliminarorden',eliminarorden);    

module.exports=router;

