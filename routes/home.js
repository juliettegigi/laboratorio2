var express = require('express');
const {body, validationResult, ValidationChain } = require('express-validator');
const { login } = require("../controllers/home");
const { validarCampos } = require("../middlewares/validar-campos");

var router = express.Router();

/* GET home page. */
router.get('/', (req, res)=> {
  res.render("index",{pass:"",email:""})
});

const validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

router.post('/login',
validate([
  body('email').notEmpty().withMessage("El email es obligatorio"),
  body('email').isEmail().withMessage('El email no es válido'),
  body('contrasena').notEmpty().withMessage('La contraseña es obligatoria'),
]),login);

module.exports = router;
