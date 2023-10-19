const{Router}=require('express');
const {examenesGet,examenPost, tieneOrden}=require('../controllers/examenes');

const router=Router();


router.get('/',examenesGet);
router.post('/',examenPost);
router.get('/tieneorden/:id',tieneOrden);

module.exports = router;