class PaymentMethodModule {
    static getConfig() {
        return require('./configs/index');
    }
}

module.exports = PaymentMethodModule;