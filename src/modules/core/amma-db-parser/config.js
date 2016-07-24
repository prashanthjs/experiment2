"use strict";
module.exports = {
    services: {
        dbParserFactory: {
            cls: require('./services/db.parser.factory').default
        }
    }
};
