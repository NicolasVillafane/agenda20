import { menuPrin } from './MenuPrincipal';
import readline from 'readline';
import * as datos from './datos.json';
// tslint:disable-next-line: no-var-requires
const term = require('terminal-kit').terminal;
let menu: readline.Interface;

export const acercaDe = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  const items = ['Menu Principal'];
  const options = {
    y: 13, // the menu will be on the top of the terminal
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
        menuPrin();
      } else {
        process.exit();
      }
    }
  );
  process.stdout.write('\u001B[2J\u001B[0;0f');
  console.log('*****************');
  console.log(`Nombre: ${datos.name}`);
  console.log('');
  console.log(`Version: ${datos.version}`);
  console.log('');
  console.log(`Autor: ${datos.author}`);
  console.log('');
  console.log(`${datos.description}`);
  console.log('');
  console.log('*****************');
  console.log('');
  console.log('');
  console.log('');

  if (menu) menu.close();
};
