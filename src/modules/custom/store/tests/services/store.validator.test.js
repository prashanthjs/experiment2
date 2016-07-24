"use strict";
const Hapi = require('hapi');
const Code = require('code');
const Boom = require('boom');
const Lab = require('lab');
const Sinon = require('sinon');
const ObjectPath = require('object-path');
const Service = require('../../services/store.validator');
const DbService = require('../../services/store.db.service');
const lab = exports.lab = Lab.script(), before = lab.before, expect = Code.expect, suite = lab.suite, test = lab.test;
suite('Store Unique validator Service', () => {
    const service = new Service.default();
    const dbService = new DbService.default();
    const server = new Hapi.Server();
    before((next) => {
        ObjectPath.ensureExists(server, 'settings.app.services', {});
        server.settings.app.services.storeDbService = dbService;
        service.setServer(server);
        next();
    });
    test('Parent store - success', (next) => {
        const stub = Sinon.stub(dbService, 'findById', (email, projection, done) => {
            expect(email).to.be.deep.equal('test');
            done(null, { _id: 'test' });
        });
        const spy = Sinon.spy((error) => {
            stub.restore();
            expect(error).to.be.undefined();
            expect(spy.called).to.be.true();
            next();
        });
        service.storeValidator('test', spy);
    });
    test('Parent Store - failure', (next) => {
        const stub = Sinon.stub(dbService, 'findById', (email, projection, done) => {
            expect(email).to.be.deep.equal('test');
            done();
        });
        const spy = Sinon.spy((error) => {
            stub.restore();
            expect(spy.calledWith(Boom.forbidden('Invalid parent store provided'))).to.be.true();
            expect(spy.called).to.be.true();
            next();
        });
        service.storeValidator('test', spy);
    });
    test('Parent store validator Service - returned error', (next) => {
        const stub = Sinon.stub(dbService, 'findById', (email, projection, done) => {
            expect(email).to.be.deep.equal('test');
            done('error', { _id: 'test' });
        });
        const spy = Sinon.spy((error) => {
            stub.restore();
            expect(spy.calledWith(Boom.badImplementation('error'))).to.be.true();
            expect(spy.called).to.be.true();
            next();
        });
        service.storeValidator('test', spy);
    });
    test('Parent Store - success', (next) => {
        const spy = Sinon.spy((error) => {
            expect(error).to.be.undefined();
            expect(spy.called).to.be.true();
            next();
        });
        service.storeValidator(null, spy);
    });
});
