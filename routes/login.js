const express = require('express');
const {check } = require('express-validator');
const { login, salir} = require("../controllers/login");
const { validarCampos } = require("../middlewares/validar-campos");

const router = express.Router();

/* GET home page. */
router.post('/',login);

router.get('/',login)

router.get('/salir',salir)



module.exports = router;
