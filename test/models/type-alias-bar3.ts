import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';

export class Bar {
  @prop({ required: true })
  public fieldThree: string;
}
