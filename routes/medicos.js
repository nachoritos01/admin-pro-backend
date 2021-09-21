/*
Medicos
    Ruta: /api/Medicoes
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById} = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/' , validarJWT, getMedicos );

router.get( '/:id' , validarJWT, getMedicoById );

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ], 
    crearMedico 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
       
    ],
    actualizarMedico
);

router.delete( '/:id',
    [
        validarJWT,    
    ],
    borrarMedico
);



module.exports = router;