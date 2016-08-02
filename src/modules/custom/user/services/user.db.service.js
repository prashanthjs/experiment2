"use strict";
const Mongoose = require('mongoose');
class UserDbService {
    getModel() {
        return Mongoose.model('user');
    }
    findByEmail(email, projections, next) {
        return this.getModel().findOne({ email: email }, projections, next);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserDbService;
