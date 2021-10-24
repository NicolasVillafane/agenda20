import readline from 'readline';
import { acercaDe } from './AcercaDe';
import { menuDirectorio } from './DirectorioContactos';
import { nuevoContacto } from './NuevoContacto';
import { buscarContacto } from './BuscarContacto';
// tslint:disable-next-line: no-var-requires
const term = require('terminal-kit').terminal;

let menu: readline.Interface;

export const menuPrin = (mensaje: string = ''): void => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  const items = [
    'Directorio de Contactos',
    'Nuevo Contacto',
    'Buscar Contacto',
    'Acerca De',
    'Salir',
  ];
  const options = {
    y: 5, // the menu will be on the top of the terminal
    style: term.inverse,
    selectedStyle: term.dim.blue.bgGreen,
  };
  term.singleLineMenu(
    items,
    options,
    (
      _error: any,
      response: { selectedIndex: any; selectedText: any; x: any; y: any }
    ) => {
      if (response.selectedIndex === 0) {
        menuDirectorio();
      } else if (response.selectedIndex === 1) {
        nuevoContacto();
      } else if (response.selectedIndex === 2) {
        buscarContacto();
      } else if (response.selectedIndex === 3) {
        acercaDe();
      } else {
        process.exit();
      }
    }
  );
  process.stdout.write('\u001B[2J\u001B[0;0f');
  console.log('*****************');
  console.log('Bienvenido a la contactera');
  console.log('');
  console.log('Ingrese una opcion:');
  console.log('');

  console.log('*****************');
  console.log('');
  console.log(mensaje);
  console.log('');
  if (menu) menu.close();
};
menuPrin();
