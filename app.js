require('dotenv').config();
const dbUrl = process.env.DB_URL;
const mongoose = require('mongoose');
// 'mongodb://localhost/contactos'
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => handleError(error));
const ObjectId = require('mongodb').ObjectId;

const Contacto = require('./nuevocontacto');
const datos = require('./package.json');
let readline = require('readline'),
  menu;

let nombre1, apellido1, apodo1, diaN, mesN, añoN, telefono1, direccion1;

let nombresFreno = [];

const handleError = function (error) {
  console.log(`ERROR FATAL CUIDADO EVACUE DE INMEDIATO LA ZONA: ${error}`);
};

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
        process.stdout.write('\033c');
        console.log('chau');
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
    const contactos = await Contacto.find({}).sort({ nombre: 1 });
    for (let i = 0; i < contactos.length; i++) {
      if (contactos[i].nombre.indexOf(inputMayus) == 0) {
        nombresFreno.push(contactos[i].nombre);
      }
    }

    // verContactos(,contactos.length);
    console.log(nombresFreno);
    verContactos();
    console.log('fin');
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
  const contactos = await Contacto.find({}).sort({ nombre: 1 });

  console.clear();

  console.log('*****************');

  if (nombresFreno[0] == undefined) {
    for (i = num; i < num2; i++) {
      if (i >= contactos.length) {
        break;
      }
      console.log(`${i + 1} - ${contactos[i].nombre}`);
    }
  } else {
    let arr = [];
    for (i = num; i < num2; i++) {
      if (i >= contactos.length) {
        break;
      }
      arr.push(contactos[i].nombre);
      console.log(`${i + 1} - ${contactos[i].nombre}`);
    }
    if (arr.includes(nombresFreno[0]) == true) {
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
  });

  menu.question('Opcion: ', function (input) {
    if (input == 's') {
      if (num2 >= contactos.length) {
        return verContactos();
      }
      nombresFreno = [];
      verContactos(num + 10, num2 + 10);
    } else if (input == 'a') {
      if (num === 0 && num2 === 10) {
        return verContactos();
      }
      nombresFreno = [];
      verContactos(num - 10, num2 - 10);
    } else if (input == 'x') {
      nombresFreno = [];
      menuPrin();
    } else if (isNaN(input) === false && input) {
      nombresFreno = [];
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

  let fechaHoy = new Date();
  let dd = String(fechaHoy.getDate()).padStart(2, '0');
  let mm = String(fechaHoy.getMonth() + 1).padStart(2, '0');
  let yyyy = fechaHoy.getFullYear();

  fechaHoy = `${dd}/${mm}/${yyyy}`;

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

  // if (isNaN(input) == false || res == false || input.length > 15 || !input) {
  //   nombre();
  // }

  const nombre = () => {
    return new Promise((resolve, reject) => {
      menu.question('Nombre: ', (input) => {
        let res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(input) == true &&
          res == true
        ) {
          nombre1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
          );
          console.log('');
          main();
        }
      });
    });
  };
  const apellido = () => {
    return new Promise((resolve, reject) => {
      menu.question('Apellido: ', (input) => {
        let res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(input) == true &&
          res == true
        ) {
          apellido1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          main('2');
        }
      });
    });
  };
  const apodo = () => {
    return new Promise((resolve, reject) => {
      menu.question('Apodo: ', (input) => {
        let res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(input) == true &&
          res == true
        ) {
          apodo1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          main('3');
        }
      });
    });
  };
  const diaNacimiento = () => {
    return new Promise((resolve, reject) => {
      menu.question('Dia de nacimiento: ', (input) => {
        if (isNaN(input) == false && input <= 31 && input) {
          diaN = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          main('4');
        }
      });
    });
  };
  const mesNacimiento = () => {
    return new Promise((resolve, reject) => {
      menu.question('Mes de nacimiento: ', (input) => {
        if (isNaN(input) == false && input <= 12 && input) {
          mesN = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          main('5');
        }
      });
    });
  };
  const añoNacimiento = () => {
    return new Promise((resolve, reject) => {
      menu.question('Año de nacimiento: ', (input) => {
        if (isNaN(input) == false && input < yyyy && input) {
          añoN = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          console.log(`Mes de nacimiento: ${mesN}`);
          main('6');
        }
      });
    });
  };

  const telefono = () => {
    return new Promise((resolve, reject) => {
      menu.question('Telefono (8 digitos): ', (input) => {
        if (isNaN(input) == false && input && input.length == 8) {
          telefono1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          console.log(`Mes de nacimiento: ${mesN}`);
          console.log(`Año de nacimiento: ${añoN}`);
          main('7');
        }
      });
    });
  };
  const direccion = () => {
    return new Promise((resolve, reject) => {
      menu.question('Direccion: ', (input) => {
        if (isNaN(input) == true && input && input.length <= 30) {
          direccion1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese los datos del nuevo contacto o presione esc para volver al menu: '
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          console.log(`Mes de nacimiento: ${mesN}`);
          console.log(`Año de nacimiento: ${añoN}`);
          console.log(`Telefono (8 digitos): ${telefono1}`);
          main('8');
        }
      });
    });
  };
  let edadActual;
  const calcularEdad = function () {
    edadActual = yyyy - añoN;
    if (mm <= mesN || dd < diaN) {
      edadActual - 1;
    }
    edadActual;
  };

  const main = async (input) => {
    switch (input) {
      case '1':
        await nombre();
        break;
      case '2':
        await apellido();
        break;
      case '3':
        await apodo();
        break;
      case '4':
        await diaNacimiento();
        break;
      case '5':
        await mesNacimiento();
        break;
      case '6':
        await añoNacimiento();
        break;
      case '7':
        await telefono();
        break;
      case '8':
        direccion();
        break;
      default:
        main('1');
        break;
    }

    if (!nombre1) {
      await nombre();
    }
    if (!apellido1) {
      await apellido();
    }
    if (!apodo1) {
      await apodo();
    }
    if (!diaN) {
      await diaNacimiento();
    }
    if (!mesN) {
      await mesNacimiento();
    }
    if (!añoN) {
      await añoNacimiento();
    }
    if (!telefono1) {
      await telefono();
    }
    if (!direccion1) {
      await direccion();
    }

    await calcularEdad();

    await new Contacto({
      nombre: nombre1,
      apellido: apellido1,
      apodo: apodo1,
      nacimiento: `${diaN}/${mesN}/${añoN}`,
      edad: edadActual,
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
    const nameRegex = new RegExp(input);
    const contactos = await Contacto.find({ apellido: nameRegex });
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
        const apell = contactos[input2 - 1].apellido;
        console.log(input2);
        console.log(apell);
        mostrarContactoIndividualApellido(input2, apell);
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
    const nameRegex = new RegExp(input);
    const contactos = await Contacto.find({ nombre: nameRegex });

    console.log('*****************');
    for (i = 0; i < contactos.length; i++) {
      console.log(`${i + 1} - ${contactos[i].nombre} ${contactos[i].apellido}`);
    }
    console.log('*****************');
    console.log('');
    console.log(i);
    console.log('x - Volver al menu principal');

    menu.question('Opcion: ', function (input2) {
      if (input2 == 'x') {
        menuPrin();
      } else if (isNaN(input2) == false && input2) {
        const nombr = contactos[input2 - 1].nombre;
        console.log(input2);
        console.log(nombr);
        mostrarContactoIndividual(input2, nombr);
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
  const contactos = await Contacto.find({}).sort({ nombre: 1 });
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
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let fechaHoy = new Date();
  let dd = String(fechaHoy.getDate()).padStart(2, '0');
  let mm = String(fechaHoy.getMonth() + 1).padStart(2, '0');
  let yyyy = fechaHoy.getFullYear();

  fechaHoy = `${dd}/${mm}/${yyyy}`;

  console.log(
    'Ingrese nuevamente los datos del contacto o presione esc para salir'
  );
  console.log('');
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', function (chunk, key) {
    if (key.name == 'escape') {
      menuPrin();
    }
  });

  // if (isNaN(input) == false || res == false || input.length > 15 || !input) {
  //   nombre();
  // }

  const nombre = () => {
    return new Promise((resolve, reject) => {
      menu.question('Nombre: ', (input) => {
        let res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(input) == true &&
          res == true
        ) {
          nombre1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          main();
        }
      });
      process.stdout.write(`${contacto[0].nombre}`);
    });
  };
  const apellido = () => {
    return new Promise((resolve, reject) => {
      menu.question('Apellido: ', (input) => {
        let res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(input) == true &&
          res == true
        ) {
          apellido1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          main('2');
        }
      });
      process.stdout.write(`${contacto[0].apellido}`);
    });
  };
  const apodo = () => {
    return new Promise((resolve, reject) => {
      menu.question('Apodo: ', (input) => {
        let res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(input) == true &&
          res == true
        ) {
          apodo1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          main('3');
        }
      });
      process.stdout.write(`${contacto[0].apodo}`);
    });
  };
  const diaNacimiento = () => {
    return new Promise((resolve, reject) => {
      menu.question('Dia de nacimiento: ', (input) => {
        if (isNaN(input) == false && input <= 31 && input) {
          diaN = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          main('4');
        }
      });
    });
  };
  const mesNacimiento = () => {
    return new Promise((resolve, reject) => {
      menu.question('Mes de nacimiento: ', (input) => {
        if (isNaN(input) == false && input <= 12 && input) {
          mesN = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          main('5');
        }
      });
    });
  };
  const añoNacimiento = () => {
    return new Promise((resolve, reject) => {
      menu.question('Año de nacimiento: ', (input) => {
        if (isNaN(input) == false && input < yyyy && input) {
          añoN = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          console.log(`Mes de nacimiento: ${mesN}`);
          main('6');
        }
      });
    });
  };

  const telefono = () => {
    return new Promise((resolve, reject) => {
      menu.question('Telefono (8 digitos): ', (input) => {
        if (isNaN(input) == false && input && input.length == 8) {
          telefono1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          console.log(`Mes de nacimiento: ${mesN}`);
          console.log(`Año de nacimiento: ${añoN}`);
          main('7');
        }
      });
      process.stdout.write(`${contacto[0].telefono}`);
    });
  };
  const direccion = () => {
    return new Promise((resolve, reject) => {
      menu.question('Direccion: ', (input) => {
        if (isNaN(input) == true && input && input.length <= 30) {
          direccion1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          console.log(`Nombre: ${nombre1}`);
          console.log(`Apellido: ${apellido1}`);
          console.log(`Apodo: ${apodo1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          console.log(`Mes de nacimiento: ${mesN}`);
          console.log(`Año de nacimiento: ${añoN}`);
          console.log(`Telefono (8 digitos): ${telefono1}`);
          main('8');
        }
      });
      process.stdout.write(`${contacto[0].direccion}`);
    });
  };
  let edadActual;
  const calcularEdad = function () {
    edadActual = yyyy - añoN;
    if (mm <= mesN || dd < diaN) {
      edadActual - 1;
    }
    edadActual;
  };

  const main = async (input) => {
    switch (input) {
      case '1':
        await nombre();
        break;
      case '2':
        await apellido();
        break;
      case '3':
        await apodo();
        break;
      case '4':
        await diaNacimiento();
        break;
      case '5':
        await mesNacimiento();
        break;
      case '6':
        await añoNacimiento();
        break;
      case '7':
        await telefono();
        break;
      case '8':
        direccion();
        break;
      default:
        main('1');
        break;
    }

    if (!nombre1) {
      await nombre();
    }
    if (!apellido1) {
      await apellido();
    }
    if (!apodo1) {
      await apodo();
    }
    if (!diaN) {
      await diaNacimiento();
    }
    if (!mesN) {
      await mesNacimiento();
    }
    if (!añoN) {
      await añoNacimiento();
    }
    if (!telefono1) {
      await telefono();
    }
    if (!direccion1) {
      await direccion();
    }

    await calcularEdad();

    await Contacto.replaceOne(
      { _id: ObjectId(id) },
      {
        nombre: nombre1,
        apellido: apellido1,
        apodo: apodo1,
        nacimiento: `${diaN}/${mesN}/${añoN}`,
        edad: edadActual,
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
