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
exports.eliminarContacto = void 0;
var readline_1 = __importDefault(require("readline"));
var DirectorioContactos_1 = require("./DirectorioContactos");
var MenuPrincipal_1 = require("./MenuPrincipal");
var NuevoContactoMongo_1 = require("./NuevoContactoMongo");
// tslint:disable-next-line: no-var-requires
var ObjectId = require('mongodb').ObjectId;
var menu;
var eliminarContacto = function (id) {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    if (menu)
        menu.close();
    menu = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    menu.question('Esta seguro de eliminar el contacto? y/n: ', function (input) { return __awaiter(void 0, void 0, void 0, function () {
        var contacto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(input === 'y')) return [3 /*break*/, 4];
                    return [4 /*yield*/, NuevoContactoMongo_1.Contacto.find({ _id: ObjectId(id) })];
                case 1:
                    contacto = _a.sent();
                    return [4 /*yield*/, (0, MenuPrincipal_1.menuPrin)(">Contacto \"" + contacto[0].nombre + " " + contacto[0].apellido + "\" eliminado con exito<")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, NuevoContactoMongo_1.Contacto.deleteOne(contacto[0])];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    if (input === 'n') {
                        (0, DirectorioContactos_1.verContactos)();
                    }
                    else {
                        (0, DirectorioContactos_1.verContactos)();
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
};
exports.eliminarContacto = eliminarContacto;
