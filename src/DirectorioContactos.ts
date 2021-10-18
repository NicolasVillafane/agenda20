import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
const dbUrl = process.env.DB_URL!;
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
import nodemailer from 'nodemailer';
import xlsx from 'xlsx';

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
  console.log('x - Exportar contactos a archivo xlsx');
  console.log('z - Importar contactos desde archivo xlsx');

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
      case 'x':
        hojaExcel();
        break;
      case 'z':
        importarContacto();
        break;
      default:
        menuDirectorio();
    }
  });
};

const importarContacto = async () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  console.log('Ingrese la localizacion del archivo de importacion.');
  console.log('ej: "Home/User/Documents/importar.xlsx"');
  if (menu) menu.close();

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  menu.question('Localizacion: ', async (input) => {
    const path = input;
    const workbook = xlsx.readFile(path);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < dataExcel.length; i++) {
      const nombre1: string = dataExcel[i].Nombre;
      const apellido1 = dataExcel[i].Apellido;
      const apodo1 = dataExcel[i].Apodo;
      const diaN = dataExcel[i].Dia;
      const mesN = dataExcel[i].Mes;
      const añoN = dataExcel[i].Año;
      const telefono1 = dataExcel[i].Telefono;
      const direccion1 = dataExcel[i].Direccion;

      const fechaHoy: Date | string = new Date();
      const dd = String(fechaHoy.getDate()).padStart(2, '0');
      const mm = String(fechaHoy.getMonth() + 1).padStart(2, '0');
      const yyyy = fechaHoy.getFullYear();
      if (
        nombre1 &&
        apellido1 &&
        apodo1 &&
        diaN &&
        mesN &&
        añoN &&
        telefono1 &&
        direccion1
      ) {
        let edadActual = yyyy - Number(añoN);
        const calcularEdad = () => {
          if (mm <= mesN || dd < diaN) {
            edadActual -= 1;
          }
        };
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
      } else {
        menuPrin('>Datos invalidos<');
      }
    }
  });
};

const hojaExcel = async () => {
  process.stdout.write('\u001B[2J\u001B[0;0f');

  menu = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  let inputMail;
  menu.question('Ingrese su direccion mail: ', async (input) => {
    inputMail = input;
    ws.cell(1, 1).string('Nombre').style(style);
    ws.cell(1, 2).string('Apellido').style(style);
    ws.cell(1, 3).string('Apodo').style(style);
    ws.cell(1, 4).string('Nacimiento').style(style);
    ws.cell(1, 5).string('Telefono').style(style);
    ws.cell(1, 6).string('Direccion').style(style);

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
      colNum += 1;
    }

    await wb.write(__dirname + '/contactos.xlsx');
    const mailOptions = {
      from: 'nivi1023@gmail.com',
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
        console.log('Email sent: ' + info.response);
      }
    });
    menuPrin('excel generado');
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
