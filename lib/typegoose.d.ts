/// <reference types="mongoose" />
import 'reflect-metadata';
import * as mongoose from 'mongoose';
export * from './method';
export * from './prop';
export * from './hooks';
export * from './plugin';
export { getClassForDocument } from './utils';
export declare type InstanceType<T> = T & mongoose.Document;
export declare type ModelType<T> = mongoose.Model<InstanceType<T>> & T;
export interface GetModelForClassOptions {
    existingMongoose?: mongoose.Mongoose;
    schemaOptions?: mongoose.SchemaOptions;
    existingConnection?: mongoose.Connection;
}
export declare class Typegoose {
    getModelForClass<T>(t: T, {existingMongoose, schemaOptions, existingConnection}?: GetModelForClassOptions): mongoose.Model<InstanceType<this>> & this & T;
    setModelForClass<T>(t: T, {existingMongoose, schemaOptions, existingConnection}?: GetModelForClassOptions): mongoose.Model<InstanceType<this>> & this & T;
    private buildSchema(mongooseInstance, name, schemaOptions, sch?);
}
