/** @format */
import { ObjectID } from 'bson';
export declare type Func = (...args: any[]) => any;
export declare type RequiredType = boolean | [boolean, string] | string | Func | [Func, string];
export declare type ValidatorFunction = (value: any) => boolean | Promise<boolean>;
export declare type Validator = ValidatorFunction | RegExp | {
    validator: ValidatorFunction;
    message?: string;
};
export interface BasePropOptions {
    required?: RequiredType;
    enum?: string[] | object;
    default?: any;
    validate?: Validator | Validator[];
    unique?: boolean;
    index?: boolean;
    sparse?: boolean;
    expires?: string | number;
    _id?: boolean;
}
export interface PropOptions extends BasePropOptions {
    ref?: any;
}
export interface ValidateNumberOptions {
    min?: number | [number, string];
    max?: number | [number, string];
}
export interface ValidateStringOptions {
    minlength?: number | [number, string];
    maxlength?: number | [number, string];
    match?: RegExp | [RegExp, string];
}
export interface TransformStringOptions {
    lowercase?: boolean;
    uppercase?: boolean;
    trim?: boolean;
}
export interface VirtualOptions {
    ref: string;
    localField: string;
    foreignField: string;
}
export declare type PropOptionsWithNumberValidate = PropOptions & ValidateNumberOptions;
export declare type PropOptionsWithStringValidate = PropOptions & TransformStringOptions & ValidateStringOptions;
export declare type PropOptionsWithValidate = PropOptionsWithNumberValidate | PropOptionsWithStringValidate | VirtualOptions;
export declare const prop: (options?: PropOptionsWithValidate) => (target: any, key: string) => void;
export interface ArrayPropOptions extends BasePropOptions {
    items?: any;
    itemsRef?: any;
}
export declare const arrayProp: (options: ArrayPropOptions) => (target: any, key: string) => void;
export declare type Ref<T> = T | ObjectID;
