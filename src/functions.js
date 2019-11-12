// Bibliotecas
const low         = require('lowdb')
const FileSync    = require('lowdb/adapters/FileSync')
const Miembro     = require('../src/miembro');
const Gestor      = require('../src/gestor');
const Comunidad   = require('../src/comunidad');
const DER         = require('../src/DER');
const fs          = require('fs');

const db = low(new FileSync('db\\energy.json'));
if(!db) {
    db = low(new FileSync('db\energy.json'));
    console.error('Estamos en windows')
    console.log('Estamos en windows')
}
else {
    console.error('Estamos en linux')
    console.log('Estamos en linux')
}

let def = JSON.parse(fs.readFileSync('./db/default.json'))
db.defaults(def)
.write();

/**
 * Inserta un nuevo objeto en la base de datos
 * si todavía no pertenece a ella
 * @function insertDB
 * @param {Miembro | Gestor | Comunidad | DER} object Nueva instancia a agregar a la DB
 * @returns {{error, status, response}} Array de tres elementos. El primero indica si hubo algún error o no. El segundo es el estado HTTP. Y el tercero es la respuesta recivida.
 */
function insertDB(object) {
    // Si el objeto es un Miembro
    if (object instanceof Miembro && object.gestor == false) {
        // Si no existe y está bien formado
        if (db.get('miembros').find({dni: object.dni}).value() == undefined &&
            object.DER_name != undefined &&
            object.community_name != undefined &&
            object.gestor == false)
        {
            if (db.get('der').find({name: object.DER_name}).value() != undefined &&
            db.get('comunidades').find({name: object.community_name}).value() != undefined )
            {
                db.get('miembros')
                .push({dni: object.dni,
                    name: object.name,
                    last_name: object.last_name,
                    DER_name: object.DER_name,
                    community_name: object.community_name,
                    gestor: object.gestor})
                .write()

                var com = db.get('comunidades').find({name: object.community_name}).value();
                var nuevos_miembros = com.miembros;
                nuevos_miembros[object.dni] = object;
                var nueva_com = new Comunidad(com.name, com.desc, com.latitud, com.longitud, com.gestor_dni, nuevos_miembros);
                updateDB(nueva_com);

                return [false, 201, object];
            }
            else {
                console.error('No existe un DER o una comunidad con esos nombres');
                return [true, 404, 'ERROR. DER o Comunidad no existen en la base de datos.'];
            }
        }
        // Si ya existe un objeto con la misma clave
        else if (db.get('miembros').find({dni: object.dni}).value() != undefined) {
            console.error('Ya existe un miembro con esa clave.\n Para modificarla use \'updateDB()\'');
            return [true, 409, 'ERROR. Ya existe un miembro con esa clave.'];
        }
        else {
            console.error('Algunos atributos de miembro no contienen valores válidos');
            return [true, 400, 'ERROR. Algunos atributos de miembro no contienen valores válidos'];
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
            console.error('Ya existe un gestor con esa clave.\n Para modificarla use \'updateDB()\'');
        }
        else {
            console.error('Algunos atributos del gestor no contienen valores válidos');
        }
    }
    // Si el objeto es una Comunidad
    else if (object instanceof Comunidad) {
        // Si no existe y está bien formado
        if (db.get('comunidades').find({name: object.name}).value() == undefined &&
            object.desc != undefined &&
            object.latitud != undefined &&
            object.longitud != undefined &&
            object.gestor_dni != undefined &&
            object.miembros != undefined)
        {
            if (db.get('gestores').find({dni: object.gestor_dni}).value() != undefined)
            {
                db.get('comunidades')
                .push({name: object.name,
                    desc: object.desc,
                    latitud : object.latitud,
                    longitud: object.longitud,
                    gestor_dni: object.gestor_dni,
                    miembros: object.miembros})
                .write()

                return [false, 201, object];
            }
            else {
                console.error('ERROR. No existe ningún gestor con ese DNI');
                return [true, 404, 'ERROR. No existe ningún gestor con ese DNI'];
            }
        }
        // Si ya existe un objeto con la misma clave
        else if (db.get('comunidades').find({name: object.name}).value() != undefined) {
            console.error('Ya existe una comunidad con esa clave.\n Para modificarla use \'updateDB()\'');
            return [true, 400, 'ERROR. Ya existe una comunidad con esa clave.'];
        }
        else {
            console.error('Algunos atributos de la comunidad no contienen valores válidos');
            return [true, 400, 'ERROR. Algunos atributos de comunidad no contienen valores válidos'];
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
            console.error('Ya existe un DER con esa clave.\n Para modificarla use \'updateDB()\'');
        }
        else {
            console.error('Algunos atributos del DER no contienen valores válidos');
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
    if (object instanceof Miembro && object.gestor == false)
    {

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
        else if (db.get('miembros').find({dni: object.dni}).value() == undefined) {
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
        else if (db.get('gestores').find({dni: object.dni}).value() == undefined) {
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
            .write()

            return [false, 200, object];
        }
        // Si no existe un objeto con la misma clave
        else if (db.get('comunidades').find({name: object.name}).value() == undefined) {
            console.error('NO existe una instancia con esa clave.');
            return [true, 404, 'ERROR. NO existe una instancia con esa clave.'];
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
            return [true, 404, 'ERROR. Algunos atributos no contienen valores válidos.'];
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
        else if (db.get('der').find({name: object.name}).value() == undefined) {
            console.error('NO existe una instancia con esa clave.');
        }
        else {
            console.error('Algunos atributos no contienen valores válidos 555');
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
async function deleteXfromDB(object) {
    if (object instanceof Miembro && object.gestor == false) {
        if (db.get('miembros').find({dni: object.dni}).value() != undefined &&
        object.DER_name != undefined &&
        object.community_name != undefined &&
        object.gestor == false)
        {
            db.get('miembros')
            .remove({dni: object.dni})
            .write()
        }
        // Si no existe un objeto con la misma clave
        else if (db.get('miembros').find({dni: object.dni}).value() == undefined) {
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
            .remove({dni: object.dni})
            .write()
        }
        // Si no existe un objeto con la misma clave
        else if (db.get('gestores').find({dni: object.dni}).value() == undefined) {
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
            .remove({name: object.name})
            .write()
            return [false, 200, object];
        }
        // Si no existe un objeto con la misma clave
        else if (db.get('comunidades').find({name: object.name}).value() != undefined) {
            console.error('NO existe una instancia con esa clave.');
            return [true, 404, 'ERROR. NO existe una instancia con esa clave.'];
        }
        else {
            console.error('Algunos atributos no contienen valores válidos');
            return [true, 400, 'ERROR. Valores inválidos.'];
        }
    }
    else if (object instanceof DER) {
        if (db.get('der').find({name: object.name}).value() != undefined &&
        object.latitud != undefined &&
        object.longitud != undefined &&
        object.type != undefined)
        {
            db.get('der')
            .remove({name: object.name})
            .write()
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

//var m = db.get('miembros').size().value()
//console.log(m)

module.exports.insertDB = insertDB;
module.exports.updateDB = updateDB;
module.exports.deleteXfromDB = deleteXfromDB;
module.exports.db = db;