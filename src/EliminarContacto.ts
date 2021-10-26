import readline from 'readline';
import { verContactos } from './DirectorioContactos';
import { menuPrin } from './MenuPrincipal';
import { Contacto } from './NuevoContactoMongo';
// tslint:disable-next-line: no-var-requires
const ObjectId = require('mongodb').ObjectId;

let menu: readline.Interface;

export const eliminarContacto = (id: any) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  menu.question('Esta seguro de eliminar el contacto? y/n: ', async (input) => {
    if (input === 'y') {
      const contacto = await Contacto.find({ _id: ObjectId(id) });
      await menuPrin(
        `>Contacto "${contacto[0].nombre} ${contacto[0].apellido}" eliminado con exito<`
      );
      await Contacto.deleteOne(contacto[0]);
    } else if (input === 'n') {
      verContactos();
    } else {
      verContactos();
    }
  });
};
