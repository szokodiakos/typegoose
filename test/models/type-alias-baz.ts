import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';
import { Bar } from './type-alias-bar3';

export class Baz extends Typegoose {
  @prop({ _id: false, typeAlias: 'NestedBar2' })
  public bar: Bar;
}

export const BazModel = new Baz().getModelForClass(Baz);
