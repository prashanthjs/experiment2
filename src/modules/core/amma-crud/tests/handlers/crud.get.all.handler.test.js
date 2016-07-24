"use strict";
const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
const ObjectPath = require('object-path');
const Boom = require('boom');
const Handler = require('../../handlers/crud.get.all.handler');
const DocumentServiceFactory = require('../../services/document.service.factory');
const DocumentService = require('../../services/document.service');
const lab = exports.lab = Lab.script(), before = lab.before, after = lab.after, expect = Code.expect, suite = lab.suite, test = lab.test;
suite('Crud Get All Handler', () => {
    const server = new Hapi.Server();
    const curdCoreHandler = new Handler.default();
    const documentServiceFactory = new DocumentServiceFactory.default();
    const documentService = new DocumentService.default();
    const options = {
        collectionName: 'test',
        schema: {},
    };
    let stub;
    before((next) => {
        curdCoreHandler.setServer(server);
        documentService.setServer(server);
        documentServiceFactory.setServer(server);
        stub = Sinon.stub(documentServiceFactory, 'getDocumentService', () => {
            return documentService;
        });
        ObjectPath.ensureExists(server, 'settings.app.services', {});
        server.settings.app.services.documentServiceFactory = documentServiceFactory;
        next();
    });
    test('Handler', (next) => {
        const sampleTotal = 10;
        const sampleJson = [{ _id: 'test' }];
        const route = {};
        const result = curdCoreHandler.handlerInit(route, options);
        expect(result).to.be.a.function();
        const stub = Sinon.stub(documentService, 'findAll', (query, projs, callback) => {
            callback(null, sampleJson);
        });
        const stub1 = Sinon.stub(documentService, 'findAllCount', (query, callback) => {
            callback(null, sampleTotal);
        });
        const spy = Sinon.spy((res) => {
            stub.restore();
            stub1.restore();
            expect(res.results).to.deep.equal(sampleJson);
            expect(res.meta.total).to.be.equal(sampleTotal);
            expect(spy.called).to.be.true();
            next();
        });
        const request = {
            query: {}
        };
        result(request, spy);
    });
    test('Handler - error', (next) => {
        const route = {};
        const result = curdCoreHandler.handlerInit(route, options);
        expect(result).to.be.a.function();
        const stub = Sinon.stub(documentService, 'findAll', (query, projs, callback) => {
            callback('error');
        });
        const spy = Sinon.spy(() => {
            stub.restore();
            expect(spy.calledWith(Boom.badImplementation('error'))).to.be.true();
            expect(spy.called).to.be.true();
            next();
        });
        const request = {
            query: {}
        };
        result(request, spy);
    });
    after((next) => {
        stub.restore();
        next();
    });
});
