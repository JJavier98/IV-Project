// Bibliotecas
const low         = require('lowdb')
const FileSync    = require('lowdb/adapters/FileSync')
const Miembro     = require('../src/miembro');
const Gestor      = require('../src/gestor');
const Comunidad   = require('../src/comunidad');
const DER         = require('../src/DER');
const fs          = require('fs');

/**
 * Creamos el archivo que actuará como base de datos
 * @const {low}
 */
const db = low(new FileSync('db/energy.json'));

/**
 * Definimos una estructura básica para la db
 * @param miembros Almacena todos los miembros
 * @param gestores Almacena todos los gestores
 * @param comunidades Almacena las comunidades controladas por el sistema
 * @param der Almacena los dispositivos DER de todas las comunidades del sistema
 */ 
db.defaults({miembros: [], gestores: [], comunidades: [], der: []})
.write();

var miembro = new Miembro('00000000-X', 'Pepe', 'López');
var miembro1 = new Miembro('00000000-X', 'Pepe', 'López');
var miembro2 = new Miembro('00000000-Y', 'Pepe', 'López');
var gestor = new Gestor('00000000-Y', 'Paco', 'Pérez');
var comunidad = new Comunidad('Com #1', 'Descripción', 90, 85, gestor);
var der = new DER('DER #1', 90, 85);
gestor.asignarCommunityName(comunidad.name);
miembro.asignarDERname(comunidad.name);
miembro.asignarDERname(der.name);
comunidad.insertarMiembro(miembro);


db.get('miembros')
            .push({dni: miembro.dni,
                name: miembro.name,
                last_name: miembro.last_name,
                DER_name: miembro.DER_name,
                community_name: miembro.community_name,
                gestor: miembro.gestor})
            .write()