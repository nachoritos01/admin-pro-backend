/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTodo, getDocumentosColecction} = require('../controllers/busqueda');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/:busqueda', validarJWT , getTodo );
router.get( '/coleccion/:tabla/:busqueda', validarJWT , getDocumentosColecction );




module.exports = router;