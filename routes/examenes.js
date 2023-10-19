const{Router}=require('express');
const {examenesver,examenPost}=require('../controllers/examenes');

const router=Router();


router.get('/',examenesver);
router.post('/',examenPost);

module.exports = router;