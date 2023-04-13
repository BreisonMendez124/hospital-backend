/*
    Haospitales:
    /api/hospitales
*/

const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');
const router = Router();

router.get( '/' , validarJWT , getHospitales );

router.post( '/' , 
        [ 
            validarJWT,
            check('nombre','el nombre del hospital es necesario').not().notEmpty(),
            validarCampos

        ] , crearHospital );

//Actualizacion de usuarios
router.put( '/:id' ,
        [
            validarJWT,
            check('nombre','el nombre del hospital es necesario').not().notEmpty(),
            validarCampos

        ], 
        actualizarHospital );

router.delete( '/:id' , validarJWT , borrarHospital);

module.exports = router;