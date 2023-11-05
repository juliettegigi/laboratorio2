const{Router}=require('express');
const {ordenPost,ordenesGet,eliminarorden,ordenPostCris}=require('../controllers/orden');

const router=Router();
/* 
router.post('/',ordenPost);
router.get('/',ordenesGet);
router.post('/',ordenPostCris);
router.post('/eliminarorden',eliminarorden);   */  


router.get('/', (req, res) => {
    res.render('inicioOrden'); // Para Probar la pagina inicioOrdemn
  });
  router.get('/actualizar-orden', (req, res) => {
   const ok = true;
    res.render('inicioOrden',{ok}); 
  });
  
  router.get('/formulario', (req, res) => {
   console.log("holaa") ;
   const k=true;
  res.render('inicioOrden',{k,ok:true})
  
  }); 

module.exports=router;

