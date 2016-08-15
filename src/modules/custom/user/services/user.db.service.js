"use strict";
const Mongoose = require('mongoose');
class UserDbService {
    getModel() {
        return Mongoose.model('user');
    }
    findByEmail(email, projections, next) {
        return this.getModel().findOne({ email: email }, projections, next);
    }
    findByIdAndUpdatePassword(id, password, next) {
        this.getModel().findById(id, (err, result) => {
            if (err || !result) {
                next('User not found');
            }
            result.password = password;
            result.save(next);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserDbService;
