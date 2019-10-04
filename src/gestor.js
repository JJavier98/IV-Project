var Miembro = require('./miembro.js')

class Gestor extends Miembro {
    constructor(dni, name, last_name, DER, community) {
        super(dni, name, last_name, undefined, community) // Llamamos al constructor de Miembro
        this.gestor = true                          // Decimos que es gestor
    }
}
module.exports = Gestor