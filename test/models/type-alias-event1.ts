import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';

export class Event {
  @prop({ required: true })
  public name: string;
}
