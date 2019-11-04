/**
 * @author José Javier Alonso Ramos
 * Página principal no acabada.
 * Accede a la documentación de las demás clases
 * con el índice a la derecha.
 */
// Bibliotecas
// const nano        = require('nano')('http://localhost:5984');
const express       = require('express');
const morgan        = require('morgan');
const Miembro       = require('./miembro.js');
const Gestor        = require('./gestor.js');
const Comunidad     = require('./comunidad.js');
const DER           = require('./DER.js');
const app           = express();
const cors          = require('cors');
const swaggerJsDoc  = require('swagger-jsdoc')
const swaggerUI     = require('swagger-ui-express')
const fs            = require('fs');

// Documentation Swagger
let swaggerOptions = JSON.parse(fs.readFileSync('./docs/swaggerOptions.json'))
const swaggerDocs = swaggerJsDoc(swaggerOptions);
  

// Settings
app.set('appName', 'Gestión Comunidades Energéticas');  // Nombre de la aplicación
app.set('port', process.env.PORT || 8888);              // Usa el puerto proporcionado por la nube; si no 3000
app.set('json spaces', 2);                              // Espaciado al printar JSONs
app.set('views', __dirname+'/views');                 // Plantillas HTML
app.set('view engine', 'ejs');                          // Plantilla HTML a usar

// Middlewares
app.use(morgan('dev'));                         // log de conexiones
app.use(express.urlencoded({extended: false})); // Captar texto enviado desde formularios
app.use(express.json());                        // Trabajar con archivos JSON
app.use(cors());                                // Permite realizar las pruebas de funciones API desde Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs)); // muestra la documentación de la API en HTML

// Rutas
app.use(require('./routes/index'));
require('./routes/community')(app);
require('./routes/member')(app);

// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
    console.log('El server de', app.get('appName'), 'está funcionando!');
});

module.exports = app;