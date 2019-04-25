/** @format */
export declare class InvalidPropError extends Error {
    constructor(typeName: string, key: string);
}
export declare class NotNumberTypeError extends Error {
    constructor(key: string);
}
export declare class NotStringTypeError extends Error {
    constructor(key: string);
}
export declare class NoMetadataError extends Error {
    constructor(key: string);
}
