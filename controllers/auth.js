const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); 
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async( req, res = response ) => {

    try {
        const { email , name , picture } = await googleVerify( req.body.token );
        //Comprobar que no exista el email
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if( !usuario ){
            usuario = new Usuario({
                nombre: name ,
                email,
                password: "@@@",
                img: picture,
                google: true
            }); 
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }
        //Guardar usuario
        await usuario.save();

        //Generar token
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            email , name , picture ,
            token
        });

    } catch (error) {
        console.log( error );
        res.status(400).json({
            ok: true,
            msg: 'Token de Google no es correcto'
        })    
    }
          
    
}

module.exports = {
    login,
    googleSignIn
}