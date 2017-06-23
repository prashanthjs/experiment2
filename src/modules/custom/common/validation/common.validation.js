"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
module.exports = {
    addon: Joi.object().optional().allow(null)
};
