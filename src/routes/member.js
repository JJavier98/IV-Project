// Bibliotecas
const { Router }  = require('express');
const router      = Router();
const Miembro     = require('../miembro.js');
const bodyParser  = require('body-parser');
const low         = require('lowdb')
const FileSync    = require('lowdb/adapters/FileSync');
const dbFunc      = require('../functions.js');
const db          = low(new FileSync('db/energy.json'));
db.defaults({miembros: [], gestores: [], comunidades: [], der: []})
//.write();

var urlencodedParser = bodyParser.urlencoded({extended:true})

// Routes
router.get('/', (req, res) => {
    res.render(__dirname+'/views/members.ejs', {
        title: 'Miembros',
        n_miembros: db.get('miembros').size().value(),
        miembros: db.get('miembros').value()
    })
});

router.post('/', urlencodedParser, (req, res) => {
    var data = req.body;
    var apellido;
    var dni = (data.DNI).toString() + (data.LetraDNI).toUpperCase();

    if (data.Apellido == '') {
        apellido = undefined;
    }
    else {
        apellido = data.Apellido;
    }
    var nuevo_miembro = new Miembro(dni, data.nombre, apellido, data.DER, data.Comunidad);
    dbFunc.insertDB(nuevo_miembro);
    console.log('n miembros')
    console.log(db.get('miembros').size().value())
    res.render(__dirname+'/views/members.ejs', {
        title: 'Miembros',
        n_miembros: db.get('miembros').size().value(),
        miembros: db.get('miembros').value()
    })
});

// Export
module.exports = router;