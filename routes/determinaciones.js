const express = require('express')
const { detPost} = require('../controllers/determinaciones')

const router=express.Router();

router.post('/',detPost);

module.exports=router