"use strict";
/** @format */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var data_1 = require("./data");
__export(require("./method"));
__export(require("./prop"));
__export(require("./hooks"));
__export(require("./plugin"));
__export(require("."));
var utils_1 = require("./utils");
exports.getClassForDocument = utils_1.getClassForDocument;
var Typegoose = /** @class */ (function () {
    function Typegoose() {
    }
    Typegoose.prototype.getModelForClass = function (t, _a) {
        var _b = _a === void 0 ? {} : _a, existingMongoose = _b.existingMongoose, schemaOptions = _b.schemaOptions, existingConnection = _b.existingConnection;
        var name = this.constructor.name;
        if (!data_1.models[name]) {
            this.setModelForClass(t, {
                existingMongoose: existingMongoose,
                schemaOptions: schemaOptions,
                existingConnection: existingConnection,
            });
        }
        return data_1.models[name];
    };
    Typegoose.prototype.setModelForClass = function (t, _a) {
        var _b = _a === void 0 ? {} : _a, existingMongoose = _b.existingMongoose, schemaOptions = _b.schemaOptions, existingConnection = _b.existingConnection;
        var name = this.constructor.name;
        // get schema of current model
        var sch = this.buildSchema(t, name, schemaOptions);
        // get parents class name
        var parentCtor = Object.getPrototypeOf(this.constructor.prototype).constructor;
        // iterate trough all parents
        while (parentCtor && parentCtor.name !== 'Typegoose' && parentCtor.name !== 'Object') {
            // extend schema
            sch = this.buildSchema(t, parentCtor.name, schemaOptions, sch);
            // next parent
            parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
        }
        var model = mongoose.model.bind(mongoose);
        if (existingConnection) {
            model = existingConnection.model.bind(existingConnection);
        }
        else if (existingMongoose) {
            model = existingMongoose.model.bind(existingMongoose);
        }
        data_1.models[name] = model(name, sch);
        data_1.constructors[name] = this.constructor;
        return data_1.models[name];
    };
    Typegoose.prototype.buildSchema = function (t, name, schemaOptions, sch) {
        var Schema = mongoose.Schema;
        if (!sch) {
            sch = schemaOptions ? new Schema(data_1.schema[name], schemaOptions) : new Schema(data_1.schema[name]);
        }
        else {
            sch.add(data_1.schema[name]);
        }
        var staticMethods = data_1.methods.staticMethods[name];
        if (staticMethods) {
            sch.statics = Object.assign(staticMethods, sch.statics || {});
        }
        else {
            sch.statics = sch.statics || {};
        }
        var instanceMethods = data_1.methods.instanceMethods[name];
        if (instanceMethods) {
            sch.methods = Object.assign(instanceMethods, sch.methods || {});
        }
        else {
            sch.methods = sch.methods || {};
        }
        if (data_1.hooks[name]) {
            var preHooks = data_1.hooks[name].pre;
            preHooks.forEach(function (preHookArgs) {
                var _a;
                (_a = sch).pre.apply(_a, preHookArgs);
            });
            var postHooks = data_1.hooks[name].post;
            postHooks.forEach(function (postHookArgs) {
                var _a;
                (_a = sch).post.apply(_a, postHookArgs);
            });
        }
        if (data_1.plugins[name]) {
            for (var _i = 0, _a = data_1.plugins[name]; _i < _a.length; _i++) {
                var plugin = _a[_i];
                sch.plugin(plugin.mongoosePlugin, plugin.options);
            }
        }
        var getterSetters = data_1.virtuals[name];
        if (getterSetters) {
            for (var _b = 0, _c = Object.keys(getterSetters); _b < _c.length; _b++) {
                var key = _c[_b];
                if (getterSetters[key].get) {
                    sch.virtual(key, getterSetters[key].options).get(getterSetters[key].get);
                }
                if (getterSetters[key].set) {
                    sch.virtual(key, getterSetters[key].options).set(getterSetters[key].set);
                }
            }
        }
        var indices = Reflect.getMetadata('typegoose:indices', t) || [];
        for (var _d = 0, indices_1 = indices; _d < indices_1.length; _d++) {
            var index = indices_1[_d];
            sch.index(index.fields, index.options);
        }
        return sch;
    };
    return Typegoose;
}());
exports.Typegoose = Typegoose;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWdvb3NlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3R5cGVnb29zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw0QkFBMEI7QUFDMUIsbUNBQXFDO0FBRXBDLFFBQWdCLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFFM0MsK0JBQXlGO0FBRXpGLDhCQUF5QjtBQUN6Qiw0QkFBdUI7QUFDdkIsNkJBQXdCO0FBQ3hCLDhCQUF5QjtBQUN6Qix1QkFBa0I7QUFDbEIsaUNBQThDO0FBQXJDLHNDQUFBLG1CQUFtQixDQUFBO0FBVzVCO0lBQUE7SUFzR0EsQ0FBQztJQXJHQyxvQ0FBZ0IsR0FBaEIsVUFBb0IsQ0FBSSxFQUFFLEVBQXFGO1lBQXJGLDRCQUFxRixFQUFuRixzQ0FBZ0IsRUFBRSxnQ0FBYSxFQUFFLDBDQUFrQjtRQUM3RSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZCLGdCQUFnQixrQkFBQTtnQkFDaEIsYUFBYSxlQUFBO2dCQUNiLGtCQUFrQixvQkFBQTthQUNuQixDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sYUFBTSxDQUFDLElBQUksQ0FBd0IsQ0FBQztJQUM3QyxDQUFDO0lBRUQsb0NBQWdCLEdBQWhCLFVBQW9CLENBQUksRUFBRSxFQUFxRjtZQUFyRiw0QkFBcUYsRUFBbkYsc0NBQWdCLEVBQUUsZ0NBQWEsRUFBRSwwQ0FBa0I7UUFDN0UsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFFbkMsOEJBQThCO1FBQzlCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMs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