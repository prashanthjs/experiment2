"use strict";
const Mongoose = require('mongoose');
const Schema = require('../configs/schema/store.schema');
class StoreDbService {
    getModel() {
        return Mongoose.model('store');
    }
    findById(id, projections, next) {
        this.getModel().findById(id, projections, next);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StoreDbService;
