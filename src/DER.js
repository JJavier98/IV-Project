class DER {
    /**
     * Constructor de la clase
     * @constructor
     * @param {String} name - Nombre del dispositivo DER
     * @param {float} latitud - Valor de la latitud en la que se encuentra el DER
     * @param {float} longitud - Valor de la longitud en la que se encuentra el DER
     * @param {String} type - Describe qué funcionalidad tiene el DER
     */
    constructor(name, latitud, longitud, type = 'instalación fotovoltaica') {
        this.name = name            // Clave primaria (string)
        this.latitud = latitud      // Coordenada 1 (float)
        this.longitud = longitud    // Coordenada 2 (float)
        this.type = type            // Tipo de DER (String)
    }
}

module.exports = DER