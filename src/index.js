// Bibliotecas
const nano        = require('nano')('http://localhost:5984');
const express     = require('express');
const morgan      = require('morgan');
const Miembro     = require('./miembro.js');
const Gestor      = require('./gestor.js');
const Comunidad   = require('./comunidad.js');
const DER         = require('./DER.js');
const app = express();

// Settings
app.set('port', process.env.PORT || 8888);  // Usa el puerto proporcionado por la nube; si no 3000
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

class Gestoria {
    constructor() {
        var comunidades_exists;
        var gestores_exists;
        var miembros_exists;
        var der_exists;

        nano.db.list().then((body) => {
        der_exists        = body.includes('der');
        comunidades_exists = body.includes('comunidades');
        gestores_exists   = body.includes('gestores');
        miembros_exists   = body.includes('miembros');
        }).then(() => {
            if (!comunidades_exists) {
                nano.db.create('comunidades');
            }
            else{
                console.error('comunidades DB ya ha sido creada');
            }
        
            if (!miembros_exists) {
                nano.db.create('miembros');
            }
            else {
                console.error('miembros DB ya ha sido creada');
            }
        
            if (!gestores_exists) {
                nano.db.create('gestores');
            }
            else {
                console.error('gestores DB ya ha sido creada');
            }
        
            if (!der_exists) {
                nano.db.create('der');
            }
            else {
                console.error('der DB ya ha sido creada');
            }
        }); 
    }

    dbReady(){
        var x = nano.db.list().then((body) => {
        return  body.includes('der') &&
                body.includes('comunidades') &&
                body.includes('gestores') &&
                body.includes('miembros');
        });
        var y = (x == 'Promise { <pending> }')
        return String(x) + String(y)
    }
}

var g = new Gestoria();
var h = g.dbReady();
console.log(h);

/*
nano.db.create('books').then( function(books) {
  books = nano.db.use('books');
  books.insert({name: 'El nombre del viento'}, 'book1', (err, book) => {
    if(err){
      console.log(err);
    }
    else {
      console.log(book.name);
    }
  })
})

var books = nano.db.use('books');
books.get('book1').then( (body) => {
  console.log(body.name)
})


books.get('book1').then((body) => {
  console.log(body.name)
})
*/

module.exports = Gestoria;