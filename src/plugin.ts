/** @format */

import { plugins } from './data';

export const plugin = (mongoosePlugin: any, options?: any) => (
  constructor: any
) => {
  const name = constructor.name;
  if (!plugins[name]) {
    plugins[name] = [];
  }
  plugins[name].push({ mongoosePlugin, options });
};
