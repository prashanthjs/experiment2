"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
class CategoryDbService {
    getModel() {
        return Mongoose.model('category');
    }
    findById(id, projections, next) {
        this.getModel().findById(id, projections, next);
    }
}
exports.default = CategoryDbService;
