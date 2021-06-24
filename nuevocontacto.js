const mongoose = require('mongoose');

const nuevoC = new mongoose.Schema({
  nombre: String,
  apellido: String,
  apodo: String,
  nacimiento: String,
  edad: Number,
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
const Contacto = mongoose.model('Contacto', nuevoC);

module.exports = Contacto;
