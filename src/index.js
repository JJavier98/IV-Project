var express     = require('express');
var Miembro     = require('./miembro.js');
var Gestor      = require('./gestor.js');
var Comunidad   = require('./comunidad.js');
var DER         = require('./DER.js');

const app = express();

app.get('/', (req, res) => {
    res.send('Hola Mundo con Express');
});

app.get('/users', (req, res) => {
    res.send('Estos son los usuarios');
});

app.listen(3000, () => {
    console.log('Server Port: 3000')
});