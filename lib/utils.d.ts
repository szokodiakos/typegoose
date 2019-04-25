/** @format */
import * as mongoose from 'mongoose';
export declare const isPrimitive: (Type: any) => boolean;
export declare const isObject: (Type: any) => boolean;
export declare const isNumber: (Type: any) => boolean;
export declare const isString: (Type: any) => boolean;
export declare const initAsObject: (name: any, key: any) => void;
export declare const initAsArray: (name: any, key: any) => void;
export declare const getClassForDocument: (document: mongoose.Document) => any;
