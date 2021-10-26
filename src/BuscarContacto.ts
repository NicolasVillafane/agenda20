import readline from 'readline';
import { menuPrin } from './MenuPrincipal';
import { Contacto } from './NuevoContactoMongo';
import {
  verContactos,
  mostrarContacto,
  mandarMail,
} from './DirectorioContactos';
import { eliminarContacto } from './EliminarContacto';
import { editarContacto } from './EditarContacto';

let menu: readline.Interface;
export const buscarContacto = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  console.log('*****************');
  console.log('1 - Buscar contacto por nombre');
  console.log('2 - Buscar contacto por apellido');
  console.log('3 - Volver al menu principal');
  console.log('*****************');

  if (menu) {
    menu.close();
    menu.removeAllListeners();
  }

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  menu.question('Opcion: ', (input) => {
    switch (input) {
      case '1':
        buscarContactoNombre();
        break;
      case '2':
        buscarContactoApellido();
        break;
      case '3':
        menuPrin();
        break;
      default:
        buscarContacto();
        break;
    }
  });
};

const buscarContactoApellido = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  menu.question('Ingrese un apellido: ', async (input) => {
    const nameRegex = new RegExp(input);
    const contactos = await Contacto.find({ apellido: nameRegex });
    console.log('*****************');
    for (let i = 0; i < contactos.length; i++) {
      console.log(`${i + 1} - ${contactos[i].nombre} ${contactos[i].apellido}`);
    }
    console.log('*****************');
    console.log('');
    console.log('x - Volver al menu principal');

    menu.question('Opcion: ', (input2) => {
      if (input2 === 'x') {
        menuPrin();
      } else if (isNaN(Number(input2)) === false && input2) {
        const apell = contactos[Number(input2) - 1].apellido;
        console.log(input2);
        console.log(apell);
        mostrarContactoIndividualApellido(Number(input2), apell);
      } else {
        buscarContacto();
      }
      // switch (input2) {
      //   case 'x':
      //     menuPrin();
      //     break;
      //   default:
      //     buscarContacto();
      //     break;
      // }
    });
  });
};

const buscarContactoNombre = () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  menu.question('Ingrese un nombre: ', async (input) => {
    const nameRegex = new RegExp(input);
    const contactos = await Contacto.find({ nombre: nameRegex });

    console.log('*****************');
    for (let i = 0; i < contactos.length; i++) {
      console.log(`${i + 1} - ${contactos[i].nombre} ${contactos[i].apellido}`);
    }
    console.log('*****************');
    console.log('');
    console.log('x - Volver al menu principal');

    menu.question('Opcion: ', (input2) => {
      if (input2 === 'x') {
        menuPrin();
      } else if (isNaN(Number(input2)) === false && input2) {
        const nombr = contactos[Number(input2) - 1].nombre;
        console.log(input2);
        console.log(nombr);
        mostrarContactoIndividual(Number(input2), nombr);
      } else {
        buscarContacto();
      }
      // switch (input2) {
      //   case 'x':
      //     menuPrin();
      //     break;
      //   default:
      //     buscarContacto();
      //     break;
      // }
    });
  });
};

const mostrarContactoIndividualApellido = async (num: number, ape: any) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  const contactos = await Contacto.find({ apellido: ape });
  console.log('*****************');
  let i: number;
  for (i = num - 1; i < num; i++) {
    if (contactos[i] !== undefined) {
      console.log(`Nombre: ${contactos[i].nombre}`);
      console.log(`Apellido: ${contactos[i].apellido}`);
      console.log(`Apodo: ${contactos[i].apodo}`);
      console.log(`Email: ${contactos[i].email}`);
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
  console.log('3 - Enviar mail al contacto');
  console.log('4 - Volver a todos los contactos');
  console.log('5 - Volver al menu principal');

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
        mandarMail(contactos[i - 1].email);
        break;
      case '4':
        verContactos();
        break;
      case '5':
        menuPrin();
        break;
      default:
        mostrarContacto(num);
        break;
    }
  });
};

const mostrarContactoIndividual = async (num: number, nomb: any) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  const contactos = await Contacto.find({ nombre: nomb });
  console.log('*****************');
  let i: number;
  for (i = num - 1; i < num; i++) {
    if (contactos[i] !== undefined) {
      console.log(`Nombre: ${contactos[i].nombre}`);
      console.log(`Apellido: ${contactos[i].apellido}`);
      console.log(`Apodo: ${contactos[i].apodo}`);
      console.log(`Email: ${contactos[i].email}`);
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
  console.log('3 - Enviar mail al contacto');
  console.log('4 - Volver a todos los contactos');
  console.log('5 - Volver al menu principal');

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
        mandarMail(contactos[i - 1].email);
        break;
      case '4':
        verContactos();
        break;
      case '5':
        menuPrin();
        break;
      default:
        mostrarContacto(num);
        break;
    }
  });
};
