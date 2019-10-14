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

fs.appendFileSync('db/members.json', JSON.stringify(miembro.toJSON(), null, 2));

console.log(miembro)
console.log(gestor)
console.log(comunidad)
console.log(der)