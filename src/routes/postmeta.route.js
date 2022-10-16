"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postmeta_controller_1 = __importDefault(require("../controllers/postmeta.controller"));
const router = (0, express_1.Router)();
router.get('/:id', postmeta_controller_1.default.get);
router.post('/:id', postmeta_controller_1.default.post);
router.put('/:id', postmeta_controller_1.default.put);
router.delete('/:id', postmeta_controller_1.default.del);
exports.default = router;
