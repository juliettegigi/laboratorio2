const{Router}=require('express');
const {examenesver}=require('../controllers/examen');

const router=Router();


router.get('/',examenesver);

module.exports = router;