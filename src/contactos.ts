import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
const dbUrl = process.env.DB_URL!;
import mongoose from 'mongoose';
import faker from 'faker';
// 'mongodb://localhost/contactos'
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => handleError(error));

import { Contacto } from './NuevoContactoMongo';
const fechaHoy: Date | string = new Date();
const dd = fechaHoy.getDate();
const mm = fechaHoy.getMonth() + 1;
const yyyy = fechaHoy.getFullYear();
for (let i = 0; i < 50; i++) {
  const dia = faker.datatype.number({
    min: 1,
    max: 31,
  });
  const mes = faker.datatype.number({
    min: 1,
    max: 12,
  });
  const año = faker.datatype.number({
    min: 1950,
    max: 2020,
  });
  let edadActual: number = yyyy - Number(año);
  if (mm <= mes || dd < dia) {
    edadActual -= 1;
  }
  Contacto.insertMany([
    {
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      apodo: 'dbajsd',
      email: faker.internet.email(),
      nacimiento: `${dia}/${mes}/${año}`,
      edad: edadActual,
      telefono: 15638274,
      direccion: faker.address.streetAddress(),
    },
  ]);
}

function handleError(error: any): any {
  throw new Error('Function not implemented.');
}
