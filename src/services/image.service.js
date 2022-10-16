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
exports.defaultImage = exports.imageProcessing = void 0;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function imageProcessing(imgUrl, label) {
    return __awaiter(this, void 0, void 0, function* () {
        let category = "/public/images/other.png";
        switch (label) {
            case "ktmpoetry":
                category = "/public/images/poetry.png";
                break;
            case "ktmnews":
                category = "/public/images/news.png";
                break;
            case "ktmnote":
                category = "/public/images/note.png";
                break;
            case "ktmopini":
                category = "/public/images/opini.png";
                break;
            case "ktmquote":
                category = "/public/images/quote.png";
                break;
            case "ktmpedia":
                category = "/public/images/pedia.png";
                break;
            case "ktmtips":
                category = "/public/images/tips.png";
                break;
            case "seputardesa":
                category = "/public/images/seputardesa.png";
                break;
            default:
                category = "/public/images/other.png";
                break;
        }
        try {
            let imageInput = (yield (0, axios_1.default)({
                url: decodeURIComponent(imgUrl.toString()),
                responseType: "arraybuffer"
            })).data;
            let img = yield (0, sharp_1.default)(imageInput)
                .resize({
                width: 1200,
                height: 630
            })
                .composite([{
                    input: fs_1.default.readFileSync(path_1.default.resolve('./') + category),
                    top: 0,
                    left: 0,
                },])
                .toBuffer();
            let imageres = yield (0, sharp_1.default)(img)
                .jpeg({
                quality: 50
            })
                .toBuffer();
            return imageres;
        }
        catch (error) {
            return fs_1.default.readFileSync(path_1.default.resolve('./') + "/public/images/default.png");
        }
    });
}
exports.imageProcessing = imageProcessing;
function defaultImage() {
    return __awaiter(this, void 0, void 0, function* () {
        return fs_1.default.readFileSync(path_1.default.resolve('./') + "/public/images/default.png");
    });
}
exports.defaultImage = defaultImage;
