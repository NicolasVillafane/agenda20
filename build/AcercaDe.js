"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acercaDe = void 0;
var MenuPrincipal_1 = require("./MenuPrincipal");
var readline_1 = __importDefault(require("readline"));
var datos = __importStar(require("./datos.json"));
var menu;
var acercaDe = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    console.log('*****************');
    console.log("Nombre: " + datos.name);
    console.log('');
    console.log("Version: " + datos.version);
    console.log('');
    console.log("Autor: " + datos.author);
    console.log('');
    console.log("Descripcion: " + datos.description);
    console.log('');
    console.log('*****************');
    console.log('');
    console.log('1 - Volver al menu principal');
    console.log('');
    if (menu)
        menu.close();
    menu = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    menu.question('Opcion: ', function (input) {
        input === '1' ? (0, MenuPrincipal_1.menuPrin)() : (0, exports.acercaDe)();
    });
};
exports.acercaDe = acercaDe;
