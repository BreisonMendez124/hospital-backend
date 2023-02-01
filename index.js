require('dotenv').config();
const {dbConnection} = require('./database/config');
//Inicializar express para el server
const express = require('express');
const app = express();
//CORS
const cors = require('cors')
//RUTAS NUEVAS

cors.use( cors() );

dbConnection();

app.get('/', (req,res)=>{
    res.json({
        "ok":true,
        "msj":"Hola Mundo"
    })
});


app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});