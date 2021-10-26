import readline from 'readline';
import { verContactos } from './DirectorioContactos';
import { menuPrin } from './MenuPrincipal';
import { Contacto } from './NuevoContactoMongo';
// tslint:disable-next-line: no-var-requires
const ObjectId = require('mongodb').ObjectId;

let menu: readline.Interface;

// tslint:disable-next-line: one-variable-per-declaration
let nombre1: string,
  apellido1: string,
  apodo1: string,
  email1: string,
  diaN: string,
  mesN: string,
  añoN: string,
  telefono1: string,
  direccion1: string;

export const editarContacto = async (id: any) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  const contacto = await Contacto.find({ _id: ObjectId(id) });
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let fechaHoy: Date | string = new Date();
  const dd = String(fechaHoy.getDate()).padStart(2, '0');
  const mm = String(fechaHoy.getMonth() + 1).padStart(2, '0');
  const yyyy = fechaHoy.getFullYear();

  fechaHoy = `${dd}/${mm}/${yyyy}`;

  console.log(
    'Ingrese nuevamente los datos del contacto o presione esc para salir'
  );
  console.log('');
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (chunk, key) => {
    if (key.name === 'escape') {
      menu.close();
      verContactos();
    }
  });

  // if (isNaN(input) == false || res == false || input.length > 15 || !input) {
  //   nombre();
  // }

  const nombre = () => {
    return new Promise<void>((resolve, reject) => {
      menu.question('Nombre: ', (input) => {
        const res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(Number(input)) === true &&
          res === true
        ) {
          nombre1 = input;
          resolve();
        } else {
          console.clear();
          console.log(
            'Ingrese nuevamente los datos del contacto o presione esc para salir'
          );
          console.log('');
          main('1');
        }
      });
      process.stdout.write(`${contacto[0].nombre}`);
    });
  };
  const apellido = () => {
    return new Promise<void>((resolve, reject) => {
      menu.question('Apellido: ', (input) => {
        const res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(Number(input)) === true &&
          res === true
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
    return new Promise<void>((resolve, reject) => {
      menu.question('Apodo: ', (input) => {
        const res = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(input);
        if (
          input.length <= 15 &&
          input &&
          isNaN(Number(input)) === true &&
          res === true
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
  const email = () => {
    return new Promise<void>((resolve, reject) => {
      menu.question('Email: ', (input) => {
        const res = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(input);
        if (
          input.length <= 30 &&
          input &&
          isNaN(Number(input)) === true &&
          res === true &&
          input.includes('@') === true &&
          input.includes('.') === true
        ) {
          email1 = input;
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
  const diaNacimiento = () => {
    return new Promise<void>((resolve, reject) => {
      menu.question('Dia de nacimiento: ', (input) => {
        if (isNaN(Number(input)) === false && Number(input) <= 31 && input) {
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
          console.log(`Email: ${email1}`);
          main('4');
        }
      });
    });
  };
  const mesNacimiento = () => {
    return new Promise<void>((resolve, reject) => {
      menu.question('Mes de nacimiento: ', (input) => {
        if (isNaN(Number(input)) === false && Number(input) <= 12 && input) {
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
          console.log(`Email: ${email1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          main('5');
        }
      });
    });
  };
  const añoNacimiento = () => {
    return new Promise<void>((resolve, reject) => {
      menu.question('Año de nacimiento: ', (input) => {
        if (isNaN(Number(input)) === false && Number(input) < yyyy && input) {
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
          console.log(`Email: ${email1}`);
          console.log(`Dia de nacimiento: ${diaN}`);
          console.log(`Mes de nacimiento: ${mesN}`);
          main('6');
        }
      });
    });
  };

  const telefono = () => {
    return new Promise<void>((resolve, reject) => {
      menu.question('Telefono (8 digitos): ', (input) => {
        if (isNaN(Number(input)) === false && input && input.length === 8) {
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
          console.log(`Email: ${email1}`);
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
    return new Promise<void>((resolve, reject) => {
      menu.question('Direccion: ', (input) => {
        if (isNaN(Number(input)) === true && input && input.length <= 30) {
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
          console.log(`Email: ${email1}`);
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
  let edadActual: number;
  const calcularEdad = () => {
    edadActual = yyyy - Number(añoN);
    if (mm <= mesN || dd < diaN) {
      edadActual -= 1;
    }
  };

  const main = async (input: string | undefined) => {
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
        await email();
        break;
      case '5':
        await diaNacimiento();
        break;
      case '6':
        await mesNacimiento();
        break;
      case '7':
        await añoNacimiento();
        break;
      case '8':
        await telefono();
        break;
      case '9':
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
    if (!email1) {
      await email();
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
        email: email1,
        nacimiento: `${diaN}/${mesN}/${añoN}`,
        edad: edadActual,
        telefono: telefono1,
        direccion: direccion1,
      }
    );
    await menuPrin('>Contacto editado con exito<');
  };

  main('1');
};
