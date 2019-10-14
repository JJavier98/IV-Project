const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const Miembro     = require('../src/miembro');
const Gestor      = require('../src/gestor');
const Comunidad   = require('../src/comunidad');
const DER         = require('../src/DER');
const fs          = require('fs');

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

// Creamos el archivo que actuará como base de datos
const db = low(new FileSync('db/energy.json'));
// Definimos una estructura básica para la db
db.defaults({miembros: [], gestores: [], comunidades: [], der: []})
.write();

function insertDB(object) {
    if (object instanceof Miembro) {
        if (db.get('miembros').find({dni: object.dni}).value() == undefined &&
            object.DER_name != undefined &&
            object.community_name != undefined &&
            object.gestor == false)
        {
            db.get('miembros')
            .push({dni: object.dni,
                name: object.name,
                last_name: object.last_name,
                DER_name: object.DER_name,
                community_name: object.community_name,
                gestor: object.gestor})
            .write()
        }
    }
    else if (object instanceof Gestor) {
        if (db.get('gestores').find({dni: object.dni}).value() == undefined &&
            object.DER_name == undefined && object.community_name != undefined &&
            object.gestor == true)
        {
            db.get('gestores')
            .push({dni: object.dni,
                name: object.name,
                last_name: object.last_name,
                DER_name: object.DER_name,
                community_name: object.community_name,
                gestor: object.gestor})
            .write()
        }
    }
    else if (object instanceof Comunidad) {
        if (db.get('comunidades').find({name: object.name}).value() == undefined &&
            object.desc != undefined &&
            object.latitud != undefined &&
            object.longitud != undefined)
        {
            db.get('comunidades')
            .push({name: object.name,
                desc: object.desc,
                latitud : object.latitud,
                longitud: object.longitud,
                gestor_dni: object.gestor_dni,
                miembros: object.miembros})
            .write()
        }
    }
    else if (object instanceof DER) {
        if (db.get('der').find({name: object.name}).value() == undefined &&
            object.latitud != undefined &&
            object.longitud != undefined &&
            object.type != undefined)
        {
            db.get('der')
            .push({name: object.name,
                latitud : object.latitud,
                longitud: object.longitud,
                type: object.type})
            .write()
        }
    }
}

function updateDB(object) {
    if (object instanceof Miembro) {
        if (db.get('miembros').find({dni: object.dni}).value() != undefined)
        {
            db.get('miembros')
            .find({dni: object.dni})
            .assign({dni: object.dni,
                name: object.name,
                last_name: object.last_name,
                DER_name: object.DER_name,
                community_name: object.community_name,
                gestor: object.gestor})
            .value()
        }
    }
    else if (object instanceof Gestor) {
        if (db.get('gestores').find({dni: object.dni}).value() == undefined &&
            object.DER_name == undefined && object.community_name != undefined &&
            object.gestor == true)
        {
            db.get('gestores')
            .push({dni: object.dni,
                name: object.name,
                last_name: object.last_name,
                DER_name: object.DER_name,
                community_name: object.community_name,
                gestor: object.gestor})
            .write()
        }
    }
    else if (object instanceof Comunidad) {
        if (db.get('comunidades').find({name: object.name}).value() == undefined &&
            object.desc != undefined &&
            object.latitud != undefined &&
            object.longitud != undefined)
        {
            db.get('comunidades')
            .push({name: object.name,
                desc: object.desc,
                latitud : object.latitud,
                longitud: object.longitud,
                gestor_dni: object.gestor_dni,
                miembros: object.miembros})
            .write()
        }
    }
    else if (object instanceof DER) {
        if (db.get('der').find({name: object.name}).value() == undefined &&
            object.latitud != undefined &&
            object.longitud != undefined &&
            object.type != undefined)
        {
            db.get('der')
            .push({name: object.name,
                latitud : object.latitud,
                longitud: object.longitud,
                type: object.type})
            .write()
        }
    }
}

insertDB(miembro)

module.exports.insertDB = insertDB;