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
exports.editarContacto = void 0;
var readline_1 = __importDefault(require("readline"));
var DirectorioContactos_1 = require("./DirectorioContactos");
var MenuPrincipal_1 = require("./MenuPrincipal");
var NuevoContactoMongo_1 = require("./NuevoContactoMongo");
// tslint:disable-next-line: no-var-requires
var ObjectId = require('mongodb').ObjectId;
var menu;
// tslint:disable-next-line: one-variable-per-declaration
var nombre1, apellido1, apodo1, email1, diaN, mesN, a??oN, telefono1, direccion1;
var editarContacto = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var contacto, fechaHoy, dd, mm, yyyy, nombre, apellido, apodo, email, diaNacimiento, mesNacimiento, a??oNacimiento, telefono, direccion, edadActual, calcularEdad, main;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                process.stdout.write('\u001B[2J\u001B[0;0f');
                return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({ _id: ObjectId(id) })];
            case 1:
                contacto = _a.sent();
                if (menu)
                    menu.close();
                menu = readline_1.default.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false,
                });
                fechaHoy = new Date();
                dd = String(fechaHoy.getDate()).padStart(2, '0');
                mm = String(fechaHoy.getMonth() + 1).padStart(2, '0');
                yyyy = fechaHoy.getFullYear();
                fechaHoy = dd + "/" + mm + "/" + yyyy;
                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                console.log('');
                process.stdin.setRawMode(true);
                process.stdin.on('keypress', function (chunk, key) {
                    if (key.name === 'escape') {
                        menu.close();
                        (0, DirectorioContactos_1.verContactos)();
                    }
                });
                nombre = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('Nombre: ', function (input) {
                            var res = /^[??A-Za-z _]*[??A-Za-z][??A-Za-z _]*$/.test(input);
                            if (input.length <= 15 &&
                                input &&
                                isNaN(Number(input)) === true &&
                                res === true) {
                                nombre1 = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                                console.log('');
                                main('1');
                            }
                        });
                        process.stdout.write("" + contacto[0].nombre);
                    });
                };
                apellido = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('Apellido: ', function (input) {
                            var res = /^[??A-Za-z _]*[??A-Za-z][??A-Za-z _]*$/.test(input);
                            if (input.length <= 15 &&
                                input &&
                                isNaN(Number(input)) === true &&
                                res === true) {
                                apellido1 = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                                console.log('');
                                console.log("Nombre: " + nombre1);
                                main('2');
                            }
                        });
                        process.stdout.write("" + contacto[0].apellido);
                    });
                };
                apodo = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('Apodo: ', function (input) {
                            var res = /^[??A-Za-z _]*[??A-Za-z][??A-Za-z _]*$/.test(input);
                            if (input.length <= 15 &&
                                input &&
                                isNaN(Number(input)) === true &&
                                res === true) {
                                apodo1 = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                                console.log('');
                                console.log("Nombre: " + nombre1);
                                console.log("Apellido: " + apellido1);
                                main('3');
                            }
                        });
                        process.stdout.write("" + contacto[0].apodo);
                    });
                };
                email = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('Email: ', function (input) {
                            var res = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(input);
                            if (input.length <= 30 &&
                                input &&
                                isNaN(Number(input)) === true &&
                                res === true &&
                                input.includes('@') === true &&
                                input.includes('.') === true) {
                                email1 = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese los datos del nuevo contacto o presione esc para volver al menu: ');
                                console.log('');
                                console.log("Nombre: " + nombre1);
                                console.log("Apellido: " + apellido1);
                                console.log("Apodo: " + apodo1);
                                main('4');
                            }
                        });
                    });
                };
                diaNacimiento = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('Dia de nacimiento: ', function (input) {
                            if (isNaN(Number(input)) === false && Number(input) <= 31 && input) {
                                diaN = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                                console.log('');
                                console.log("Nombre: " + nombre1);
                                console.log("Apellido: " + apellido1);
                                console.log("Apodo: " + apodo1);
                                console.log("Email: " + email1);
                                main('4');
                            }
                        });
                    });
                };
                mesNacimiento = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('Mes de nacimiento: ', function (input) {
                            if (isNaN(Number(input)) === false && Number(input) <= 12 && input) {
                                mesN = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                                console.log('');
                                console.log("Nombre: " + nombre1);
                                console.log("Apellido: " + apellido1);
                                console.log("Apodo: " + apodo1);
                                console.log("Email: " + email1);
                                console.log("Dia de nacimiento: " + diaN);
                                main('5');
                            }
                        });
                    });
                };
                a??oNacimiento = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('A??o de nacimiento: ', function (input) {
                            if (isNaN(Number(input)) === false && Number(input) < yyyy && input) {
                                a??oN = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                                console.log('');
                                console.log("Nombre: " + nombre1);
                                console.log("Apellido: " + apellido1);
                                console.log("Apodo: " + apodo1);
                                console.log("Email: " + email1);
                                console.log("Dia de nacimiento: " + diaN);
                                console.log("Mes de nacimiento: " + mesN);
                                main('6');
                            }
                        });
                    });
                };
                telefono = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('Telefono (8 digitos): ', function (input) {
                            if (isNaN(Number(input)) === false && input && input.length === 8) {
                                telefono1 = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                                console.log('');
                                console.log("Nombre: " + nombre1);
                                console.log("Apellido: " + apellido1);
                                console.log("Apodo: " + apodo1);
                                console.log("Email: " + email1);
                                console.log("Dia de nacimiento: " + diaN);
                                console.log("Mes de nacimiento: " + mesN);
                                console.log("A\u00F1o de nacimiento: " + a??oN);
                                main('7');
                            }
                        });
                        process.stdout.write("" + contacto[0].telefono);
                    });
                };
                direccion = function () {
                    return new Promise(function (resolve, reject) {
                        menu.question('Direccion: ', function (input) {
                            if (isNaN(Number(input)) === true && input && input.length <= 30) {
                                direccion1 = input;
                                resolve();
                            }
                            else {
                                console.clear();
                                console.log('Ingrese nuevamente los datos del contacto o presione esc para salir');
                                console.log('');
                                console.log("Nombre: " + nombre1);
                                console.log("Apellido: " + apellido1);
                                console.log("Apodo: " + apodo1);
                                console.log("Email: " + email1);
                                console.log("Dia de nacimiento: " + diaN);
                                console.log("Mes de nacimiento: " + mesN);
                                console.log("A\u00F1o de nacimiento: " + a??oN);
                                console.log("Telefono (8 digitos): " + telefono1);
                                main('8');
                            }
                        });
                        process.stdout.write("" + contacto[0].direccion);
                    });
                };
                calcularEdad = function () {
                    edadActual = yyyy - Number(a??oN);
                    if (mm <= mesN || dd < diaN) {
                        edadActual -= 1;
                    }
                };
                main = function (input) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = input;
                                switch (_a) {
                                    case '1': return [3 /*break*/, 1];
                                    case '2': return [3 /*break*/, 3];
                                    case '3': return [3 /*break*/, 5];
                                    case '4': return [3 /*break*/, 7];
                                    case '5': return [3 /*break*/, 9];
                                    case '6': return [3 /*break*/, 11];
                                    case '7': return [3 /*break*/, 13];
                                    case '8': return [3 /*break*/, 15];
                                    case '9': return [3 /*break*/, 17];
                                }
                                return [3 /*break*/, 18];
                            case 1: return [4 /*yield*/, nombre()];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 19];
                            case 3: return [4 /*yield*/, apellido()];
                            case 4:
                                _b.sent();
                                return [3 /*break*/, 19];
                            case 5: return [4 /*yield*/, apodo()];
                            case 6:
                                _b.sent();
                                return [3 /*break*/, 19];
                            case 7: return [4 /*yield*/, email()];
                            case 8:
                                _b.sent();
                                return [3 /*break*/, 19];
                            case 9: return [4 /*yield*/, diaNacimiento()];
                            case 10:
                                _b.sent();
                                return [3 /*break*/, 19];
                            case 11: return [4 /*yield*/, mesNacimiento()];
                            case 12:
                                _b.sent();
                                return [3 /*break*/, 19];
                            case 13: return [4 /*yield*/, a??oNacimiento()];
                            case 14:
                                _b.sent();
                                return [3 /*break*/, 19];
                            case 15: return [4 /*yield*/, telefono()];
                            case 16:
                                _b.sent();
                                return [3 /*break*/, 19];
                            case 17:
                                direccion();
                                return [3 /*break*/, 19];
                            case 18:
                                main('1');
                                return [3 /*break*/, 19];
                            case 19:
                                if (!!nombre1) return [3 /*break*/, 21];
                                return [4 /*yield*/, nombre()];
                            case 20:
                                _b.sent();
                                _b.label = 21;
                            case 21:
                                if (!!apellido1) return [3 /*break*/, 23];
                                return [4 /*yield*/, apellido()];
                            case 22:
                                _b.sent();
                                _b.label = 23;
                            case 23:
                                if (!!apodo1) return [3 /*break*/, 25];
                                return [4 /*yield*/, apodo()];
                            case 24:
                                _b.sent();
                                _b.label = 25;
                            case 25:
                                if (!!email1) return [3 /*break*/, 27];
                                return [4 /*yield*/, email()];
                            case 26:
                                _b.sent();
                                _b.label = 27;
                            case 27:
                                if (!!diaN) return [3 /*break*/, 29];
                                return [4 /*yield*/, diaNacimiento()];
                            case 28:
                                _b.sent();
                                _b.label = 29;
                            case 29:
                                if (!!mesN) return [3 /*break*/, 31];
                                return [4 /*yield*/, mesNacimiento()];
                            case 30:
                                _b.sent();
                                _b.label = 31;
                            case 31:
                                if (!!a??oN) return [3 /*break*/, 33];
                                return [4 /*yield*/, a??oNacimiento()];
                            case 32:
                                _b.sent();
                                _b.label = 33;
                            case 33:
                                if (!!telefono1) return [3 /*break*/, 35];
                                return [4 /*yield*/, telefono()];
                            case 34:
                                _b.sent();
                                _b.label = 35;
                            case 35:
                                if (!!direccion1) return [3 /*break*/, 37];
                                return [4 /*yield*/, direccion()];
                            case 36:
                                _b.sent();
                                _b.label = 37;
                            case 37: return [4 /*yield*/, calcularEdad()];
                            case 38:
                                _b.sent();
                                return [4 /*yield*/, NuevoContactoMongo_1.Contacto.replaceOne({ _id: ObjectId(id) }, {
                                        nombre: nombre1,
                                        apellido: apellido1,
                                        apodo: apodo1,
                                        email: email1,
                                        nacimiento: diaN + "/" + mesN + "/" + a??oN,
                                        edad: edadActual,
                                        telefono: telefono1,
                                        direccion: direccion1,
                                    })];
                            case 39:
                                _b.sent();
                                return [4 /*yield*/, (0, MenuPrincipal_1.menuPrin)('>Contacto editado con exito<')];
                            case 40:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                main('1');
                return [2 /*return*/];
        }
    });
}); };
exports.editarContacto = editarContacto;
