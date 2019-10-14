const Miembro     = require('../src/miembro');
const Gestor      = require('../src/gestor');
const Comunidad   = require('../src/comunidad');
const DER         = require('../src/DER');
const fs          = require('fs');

var miembro = new Miembro('00000000-X', 'Pepe', 'López');
var miembro1 = new Miembro('00000000-X', 'Pepe', 'López');
var gestor = new Gestor('00000000-Y', 'Paco', 'Pérez');
var comunidad = new Comunidad('Com #1', 'Descripción', 90, 85, gestor);
var der = new DER('DER #1', 90, 85);
gestor.asignarCommunityName(comunidad.name);
miembro.asignarDERname(comunidad.name);
miembro.asignarDERname(der.name);
comunidad.insertarMiembro(miembro);

// TODO: comprobar que no repetimos datos
function insertDB(object) {
    if (object instanceof Miembro) {
        fs.appendFileSync('db/members.json', JSON.stringify(object.toJSON(), null, 2));
    }
    else if (object instanceof Gestor) {
        fs.appendFileSync('db/managers.json', JSON.stringify(object.toJSON(), null, 2));
    }
    else if (object instanceof Comunidad) {
        fs.appendFileSync('db/communities.json', JSON.stringify(object.toJSON(), null, 2));
    }
    else if (object instanceof DER) {
        fs.appendFileSync('db/communities.json', JSON.stringify(object.toJSON(), null, 2));
    }
}

fs.appendFileSync('db/members.json', JSON.stringify(miembro.toJSON(), null, 2));

console.log(miembro)
console.log(gestor)
console.log(comunidad)
console.log(der)