const nuevoC = require('./nuevocontacto');
let { input } = require('console-input');
let keypress = require('keypress');
const readline = require('readline');

const contactos = require('./contactos');
console.clear();
console.log('*****************');
console.log('Bienvenido a la contactera');
console.log('');
console.log('Ingrese una opcion:');
console.log('');
console.log('1 - Directorio de contactos');
console.log('2 - Nuevo contacto');
console.log('3 - Buscar contacto');
console.log('4 - Acerca de');
console.log('5 - Salir');
console.log('');
console.log('*****************');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.name === '5') {
    process.exit();
  } else if (key.name === '1') {
    console.clear();
    console.log('*****************');
    console.log('Directorio de contactos');
    console.log('');
    console.log('1 - Ver todos los contactos');
    console.log('2 - Ver una letra');
    console.log('3 - Volver al menu principal');

    console.log('*****************');
    console.log('');
    console.log('opcion: ');
    // key.name === undefined;
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
      if (key.name === '5') {
        process.exit();
      } else if (key.name === '1') {
        console.clear();
        console.log('*****************');
        for (let i = 0; i < 10; i++) {
          console.log(`${i + 1} - ${contactos[i].nombre}`);
        }
        console.log('*****************');
        console.log('');
        console.log('Ingrese el numero del contacto para ver el contacto o');
        console.log('');
        console.log('s - Siguiente');
        console.log('a - Anterior');
        console.log('x - Volver al menu principal');
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (str, key) => {
          if (key.name === '5') {
            process.exit();
          } else if (key.name === 's') {
            console.clear();
            console.log('*****************');
            for (let i = 11; i < 21; i++) {
              console.log(`${i} - ${contactos[i].nombre}`);
            }
            console.log('*****************');
            console.log('');
            console.log(
              'Ingrese el numero del contacto para ver el contacto o'
            );
            console.log('');
            console.log('s - Siguiente');
            console.log('a - Anterior');
            console.log('x - Volver al menu principal');
          }
        });
      }
    });

    // if (key.name === '1') {

    // }
  } else if (key.name === '2') {
    console.clear();

    console.log('Ingrese los datos del nuevo contacto: ');
    console.log('');
    nuevoC.nombre = input('nombre: ');
    console.log(nuevoC.nombre);
    nuevoC.apellido = input('apellido: ');
    console.log(nuevoC.apellido);
    nuevoC.apodo = input('apodo: ');
    console.log(nuevoC.apodo);

    nuevoC.nacimiento = input('nacimiento: ');
    console.log(nuevoC.nacimiento);
    nuevoC.edad = input('edad: ');
    console.log(nuevoC.edad);
    nuevoC.telefono = input('telefono: ');
    console.log(nuevoC.telefono);
    nuevoC.direccion = input('direccion: ');
    console.log(nuevoC.direccion);
    contactos.push(nuevoC);
    console.log(
      'Su nuevo contacto ha sido guardado con exito, la bien puta madre que te pario'
    );
  }
});
console.log('opcion: ');
