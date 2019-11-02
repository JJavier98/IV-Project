module.exports = (app) => {
    // Bibliotecas
    const Miembro     = require('../miembro.js');
    const bodyParser  = require('body-parser');
    const low         = require('lowdb')
    const FileSync    = require('lowdb/adapters/FileSync');
    const dbFunc      = require('../functions.js');
    const db          = low(new FileSync('db/energy.json'));

    var urlencodedParser = bodyParser.urlencoded({extended:true})
    app.locals.miembros = db.get('miembros').value()

    app.get('/member', (req, res) => {
        res.render(__dirname+'/../views/members.ejs', {
        title: 'Miembros'
        })
    });
    
    app.get('/api/member', (req, res) => {
        res.send(app.locals.miembros)
    });

    app.post('/member', urlencodedParser, (req, res) => {
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
        app.locals.miembros.push(nuevo_miembro);

        res.redirect('/member');
    });

    app.post('/api/member/:dni/:nombre/:apellido/:der/:comunidad', (req, res) => {
        var parametros = req.params;
        var apellido = 'Apellido no aportado'

        if (parametros.apellido != 'null') {
            apellido = parametros.apellido
        }
        var nuevo_miembro = new Miembro(parametros.dni, parametros.nombre, apellido, parametros.der, parametros.comunidad);
        try{
            dbFunc.insertDB(nuevo_miembro);
        }
        catch(error) {
            console.error(error)
        }
        app.locals.miembros.push(nuevo_miembro);

        res.send(nuevo_miembro);
    });
}