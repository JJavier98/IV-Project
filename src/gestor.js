var Miembro = require('./miembro.js')

class Gestor extends Miembro {
    /**
     * Constructor de la clase
     * @constructor
     * @param {String} dni - Id del gestor
     * @param {String} name - Nombre del gestor
     * @param {String} last_name - (opcional) Apellido del gestor
     * @param {Comunidad} community - comunidad a la que pertenece el gestor
     */
    constructor(dni, name, last_name, community) {
        super(dni, name, last_name, undefined, community) // Llamamos al constructor de Miembro
        this.gestor = true                          // Decimos que es gestor
    }
}
module.exports = Gestor