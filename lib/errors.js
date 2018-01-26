"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidPropError extends Error {
    constructor(typeName, key) {
        super(`In property ${key}: ${typeName} is not a primitive type nor a Typegoose schema (Not extending it).`);
    }
}
exports.InvalidPropError = InvalidPropError;
class NotNumberTypeError extends Error {
    constructor(key) {
        super(`Type of ${key} property is not a number.`);
    }
}
exports.NotNumberTypeError = NotNumberTypeError;
class NotStringTypeError extends Error {
    constructor(key) {
        super(`Type of ${key} property is not a string.`);
    }
}
exports.NotStringTypeError = NotStringTypeError;
class NoMetadataError extends Error {
    constructor(key) {
        super(`There is no metadata for the "${key}" property.` +
            'Check if emitDecoratorMetadata is enabled in tsconfig.json' +
            'or check if you\'ve declared a sub document\'s class after usage.');
    }
}
exports.NoMetadataError = NoMetadataError;
//# sourceMappingURL=errors.js.map