"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = __importDefault(require("../controllers/image.controller"));
const router = (0, express_1.Router)();
router.get('/', image_controller_1.default.get);
router.get('/:imageUrl(*)', image_controller_1.default.get);
exports.default = router;
