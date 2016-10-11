"use strict";
const Mongoose = require('mongoose');
class OrderDbService {
    getModel() {
        return Mongoose.model('order');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrderDbService;
