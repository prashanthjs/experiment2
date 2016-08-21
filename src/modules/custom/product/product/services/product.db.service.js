"use strict";
const Mongoose = require('mongoose');
class ProductDbService {
    getModel() {
        return Mongoose.model('product');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductDbService;
