"use strict";
class DbParser {
    constructor(schema) {
        this.schema = schema;
    }
    parse(options) {
        this.page = 1;
        if (options.page) {
            let page = options.page;
            if (typeof page === 'string') {
                this.page = parseInt(page);
            }
            else {
                this.page = page;
            }
        }
        this.skip = 0;
        if (options.skip) {
            let skip = options.skip;
            if (typeof skip === 'string') {
                this.skip = parseInt(skip);
            }
            else {
                this.skip = skip;
            }
        }
        this.pageSize = 1000;
        if (options.pageSize) {
            let pageSize = options.pageSize;
            if (typeof pageSize === 'string') {
                this.pageSize = parseInt(pageSize);
            }
            else {
                this.pageSize = pageSize;
            }
        }
        this.filter = {};
        if (options.filter) {
            let filters = options.filter;
            if (typeof filters === 'string') {
                this.filter = this.parseAndReturnFilters(JSON.parse(filters));
            }
            else {
                this.filter = this.parseAndReturnFilters(filters);
            }
            console.log(this.filter);
        }
        this.sort = {};
        if (options.sort) {
            let sort = options.sort;
            if (typeof sort === 'string') {
                this.sort = this.parseAndReturnSort(JSON.parse(sort));
            }
            else {
                this.sort = this.parseAndReturnSort(sort);
            }
        }
    }
    parseAndReturnFilters(filters, logic = 'and') {
        let ret = {};
        let tempFilters = [];
        if (!(filters instanceof Array)) {
            tempFilters[0] = filters;
        }
        else {
            tempFilters = filters;
        }
        let temp = [];
        for (let i = 0; i < tempFilters.length; i++) {
            if (tempFilters[i].filters) {
                temp.push(this.parseAndReturnFilters(tempFilters[i].filters, tempFilters[i].logic));
            }
            else {
                temp.push(this.parseAndReturnFilter(tempFilters[i]));
            }
        }
        ret['$' + logic] = temp;
        return ret;
    }
    parseAndReturnFilter(filter) {
        let temp = {};
        temp[filter.field] = this.parseAndReturnValue(filter.field, filter.value, filter.operator);
        return temp;
    }
    parseAndReturnSort(sorts) {
        let ret = {};
        let tempSorts = [];
        if (!(sorts instanceof Array)) {
            tempSorts[0] = sorts;
        }
        else {
            tempSorts = sorts;
        }
        for (let i = 0; i < tempSorts.length; i++) {
            if (tempSorts[i].dir) {
                ret[tempSorts[i].field] = tempSorts[i].dir;
            }
        }
        return ret;
    }
    getParsedObject(key) {
        let field = this.schema.path(key);
        if (field && field.options) {
            return field.options;
        }
        return false;
    }
    getType(field) {
        let obj = this.getParsedObject(field);
        let type = 'none';
        if (obj) {
            switch (obj.type) {
                case String:
                    type = 'string';
                    break;
                case Number:
                    type = 'number';
                    break;
                case Date:
                    type = 'date';
                    break;
                case Boolean:
                    type = 'boolean';
                    break;
                default:
                    type = 'none';
                    break;
            }
        }
        return type;
    }
    parseAndReturnValue(field, value, operator = 'eq') {
        let type = this.getType(field);
        switch (operator) {
            case 'contains':
                value = { $regex: new RegExp(value, 'i') };
                break;
            case 'doesnotcontain':
                value = { $ne: { $regex: new RegExp(value, 'i') } };
                break;
            case 'startswith':
                value = { $regex: new RegExp('^' + value, 'i') };
                break;
            case 'endswith':
                value = { $regex: new RegExp(value + '$', 'i') };
                break;
            case 'eq':
                if (type === 'string') {
                    value = { $regex: new RegExp('^' + value + '$', 'i') };
                }
                break;
            case 'ne':
                value = { $ne: value };
                break;
            case 'gt':
                value = { $gt: value };
                break;
            case 'gte':
                value = { $gte: value };
                break;
            case 'lt':
                value = { $lt: value };
                break;
            case 'lte':
                value = { $lte: value };
                break;
            default:
                break;
        }
        return value;
    }
}
exports.DbParser = DbParser;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DbParser;
