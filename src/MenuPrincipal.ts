import readline from 'readline';
import { acercaDe } from './AcercaDe';
import { menuDirectorio } from './DirectorioContactos';
import { nuevoContacto } from './NuevoContacto';

let menu: readline.Interface;

export const menuPrin = (mensaje: string = ''): void => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
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
    terminal: false,
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
        console.log('buscar');
        break;
      case '4':
        acercaDe();
        break;
      case '5':
        process.stdout.write('\u001B[2J\u001B[0;0f');
        console.log('chau');
        process.exit();
        break;
      default:
        menuPrin();
    }
  });
};
menuPrin();
