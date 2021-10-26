import readline from 'readline';
import { acercaDe } from './AcercaDe';
import { menuDirectorio } from './DirectorioContactos';
import { nuevoContacto } from './NuevoContacto';
import { buscarContacto } from './BuscarContacto';
import { pregunta } from './NosVimos';
// tslint:disable-next-line: no-var-requires
const term = require('terminal-kit').terminal;

// tslint:disable-next-line: prefer-const
let menu: readline.Interface;

export const menuPrin = (mensaje: string = ''): void => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  if (menu) menu.close();

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
  console.log('');
  console.log(mensaje);
  console.log('');
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  menu.question('Opcion: ', (input) => {
    switch (input) {
      case '1':
        menuDirectorio();
        break;
      case '2':
        nuevoContacto();
        break;
      case '3':
        buscarContacto();
        break;
      case '4':
        acercaDe();
        break;
      case '5':
        pregunta();
        break;
      default:
        menuPrin();
    }
  });
};
menuPrin();
