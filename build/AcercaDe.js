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
Object.defineProperty(exports, "__esModule", { value: true });
exports.acercaDe = void 0;
var MenuPrincipal_1 = require("./MenuPrincipal");
var datos = __importStar(require("./datos.json"));
// tslint:disable-next-line: no-var-requires
var term = require('terminal-kit').terminal;
var menu;
var acercaDe = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    var items = ['Menu Principal'];
    var options = {
        y: 13,
        style: term.inverse,
        selectedStyle: term.dim.blue.bgGreen,
    };
    term.singleLineMenu(items, options, function (_error, response) {
        if (response.selectedIndex === 0) {
            (0, MenuPrincipal_1.menuPrin)();
        }
        else {
            process.exit();
        }
    });
    process.stdout.write('\u001B[2J\u001B[0;0f');
    console.log('*****************');
    console.log("Nombre: " + datos.name);
    console.log('');
    console.log("Version: " + datos.version);
    console.log('');
    console.log("Autor: " + datos.author);
    console.log('');
    console.log("" + datos.description);
    console.log('');
    console.log('*****************');
    console.log('');
    console.log('');
    console.log('');
    if (menu)
        menu.close();
};
exports.acercaDe = acercaDe;
