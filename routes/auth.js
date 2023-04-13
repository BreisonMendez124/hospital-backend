/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login , googleSignIn, renewToken} = require( '../controllers/auth' );
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post( '/' , 
            [ 
                check( 'email' , 'El email es requerido' ).isEmail(),
                check( 'password' , 'El password es requerido' ).not().isEmpty(),
                validarCampos
            ],
             login )


router.post( '/google' , 
            [ 
                check( 'token' , 'El token de google es requerido' ).not().isEmpty(),
                validarCampos
            ],
            googleSignIn )

router.get( '/renew' ,  
            validarJWT,
            renewToken )

module.exports = router;


