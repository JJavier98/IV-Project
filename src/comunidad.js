class Comunidad {
    constructor(name, desc, latitud, longitud, gestor) {
        this.name = name            // Clave primaria (String)
        this.desc = desc            // Descripción (String)
        this.latitud = latitud      // Coordenada 1
        this.longitud = longitud    // Coordenada 2
        this.gestor_dni = gestor.dni        // Miembro con función de gestor
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