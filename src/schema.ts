import * as mongoose from 'mongoose';

let schema;

export function getSchema() {
  return schema;
}

export function setSchema(s) {
  schema = s;
}
