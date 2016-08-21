export = {
    categoryDbService: {
        cls: require('../services/category.db.service').default
    },
    categoryValidator: {
        cls: require('../services/category.validator').default,
        methods: {
            categoryValidator: {
                methodName: 'categoryValidator'
            }
        }
    }
};