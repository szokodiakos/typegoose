import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';
import { Bar } from './type-alias-bar1';

export class Foo extends Typegoose {
  @prop({ _id: false, typeAlias: 'NestedBar1' })
  public bar: Bar;
}

export const FooModel = new Foo().getModelForClass(Foo);
