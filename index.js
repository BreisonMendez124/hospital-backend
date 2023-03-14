require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require('./database/config');
//Inicializar express para el server - Crear servidor de express
const app = express();

//CORS
app.use( cors() );


//Lectura y parseo del body
app.use( express.json() );


//Base de datos
dbConnection();

//RUTAS - ENDPOINTS
app.use( '/api/usuarios' , require('./routes/usuarios') );
app.use( '/api/login' , require('./routes/auth') );

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});