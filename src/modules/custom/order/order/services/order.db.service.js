"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
class OrderDbService {
    getModel() {
        return Mongoose.model('order');
    }
}
exports.default = OrderDbService;
