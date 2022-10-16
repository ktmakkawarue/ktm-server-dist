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
Object.defineProperty(exports, "__esModule", { value: true });
const image_service_1 = require("../services/image.service");
function get(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const imgUrl = req.params.imageUrl;
        const label = (_a = (req.query.label)) === null || _a === void 0 ? void 0 : _a.toString();
        res.type('jpg');
        try {
            const response = yield (0, image_service_1.imageProcessing)(imgUrl, label);
            res.send(response).status(200);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = { get };
