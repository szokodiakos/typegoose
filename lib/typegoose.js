"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const _ = require("lodash");
const mongoose_1 = require("./mongoose");
// For types.
const mongoose = require("mongoose");
const data_1 = require("./data");
__export(require("./method"));
__export(require("./prop"));
__export(require("./hooks"));
__export(require("./plugin"));
var utils_1 = require("./utils");
exports.getClassForDocument = utils_1.getClassForDocument;
class Typegoose {
    getModelForClass(t, { existingMongoose, schemaOptions, existingConnection } = {}) {
        const name = this.constructor.name;
        if (!data_1.models[name]) {
            this.setModelForClass(t, { existingMongoose, schemaOptions, existingConnection });
        }
        return data_1.models[name];
    }
    setModelForClass(t, { existingMongoose, schemaOptions, existingConnection } = {}) {
        const name = this.constructor.name;
        // get schema of current model
        let sch = this.buildSchema(existingMongoose || mongoose_1.mongoose, name, schemaOptions);
        // get parents class name
        let parentCtor = Object.getPrototypeOf(this.constructor.prototype).constructor;
        // iterate trough all parents
        while (parentCtor && parentCtor.name !== 'Typegoose' && parentCtor.name !== 'Object') {
            // extend schema
            sch = this.buildSchema(existingMongoose || mongoose_1.mongoose, parentCtor.name, schemaOptions, sch);
            // next parent
            parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
        }
        let model = mongoose_1.mongoose.model.bind(mongoose_1.mongoose);
        if (existingConnection) {
            model = existingConnection.model.bind(existingConnection);
        }
        else if (existingMongoose) {
            model = existingMongoose.model.bind(existingMongoose);
        }
        data_1.models[name] = model(name, sch);
        data_1.constructors[name] = this.constructor;
        return data_1.models[name];
    }
    buildSchema(mongooseInstance, name, schemaOptions, sch) {
        const Schema = mongooseInstance.Schema;
        if (!sch) {
            sch = schemaOptions ?
                new Schema(data_1.schema[name], schemaOptions) :
                new Schema(data_1.schema[name]);
        }
        else {
            sch.add(data_1.schema[name]);
        }
        const staticMethods = data_1.methods.staticMethods[name];
        if (staticMethods) {
            sch.statics = Object.assign(staticMethods, sch.statics || {});
        }
        else {
            sch.statics = sch.statics || {};
        }
        const instanceMethods = data_1.methods.instanceMethods[name];
        if (instanceMethods) {
            sch.methods = Object.assign(instanceMethods, sch.methods || {});
        }
        else {
            sch.methods = sch.methods || {};
        }
        if (data_1.hooks[name]) {
            const preHooks = data_1.hooks[name].pre;
            preHooks.forEach((preHookArgs) => {
                sch.pre(...preHookArgs);
            });
            const postHooks = data_1.hooks[name].post;
            postHooks.forEach((postHookArgs) => {
                sch.post(...postHookArgs);
            });
        }
        if (data_1.plugins[name]) {
            _.forEach(data_1.plugins[name], (plugin) => {
                sch.plugin(plugin.mongoosePlugin, plugin.options);
            });
        }
        const getterSetters = data_1.virtuals[name];
        _.forEach(getterSetters, (value, key) => {
            if (value.get) {
                sch.virtual(key).get(value.get);
            }
            if (value.set) {
                sch.virtual(key).set(value.set);
            }
        });
        return sch;
    }
}
exports.Typegoose = Typegoose;
// By default, use our version of the mongoose implementation.
mongoose_1.useMongooseImplementation(mongoose);
//# sourceMappingURL=typegoose.js.map