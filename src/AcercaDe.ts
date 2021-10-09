import { menuPrin } from './MenuPrincipal';
import readline from 'readline';
import * as datos from './datos.json';
let menu: readline.Interface;

export const acercaDe = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  console.log('*****************');
  console.log(`Nombre: ${datos.name}`);
  console.log('');
  console.log(`Version: ${datos.version}`);
  console.log('');
  console.log(`Autor: ${datos.author}`);
  console.log('');
  console.log(`Descripcion: ${datos.description}`);
  console.log('');
  console.log('*****************');
  console.log('');
  console.log('1 - Volver al menu principal');
  console.log('');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  menu.question('Opcion: ', (input) => {
    input === '1' ? menuPrin() : acercaDe();
  });
};
