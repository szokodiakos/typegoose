"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const _ = require("lodash");
const data_1 = require("./data");
const utils_1 = require("./utils");
const errors_1 = require("./errors");
const isWithStringValidate = (options) => (options.minlength || options.maxlength || options.match);
const isWithNumberValidate = (options) => (options.min || options.max);
const baseProp = (rawOptions, Type, target, key, isArray = false) => {
    const name = target.constructor.name;
    const isGetterSetter = Object.getOwnPropertyDescriptor(target, key);
    if (isGetterSetter) {
        if (isGetterSetter.get) {
            if (!data_1.virtuals[name]) {
                data_1.virtuals[name] = {};
            }
            if (!data_1.virtuals[name][key]) {
                data_1.virtuals[name][key] = {};
            }
            data_1.virtuals[name][key] = Object.assign({}, data_1.virtuals[name][key], { get: isGetterSetter.get });
        }
        if (isGetterSetter.set) {
            if (!data_1.virtuals[name]) {
                data_1.virtuals[name] = {};
            }
            if (!data_1.virtuals[name][key]) {
                data_1.virtuals[name][key] = {};
            }
            data_1.virtuals[name][key] = Object.assign({}, data_1.virtuals[name][key], { set: isGetterSetter.set });
        }
        return;
    }
    if (isArray) {
        utils_1.initAsArray(name, key);
    }
    else {
        utils_1.initAsObject(name, key);
    }
    const ref = rawOptions.ref;
    if (ref) {
        data_1.schema[name][key] = Object.assign({}, data_1.schema[name][key], { type: mongoose.Schema.Types.ObjectId, ref: ref.name });
        return;
    }
    const itemsRef = rawOptions.itemsRef;
    if (itemsRef) {
        data_1.schema[name][key][0] = Object.assign({}, data_1.schema[name][key][0], { type: mongoose.Schema.Types.ObjectId, ref: itemsRef.name });
        return;
    }
    const enumOption = rawOptions.enum;
    if (enumOption) {
        if (!Array.isArray(enumOption)) {
            rawOptions.enum = Object.keys(enumOption).map((propKey) => enumOption[propKey]);
        }
    }
    // check for validation inconsistencies
    if (isWithStringValidate(rawOptions) && !utils_1.isString(Type)) {
        throw new errors_1.NotStringTypeError(key);
    }
    if (isWithNumberValidate(rawOptions) && !utils_1.isNumber(Type)) {
        throw new errors_1.NotNumberTypeError(key);
    }
    const instance = new Type();
    const subSchema = data_1.schema[instance.constructor.name];
    if (!subSchema && !utils_1.isPrimitive(Type)) {
        throw new errors_1.InvalidPropError(Type.name, key);
    }
    const options = _.omit(rawOptions, ['ref', 'items']);
    if (utils_1.isPrimitive(Type)) {
        if (isArray) {
            data_1.schema[name][key][0] = Object.assign({}, data_1.schema[name][key][0], options, { type: Type });
            return;
        }
        data_1.schema[name][key] = Object.assign({}, data_1.schema[name][key], options, { type: Type });
        return;
    }
    if (isArray) {
        data_1.schema[name][key][0] = Object.assign({}, data_1.schema[name][key][0], options, subSchema);
        return;
    }
    data_1.schema[name][key] = Object.assign({}, data_1.schema[name][key], options, subSchema);
    return;
};
exports.prop = (options = {}) => (target, key) => {
    const Type = Reflect.getMetadata('design:type', target, key);
    if (!Type) {
        throw new errors_1.NoMetadataError(key);
    }
    baseProp(options, Type, target, key);
};
exports.arrayProp = (options) => (target, key) => {
    const Type = options.items;
    baseProp(options, Type, target, key, true);
};
//# sourceMappingURL=prop.js.map