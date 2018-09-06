/**
 * Defines an index (most likely compound) for this schema.
 * @param options Options to pass to MongoDB driver's createIndex() function
 * @param options.expires Mongoose-specific syntactic sugar, uses ms to convert
 *   expires option into seconds for the expireAfterSeconds in the above link.
 */
export const index = (fields: any, options?: { expires?: string, [others: string]: any }) => {
  return (constructor) => {
    const indices = Reflect.getMetadata('typegoose:indices', constructor) || [];
    indices.push({ fields, options });
    Reflect.defineMetadata('typegoose:indices', indices, constructor);
  };
};
