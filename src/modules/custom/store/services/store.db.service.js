"use strict";
const Mongoose = require('mongoose');
const Schema = require('../configs/schema/store.schema');
class StoreDbService {
    getModel() {
        if (!this.model) {
            const names = Mongoose.modelNames();
            const collectionName = Schema.collectionName;
            const schema = Schema.schema;
            if (names.indexOf(collectionName) == -1) {
                this.model = Mongoose.model(collectionName, schema);
            }
            else {
                this.model = Mongoose.model(collectionName);
            }
        }
        return this.model;
    }
    findById(id, projections, next) {
        this.getModel().findById(id, projections, next);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StoreDbService;
