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
const postmeta_model_1 = __importDefault(require("../models/postmeta.model"));
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (req.params.id).toString();
        try {
            const data = yield postmeta_model_1.default.findById(id);
            // Update Last View
            if (data) {
                yield postmeta_model_1.default.updateOne({ _id: id }, { totalView: data.totalView + 1, last_view: Date.now() });
            }
            res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    });
}
function post(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (req.params.id).toString();
        const data = Object.assign(Object.assign({}, req.body), { _id: id, last_view: Date.now(), last_update: Date.now() });
        // console.log(data)
        try {
            const newData = new postmeta_model_1.default(data);
            const insertData = yield newData.save();
            res.status(201).json(insertData);
        }
        catch (err) {
            next(err);
        }
    });
}
function put(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (req.params.id).toString();
        const data = Object.assign(Object.assign({}, req.body), { last_update: Date.now() });
        // console.log(data)
        try {
            yield postmeta_model_1.default.updateOne({ _id: id }, data);
            const updatedData = yield postmeta_model_1.default.findById(id);
            res.status(201).json(updatedData);
        }
        catch (err) {
            next(err);
        }
    });
}
function del(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = (req.params.id).toString();
        try {
            const deletedData = yield postmeta_model_1.default.findByIdAndDelete(id);
            return res.status(200).json(deletedData);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = { get, post, put, del };
