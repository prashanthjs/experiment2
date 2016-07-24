"use strict";
const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Mongoose = require('mongoose');
const ObjectPath = require('object-path');
const DocumentService = require('../../services/document.service');
const DbParserFactory = require('../../../../amma-db-parser/lib/services/db.parser.factory');
const DocumentServiceFactory = require('../../services/document.service.factory');
const lab = exports.lab = Lab.script(), before = lab.before, expect = Code.expect, suite = lab.suite, test = lab.test;
suite('Document Service Factory', () => {
    const server = new Hapi.Server();
    const dbParserFactory = new DbParserFactory.default();
    const documentServiceFactory = new DocumentServiceFactory.default();
    const schema = new Mongoose.Schema({});
    const collectionName = 'string';
    before((next) => {
        ObjectPath.ensureExists(server, 'settings.app.services', {});
        server.settings.app.services.dbParserFactory = dbParserFactory;
        documentServiceFactory.setServer(server);
        next();
    });
    test('Instance of Document Service', (next) => {
        const documentService = documentServiceFactory.getDocumentService(collectionName, schema);
        expect(documentService).to.be.an.instanceOf(DocumentService.default);
        next();
    });
});
