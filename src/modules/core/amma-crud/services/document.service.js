"use strict";
const Mongoose = require('mongoose');
class DocumentService {
    getModel() {
        if (!this.model) {
            this.model = Mongoose.model(this.collectionName);
        }
        return this.model;
    }
    findAll(options, projections, next) {
        this.dbParser.parse(options);
        const model = this.getModel();
        model.find(this.dbParser.filter, projections).sort(this.dbParser.sort).limit(this.dbParser.pageSize).skip(this.dbParser.skip).exec(next);
    }
    findAllCount(options, next) {
        this.dbParser.parse(options);
        this.getModel().count(this.dbParser.filter).exec(next);
    }
    findById(id, projections, next) {
        this.getModel().findById(id, projections).exec(next);
    }
    findOne(options, projections, next) {
        this.dbParser.parse(options);
        this.getModel().findOne(this.dbParser.filter, projections).exec(next);
    }
    create(payload, next) {
        this.getModel().create(payload, next);
    }
    findByIdAndUpdate(id, payload, next) {
        this.getModel().findByIdAndUpdate(id, payload, { upsert: true }, next);
    }
    findByIdAndRemove(id, next) {
        this.getModel().findByIdAndRemove(id, next);
    }
    setServer(server) {
        this.server = server;
    }
    setCollectionName(collectionName) {
        this.collectionName = collectionName;
    }
    setDbParser(dbParser) {
        this.dbParser = dbParser;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentService;
