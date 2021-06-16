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
        buscarContacto();
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

const verLetra = function () {
  process.stdout.write('\033c');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  menu.question('Ingrese la primera : ', async function (input) {
    const inputMayus = input.toUpperCase();
    const nameRegex = new RegExp(inputMayus);
    const contactos = await Contacto.find({ nombre: nameRegex });
    console.log('*****************');
    for (i = 0; i < contactos.length; i++) {
      console.log(`${i + 1} - ${contactos[i].nombre} ${contactos[i].apellido}`);
    }
    console.log('*****************');
    console.log('');
    console.log('x - Volver al menu principal');

    menu.question('Opcion: ', function (input2) {
      const nombre = contactos[input2 - 1].nombre;
      if (input2 == 'x') {
        menuPrin();
      } else if (isNaN(input2) == false) {
        mostrarContactoIndividual(input2, nombre);
      } else {
        verLetra();
      }
    });
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
    if (input == 's') {
      if (num2 >= contactos.length) {
        return verContactos();
      }
      verContactos(num + 10, num2 + 10);
    } else if (input == 'a') {
      if (num === 0 && num2 === 10) {
        return verContactos();
      }
      verContactos(num - 10, num2 - 10);
    } else if (input == 'x') {
      menuPrin();
    } else if (isNaN(input) === false) {
      mostrarContacto(input);
    } else {
      verContactos();
    }
  });
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
      menu.question('Año de nacimiento: ', (input) => {
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

const buscarContacto = function () {
  process.stdout.write('\033c');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  menu.question('Ingrese un nombre: ', async function (input) {
    const contactos = await Contacto.find({ nombre: input });
    console.log('*****************');
    for (i = 0; i < contactos.length; i++) {
      console.log(`${i + 1} - ${contactos[i].nombre} ${contactos[i].apellido}`);
    }
    console.log('*****************');
    console.log('');
    console.log('x - Volver al menu principal');

    menu.question('Opcion: ', function (input2) {
      if (input2 == 'x') {
        menuPrin();
      } else if (isNaN(input2) == false) {
        mostrarContactoIndividual(input2, input);
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
const mostrarContactoIndividual = async function (num, nomb) {
  process.stdout.write('\033c');
  const contactos = await Contacto.find({ nombre: nomb });
  console.log('*****************');
  for (i = num - 1; i < num; i++) {
    if (contactos[i] != undefined) {
      console.log(`Nombre: ${contactos[i].nombre}`);
      console.log(`Apellido: ${contactos[i].apellido}`);
      console.log(`Apodo: ${contactos[i].apodo}`);
      console.log(`Año de Nacimiento: ${contactos[i].nacimiento}`);
      console.log(`Edad: ${contactos[i].edad}`);
      console.log(`Telefono: ${contactos[i].telefono}`);
      console.log(`Direccion: ${contactos[i].direccion}`);
    } else {
      console.log('contacto no encontrado');
    }
  }
  console.log('*****************');
  console.log('');
  console.log('1 - Volver a todos los contactos');
  console.log('2 - Volver al menu principal');

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
        menuPrin();
        break;
      default:
        mostrarContacto();
        break;
    }
  });
};

const mostrarContacto = async function (num, nomb) {
  process.stdout.write('\033c');
  const contactos = await Contacto.find({});
  console.log('*****************');
  for (i = num - 1; i < num; i++) {
    if (contactos[i] != undefined) {
      console.log(`Nombre: ${contactos[i].nombre}`);
      console.log(`Apellido: ${contactos[i].apellido}`);
      console.log(`Apodo: ${contactos[i].apodo}`);
      console.log(`Año de Nacimiento: ${contactos[i].nacimiento}`);
      console.log(`Edad: ${contactos[i].edad}`);
      console.log(`Telefono: ${contactos[i].telefono}`);
      console.log(`Direccion: ${contactos[i].direccion}`);
    } else {
      console.log('contacto no encontrado');
    }
  }
  console.log('*****************');
  console.log('');
  console.log('1 - Volver a todos los contactos');
  console.log('2 - Volver al menu principal');

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
        menuPrin();
        break;
      default:
        mostrarContacto(num);
        break;
    }
  });
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
