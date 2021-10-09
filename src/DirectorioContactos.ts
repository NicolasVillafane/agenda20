const dbUrl: string =
  'mongodb+srv://nivi1023:RC7LzwJeemUjcGM1@cluster0.t7iki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
import mongoose from 'mongoose';
// 'mongodb://localhost/contactos'
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => handleError(error));

import readline from 'readline';
import { menuPrin } from './MenuPrincipal';

import { Contacto } from './NuevoContactoMongo';
import { editarContacto } from './EditarContacto';
import { eliminarContacto } from './EliminarContacto';

let nombresFreno: number[] = [];
let menu: readline.Interface;
export const menuDirectorio = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  console.log('*****************');
  console.log('Directorio de contactos');
  console.log('');
  console.log('1 - Ver todos los contactos');
  console.log('2 - Ver una letra');
  console.log('3 - Volver al menu principal');

  console.log('*****************');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  menu.question('Opcion: ', (input) => {
    switch (input) {
      case '1':
        verContactos();
        break;
      case '2':
        verLetra();
        break;
      case '3':
        menuPrin();
        break;
      default:
        menuDirectorio();
    }
  });
};

export const verContactos = async (num = 0, num2 = 10) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  let i;
  const contactos = await Contacto.find({}).sort({ nombre: 1 });

  console.clear();

  console.log('*****************');

  if (nombresFreno[0] === undefined) {
    for (i = num; i < num2; i++) {
      if (i >= contactos.length) {
        break;
      }
      console.log(`${i + 1} - ${contactos[i].nombre}`);
    }
  } else {
    const arr = [];
    for (i = num; i < num2; i++) {
      if (i >= contactos.length) {
        break;
      }
      arr.push(contactos[i].nombre);
      console.log(`${i + 1} - ${contactos[i].nombre}`);
    }
    if (arr.includes(nombresFreno[0]) === true) {
      nombresFreno = [];
    } else {
      console.clear();
      verContactos(num + 10, num2 + 10);
    }
  }

  console.log('*****************');
  console.log('');
  console.log(`${i}/${contactos.length}`);
  console.log('');
  console.log('s - Siguiente');
  console.log('a - Anterior');
  console.log('x - Volver al menu principal');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  menu.question('Opcion: ', (input) => {
    if (input === 's') {
      if (num2 >= contactos.length) {
        return verContactos();
      }
      nombresFreno = [];
      verContactos(num + 10, num2 + 10);
    } else if (input === 'a') {
      if (num === 0 && num2 === 10) {
        return verContactos();
      }
      nombresFreno = [];
      verContactos(num - 10, num2 - 10);
    } else if (input === 'x') {
      nombresFreno = [];
      menuPrin();
    } else if (isNaN(Number(input)) === false && input) {
      nombresFreno = [];
      mostrarContacto(Number(input));
    } else {
      verContactos();
    }
  });
};

const verLetra = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  menu.question('Ingrese la primera : ', async (input) => {
    const inputMayus = input.toUpperCase();
    const nameRegex = new RegExp(inputMayus);
    const contactos = await Contacto.find({}).sort({ nombre: 1 });
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < contactos.length; i++) {
      if (contactos[i].nombre.indexOf(inputMayus) === 0) {
        nombresFreno.push(contactos[i].nombre);
      }
    }

    // verContactos(,contactos.length);
    console.log(nombresFreno);
    verContactos();
    console.log('fin');
  });
};

const mostrarContacto = async (num: number) => {
  let i: number;
  process.stdout.write('\u001B[2J\u001B[0;0f');
  const contactos = await Contacto.find({}).sort({ nombre: 1 });
  console.log('*****************');
  for (i = num - 1; i < num; i++) {
    if (contactos[i] !== undefined) {
      console.log(`Nombre: ${contactos[i].nombre}`);
      console.log(`Apellido: ${contactos[i].apellido}`);
      console.log(`Apodo: ${contactos[i].apodo}`);
      console.log(`Año de Nacimiento: ${contactos[i].nacimiento}`);
      console.log(`Edad: ${contactos[i].edad}`);
      console.log(`Telefono: ${contactos[i].telefono}`);
      console.log(`Direccion: ${contactos[i].direccion}`);
    } else {
      return verContactos();
    }
  }
  console.log('*****************');
  console.log('');
  console.log('1 - Editar contacto');
  console.log('2 - Eliminar contacto');
  console.log('3 - Volver a todos los contactos');
  console.log('4 - Volver al menu principal');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  menu.question('Opcion: ', (input) => {
    switch (input) {
      case '1':
        editarContacto(contactos[i - 1]._id);
        break;
      case '2':
        eliminarContacto(contactos[i - 1]._id);
        break;
      case '3':
        verContactos();
        break;
      case '4':
        menuPrin();
        break;
      default:
        mostrarContacto(num);
        break;
    }
  });
};

function handleError(error: any): any {
  throw new Error('Function not implemented.');
}
