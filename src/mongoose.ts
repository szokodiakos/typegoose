/*
* For the frontend, we don't care about types in the schema, because we don't use the schemas.
* For the backend, loading typegoose.ts will set those to the right values.
*/
export let Mixed    = String;
export let ObjectId = String;

// This one is only needed in the server and is automatically set when loading typegoose.ts.
export let mongoose;

export function useMongooseImplementation(implementation) {
  mongoose = implementation;
  Mixed    = implementation.Schema.Types.Mixed;
  ObjectId = implementation.Schema.Types.ObjectId;
}
