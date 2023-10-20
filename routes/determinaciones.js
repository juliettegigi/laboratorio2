const express = require('express')
const { detPost,detGet} = require('../controllers/determinaciones')

const router=express.Router();

router.post('/',detPost);
//router.get('/',detGet);

module.exports=router