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

/**
 * Inserta un nuevo objeto en la base de datos
 * si todavía no pertenece a ella
 * @function insertDB
 * @param {Miembro | Gestor | Comunidad | DER} object Nueva instancia a agregar a la DB
 * @returns {void}
 */
function insertDB(object) {
    // Si el objeto es un Miembro
    if (object instanceof Miembro) {
        // Si no existe y está bien formado
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
        // Si ya existe un objeto con la misma clave
        else if (db.get('miembros').find({dni: object.dni}).value() != undefined) {
            console.error('Ya existe una instancia con esa clave.\n Para modificarla use \'updateDB()\'');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
        }
    }
    // Si el objeto es un Gestor
    else if (object instanceof Gestor) {
        // Si no existe y está bien formado
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
        // Si ya existe un objeto con la misma clave
        else if (db.get('gestores').find({dni: object.dni}).value() != undefined) {
            console.error('Ya existe una instancia con esa clave.\n Para modificarla use \'updateDB()\'');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
        }
    }
    // Si el objeto es una Comunidad
    else if (object instanceof Comunidad) {
        // Si no existe y está bien formado
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
        // Si ya existe un objeto con la misma clave
        else if (db.get('comunidades').find({name: object.name}).value() != undefined) {
            console.error('Ya existe una instancia con esa clave.\n Para modificarla use \'updateDB()\'');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
        }
    }
    // Si el objeto es un DER
    else if (object instanceof DER) {
        // Si no existe y está bien formado
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
        // Si ya existe un objeto con la misma clave
        else if (db.get('der').find({name: object.name}).value() != undefined) {
            console.error('Ya existe una instancia con esa clave.\n Para modificarla use \'updateDB()\'');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
        }
    }
}

/**
 * Modifica un objeto en la base de datos
 * siempre y cuando pertenezca a ella con anterioridad
 * @function updateDB
 * @param {Miembro | Gestor | Comunidad | DER} object Instancia a modificar de la DB
 * @returns {void}
 */
function updateDB(object) {
    if (object instanceof Miembro) {
        if (db.get('miembros').find({dni: object.dni}).value() != undefined &&
        object.DER_name != undefined &&
        object.community_name != undefined &&
        object.gestor == false)
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
        // Si no existe un objeto con la misma clave
        else if (db.get('miembros').find({dni: object.dni}).value() != undefined) {
            console.error('NO existe una instancia con esa clave.');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
        }
    }
    else if (object instanceof Gestor) {
        if (db.get('gestores').find({dni: object.dni}).value() != undefined &&
        object.DER_name == undefined && object.community_name != undefined &&
        object.gestor == true)
        {
            db.get('gestores')
            .assign({dni: object.dni,
                name: object.name,
                last_name: object.last_name,
                DER_name: object.DER_name,
                community_name: object.community_name,
                gestor: object.gestor})
            .value()
        }
        // Si no existe un objeto con la misma clave
        else if (db.get('gestores').find({dni: object.dni}).value() != undefined) {
            console.error('NO existe una instancia con esa clave.');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
        }
    }
    else if (object instanceof Comunidad) {
        if (db.get('comunidades').find({name: object.name}).value() != undefined &&
        object.desc != undefined &&
        object.latitud != undefined &&
        object.longitud != undefined)
        {
            db.get('comunidades')
            .assign({name: object.name,
                desc: object.desc,
                latitud : object.latitud,
                longitud: object.longitud,
                gestor_dni: object.gestor_dni,
                miembros: object.miembros})
            .value()
        }
        // Si no existe un objeto con la misma clave
        else if (db.get('comunidades').find({name: object.name}).value() != undefined) {
            console.error('NO existe una instancia con esa clave.');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
        }
    }
    else if (object instanceof DER) {
        if (db.get('der').find({name: object.name}).value() != undefined &&
        object.latitud != undefined &&
        object.longitud != undefined &&
        object.type != undefined)
        {
            db.get('der')
            .assign({name: object.name,
                latitud : object.latitud,
                longitud: object.longitud,
                type: object.type})
            .value()
        }
        // Si no existe un objeto con la misma clave
        else if (db.get('der').find({name: object.name}).value() != undefined) {
            console.error('NO existe una instancia con esa clave.');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
        }
    }
}

/**
 * Elimina un objeto en la base de datos
 * siempre y cuando pertenezca a ella con anterioridad
 * @function deleteXfromDB
 * @param {Miembro | Gestor | Comunidad | DER} object Instancia a eliminar de la DB
 * @returns {void}
 */
function deleteXfromDB(object) {

}

module.exports.insertDB = insertDB;
module.exports.updateDB = updateDB;