"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostMetaSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: true,
    },
    totalView: {
        type: Number,
        required: true,
    },
    totalShare: {
        type: Number,
        required: true,
    },
    reactions: {
        type: Array,
        required: true,
    },
    last_view: {
        type: Date,
        required: true,
    },
    last_update: {
        type: Date,
        required: true,
    }
}, {
    collection: "postmetas"
});
const PostMeta = mongoose_1.default.model('PostMeta', PostMetaSchema);
exports.default = PostMeta;
