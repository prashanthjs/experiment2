"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DbParser = require("./db.parser");
class DbParserFactory {
    getDbParser(schema) {
        return new DbParser.default(schema);
    }
}
exports.default = DbParserFactory;
