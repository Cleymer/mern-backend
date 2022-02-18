const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

const app = express();

//cors
app.use(cors());

//Directorio Público
app.use( express.static('public') );

//Base de datos
dbConnection();

//Parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/events'))


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});