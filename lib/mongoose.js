"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* For the frontend, we don't care about types in the schema, because we don't use the schemas.
* For the backend, loading typegoose.ts will set those to the right values.
*/
exports.Mixed = String;
exports.ObjectId = String;
function useMongooseImplementation(implementation) {
    exports.mongoose = implementation;
    exports.Mixed = implementation.Schema.Types.Mixed;
    exports.ObjectId = implementation.Schema.Types.ObjectId;
}
exports.useMongooseImplementation = useMongooseImplementation;
//# sourceMappingURL=mongoose.js.map