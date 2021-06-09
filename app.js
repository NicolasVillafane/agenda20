let { input } = require('console-input');

const contactos = require('./contactos');

console.log('*****************');
console.log('Bienvenido a la contactera');
console.log('');
console.log('Ingrese una opcion:');
console.log('');
console.log('f1 - Directorio de contactos');
console.log('f2 - Nuevo contacto');
console.log('f3 - Buscar contacto');
console.log('f11 - Acerca de');
console.log('f12 - Salir');
console.log('');
console.log('*****************');

const userInput = input('opcion: ');

if (userInput === 'f1') {
  console.log('*****************');
  for (let i = 0; i < 10; i++) {
    console.log(`${i + 1} - ${contactos[i].nombre}`);
  }

  const userInputf1 = input('opcion: ');
  console.log('*****************');
  if (userInputf1 === 'f1') {
    for (let i = 11; i < 21; i++) {
      console.log(`${i} - ${contactos[i].nombre}`);
    }
  }
}
