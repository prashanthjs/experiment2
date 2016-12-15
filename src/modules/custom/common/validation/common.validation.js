"use strict";
const Joi = require('joi');
module.exports = {
    addon: Joi.object().optional().allow(null)
};
