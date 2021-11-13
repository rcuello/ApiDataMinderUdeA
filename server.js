// hacer el import de express tradicional
// const express = require('express');

//Para que funcione esta forma 
//Modificar package.json => "type": "module",
import Express, { json } from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';

import rutasUsuario from "./views/usuarios/usuario.route.js";
import rutasProducto from "./views/productos/producto.route.js";
import rutasVenta from "./views/ventas/venta.route.js";
import { conectarBD } from './services/dbServices.js';
import { MongoClient } from 'mongodb';
import autorizacionEstadoUsuario from './middleware/autorizacionEstadoUsuario.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';


dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://misiontic-dataminder.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'api-autenticacion-dataminder-mintic',
  issuer: 'https://misiontic-dataminder.us.auth0.com/',
  algorithms: ['RS256'],
});
/*
Activar NodeMon
"scripts": {
    "start": "nodemon server.js",
*/
//https://github.com/ariza394?tab=overview&from=2021-09-01&to=2021-09-30



// ROUTES
// ==============================================
// 4 y 5: enviarle el token a auth0 para que devuelva si es valido o no
app.use(jwtCheck);
app.use(autorizacionEstadoUsuario);
app.use(rutasUsuario);
app.use(rutasProducto);
app.use(rutasVenta);


// TODO: error handler
//Caso 1: UnhandledPromiseRejectionWarning: TypeError: Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters
// buscar por GUID y el usuario envie un id invalido.


/*
CLase 19 de Daniel Saldarriaga (Clase con NodeJs Backend)
*/
const port = process.env.PORT || 5000;



//Buenas practicas del Profe
const main = () => {
    return app.listen(port, () => {
      console.log(`[http] Listen on port: ${port}`);
    });
  };



// START THE SERVER
// ==============================================
//Listen
//main();

//Connect and Listen
conectarBD(main);

