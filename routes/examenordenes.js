const express = require('express')
const { examenOrdenPost} = require('../controllers/examenordenes')

const router=express.Router();

router.post('/',examenOrdenPost);

module.exports=router