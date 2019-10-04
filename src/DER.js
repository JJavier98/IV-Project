class DER {
    constructor(name, latitud, longitud, type = 'instalación fotovoltaica') {
        this.name = name            // Clave primaria (string)
        this.latitud = latitud      // Coordenada 1 (float)
        this.longitud = longitud    // Coordenada 2 (float)
        this.type = type            // Tipo de DER (String)
    }
}

module.exports = DER