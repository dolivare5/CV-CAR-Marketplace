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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        let port = process.env.POSTGRES_PORT_BD;
        const client = new pg_1.Client({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            password: process.env.POSTGRES_PASS,
            port: parseInt(port)
        });
        yield client.connect();
        const res = yield client.query('SELECT * FROM cvcarmarketplace');
        console.log(res);
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = connectionDB;
//# sourceMappingURL=connection.js.map