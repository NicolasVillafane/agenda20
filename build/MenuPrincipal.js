"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuPrin = void 0;
var AcercaDe_1 = require("./AcercaDe");
var DirectorioContactos_1 = require("./DirectorioContactos");
var NuevoContacto_1 = require("./NuevoContacto");
var BuscarContacto_1 = require("./BuscarContacto");
// tslint:disable-next-line: no-var-requires
var term = require('terminal-kit').terminal;
var menu;
var menuPrin = function (mensaje) {
    if (mensaje === void 0) { mensaje = ''; }
    process.stdout.write('\u001B[2J\u001B[0;0f');
    var items = [
        'Directorio de Contactos',
        'Nuevo Contacto',
        'Buscar Contacto',
        'Acerca De',
        'Salir',
    ];
    var options = {
        y: 5,
        style: term.inverse,
        selectedStyle: term.dim.blue.bgGreen,
    };
    term.singleLineMenu(items, options, function (_error, response) {
        if (response.selectedIndex === 0) {
            (0, DirectorioContactos_1.menuDirectorio)();
        }
        else if (response.selectedIndex === 1) {
            (0, NuevoContacto_1.nuevoContacto)();
        }
        else if (response.selectedIndex === 2) {
            (0, BuscarContacto_1.buscarContacto)();
        }
        else if (response.selectedIndex === 3) {
            (0, AcercaDe_1.acercaDe)();
        }
        else {
            process.exit();
        }
    });
    process.stdout.write('\u001B[2J\u001B[0;0f');
    console.log('*****************');
    console.log('Bienvenido a la contactera');
    console.log('');
    console.log('Ingrese una opcion:');
    console.log('');
    console.log('*****************');
    console.log('');
    console.log(mensaje);
    console.log('');
    if (menu)
        menu.close();
};
exports.menuPrin = menuPrin;
(0, exports.menuPrin)();
