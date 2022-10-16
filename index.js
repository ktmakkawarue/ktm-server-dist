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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Router
const image_route_1 = __importDefault(require("./src/routes/image.route"));
const postmeta_route_1 = __importDefault(require("./src/routes/postmeta.route"));
const trending_route_1 = __importDefault(require("./src/routes/trending.route"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || "";
// Midleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get('/', (req, res, next) => {
    res.status(200).json({ "status": "OK" });
});
// Router
app.use('/image', image_route_1.default);
app.use('/postmeta', postmeta_route_1.default);
app.use('/trending', trending_route_1.default);
app.use(express_1.default.static('public'));
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message /*, err.stack*/);
    res.status(statusCode).json({ 'message': err.message });
    return;
});
// Connect To DB
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(DB_URL);
        console.log('🍃[database]: Database is connected');
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
dbConnect();
// Start App
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
