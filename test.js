const nuevoC = require('./nuevocontacto');
let { input } = require('console-input');

nuevoC.nombre = input('nombre:');
nuevoC.apellido = input('apellido:');
nuevoC.apodo = input('apodo:');
nuevoC.nacimiento = input('nacimiento:');
nuevoC.edad = input('edad:');
nuevoC.telefono = input('telefono:');
nuevoC.direccion = input('direccion:');

console.log(nuevoC);
