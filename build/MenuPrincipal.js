"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuPrin = void 0;
var readline_1 = __importDefault(require("readline"));
var AcercaDe_1 = require("./AcercaDe");
var DirectorioContactos_1 = require("./DirectorioContactos");
var NuevoContacto_1 = require("./NuevoContacto");
var BuscarContacto_1 = require("./BuscarContacto");
var NosVimos_1 = require("./NosVimos");
// tslint:disable-next-line: no-var-requires
var term = require('terminal-kit').terminal;
// tslint:disable-next-line: prefer-const
var menu;
var menuPrin = function (mensaje) {
    if (mensaje === void 0) { mensaje = ''; }
    process.stdout.write('\u001B[2J\u001B[0;0f');
    if (menu)
        menu.close();
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
    if (menu)
        menu.close();
    menu = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    menu.question('Opcion: ', function (input) {
        switch (input) {
            case '1':
                (0, DirectorioContactos_1.menuDirectorio)();
                break;
            case '2':
                (0, NuevoContacto_1.nuevoContacto)();
                break;
            case '3':
                (0, BuscarContacto_1.buscarContacto)();
                break;
            case '4':
                (0, AcercaDe_1.acercaDe)();
                break;
            case '5':
                (0, NosVimos_1.pregunta)();
                break;
            default:
                (0, exports.menuPrin)();
        }
    });
};
exports.menuPrin = menuPrin;
(0, exports.menuPrin)();
