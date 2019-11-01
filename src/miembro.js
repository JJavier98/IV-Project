class Miembro {
    /**
     * Constructor de la clase
     * @constructor
     * @param {String} dni - Id del miembro
     * @param {String} name - Nombre del miembro
     * @param {String} last_name - (opcional) Apellido del miembro
     * @param {DER} DER - DER perteneciente al miembro
     * @param {Comunidad} community - comunidad a la que pertenece el miembro
     */
    constructor(dni, name, last_name = '\'Apellido no aportado\'', DER_name, community_name) {
        this.dni  = dni                         // Clave primaria (String)
        this.name = name                        // Nombre del miembro (String)
        this.last_name = last_name              // Apellido del miembro (String)
        if(DER_name != undefined){
            this.DER_name = DER_name                // Nombre del DER (clave primaria del DER)
        }
        else {
            this.DER_name = undefined
        }

        if(community_name != undefined){
            this.community_name = community_name    // Nombre de la comunidad (clave primaria de Comunidad)
        }
        else{
            this.community_name = undefined
        }
        this.gestor = false                     // Los miembros no son gestores por defecto
    }
    
    /**
     * Asignar DER a miembro
     * @prototype asignarDERname
     * @param {DER} DER DER a añadir
     * @returns {void}
     */
    asignarDERname(DER){
        this.DER_name = DER.name
    }

    /**
     * Asingnar comunidad a miembro
     * @prototype asignarCommunityName
     * @param {Comunidad} Com Comunidad a añadir
     * @returns {void}
     */
    asignarCommunityName(Com){
        this.community_name = Com.name
    }
    
    /**
     * Comprobar si un miembro es igual a otro
     * @prototype esIgual
     * @param {Miembro} miembro miembro a comparar
     * @returns {boolean}
     */
    esIgual(miembro) {
        return  (this.dni == miembro.dni &&
                this.name == miembro.name &&
                this.last_name == miembro.last_name &&
                this.DER_name == miembro.DER_name &&
                this.community_name == miembro.community_name &&
                this.gestor == miembro.gestor)
    }

    /**
     *  Convertir a JSON
     * @prototype toJSON
     * @returns {JSON}
     */
    toJSON() {
        return {
            'dni': this.dni,
            'name': this.name,
            'last_name': this.last_name,
            'DER_name': this.DER_name,
            'community_name': this.community_name,
            'gestor': this.gestor
        }
    }
}

module.exports = Miembro