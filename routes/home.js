var express = require('express');
const {check } = require('express-validator');
const { login } = require("../controllers/home");
const { validarCampos } = require("../middlewares/validar-campos");

var router = express.Router();

/* GET home page. */
router.get('/', (req, res)=> {
  res.render("index",{pass:"",email:""})
});



router.post('/login',[
  check('email','El correo es obligatorio').notEmpty(),
  check('email','Email no  válido').isEmail(),
  check('contrasena','La contraseña es obligatoria').notEmpty(),
  validarCampos
],login);

module.exports = router;
