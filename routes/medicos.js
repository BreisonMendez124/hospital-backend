/*
    Medicos:
    /api/medicos
*/

const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');

const router = Router();

router.get( '/' , validarJWT , getMedicos );

router.post( '/' , 
        [ 
            validarJWT,
            check('nombre','el nombre del medico es requerido'),
            check('hospital','El hospital id debe ser valido').isMongoId(),
            validarCampos
        ] , crearMedico );

//Actualizacion de medicos
router.put( '/:id' ,
        [], 
        actualizarMedico );

router.delete( '/:id' , borrarMedico)

module.exports = router;