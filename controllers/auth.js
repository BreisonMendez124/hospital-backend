const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); 
const { generarJWT } = require('../helpers/jwt');
const login = async( req, res = response ) => {

    const { email , password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });

        //Verificar email
        if( !usuarioDB ){
            return res.status(404).json({
                ok:true,
                msg: 'Email no encontrado'
            });    
        };

        //Verificar contrasena
        const validPassword = bcrypt.compareSync( password , usuarioDB.password );
        if( !validPassword ){
            return res.status(400).json({
                ok:true,
                msg: 'Contrasena no valida'
            });   
        }
        
        //Generar token
        const token = await generarJWT( usuarioDB.id );

        res.status(500).json({
            ok:true,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}