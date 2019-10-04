var Gestor = require('../src/gestor.js');
var Miembro = require('../src/miembro.js');
var Comunidad = require('../src/comunidad.js');
var DER = require('../src/DER.js');
var assert = require('assert');

describe('Clase Comunidad', function() {
    // Define DER
    var d = new DER('DER #1', 200, 300, undefined)
    // Define Gestor
    var g1 = new Gestor('12345678-J', 'Pepe', 'López', d, undefined)
    // Define Comunidad
    var c = new Comunidad('Com #1', 'Comunidad de paneles solares', 100, 350, g1)
    // Define Comunidad
    var c2 = new Comunidad('Com #2', 'Comunidad de paneles solares', 100, 350, g1)
    // Define Miembro
    var m1 = new Miembro('12345678-J', 'Pepe', 'López', d, c)


    it('should assign correct value to name attribute', function() {
        assert.equal(c.name, 'Com #1')
    });
    
    it('should assign correct value to desc attribute', function() {
        assert.equal(c.desc, 'Comunidad de paneles solares')
    });
    
    it('should assign correct value to lalitud attribute', function() {
        assert.equal(c.latitud, 100)
    });
    
    it('should assign correct value to longitud attribute', function() {
        assert.equal(c.longitud, 350)
    });
    
    it('should assign correct value to gestor attribute', function() {
        assert.equal(c.gestor, g1)
    });
    
    it('should assign correct object type to miembros attribute', function() {
        assert.equal(c.miembros instanceof Set, true)
    });
    
    it('should has zero values in miembros attribute', function() {
        assert.equal(c.miembros.size, 0)
    });
    
    describe('Métodos de Comunidad', function(){
        
        c2.insertarMiembro(m1)
        it('should has one value in miembros attribute', function() {
            assert.equal(c2.miembros.size, 1)
        });

        it('should has m1 at first value in miembros attribute', function() {
            assert.equal(c2.miembros.has(m1), true)
        });

    });
});