import 'reflect-metadata';
import * as _ from 'lodash';

// For types.
import * as mongoose from 'mongoose';

import { schema, models, methods, virtuals, hooks, plugins, constructors } from './data';
import { setSchema } from './schema';

export * from './method';
export * from './prop';
export * from './hooks';
export * from './plugin';
export { getClassForDocument } from './utils';

export type InstanceType<T> = T & mongoose.Document;
export type ModelType<T> = mongoose.Model<InstanceType<T>> & T;

export interface GetModelForClassOptions {
  existingMongoose?: mongoose.Mongoose;
  schemaOptions?: mongoose.SchemaOptions;
  existingConnection?: mongoose.Connection;
}

export class Typegoose {
  getModelForClass<T>(t: T, { existingMongoose, schemaOptions, existingConnection }: GetModelForClassOptions = {}) {
    const name = this.constructor.name;
    if (!models[name]) {
      this.setModelForClass(t, { existingMongoose, schemaOptions, existingConnection });
    }

    return models[name] as ModelType<this> & T;
  }

  setModelForClass<T>(t: T, { existingMongoose, schemaOptions, existingConnection }: GetModelForClassOptions = {}) {
    const name = this.constructor.name;

    // get schema of current model
    let sch = this.buildSchema(existingMongoose || mongoose, name, schemaOptions);
    // get parents class name
    let parentCtor = Object.getPrototypeOf(this.constructor.prototype).constructor;
    // iterate trough all parents
    while (parentCtor && parentCtor.name !== 'Typegoose' && parentCtor.name !== 'Object') {
      // extend schema
      // next parent
      sch = this.buildSchema(existingMongoose || mongoose, parentCtor.name, schemaOptions, sch);
      parentCtor = Object.getPrototypeOf(parentCtor.prototype).constructor;
    }

    const model = (
      existingConnection
      ? existingConnection.model.bind(existingConnection)
      : (existingMongoose || mongoose).model.bind(existingMongoose || mongoose)
    );

    models[name] = model(name, sch);
    constructors[name] = this.constructor;

    return models[name] as ModelType<this> & T;
  }

  private buildSchema(mongooseInstance, name: string, schemaOptions, sch?: mongoose.Schema) {
    const Schema = mongooseInstance.Schema;

    if (!sch) {
      sch = schemaOptions ?
        new Schema(schema[name], schemaOptions) :
        new Schema(schema[name]);
    } else {
      sch.add(schema[name]);
    }

    const staticMethods = methods.staticMethods[name];
    if (staticMethods) {
      sch.statics = Object.assign(staticMethods, sch.statics || {});
    } else {
      sch.statics = sch.statics || {};
    }

    const instanceMethods = methods.instanceMethods[name];
    if (instanceMethods) {
      sch.methods = Object.assign(instanceMethods, sch.methods || {});
    } else {
      sch.methods = sch.methods || {};
    }

    if (hooks[name]) {
      const preHooks = hooks[name].pre;
      preHooks.forEach((preHookArgs) => {
        (sch as any).pre(...preHookArgs);
      });
      const postHooks = hooks[name].post;
      postHooks.forEach((postHookArgs) => {
        (sch as any).post(...postHookArgs);
      });
    }

    if (plugins[name]) {
      _.forEach(plugins[name], (plugin) => {
        sch.plugin(plugin.mongoosePlugin, plugin.options);
      });
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

    return sch;
  }
}

setSchema(mongoose.Schema);
