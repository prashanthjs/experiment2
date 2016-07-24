"use strict";
const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
const Service = require('../../services/store.db.service');
const lab = exports.lab = Lab.script(), expect = Code.expect, suite = lab.suite, test = lab.test;
suite('Store Db Service', () => {
    const service = new Service.default();
    test('Find by email', (next) => {
        const sampleResponse = {
            _id: 'test'
        };
        const model = service.getModel();
        const stub = Sinon.stub(model, 'findById', (id, projection, done) => {
            expect(id).to.be.deep.equal('test');
            done(null, sampleResponse);
        });
        const spy = Sinon.spy(() => {
            expect({
                _id: 'test'
            }).to.not.equal(sampleResponse);
            stub.restore();
            expect(spy.called).to.be.true();
            next();
        });
        service.findById('test', null, spy);
    });
});
