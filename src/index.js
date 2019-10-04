var Miembro = require('./miembro.js')
var Gestor = require('./gestor.js')
var Comunidad = require('./comunidad.js')
var DER = require('./DER.js')

var d = new DER('DER #1', 200, 300, undefined)
var c = new Comunidad('Com #1', 'Comunidad de paneles solares', 100, 350, undefined)
var g = new Gestor('12345678-J', 'JJ', undefined, undefined, c)
c.gestor = g
var m = new Miembro('77766199-W', 'Jota', undefined, undefined, c)

// Gestor
console.log(g.dni)
console.log(g.name)
console.log(g.last_name)
console.log(g.id_DER)
console.log(g.id_community)
console.log(g.gestor)

// Comunidad
console.log(c.name)
console.log(c.gestor)
console.log(c.longitud)
console.log(c.latitud)
console.log(c.miembros)

// DER
console.log(d.name)
console.log(d.latitud)
console.log(d.longitud)
console.log(d.type)

// Miembro
console.log(m.dni)
console.log(m.name)
console.log(m.last_name)
console.log(m.id_DER)
console.log(m.id_community)
console.log(m.gestor)