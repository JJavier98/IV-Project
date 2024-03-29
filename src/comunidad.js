class Comunidad {
    /**
     * Constructor de la clase
     * @constructor
     * @param {String} name - Nombre de la comunidad
     * @param {float} desc - Descripción de la comunidad
     * @param {float} latitud - Valor de la latitud en la que se encuentra la comunidad
     * @param {float} longitud - Valor de la longitud en la que se encuentra la comunidad
     * @param {Gestor} gestor_dni - Gestor de la comunidad
     */
    constructor(name, desc, latitud, longitud, gestor_dni, miembros=undefined) {
        this.name = name            // Clave primaria (String)
        this.desc = desc            // Descripción (String)
        this.latitud = latitud      // Coordenada 1
        this.longitud = longitud    // Coordenada 2
        if(gestor_dni != undefined){
            this.gestor_dni = gestor_dni    // DNI del gestor (clave primaria de Gestor)
        }
        else{
            this.gestor_dni = undefined
        }
        if(miembros == undefined)
        {
            this.miembros = new Set()   // Lista de miembros dueños de un DER
        }
        else
        {
            this.miembros = miembros
        }
    }

    /**
     * Agrega un miembro a la comunidad
     * @prototype insertarMiembro
     * @param {Miembro} miembro Nuevo miembro
     * @returns {void}
     */
    insertarMiembro(miembro) {
        this.miembros.add(miembro)
    }

    /**
     * Añadir gestor a la comunidad
     * @prototype addGestorDNI
     * @param {Gestor} gestor Gestor a añadir
     * @returns {void}
     */
    addGestorDNI(gestor) {
        this.gestor_dni = gestor.dni;
    }
}

module.exports = Comunidad