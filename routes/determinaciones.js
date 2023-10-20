const express = require('express')
const { detPostidexamen,detPost,detGet} = require('../controllers/determinaciones')

const router=express.Router();

router.get('/',detGet);
router.post('/',detPost);
router.post('/detidexamen',detPostidexamen);


module.exports=router