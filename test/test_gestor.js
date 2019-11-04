var Gestor = require('../src/gestor.js');
var Comunidad = require('../src/comunidad.js');
var DER = require('../src/DER.js');
var assert = require('assert');

describe('Clase Gestor', function() {
    // Define DER
    var d = new DER('DER_1', 200, 300, undefined)
    // Define Comunidad
    var c = new Comunidad('Com_1', 'Comunidad de paneles solares', 100, 350, undefined)
    // Define Gestor
    var g1 = new Gestor('12345678J', 'Pepe', 'López', d, c)
    // Define Gestor sin apellido
    var g2 = new Gestor('12345678J', 'Pepe', undefined, undefined, c)

    it('should assign correct value to DER_name attribute giving a DER object', function() {
        assert.equal(g1.DER_name, undefined)
    });

    it('should assign correct value to DER_name attribute giving an undefined value', function() {
        assert.equal(g2.DER_name, undefined)
    });

    it('should assign correct value to gestor attribute', function() {
        assert.equal(g1.gestor, true)
    });
    
});