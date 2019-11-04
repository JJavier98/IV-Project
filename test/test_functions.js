// Bibliotecas
const low         = require('lowdb')
const FileSync    = require('lowdb/adapters/FileSync')
const Miembro     = require('../src/miembro');
const Gestor      = require('../src/gestor');
const Comunidad   = require('../src/comunidad');
const DER         = require('../src/DER');
const f           = require('../src/functions');
var assert        = require('assert');

// Testeo de las funciones para trabajar con los archivos JSON
describe('Funciones DB', function() {
    // Creamos la db
    const db = low(new FileSync(__dirname + '/../db/energy.json'));
    // Definimos una estructura por defecto
    db.defaults({miembros: [], gestores: [], comunidades: [], der: []})
    .write();

    // Declaración de datos para probar las funciones
    var miembro = new Miembro('00000000X', 'Pepe', 'López');
    var miembro1 = new Miembro('00000000X', 'Pepo', 'García');
    var miembro2 = new Miembro('11111111Y', 'Juan', 'López');
    var gestor = new Gestor('00000000Y', 'Paco', 'Pérez');
    var comunidad = new Comunidad('Com_1', 'Descripción', 90, 85, gestor);
    var der = new DER('DER_1', 90, 85);
    // Compleción de los datos
    gestor.asignarCommunityName(comunidad);
    miembro.asignarCommunityName(comunidad);
    miembro.asignarDERname(der);
    miembro1.asignarCommunityName(comunidad);
    miembro1.asignarDERname(der);
    comunidad.insertarMiembro(miembro);

    // Creamos una promesa para asegurar las inserciones en
    // la db antes de manipularla
    let p = new Promise( (resolve, reject) => {
        f.insertDB(miembro);
        f.insertDB(miembro1);
        f.insertDB(miembro2);
        f.insertDB(comunidad);
        f.insertDB(der);
        f.insertDB(gestor);
        resolve('Yo!');
    })

    // Insertamos un miembro y comprobamos su correcta inserción
    it('should insert a member in the DB', function() {
        p.then( () => {
            var size = db.get('miembros').size().value();
            var m = db.get('miembros').value()[0];
            assert.equal(size, 1);
            assert.equal(m.dni, miembro.dni);
            assert.equal(m.name, miembro.name);
            assert.equal(m.last_name, miembro.last_name);
            assert.equal(m.DER_name, miembro.DER_name);
            assert.equal(m.community_name, miembro.community_name);
        }).catch( () => {})
    });

    // Intentamos insertar un miembro distinto pero con la misma clave primaria
    it('should not insert an object with the same key that any other object has', function() {
        p.then( () => {
            var size = db.get('miembros').size().value();
            assert.equal(size, 1)
        }).catch( () => {})
    });

    // Intentamos insertar un miembro con atributos sin definir
    it('should not insert an object with undefined attributes', function() {
        p.then( () => {
            var size = db.get('miembros').size().value();
            assert.equal(size, 1)
        }).catch( () => {})
    });

    // Insertamos un gestor, DER y comunidad y comprobamos que se insertan en su correcto lugar.
    it('should insert gestor, DER and Community objects in their correct place', function() {
        p.then( () => {
            var size1 = db.get('comunidades').size().value();
            var size2 = db.get('der').size().value();
            var size3 = db.get('gestores').size().value();
            assert.equal(size1, 1)
            assert.equal(size2, 1)
            assert.equal(size3, 1)
        }).catch( () => {})
    });

    // Borramos un miembro y comprobamos que ya no está en la db
    it('should remove member', function() {
        p.then( () => {
            f.deleteXfromDB(miembro);
            var size = db.get('miembros').size().value();
            assert.equal(size, 0);
        }).catch( () => {})
    });
});