var Miembro = require('../src/miembro.js');
var Comunidad = require('../src/comunidad.js');
var DER = require('../src/DER.js');
var assert = require('assert');

describe('Clase Miembro', function() {
    // Define DER
    var d = new DER('DER #1', 200, 300, undefined)
    // Define Comunidad
    var c = new Comunidad('Com #1', 'Comunidad de paneles solares', 100, 350, undefined)
    // Define Miembro
    var m1 = new Miembro('12345678-J', 'Pepe', 'López', d.name, c.name)
    // Define Miembro
    var m1_ = new Miembro('12345678-J', 'Pepe', 'López', d.name, c.name)
    // Define Miembro sin apellido
    var m2 = new Miembro('12345678-J', 'Pepe', undefined, d.name, c.name)
    // Define Miembro sin apellido, sin DER y sin comunidad
    var m3 = new Miembro('12345678-J', 'Pepe', undefined, undefined, undefined)


    it('should assign correct value to dni attribute', function() {
        assert.equal(m1.dni, '12345678-J')
    });
    
    it('should assign correct value to name attribute', function() {
        assert.equal(m1.name, 'Pepe')
    });
    
    it('should assign correct value to last_name attribute', function() {
        assert.equal(m1.last_name, 'López')
    });
    
    it('should assign correct value to undefined last_name attribute', function() {
        assert.equal(m2.last_name, '\'Apellido no aportado\'')
    });
    
    it('should assign correct value to DER_name attribute', function() {
        assert.equal(m1.DER_name, 'DER #1')
    });
    
    it('should assign correct value to Community_name attribute', function() {
        assert.equal(m1.community_name, 'Com #1')
    });
    
    it('should assign correct value to undefined DER_name attribute', function() {
        assert.equal(m3.DER_name, undefined)
    });
    
    it('should assign correct value to undefined Community_name attribute', function() {
        assert.equal(m3.community_name, undefined)
    });
    
    it('should assign correct value to gestor attribute', function() {
        assert.equal(m1.gestor, false)
    });
    
    describe('Métodos de Miembro', function(){

        // Define Miembro sin apellido, DER ni comunidad
        var m4 = new Miembro('12345678-J', 'Pepe', undefined, undefined, undefined)
        
        m4.asignarCommunityName(c)
        it('should assign c.name to m4.community_name', function() {
            assert.equal(m4.community_name, c.name)
        });

        m4.asignarDERname(d)
        it('should assign d.name to m4.DER_name', function() {
            assert.equal(m4.DER_name, d.name)
        });
    
        it('should distinguish between two different members', function() {
            assert.equal(m1.esIgual(m2), false)
        });
        
        it('should recognize two identical members', function() {
            assert.equal(m1.esIgual(m1_), true)
        });

    });
});