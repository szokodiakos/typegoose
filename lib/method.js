"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const baseMethod = (target, key, descriptor, methodType) => {
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    let name;
    if (methodType === 'instanceMethods') {
        name = target.constructor.name;
    }
    if (methodType === 'staticMethods') {
        name = target.name;
    }
    if (!data_1.methods[methodType][name]) {
        data_1.methods[methodType][name] = {};
    }
    const method = descriptor.value;
    data_1.methods[methodType][name] = Object.assign({}, data_1.methods[methodType][name], { [key]: method });
};
exports.staticMethod = (target, key, descriptor) => baseMethod(target, key, descriptor, 'staticMethods');
exports.instanceMethod = (target, key, descriptor) => baseMethod(target, key, descriptor, 'instanceMethods');
//# sourceMappingURL=method.js.map