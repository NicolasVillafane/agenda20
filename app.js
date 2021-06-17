require('dotenv').config();
const dbUrl = process.env.DB_URL;
const mongoose = require('mongoose');
// 'mongodb://localhost/contactos'
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const ObjectId = require('mongodb').ObjectId;

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
      if (input2 == 'x') {
        menuPrin();
      } else if (isNaN(input2) == false && input2) {
        mostrarContactoLetra(input2, input);
      } else {
        verLetra();
      }
    });
  });
};

const mostrarContactoLetra = async function (num, letra) {
  process.stdout.write('\033c');
  const inputMayus = letra.toUpperCase();
  const nameRegex = new RegExp(inputMayus);
  const contactos = await Contacto.find({ nombre: nameRegex });

  console.log('*****************');
  for (let i = num - 1; i < num; i++) {
    if (contactos[i] != undefined) {
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
  console.log('1 - Editar Contacto');
  console.log('2 - Eliminar Contacto');
  console.log('3 - Volver a todos los contactos');
  console.log('4 - Volver al menu principal');

  console.log();

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  menu.question('Opcion: ', function (input) {
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
        mostrarContacto();
        break;
    }
  });
};

const verContactos = async function (num = 0, num2 = 10) {
  process.stdout.write('\033c');
  let i;
  const contactos = await Contacto.find({});
  console.log('*****************');
  for (i = num; i < num2; i++) {
    if (i >= contactos.length) {
      break;
    }
    console.log(`${i + 1} - ${contactos[i].nombre}`);
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
    } else if (isNaN(input) === false && input) {
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

  console.log(
    'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
  );
  console.log('');
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', function (chunk, key) {
    if (key.name == 'escape') {
      menuPrin();
    }
  });

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

  console.log('*****************');
  console.log('1 - Buscar contacto por nombre');
  console.log('2 - Buscar contacto por apellido');
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

const buscarContactoApellido = function () {
  process.stdout.write('\033c');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  menu.question('Ingrese un apellido: ', async function (input) {
    const contactos = await Contacto.find({ apellido: input });
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
      } else if (isNaN(input2) == false && input2) {
        mostrarContactoIndividualApellido(input2, input);
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

const buscarContactoNombre = function () {
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
      } else if (isNaN(input2) == false && input2) {
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

const mostrarContactoIndividualApellido = async function (num, ape) {
  process.stdout.write('\033c');
  const contactos = await Contacto.find({ apellido: ape });
  console.log('*****************');
  for (let i = num - 1; i < num; i++) {
    if (contactos[i] != undefined) {
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
  });

  menu.question('Opcion: ', function (input) {
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
        mostrarContacto();
        break;
    }
  });
};

const mostrarContactoIndividual = async function (num, nomb) {
  process.stdout.write('\033c');
  const contactos = await Contacto.find({ nombre: nomb });
  console.log('*****************');
  for (let i = num - 1; i < num; i++) {
    if (contactos[i] != undefined) {
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
  });

  menu.question('Opcion: ', function (input) {
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
  });

  menu.question('Opcion: ', function (input) {
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

const editarContacto = async function (id) {
  process.stdout.write('\033c');
  const contacto = await Contacto.find({ _id: ObjectId(id) });
  console.log(contacto);
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Ingrese nuevamente los datos del contacto: ');

  let nombre1, apellido1, apodo1, nacimiento1, edad1, telefono1, direccion1;

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
    await Contacto.replaceOne(
      { _id: ObjectId(id) },
      {
        nombre: nombre1,
        apellido: apellido1,
        apodo: apodo1,
        nacimiento: nacimiento1,
        edad: edad1,
        telefono: telefono1,
        direccion: direccion1,
      }
    );
    await menuPrin('>Contacto editado con exito<');
  };

  main();
};

const eliminarContacto = function (id) {
  process.stdout.write('\033c');

  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  menu.question(
    'Esta seguro de eliminar el contacto? y/n: ',
    async function (input) {
      if (input == 'y') {
        const contacto = await Contacto.find({ _id: ObjectId(id) });
        await menuPrin(
          `>Contacto "${contacto[0].nombre} ${contacto[0].apellido}" eliminado con exito<`
        );
        await Contacto.deleteOne(contacto[0]);
      } else if (input == 'n') {
        verContactos();
      } else {
        verContactos();
      }
    }
  );
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
