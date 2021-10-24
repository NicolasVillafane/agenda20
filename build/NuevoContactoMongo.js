"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacto = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var nuevoC = new mongoose_1.default.Schema({
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
exports.Contacto = mongoose_1.default.model('Contacto', nuevoC);
