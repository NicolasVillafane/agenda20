import { menuPrin } from './MenuPrincipal';
import readline from 'readline';
import getPixels from 'get-pixels';
// tslint:disable-next-line: no-var-requires
const term = require('terminal-kit').terminal;

let menu: readline.Interface;
export const pregunta = async () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  await term.drawImage(
    'https://www.idlememe.com/wp-content/uploads/2021/09/crying-emoji-meme-idlememe-7-300x295.jpg',
    {
      shrink: { width: 30, height: 30 },
    }
  );
  menu.question('Esta seguro de que quiere salir? y/n: ', async (input) => {
    if (input === 'y') {
      process.exit();
    } else if (input === 'n') {
      menuPrin();
    } else {
      pregunta();
    }
  });
};
