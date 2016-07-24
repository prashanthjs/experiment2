"use strict";
const DbParser = require('./db.parser');
class DbParserFactory {
    getDbParser(schema) {
        return new DbParser.default(schema);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DbParserFactory;
