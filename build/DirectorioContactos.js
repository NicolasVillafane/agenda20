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
exports.mostrarContacto = exports.verContactos = exports.mandarMail = exports.menuDirectorio = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
var dbUrl = process.env.DB_URL;
var mongoose_1 = __importDefault(require("mongoose"));
// tslint:disable-next-line: no-var-requires
var term = require('terminal-kit').terminal;
// 'mongodb://localhost/contactos'
mongoose_1.default
    .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .catch(function (error) { return handleError(error); });
var readline_1 = __importDefault(require("readline"));
var MenuPrincipal_1 = require("./MenuPrincipal");
var NuevoContactoMongo_1 = require("./NuevoContactoMongo");
var EditarContacto_1 = require("./EditarContacto");
var EliminarContacto_1 = require("./EliminarContacto");
var nodemailer_1 = __importDefault(require("nodemailer"));
var xlsx_1 = __importDefault(require("xlsx"));
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var mail = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'agendacontactera@gmail.com',
        pass: process.env.MAIL_PASS,
    },
});
// tslint:disable-next-line: no-var-requires
var xl = require('excel4node');
// Create a new instance of a Workbook class
var wb = new xl.Workbook();
// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');
var ws2 = wb.addWorksheet('Sheet 2');
// Create a reusable style
var style = wb.createStyle({
    font: {
        color: '#040404',
        size: 12,
    },
});
var nombresFreno = [];
var menu;
var menuDirectorio = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    console.log('*****************');
    console.log('Directorio de contactos');
    console.log('');
    console.log('1 - Ver todos los contactos');
    console.log('2 - Ver una letra');
    console.log('3 - Volver al menu principal');
    console.log('4 - Exportar contactos');
    console.log('5 - Importar contactos');
    console.log('*****************');
    if (menu)
        menu.close();
    menu = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    menu.question('Opcion: ', function (input) {
        switch (input) {
            case '1':
                (0, exports.verContactos)();
                break;
            case '2':
                verLetra();
                break;
            case '3':
                (0, MenuPrincipal_1.menuPrin)();
                break;
            case '4':
                hojaExcel();
                break;
            case '5':
                importarContacto();
                break;
            default:
                (0, exports.menuDirectorio)();
        }
    });
};
exports.menuDirectorio = menuDirectorio;
// tslint:disable-next-line: no-shadowed-variable
var mandarMail = function (mail) {
    (0, child_process_1.execSync)("xdg-email \"mailto:" + mail + "\"");
    (0, exports.verContactos)();
};
exports.mandarMail = mandarMail;
var importarContacto = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        if (menu) {
            menu.close();
            menu.removeAllListeners();
        }
        menu = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
        console.log('Ingrese la localizacion del archivo de importacion, o presione esc para volver');
        console.log('ej: "/home/user/Documents/importar.xlsx"');
        console.log('');
        console.log('');
        process.stdin.on('keypress', function (chunk, key) {
            if (key.name === 'escape') {
                (0, exports.menuDirectorio)();
            }
        });
        menu.question('Localizacion: ', function (input) { return __awaiter(void 0, void 0, void 0, function () {
            var path, workbook, workbookSheets, sheet, dataExcel, _loop_1, i, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        path = input;
                        workbook = xlsx_1.default.readFile(path);
                        workbookSheets = workbook.SheetNames;
                        sheet = workbookSheets[0];
                        dataExcel = xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheet]);
                        _loop_1 = function (i) {
                            var nombre1, apellido1, apodo1, diaN, mesN, a??oN, telefono1, direccion1, email1, fechaHoy, dd, mm, yyyy, val1, val2, val3, edadActual_1, calcularEdad;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        nombre1 = dataExcel[i].Nombre;
                                        apellido1 = dataExcel[i].Apellido;
                                        apodo1 = dataExcel[i].Apodo;
                                        diaN = dataExcel[i].Dia;
                                        mesN = dataExcel[i].Mes;
                                        a??oN = dataExcel[i].A??o;
                                        telefono1 = dataExcel[i].Telefono;
                                        direccion1 = dataExcel[i].Direccion;
                                        email1 = dataExcel[i].Email;
                                        fechaHoy = new Date();
                                        dd = String(fechaHoy.getDate()).padStart(2, '0');
                                        mm = String(fechaHoy.getMonth() + 1).padStart(2, '0');
                                        yyyy = fechaHoy.getFullYear();
                                        val1 = /^[??A-Za-z _]*[??A-Za-z][??A-Za-z _]*$/.test(nombre1);
                                        val2 = /^[??A-Za-z _]*[??A-Za-z][??A-Za-z _]*$/.test(apellido1);
                                        val3 = /^[??A-Za-z _]*[??A-Za-z][??A-Za-z _]*$/.test(apodo1);
                                        if (!(nombre1.length <= 15 &&
                                            nombre1 &&
                                            isNaN(Number(nombre1)) === true &&
                                            val1 === true &&
                                            apellido1.length <= 15 &&
                                            apellido1 &&
                                            isNaN(Number(apellido1)) === true &&
                                            val2 === true &&
                                            apodo1.length <= 15 &&
                                            apodo1 &&
                                            isNaN(Number(apodo1)) === true &&
                                            val3 === true &&
                                            isNaN(diaN) === false &&
                                            diaN <= 31 &&
                                            diaN &&
                                            isNaN(mesN) === false &&
                                            mesN <= 12 &&
                                            mesN &&
                                            isNaN(a??oN) === false &&
                                            a??oN < yyyy &&
                                            a??oN &&
                                            isNaN(telefono1) === false &&
                                            telefono1 &&
                                            telefono1.toString().length === 8 &&
                                            isNaN(Number(direccion1)) === true &&
                                            direccion1 &&
                                            direccion1.length <= 30 &&
                                            email1 &&
                                            email1.includes('@') &&
                                            email1.includes('.'))) return [3 /*break*/, 4];
                                        edadActual_1 = yyyy - Number(a??oN);
                                        calcularEdad = function () {
                                            if (Number(mm) <= mesN || Number(dd) < diaN) {
                                                edadActual_1 -= 1;
                                            }
                                        };
                                        return [4 /*yield*/, calcularEdad()];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, new NuevoContactoMongo_1.Contacto({
                                                nombre: nombre1,
                                                apellido: apellido1,
                                                apodo: apodo1,
                                                email: email1,
                                                nacimiento: diaN + "/" + mesN + "/" + a??oN,
                                                edad: edadActual_1,
                                                telefono: telefono1,
                                                direccion: direccion1,
                                            }).save()];
                                    case 2:
                                        _b.sent();
                                        return [4 /*yield*/, (0, MenuPrincipal_1.menuPrin)('>Contacto guardado con exito<')];
                                    case 3:
                                        _b.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        (0, MenuPrincipal_1.menuPrin)('>Datos invalidos<');
                                        _b.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < dataExcel.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        fs_1.default.unlinkSync(input);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        importarContacto();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var hojaExcel = function () { return __awaiter(void 0, void 0, void 0, function () {
    var inputMail;
    return __generator(this, function (_a) {
        process.stdout.write('\u001B[2J\u001B[0;0f');
        if (menu)
            menu.close();
        menu = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
        process.stdin.on('keypress', function (chunk, key) {
            if (key.name === 'escape') {
                menu.close();
                (0, exports.menuDirectorio)();
            }
        });
        menu.question('Ingrese su direccion mail: ', function (input) { return __awaiter(void 0, void 0, void 0, function () {
            var contactos, colNum, i, mailOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(input && input.includes('@') === true && input.includes('.') === true)) return [3 /*break*/, 14];
                        inputMail = input;
                        ws.cell(1, 1).string('Nombre').style(style);
                        ws.cell(1, 2).string('Apellido').style(style);
                        ws.cell(1, 3).string('Apodo').style(style);
                        ws.cell(1, 4).string('Nacimiento').style(style);
                        ws.cell(1, 5).string('Telefono').style(style);
                        ws.cell(1, 6).string('Direccion').style(style);
                        ws.cell(1, 7).string('Email').style(style);
                        return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({}).sort({ nombre: 1 })];
                    case 1:
                        contactos = _a.sent();
                        colNum = 2;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < contactos.length)) return [3 /*break*/, 11];
                        return [4 /*yield*/, ws.cell(colNum, 1).string(contactos[i].nombre).style(style)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, ws.cell(colNum, 2).string(contactos[i].apellido).style(style)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, ws.cell(colNum, 3).string(contactos[i].apodo).style(style)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, ws.cell(colNum, 4).string(contactos[i].nacimiento).style(style)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, ws.cell(colNum, 5).number(contactos[i].telefono).style(style)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, ws.cell(colNum, 6).string(contactos[i].direccion).style(style)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, ws.cell(colNum, 7).string(contactos[i].email).style(style)];
                    case 9:
                        _a.sent();
                        colNum += 1;
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 2];
                    case 11: return [4 /*yield*/, wb.write(__dirname + '/contactos.xlsx')];
                    case 12:
                        _a.sent();
                        mailOptions = {
                            from: 'agendacontactera@gmail.com',
                            to: inputMail,
                            subject: 'Contactos exportados',
                            text: '',
                            attachments: [
                                {
                                    // filename and content type is derived from path
                                    path: __dirname + '/contactos.xlsx',
                                },
                            ],
                        };
                        return [4 /*yield*/, mail.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    fs_1.default.unlinkSync(__dirname + '/contactos.xlsx');
                                }
                            })];
                    case 13:
                        _a.sent();
                        (0, MenuPrincipal_1.menuPrin)('excel generado');
                        return [3 /*break*/, 15];
                    case 14:
                        hojaExcel();
                        _a.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var verContactos = function (num, num2) {
    if (num === void 0) { num = 0; }
    if (num2 === void 0) { num2 = 10; }
    return __awaiter(void 0, void 0, void 0, function () {
        var i, contactos, arr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    process.stdout.write('\u001B[2J\u001B[0;0f');
                    return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({}).sort({ nombre: 1 })];
                case 1:
                    contactos = _a.sent();
                    console.clear();
                    console.log('*****************');
                    if (nombresFreno[0] === undefined) {
                        for (i = num; i < num2; i++) {
                            if (i >= contactos.length) {
                                break;
                            }
                            console.log(i + 1 + " - " + contactos[i].nombre);
                        }
                    }
                    else {
                        arr = [];
                        for (i = num; i < num2; i++) {
                            if (i >= contactos.length) {
                                break;
                            }
                            arr.push(contactos[i].nombre);
                            console.log(i + 1 + " - " + contactos[i].nombre);
                        }
                        if (arr.includes(nombresFreno[0]) === true) {
                            nombresFreno = [];
                        }
                        else {
                            console.clear();
                            (0, exports.verContactos)(num + 10, num2 + 10);
                        }
                    }
                    console.log('*****************');
                    console.log('');
                    console.log(i + "/" + contactos.length);
                    console.log('');
                    console.log('s - Siguiente');
                    console.log('a - Anterior');
                    console.log('x - Volver al menu principal');
                    if (menu)
                        menu.close();
                    menu = readline_1.default.createInterface({
                        input: process.stdin,
                        output: process.stdout,
                        terminal: false,
                    });
                    menu.question('Opcion: ', function (input) {
                        if (input === 's') {
                            if (num2 >= contactos.length) {
                                return (0, exports.verContactos)();
                            }
                            nombresFreno = [];
                            (0, exports.verContactos)(num + 10, num2 + 10);
                        }
                        else if (input === 'a') {
                            if (num === 0 && num2 === 10) {
                                return (0, exports.verContactos)();
                            }
                            nombresFreno = [];
                            (0, exports.verContactos)(num - 10, num2 - 10);
                        }
                        else if (input === 'x') {
                            nombresFreno = [];
                            menu.close();
                            (0, MenuPrincipal_1.menuPrin)();
                        }
                        else if (isNaN(Number(input)) === false && input) {
                            nombresFreno = [];
                            (0, exports.mostrarContacto)(Number(input));
                        }
                        else {
                            (0, exports.verContactos)();
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
};
exports.verContactos = verContactos;
var verLetra = function () {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    if (menu)
        menu.close();
    menu = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    menu.question('Ingrese la primera : ', function (input) { return __awaiter(void 0, void 0, void 0, function () {
        var inputMayus, nameRegex, contactos, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputMayus = input.toUpperCase();
                    nameRegex = new RegExp(inputMayus);
                    return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({}).sort({ nombre: 1 })];
                case 1:
                    contactos = _a.sent();
                    // tslint:disable-next-line: prefer-for-of
                    for (i = 0; i < contactos.length; i++) {
                        if (contactos[i].nombre.indexOf(inputMayus) === 0) {
                            nombresFreno.push(contactos[i].nombre);
                        }
                    }
                    // verContactos(,contactos.length);
                    console.log(nombresFreno);
                    (0, exports.verContactos)();
                    console.log('fin');
                    return [2 /*return*/];
            }
        });
    }); });
};
var mostrarContacto = function (num) { return __awaiter(void 0, void 0, void 0, function () {
    var i, contactos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                process.stdout.write('\u001B[2J\u001B[0;0f');
                return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({}).sort({ nombre: 1 })];
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
                        return [2 /*return*/, (0, exports.verContactos)()];
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
                            (0, exports.mandarMail)(contactos[i - 1].email);
                            break;
                        case '4':
                            (0, exports.verContactos)();
                            break;
                        case '5':
                            (0, MenuPrincipal_1.menuPrin)();
                            break;
                        default:
                            (0, exports.mostrarContacto)(num);
                            break;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.mostrarContacto = mostrarContacto;
function handleError(error) {
    throw new Error('Function not implemented.');
}
