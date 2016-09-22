"use strict";
const Mongoose = require('mongoose');
class ProductOrderDbService {
    getModel() {
        return Mongoose.model('product-order');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductOrderDbService;
