var DER = require('../src/DER.js');
var assert = require('assert');

describe('Clase DER', function() {
    // Define DER
    var d = new DER('DER_1', 200, 300, undefined)
    var d1 = new DER('DER_1', 200, 300, 'cargador coche eléctrico')

    it('should assign correct value to name attribute', function() {
        assert.equal(d.name, 'DER_1')
    });
    
    it('should assign correct value to lalitud attribute', function() {
        assert.equal(d.latitud, 200)
    });
    
    it('should assign correct value to longitud attribute', function() {
        assert.equal(d.longitud, 300)
    });
    
    it('should assign correct value to undefined type attribute', function() {
        assert.equal(d.type, 'instalación fotovoltaica')
    });
    
    it('should assign correct value to type attribute', function() {
        assert.equal(d1.type, 'cargador coche eléctrico')
    });
});