class Miembro {
    constructor(dni, name, last_name = '\'Apellido no aportado\'', DER, community) {
        this.dni  = dni                         // Clave primaria (String)
        this.name = name                        // Nombre del miembro (String)
        this.last_name = last_name              // Apellido del miembro (String)
        if(DER != undefined){
            this.DER_name = DER.name                // Nombre del DER (clave primaria del DER)
        }
        else {
            this.DER_name = undefined
        }

        if(community != undefined){
            this.community_name = community.name    // Nombre de la comunidad (clave primaria de Comunidad)
        }
        else{
            this.community_name = undefined
        }
        this.gestor = false                     // Los miembros no son gestores por defecto
    }

    asignarDERname(DER){
        this.DER_name = DER.name
    }

    asignarCommunityName(Com){
        this.community_name = Com.name
    }

    esIgual(miembro) {
        return  (this.dni == miembro.dni &&
                this.name == miembro.name &&
                this.last_name == miembro.last_name &&
                this.DER_name == miembro.DER_name &&
                this.community_name == miembro.community_name &&
                this.gestor == miembro.gestor)
    }

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