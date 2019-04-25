"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines an index (most likely compound) for this schema.
 * @param options Options to pass to MongoDB driver's createIndex() function
 */
exports.index = function (fields, options) {
    return function (constructor) {
        var indices = Reflect.getMetadata('typegoose:indices', constructor) || [];
        indices.push({ fields: fields, options: options });
        Reflect.defineMetadata('typegoose:indices', indices, constructor);
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBOERkOzs7R0FHRztBQUNVLFFBQUEsS0FBSyxHQUFHLFVBQUMsTUFBVyxFQUFFLE9BQXNCO0lBQ3ZELE9BQU8sVUFBQyxXQUFnQjtRQUN0QixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1RSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BFLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9