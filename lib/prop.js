"use strict";
/** @format */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var data_1 = require("./data");
var utils_1 = require("./utils");
var errors_1 = require("./errors");
var isWithStringValidate = function (options) {
    return options.minlength || options.maxlength || options.match;
};
var isWithStringTransform = function (options) {
    return options.lowercase || options.uppercase || options.trim;
};
var isWithNumberValidate = function (options) { return options.min || options.max; };
var baseProp = function (rawOptions, Type, target, key, isArray) {
    if (isArray === void 0) { isArray = false; }
    var name = target.constructor.name;
    var isGetterSetter = Object.getOwnPropertyDescriptor(target, key);
    if (isGetterSetter) {
        if (isGetterSetter.get) {
            if (!data_1.virtuals[name]) {
                data_1.virtuals[name] = {};
            }
            if (!data_1.virtuals[name][key]) {
                data_1.virtuals[name][key] = {};
            }
            data_1.virtuals[name][key] = __assign({}, data_1.virtuals[name][key], { get: isGetterSetter.get, options: rawOptions });
        }
        if (isGetterSetter.set) {
            if (!data_1.virtuals[name]) {
                data_1.virtuals[name] = {};
            }
            if (!data_1.virtuals[name][key]) {
                data_1.virtuals[name][key] = {};
            }
            data_1.virtuals[name][key] = __assign({}, data_1.virtuals[name][key], { set: isGetterSetter.set, options: rawOptions });
        }
        return;
    }
    if (isArray) {
        utils_1.initAsArray(name, key);
    }
    else {
        utils_1.initAsObject(name, key);
    }
    var ref = rawOptions.ref;
    if (typeof ref === 'string') {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { type: mongoose.Schema.Types.ObjectId, ref: ref });
        return;
    }
    else if (ref) {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], { type: mongoose.Schema.Types.ObjectId, ref: ref.name });
        return;
    }
    var itemsRef = rawOptions.itemsRef;
    if (itemsRef) {
        data_1.schema[name][key][0] = __assign({}, data_1.schema[name][key][0], { type: mongoose.Schema.Types.ObjectId, ref: itemsRef.name });
        return;
    }
    var enumOption = rawOptions.enum;
    if (enumOption) {
        if (!Array.isArray(enumOption)) {
            rawOptions.enum = Object.keys(enumOption).map(function (propKey) { return enumOption[propKey]; });
        }
    }
    // check for validation inconsistencies
    if (isWithStringValidate(rawOptions) && !utils_1.isString(Type)) {
        throw new errors_1.NotStringTypeError(key);
    }
    if (isWithNumberValidate(rawOptions) && !utils_1.isNumber(Type)) {
        throw new errors_1.NotNumberTypeError(key);
    }
    // check for transform inconsistencies
    if (isWithStringTransform(rawOptions) && !utils_1.isString(Type)) {
        throw new errors_1.NotStringTypeError(key);
    }
    var instance = new Type();
    var subSchema = data_1.schema[instance.constructor.name];
    if (!subSchema && !utils_1.isPrimitive(Type) && !utils_1.isObject(Type)) {
        throw new errors_1.InvalidPropError(Type.name, key);
    }
    var r = rawOptions["ref"], i = rawOptions["items"], options = __rest(rawOptions, ['ref', 'items']);
    if (utils_1.isPrimitive(Type)) {
        if (isArray) {
            data_1.schema[name][key] = __assign({}, data_1.schema[name][key][0], options, { type: [Type] });
            return;
        }
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], options, { type: Type });
        return;
    }
    // If the 'Type' is not a 'Primitive Type' and no subschema was found treat the type as 'Object'
    // so that mongoose can store it as nested document
    if (utils_1.isObject(Type) && !subSchema) {
        data_1.schema[name][key] = __assign({}, data_1.schema[name][key], options, { type: Object });
        return;
    }
    if (isArray) {
        data_1.schema[name][key][0] = __assign({}, data_1.schema[name][key][0], options, subSchema);
        return;
    }
    var Schema = mongoose.Schema;
    var supressSubschemaId = rawOptions._id === false;
    var virtualSchema = new Schema(__assign({}, subSchema), supressSubschemaId ? { _id: false } : {});
    var schemaInstanceMethods = data_1.methods.instanceMethods[instance.constructor.name];
    if (schemaInstanceMethods) {
        virtualSchema.methods = schemaInstanceMethods;
    }
    data_1.schema[name][key] = __assign({}, data_1.schema[name][key], options, { type: virtualSchema });
    return;
};
exports.prop = function (options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        var Type = Reflect.getMetadata('design:type', target, key);
        if (!Type) {
            throw new errors_1.NoMetadataError(key);
        }
        baseProp(options, Type, target, key);
    };
};
exports.arrayProp = function (options) { return function (target, key) {
    var Type = options.items;
    baseProp(options, Type, target, key, true);
}; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsbUNBQXFDO0FBRXJDLCtCQUFtRDtBQUNuRCxpQ0FBK0Y7QUFDL0YsbUNBQXFHO0FBMkRyRyxJQUFNLG9CQUFvQixHQUFHLFVBQUMsT0FBc0M7SUFDbEUsT0FBQSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUs7QUFBdkQsQ0FBdUQsQ0FBQztBQUUxRCxJQUFNLHFCQUFxQixHQUFHLFVBQUMsT0FBc0M7SUFDbkUsT0FBQSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLElBQUk7QUFBdEQsQ0FBc0QsQ0FBQztBQUV6RCxJQUFNLG9CQUFvQixHQUFHLFVBQUMsT0FBc0MsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBMUIsQ0FBMEIsQ0FBQztBQUVwRyxJQUFNLFFBQVEsR0FBRyxVQUFDLFVBQWUsRUFBRSxJQUFTLEVBQUUsTUFBVyxFQUFFLEdBQVEsRUFBRSxPQUFlO0lBQWYsd0JBQUEsRUFBQSxlQUFlO0lBQ2xGLElBQU0sSUFBSSxHQUFXLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQzdDLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEUsSUFBSSxjQUFjLEVBQUU7UUFDbEIsSUFBSSxjQUFjLENBQUMsR0FBRyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLGVBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDckI7WUFDRCxJQUFJLENBQUMsZUFBUSxDQUFDLElBQUksQ0FBQyxDQUFD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