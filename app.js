const nuevoC = require('./nuevocontacto');
const datos = require('./package.json');
let readline = require('readline'),
  menu;

const contactos = require('./contactos');
const { resolve } = require('path');

const menuPrin = function (mensaje = '') {
  process.stdout.write('\033c');

  console.log('*****************');
  console.log('Bienvenido a la contactera');
  console.log('');
  console.log('Ingrese una opcion:');
  console.log('');
  console.log('1 - Directorio de contactos');
  console.log('2 - Nuevo contacto');
  console.log('3 - Buscar contacto');
  console.log('4 - Acerca de');
  console.log('5 / Ctrl + C - Salir');
  console.log('');
  console.log('*****************');
  console.log('');
  console.log(mensaje);
  console.log('');
  console.log(contactos.length);
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  menu.question('Opcion: ', function (input) {
    switch (input) {
      case '1':
        menuDirectorio();
        break;
      case '2':
        nuevoContacto();
        break;
      case '3':
        console.log('buscar contacto aqui');
        break;
      case '4':
        acercaDe();
        break;
      case '5':
        process.exit();
        break;
      default:
        menuPrin();
    }
  });
};

const menuDirectorio = function () {
  process.stdout.write('\033c');

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
  });

  menu.question('Opcion: ', function (input) {
    switch (input) {
      case '1':
        verContactos();
        break;
      case '2':
        console.log('ver una letra aqui');
        break;
      case '3':
        menuPrin();
        break;
      default:
        menuDirectorio();
    }
  });
};

const verContactos = function (num = 0, num2 = 10) {
  process.stdout.write('\033c');

  console.log('*****************');
  loopContactos(num, num2);
  console.log('*****************');
  console.log('');
  console.log(`${num2}/${contactos.length}`);
  console.log('');
  console.log('s - Siguiente');
  console.log('a - Anterior');
  console.log('x - Volver al menu principal');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  menu.question('Opcion: ', function (input) {
    switch (input) {
      case 's':
        if (num2 >= contactos.length) {
          return verContactos();
        }
        verContactos(num + 10, num2 + 10);
        break;
      case 'a':
        if (num === 0 && num2 === 10) {
          return verContactos();
        }
        verContactos(num - 10, num2 - 10);
        break;
      case 'x':
        menuPrin();
        break;
      default:
        verContactos();
    }
  });
};

const loopContactos = function (num, num2) {
  for (let i = num; i < num2; i++) {
    if (i >= contactos.length) {
      break;
    }
    console.log(`${i + 1} - ${contactos[i].nombre}`);
  }
};

const nuevoContacto = function () {
  process.stdout.write('\033c');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Ingrese los datos del nuevo contacto: ');

  const nombre = () => {
    return new Promise((resolve, reject) => {
      menu.question('Nombre: ', (input) => {
        nuevoC.nombre = input;
        resolve();
      });
    });
  };
  const apellido = () => {
    return new Promise((resolve, reject) => {
      menu.question('Apellido: ', (input) => {
        nuevoC.apellido = input;
        resolve();
      });
    });
  };
  const apodo = () => {
    return new Promise((resolve, reject) => {
      menu.question('Apodo: ', (input) => {
        nuevoC.apodo = input;
        resolve();
      });
    });
  };
  const nacimiento = () => {
    return new Promise((resolve, reject) => {
      menu.question('Nacimiento: ', (input) => {
        nuevoC.nacimiento = input;
        resolve();
      });
    });
  };
  const edad = () => {
    return new Promise((resolve, reject) => {
      menu.question('Edad: ', (input) => {
        nuevoC.edad = input;
        resolve();
      });
    });
  };
  const telefono = () => {
    return new Promise((resolve, reject) => {
      menu.question('Telefono: ', (input) => {
        nuevoC.telefono = input;
        resolve();
      });
    });
  };
  const direccion = () => {
    return new Promise((resolve, reject) => {
      menu.question('Direccion: ', (input) => {
        nuevoC.direccion = input;
        resolve();
      });
    });
  };

  const main = async () => {
    await nombre();
    await apellido();
    await apodo();
    await nacimiento();
    await edad();
    await telefono();
    await direccion();
    await contactos.push(nuevoC);
    await menuPrin('>Contacto guardado con exito<');
  };

  main();
};

const acercaDe = function () {
  process.stdout.write('\033c');

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

  menu.question('Opcion: ', function (input) {
    input == 1 ? menuPrin() : acercaDe();
  });
};

menuPrin();
