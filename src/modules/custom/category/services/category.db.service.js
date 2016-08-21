"use strict";
const Mongoose = require('mongoose');
class CategoryDbService {
    getModel() {
        return Mongoose.model('category');
    }
    findById(id, projections, next) {
        this.getModel().findById(id, projections, next);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CategoryDbService;
