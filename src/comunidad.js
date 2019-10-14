class Comunidad {
    constructor(name, desc, latitud, longitud, gestor) {
        this.name = name            // Clave primaria (String)
        this.desc = desc            // Descripción (String)
        this.latitud = latitud      // Coordenada 1
        this.longitud = longitud    // Coordenada 2
        if(gestor != undefined){
            this.gestor_dni = gestor.dni    // DNI del gestor (clave primaria de Gestor)
        }
        else{
            this.gestor_dni = undefined
        }
        this.miembros = new Set()   // Lista de miembros dueños de un DER
    }

    insertarMiembro(miembro) {
        this.miembros.add(miembro)
    }

    addGestorDNI(gestor) {
        this.gestor_dni = gestor.dni;
    }
}

module.exports = Comunidad