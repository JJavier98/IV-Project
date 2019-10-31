// Bibliotecas
const { Router }  = require('express');
const router      = Router();
const bodyParser  = require('body-parser');
//const low         = require('lowdb')
//const FileSync    = require('lowdb/adapters/FileSync');
const dbFunc      = require('../functions.js');
//const db          = low(new FileSync('db/energy.json'));
//db.defaults({miembros: [], gestores: [], comunidades: [], der: []})
//.write();

var urlencodedParser = bodyParser.urlencoded({extended:true})

// Routes
router.get('/', (req, res) => {
    res.render(__dirname+'/views/members.ejs', {
        title: 'Miembros',
        n_miembros: db.get('miembros').size().value(),
        nombre: ''
    })
});

router.post('/', urlencodedParser, (req, res) => {
    console.log(req.body);
});

// Export
module.exports = router;