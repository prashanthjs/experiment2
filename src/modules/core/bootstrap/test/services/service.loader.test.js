"use strict";
const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
const EventLoader = require('../../services/event.loader');
const MethodLoader = require('../../services/method.loader');
const HandlerLoader = require('../../services/handler.loader');
const ServiceLoader = require('../../services/service.loader');
const lab = exports.lab = Lab.script(), before = lab.before, expect = Code.expect, suite = lab.suite, test = lab.test;
class SampleClassWithServerMethod {
    setServer(server) {
        this.server = server;
    }
}
class SampleClassWithInit {
    init(next) {
        next();
    }
}
const SampleClassWithServerMethodConfig = [{
        cls: SampleClassWithServerMethod,
        name: 'testService'
    }];
const SampleClassWithServerMethodInitConfig = [{
        cls: SampleClassWithInit
    }];
suite('Service Loader', () => {
    const server = new Hapi.Server();
    const methodLoader = new MethodLoader.default();
    const eventLoader = new EventLoader.default();
    const handlerLoader = new HandlerLoader.default();
    const serviceLoader = new ServiceLoader.default();
    before((next) => {
        serviceLoader.setEventLoader(eventLoader);
        serviceLoader.setMethodLoader(methodLoader);
        serviceLoader.setHandlerLoader(handlerLoader);
        serviceLoader.setServer(server);
        next();
    });
    test('Load Services - with server method', (next) => {
        const spy = Sinon.spy(() => {
            expect(server.settings.app.services.testService).to.be.an.object();
            expect(spy.called).to.be.true();
            next();
        });
        serviceLoader.loadServices(SampleClassWithServerMethodConfig, spy);
    });
    test('Load Services - with init method', (next) => {
        const spy = Sinon.spy(() => {
            expect(spy.called).to.be.true();
            next();
        });
        serviceLoader.loadServices(SampleClassWithServerMethodInitConfig, spy);
    });
    test('Load Services - with empty array', (next) => {
        const spy = Sinon.spy(() => {
            expect(spy.called).to.be.true();
            next();
        });
        serviceLoader.loadServices([], spy);
    });
});
