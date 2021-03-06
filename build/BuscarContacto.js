"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarContacto = void 0;
var readline_1 = __importDefault(require("readline"));
var MenuPrincipal_1 = require("./MenuPrincipal");
var NuevoContactoMongo_1 = require("./NuevoContactoMongo");
var DirectorioContactos_1 = require("./DirectorioContactos");
var EliminarContacto_1 = require("./EliminarContacto");
var EditarContacto_1 = require("./EditarContacto");
var menu;
var buscarContacto = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    console.log('*****************');
    console.log('1 - Buscar contacto por nombre');
    console.log('2 - Buscar contacto por apellido');
    console.log('3 - Volver al menu principal');
    console.log('*****************');
    if (menu) {
        menu.close();
        menu.removeAllListeners();
    }
    menu = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    menu.question('Opcion: ', function (input) {
        switch (input) {
            case '1':
                buscarContactoNombre();
                break;
            case '2':
                buscarContactoApellido();
                break;
            case '3':
                (0, MenuPrincipal_1.menuPrin)();
                break;
            default:
                (0, exports.buscarContacto)();
                break;
        }
    });
};
exports.buscarContacto = buscarContacto;
var buscarContactoApellido = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    if (menu)
        menu.close();
    menu = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    menu.question('Ingrese un apellido: ', function (input) { return __awaiter(void 0, void 0, void 0, function () {
        var nameRegex, contactos, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nameRegex = new RegExp(input);
                    return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({ apellido: nameRegex })];
                case 1:
                    contactos = _a.sent();
                    console.log('*****************');
                    for (i = 0; i < contactos.length; i++) {
                        console.log(i + 1 + " - " + contactos[i].nombre + " " + contactos[i].apellido);
                    }
                    console.log('*****************');
                    console.log('');
                    console.log('x - Volver al menu principal');
                    menu.question('Opcion: ', function (input2) {
                        if (input2 === 'x') {
                            (0, MenuPrincipal_1.menuPrin)();
                        }
                        else if (isNaN(Number(input2)) === false && input2) {
                            var apell = contactos[Number(input2) - 1].apellido;
                            console.log(input2);
                            console.log(apell);
                            mostrarContactoIndividualApellido(Number(input2), apell);
                        }
                        else {
                            (0, exports.buscarContacto)();
                        }
                        // switch (input2) {
                        //   case 'x':
                        //     menuPrin();
                        //     break;
                        //   default:
                        //     buscarContacto();
                        //     break;
                        // }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
var buscarContactoNombre = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    if (menu)
        menu.close();
    menu = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    menu.question('Ingrese un nombre: ', function (input) { return __awaiter(void 0, void 0, void 0, function () {
        var nameRegex, contactos, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nameRegex = new RegExp(input);
                    return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({ nombre: nameRegex })];
                case 1:
                    contactos = _a.sent();
                    console.log('*****************');
                    for (i = 0; i < contactos.length; i++) {
                        console.log(i + 1 + " - " + contactos[i].nombre + " " + contactos[i].apellido);
                    }
                    console.log('*****************');
                    console.log('');
                    console.log('x - Volver al menu principal');
                    menu.question('Opcion: ', function (input2) {
                        if (input2 === 'x') {
                            (0, MenuPrincipal_1.menuPrin)();
                        }
                        else if (isNaN(Number(input2)) === false && input2) {
                            var nombr = contactos[Number(input2) - 1].nombre;
                            console.log(input2);
                            console.log(nombr);
                            mostrarContactoIndividual(Number(input2), nombr);
                        }
                        else {
                            (0, exports.buscarContacto)();
                        }
                        // switch (input2) {
                        //   case 'x':
                        //     menuPrin();
                        //     break;
                        //   default:
                        //     buscarContacto();
                        //     break;
                        // }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
var mostrarContactoIndividualApellido = function (num, ape) { return __awaiter(void 0, void 0, void 0, function () {
    var contactos, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                process.stdout.write('\u001B[2J\u001B[0;0f');
                return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({ apellido: ape })];
            case 1:
                contactos = _a.sent();
                console.log('*****************');
                for (i = num - 1; i < num; i++) {
                    if (contactos[i] !== undefined) {
                        console.log("Nombre: " + contactos[i].nombre);
                        console.log("Apellido: " + contactos[i].apellido);
                        console.log("Apodo: " + contactos[i].apodo);
                        console.log("Email: " + contactos[i].email);
                        console.log("A\u00F1o de Nacimiento: " + contactos[i].nacimiento);
                        console.log("Edad: " + contactos[i].edad);
                        console.log("Telefono: " + contactos[i].telefono);
                        console.log("Direccion: " + contactos[i].direccion);
                    }
                    else {
                        return [2 /*return*/, (0, DirectorioContactos_1.verContactos)()];
                    }
                }
                console.log('*****************');
                console.log('');
                console.log('1 - Editar contacto');
                console.log('2 - Eliminar contacto');
                console.log('3 - Enviar mail al contacto');
                console.log('4 - Volver a todos los contactos');
                console.log('5 - Volver al menu principal');
                menu = readline_1.default.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false,
                });
                menu.question('Opcion: ', function (input) {
                    switch (input) {
                        case '1':
                            (0, EditarContacto_1.editarContacto)(contactos[i - 1]._id);
                            break;
                        case '2':
                            (0, EliminarContacto_1.eliminarContacto)(contactos[i - 1]._id);
                            break;
                        case '3':
                            (0, DirectorioContactos_1.mandarMail)(contactos[i - 1].email);
                            break;
                        case '4':
                            (0, DirectorioContactos_1.verContactos)();
                            break;
                        case '5':
                            (0, MenuPrincipal_1.menuPrin)();
                            break;
                        default:
                            (0, DirectorioContactos_1.mostrarContacto)(num);
                            break;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
var mostrarContactoIndividual = function (num, nomb) { return __awaiter(void 0, void 0, void 0, function () {
    var contactos, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                process.stdout.write('\u001B[2J\u001B[0;0f');
                return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({ nombre: nomb })];
            case 1:
                contactos = _a.sent();
                console.log('*****************');
                for (i = num - 1; i < num; i++) {
                    if (contactos[i] !== undefined) {
                        console.log("Nombre: " + contactos[i].nombre);
                        console.log("Apellido: " + contactos[i].apellido);
                        console.log("Apodo: " + contactos[i].apodo);
                        console.log("Email: " + contactos[i].email);
                        console.log("A\u00F1o de Nacimiento: " + contactos[i].nacimiento);
                        console.log("Edad: " + contactos[i].edad);
                        console.log("Telefono: " + contactos[i].telefono);
                        console.log("Direccion: " + contactos[i].direccion);
                    }
                    else {
                        return [2 /*return*/, (0, DirectorioContactos_1.verContactos)()];
                    }
                }
                console.log('*****************');
                console.log('');
                console.log('1 - Editar contacto');
                console.log('2 - Eliminar contacto');
                console.log('3 - Enviar mail al contacto');
                console.log('4 - Volver a todos los contactos');
                console.log('5 - Volver al menu principal');
                menu = readline_1.default.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false,
                });
                menu.question('Opcion: ', function (input) {
                    switch (input) {
                        case '1':
                            (0, EditarContacto_1.editarContacto)(contactos[i - 1]._id);
                            break;
                        case '2':
                            (0, EliminarContacto_1.eliminarContacto)(contactos[i - 1]._id);
                            break;
                        case '3':
                            (0, DirectorioContactos_1.mandarMail)(contactos[i - 1].email);
                            break;
                        case '4':
                            (0, DirectorioContactos_1.verContactos)();
                            break;
                        case '5':
                            (0, MenuPrincipal_1.menuPrin)();
                            break;
                        default:
                            (0, DirectorioContactos_1.mostrarContacto)(num);
                            break;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
