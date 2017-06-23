"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
class ProductDbService {
    getModel() {
        return Mongoose.model('product');
    }
}
exports.default = ProductDbService;
