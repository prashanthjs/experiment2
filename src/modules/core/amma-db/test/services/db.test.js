"use strict";
const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
const Mongoose = require('mongoose');
let lab = exports.lab = Lab.script(), before = lab.before, beforeEach = lab.beforeEach, afterEach = lab.afterEach, after = lab.after, expect = Code.expect, suite = lab.suite, test = lab.test;
suite('Test DB Server', () => {
    let server;
    suite('Test ConnectDB function', () => {
        beforeEach((next) => {
            server = new Hapi.Server({
                app: {
                    db: {
                        uri: 'test',
                        options: {}
                    }
                }
            });
            next();
        });
        test('Successful connection', (next) => {
            let stub = Sinon.stub(Mongoose, 'connect', function (uri, options, done) {
                return done();
            });
            server.register({ register: AmmaDb }, (err) => {
                expect(err).to.equal(undefined);
                stub.restore();
                next();
            });
        });
        test('Unsuccessful connection', (next) => {
            let stub = Sinon.stub(Mongoose, 'connect', function (uri, options, done) {
                return done('database error');
            });
            server.register({ register: AmmaDb }, (err) => {
                expect(err).to.be.exist();
                stub.restore();
                next();
            });
        });
    });
    suite('Test disconnectDb function', () => {
        beforeEach((next) => {
            server = new Hapi.Server({
                app: {
                    db: {
                        uri: 'test',
                        options: {}
                    }
                }
            });
            next();
        });
        test('Disconnect DB', (next) => {
            let spy = Sinon.spy();
            let stub1 = Sinon.stub(Mongoose, 'connect', function (uri, options, done) {
                return done();
            });
            let stub2 = Sinon.stub(Mongoose, 'disconnect', (cb) => {
                return cb();
            });
            server.register({ register: AmmaDb }, (err) => {
                expect(err).to.equal(undefined);
                server.methods.disconnectDb(spy);
                expect(spy.called).to.be.true();
                stub1.restore();
                stub2.restore();
                return next();
            });
        });
    });
});
