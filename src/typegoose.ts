import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { schema, mongooseSchema, models, methods, virtuals, hooks, plugins, constructors } from './data';

export * from './method';
export * from './prop';
export * from './hooks';
export * from './plugin';
export { getClassForDocument } from './utils';

export type InstanceType<T> = T & mongoose.Document;
export type ModelType<T> = mongoose.Model<InstanceType<T>>;

export interface GetModelForClassOptions {
  existingMongoose?: mongoose.Mongoose;
  schemaOptions?: mongoose.SchemaOptions;
  existingConnection?: mongoose.Connection;
}

export interface Constructor<T> {
  new(): T;
}

export function getSchemaForClass(
  constructor,
  { existingMongoose, schemaOptions, existingConnection }: GetModelForClassOptions = {},
) {
  const name = (constructor as any).name as string;
  if (!mongooseSchema[name]) {
    const Schema = existingMongoose ?
      existingMongoose.Schema.bind(existingMongoose) :
      mongoose.Schema.bind(mongoose);

    const sch = schemaOptions ?
      new Schema(schema[name], schemaOptions) :
      new Schema(schema[name]);

    const staticMethods = methods.staticMethods[name];
    sch.statics = staticMethods;

    const instanceMethods = methods.instanceMethods[name];
    sch.methods = instanceMethods || {};

    if (hooks[name]) {
      const preHooks = hooks[name].pre;
      preHooks.forEach((preHookArgs) => {
        sch.pre(...preHookArgs);
      });
      const postHooks = hooks[name].post;
      postHooks.forEach((postHookArgs) => {
        sch.post(...postHookArgs);
      });
    }

    if (plugins[name]) {
      _.forEach(plugins[name], (plugin) => {
        sch.plugin(plugin.mongoosePlugin, plugin.options);
      });
      let model = mongoose.model.bind(mongoose);
      if (existingConnection) {
        model = existingConnection.model.bind(existingConnection);
      } else if (existingMongoose) {
        model = existingMongoose.model.bind(existingMongoose);
      }

      models[name] = model(name, sch);
    }

    const getterSetters = virtuals[name];
    _.forEach(getterSetters, (value, key) => {
      if (value.get) {
        sch.virtual(key).get(value.get);
      }
      if (value.set) {
        sch.virtual(key).set(value.set);
      }
    });

    mongooseSchema[name] = sch;
    constructors[name] = constructor;
  }

  return mongooseSchema[name] as mongoose.Schema;
}

export function getModelForClass<T, U extends Constructor<T>>(
  constructor: U, { existingMongoose, schemaOptions }: GetModelForClassOptions = {},
) {
  const name = (constructor as any).name as string;
  if (!models[name]) {
    const model = existingMongoose ?
      existingMongoose.model.bind(existingMongoose) :
      mongoose.model.bind(mongoose);

    const sch = getSchemaForClass(constructor, { existingMongoose, schemaOptions });
    models[name] = model(name, sch);
  }

  return models[name] as ModelType<T> & U;
}
