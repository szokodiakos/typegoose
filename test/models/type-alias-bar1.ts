import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';

export default class Bar {
  @prop({ required: true })
  public fieldOne: string;
}
