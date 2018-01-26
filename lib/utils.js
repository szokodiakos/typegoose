"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const data_1 = require("./data");
exports.isPrimitive = (Type) => _.includes(['String', 'Number', 'Boolean', 'Date'], Type.name);
exports.isNumber = (Type) => Type.name === 'Number';
exports.isString = (Type) => Type.name === 'String';
exports.initAsObject = (name, key) => {
    if (!data_1.schema[name]) {
        data_1.schema[name] = {};
    }
    if (!data_1.schema[name][key]) {
        data_1.schema[name][key] = {};
    }
};
exports.initAsArray = (name, key) => {
    if (!data_1.schema[name]) {
        data_1.schema[name] = {};
    }
    if (!data_1.schema[name][key]) {
        data_1.schema[name][key] = [{}];
    }
};
exports.getClassForDocument = (document) => {
    const modelName = document.constructor.modelName;
    return data_1.constructors[modelName];
};
//# sourceMappingURL=utils.js.map