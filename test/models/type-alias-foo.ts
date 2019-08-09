import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';
import { Bar } from './type-alias-bar1';

export class Foo extends Typegoose {
  @prop()
  public bar: Bar;
}

export const model = new Foo().getModelForClass(Foo);
