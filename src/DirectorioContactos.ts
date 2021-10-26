import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
const dbUrl = process.env.DB_URL!;
import mongoose from 'mongoose';
// tslint:disable-next-line: no-var-requires
const term = require('terminal-kit').terminal;
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
import nodemailer from 'nodemailer';
import xlsx from 'xlsx';
import fs from 'fs';
import { execSync } from 'child_process';
import { verify } from 'crypto';
import { Console } from 'console';

const mail = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'agendacontactera@gmail.com',
    pass: process.env.MAIL_PASS!,
  },
});

// tslint:disable-next-line: no-var-requires
const xl = require('excel4node');

// Create a new instance of a Workbook class
const wb = new xl.Workbook();

// Add Worksheets to the workbook
const ws = wb.addWorksheet('Sheet 1');
const ws2 = wb.addWorksheet('Sheet 2');

// Create a reusable style
const style = wb.createStyle({
  font: {
    color: '#040404',
    size: 12,
  },
});

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
  console.log('4 - Exportar contactos');
  console.log('5 - Importar contactos');

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
      case '4':
        hojaExcel();
        break;
      case '5':
        importarContacto();
        break;
      default:
        menuDirectorio();
    }
  });
};

// tslint:disable-next-line: no-shadowed-variable
export const mandarMail = (mail: string) => {
  execSync(`xdg-email "mailto:${mail}"`);
  verContactos();
};

const importarContacto = async () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  if (menu) {
    menu.close();
    menu.removeAllListeners();
  }

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  console.log(
    'Ingrese la localizacion del archivo de importacion, o presione esc para volver'
  );
  console.log('ej: "/home/user/Documents/importar.xlsx"');
  console.log('');

  console.log('');
  process.stdin.on('keypress', (chunk, key) => {
    if (key.name === 'escape') {
      menuDirectorio();
    }
  });
  menu.question('Localizacion: ', async (input) => {
    try {
      const path = input;
      const workbook = xlsx.readFile(path);
      const workbookSheets = workbook.SheetNames;
      const sheet = workbookSheets[0];
      const dataExcel: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < dataExcel.length; i++) {
        const nombre1: string = dataExcel[i].Nombre;
        const apellido1: string = dataExcel[i].Apellido;
        const apodo1: string = dataExcel[i].Apodo;
        const diaN: number = dataExcel[i].Dia;
        const mesN: number = dataExcel[i].Mes;
        const añoN: number = dataExcel[i].Año;
        const telefono1: number = dataExcel[i].Telefono;
        const direccion1: string = dataExcel[i].Direccion;
        const email1: string = dataExcel[i].Email;

        const fechaHoy: Date | string = new Date();
        const dd = String(fechaHoy.getDate()).padStart(2, '0');
        const mm = String(fechaHoy.getMonth() + 1).padStart(2, '0');
        const yyyy = fechaHoy.getFullYear();

        const val1 = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(nombre1);
        const val2 = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(apellido1);
        const val3 = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/.test(apodo1);

        if (
          nombre1.length <= 15 &&
          nombre1 &&
          isNaN(Number(nombre1)) === true &&
          val1 === true &&
          apellido1.length <= 15 &&
          apellido1 &&
          isNaN(Number(apellido1)) === true &&
          val2 === true &&
          apodo1.length <= 15 &&
          apodo1 &&
          isNaN(Number(apodo1)) === true &&
          val3 === true &&
          isNaN(diaN) === false &&
          diaN <= 31 &&
          diaN &&
          isNaN(mesN) === false &&
          mesN <= 12 &&
          mesN &&
          isNaN(añoN) === false &&
          añoN < yyyy &&
          añoN &&
          isNaN(telefono1) === false &&
          telefono1 &&
          telefono1.toString().length === 8 &&
          isNaN(Number(direccion1)) === true &&
          direccion1 &&
          direccion1.length <= 30 &&
          email1 &&
          email1.includes('@') &&
          email1.includes('.')
        ) {
          let edadActual = yyyy - Number(añoN);
          const calcularEdad = () => {
            if (Number(mm) <= mesN || Number(dd) < diaN) {
              edadActual -= 1;
            }
          };
          await calcularEdad();

          await new Contacto({
            nombre: nombre1,
            apellido: apellido1,
            apodo: apodo1,
            email: email1,
            nacimiento: `${diaN}/${mesN}/${añoN}`,
            edad: edadActual,
            telefono: telefono1,
            direccion: direccion1,
          }).save();

          await menuPrin('>Contacto guardado con exito<');
        } else {
          menuPrin('>Datos invalidos<');
        }
      }
      fs.unlinkSync(input);
    } catch (err) {
      importarContacto();
    }
  });
};

const hojaExcel = async () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let inputMail;
  process.stdin.on('keypress', (chunk, key) => {
    if (key.name === 'escape') {
      menu.close();
      menuDirectorio();
    }
  });
  menu.question('Ingrese su direccion mail: ', async (input) => {
    if (input && input.includes('@') === true && input.includes('.') === true) {
      inputMail = input;
      ws.cell(1, 1).string('Nombre').style(style);
      ws.cell(1, 2).string('Apellido').style(style);
      ws.cell(1, 3).string('Apodo').style(style);
      ws.cell(1, 4).string('Nacimiento').style(style);
      ws.cell(1, 5).string('Telefono').style(style);
      ws.cell(1, 6).string('Direccion').style(style);
      ws.cell(1, 7).string('Email').style(style);

      const contactos = await Contacto.find({}).sort({ nombre: 1 });
      let colNum = 2;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < contactos.length; i++) {
        await ws.cell(colNum, 1).string(contactos[i].nombre).style(style);
        await ws.cell(colNum, 2).string(contactos[i].apellido).style(style);
        await ws.cell(colNum, 3).string(contactos[i].apodo).style(style);
        await ws.cell(colNum, 4).string(contactos[i].nacimiento).style(style);
        await ws.cell(colNum, 5).number(contactos[i].telefono).style(style);
        await ws.cell(colNum, 6).string(contactos[i].direccion).style(style);
        await ws.cell(colNum, 7).string(contactos[i].email).style(style);
        colNum += 1;
      }

      await wb.write(__dirname + '/contactos.xlsx');
      const mailOptions = {
        from: 'agendacontactera@gmail.com',
        to: inputMail,
        subject: 'Contactos exportados',
        text: '',
        attachments: [
          {
            // filename and content type is derived from path
            path: __dirname + '/contactos.xlsx',
          },
        ],
      };
      await mail.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          fs.unlinkSync(__dirname + '/contactos.xlsx');
        }
      });

      menuPrin('excel generado');
    } else {
      hojaExcel();
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
      menu.close();
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

export const mostrarContacto = async (num: number) => {
  let i: number;

  process.stdout.write('\u001B[2J\u001B[0;0f');
  const contactos = await Contacto.find({}).sort({ nombre: 1 });

  console.log('*****************');
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

function handleError(error: any): any {
  throw new Error('Function not implemented.');
}
