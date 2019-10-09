// Bibliotecas
const express     = require('express');
const morgan      = require('morgan');
const Miembro     = require('./miembro.js');
const Gestor      = require('./gestor.js');
const Comunidad   = require('./comunidad.js');
const DER         = require('./DER.js');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);  // Usa el puerto proporcionado por la nube; si no 3000
app.set('json spaces', 2);                  // Espaciado al printar JSONs

// Middlewares
app.use(morgan('dev'));                         // log de conexiones
app.use(express.urlencoded({extended: false})); // Captar texto enviado desde formularios
app.use(express.json());                        // Trabajar con archivos JSON
app.use(require('./routes/index'));
app.use('/api/community', require('./routes/community'));
app.use('/api/user', require('./routes/user'));

// Iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});

var nano = require('nano')('http://admin:admin@localhost:5984');
nano.db.create('books');
var books = nano.db.use('books');

//Insert a book document in the books database
books.insert({name: 'The Art of war'}, null, function(err, body) {
  if (!err){
    console.log(body);
  }
});

//Get a list of all books
books.list(function(err, body){
  console.log(body);
});

