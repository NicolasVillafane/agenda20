import mongoose from 'mongoose';

const nuevoC = new mongoose.Schema({
  nombre: String,
  apellido: String,
  apodo: String,
  email: String,
  nacimiento: String,
  edad: String,
  telefono: Number,
  direccion: String,
  // nombre: undefined,
  // apellido: undefined,
  // apodo: undefined,
  // nacimiento: undefined,
  // edad: undefined,
  // telefono: undefined,
  // direccion: undefined,
});
export const Contacto = mongoose.model('Contacto', nuevoC);
