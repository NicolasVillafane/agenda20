const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Contacto = require('./nuevocontacto');
const datos = require('./package.json');
let readline = require('readline'),
  menu;

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

const verContactos2 = async (num = 0, num2 = 10) => {
  process.stdout.write('\033c');
  const contactos = await Contacto.find({});

  console.log('*****************');
  for (let i = num; i < num2; i++) {
    console.log(`${i + 1} - ${contactos[i].nombre}`);
  }
  console.log('*****************');
  console.log('');
  console.log('');
  console.log('s - Siguiente');
  console.log('a - Anterior');
  console.log('x - Volver al menu principal');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const verContactos = async function (num = 0, num2 = 10) {
  process.stdout.write('\033c');
  const contactos = await Contacto.find({});
  console.log(contactos.length);
  console.log('*****************');
  for (let i = num; i < num2; i++) {
    if (i >= contactos.length) {
      break;
    }
    console.log(`${i + 1} - ${contactos[i].nombre}`);
  }
  console.log('*****************');
  console.log('');
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

  let nombre1, apellido1, apodo1, nacimiento1, edad1, telefono1, direccion1;

  console.log('Ingrese los datos del nuevo contacto: ');

  const nombre = () => {
    return new Promise((resolve, reject) => {
      menu.question('Nombre: ', (input) => {
        nombre1 = input;
        resolve();
      });
    });
  };
  const apellido = () => {
    return new Promise((resolve, reject) => {
      menu.question('Apellido: ', (input) => {
        apellido1 = input;
        resolve();
      });
    });
  };
  const apodo = () => {
    return new Promise((resolve, reject) => {
      menu.question('Apodo: ', (input) => {
        apodo1 = input;
        resolve();
      });
    });
  };
  const nacimiento = () => {
    return new Promise((resolve, reject) => {
      menu.question('Nacimiento: ', (input) => {
        nacimiento1 = input;
        resolve();
      });
    });
  };
  const edad = () => {
    return new Promise((resolve, reject) => {
      menu.question('Edad: ', (input) => {
        edad1 = input;
        resolve();
      });
    });
  };
  const telefono = () => {
    return new Promise((resolve, reject) => {
      menu.question('Telefono: ', (input) => {
        telefono1 = input;
        resolve();
      });
    });
  };
  const direccion = () => {
    return new Promise((resolve, reject) => {
      menu.question('Direccion: ', (input) => {
        direccion1 = input;
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
    await new Contacto({
      nombre: nombre1,
      apellido: apellido1,
      apodo: apodo1,
      nacimiento: nacimiento1,
      edad: edad1,
      telefono: telefono1,
      direccion: direccion1,
    }).save();
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

module.exports = Contacto;
