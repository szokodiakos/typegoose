/** @format */
import { MongooseDocument } from 'mongoose';
declare type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
declare type ClassDecorator = (constructor: any) => void;
declare type HookNextFn = (err?: Error) => void;
declare type PreDoneFn = () => void;
declare type TypegooseDoc<T> = T & MongooseDocument;
declare type DocumentPreSerialFn<T> = (this: TypegooseDoc<T>, next: HookNextFn) => void;
declare type DocumentPreParallelFn<T> = (this: TypegooseDoc<T>, next: HookNextFn, done: PreDoneFn) => void;
declare type SimplePreSerialFn<T> = (next: HookNextFn, docs?: any[]) => void;
declare type SimplePreParallelFn<T> = (next: HookNextFn, done: PreDoneFn) => void;
declare type ModelPostFn<T> = (result: any, next?: HookNextFn) => void;
declare type PostNumberResponse<T> = (result: number, next?: HookNextFn) => void;
declare type PostSingleResponse<T> = (result: TypegooseDoc<T>, next?: HookNextFn) => void;
declare type PostMultipleResponse<T> = (result: TypegooseDoc<T>[], next?: HookNextFn) => void;
declare type PostNumberWithError<T> = (error: Error, result: number, next: HookNextFn) => void;
declare type PostSingleWithError<T> = (error: Error, result: TypegooseDoc<T>, next: HookNextFn) => void;
declare type PostMultipleWithError<T> = (error: Error, result: TypegooseDoc<T>[], net: HookNextFn) => void;
declare type SingleMethod = 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | DocumentMethod;
declare type MultipleMethod = 'find' | 'update';
export declare const pre: {
    <T>(method: "init" | "validate" | "save" | "remove", fn: DocumentPreSerialFn<T>): ClassDecorator;
    <T>(method: "init" | "validate" | "save" | "remove", parallel: boolean, fn: DocumentPreParallelFn<T>): ClassDecorator;
    <T>(method: "count" | "find" | "findOne" | "findOneAndRemove" | "findOneAndUpdate" | "update" | "insertMany" | "updateOne" | "updateMany", fn: SimplePreSerialFn<T>): ClassDecorator;
    <T>(method: "count" | "find" | "findOne" | "findOneAndRemove" | "findOneAndUpdate" | "update" | "insertMany" | "updateOne" | "updateMany", parallel: boolean, fn: SimplePreParallelFn<T>): ClassDecorator;
};
export declare const post: {
    <T>(method: "count", fn: PostNumberResponse<T>): ClassDecorator;
    <T>(method: "count", fn: PostNumberWithError<T>): ClassDecorator;
    <T>(method: SingleMethod, fn: PostSingleResponse<T>): ClassDecorator;
    <T>(method: SingleMethod, fn: PostSingleWithError<T>): ClassDecorator;
    <T>(method: MultipleMethod, fn: PostMultipleResponse<T>): ClassDecorator;
    <T>(method: MultipleMethod, fn: PostMultipleWithError<T>): ClassDecorator;
    <T>(method: "insertMany", fn: ModelPostFn<T> | PostMultipleResponse<T>): ClassDecorator;
};
export {};
