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
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
var dbUrl = process.env.DB_URL;
var mongoose_1 = __importDefault(require("mongoose"));
var faker_1 = __importDefault(require("faker"));
// 'mongodb://localhost/contactos'
mongoose_1.default
    .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .catch(function (error) { return handleError(error); });
var NuevoContactoMongo_1 = require("./NuevoContactoMongo");
var fechaHoy = new Date();
var dd = fechaHoy.getDate();
var mm = fechaHoy.getMonth() + 1;
var yyyy = fechaHoy.getFullYear();
for (var i = 0; i < 50; i++) {
    var dia = faker_1.default.datatype.number({
        min: 1,
        max: 31,
    });
    var mes = faker_1.default.datatype.number({
        min: 1,
        max: 12,
    });
    var año = faker_1.default.datatype.number({
        min: 1950,
        max: 2020,
    });
    var edadActual = yyyy - Number(año);
    if (mm <= mes || dd < dia) {
        edadActual -= 1;
    }
    NuevoContactoMongo_1.Contacto.insertMany([
        {
            nombre: faker_1.default.name.firstName(),
            apellido: faker_1.default.name.lastName(),
            apodo: 'dbajsd',
            email: faker_1.default.internet.email(),
            nacimiento: dia + "/" + mes + "/" + año,
            edad: edadActual,
            telefono: 15638274,
            direccion: faker_1.default.address.streetAddress(),
        },
    ]);
}
function handleError(error) {
    throw new Error('Function not implemented.');
}
