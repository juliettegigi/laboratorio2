const{Router}=require('express');
const {examenesorden}=require('../controllers/examen');

const router=Router();


router.get('/',examenesorden);

module.exports = router;