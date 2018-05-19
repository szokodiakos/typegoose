import * as mongoose from 'mongoose';

import { Typegoose, prop } from '../../typegoose';

export class StringValidators extends Typegoose {
  @prop({
    maxlength: 3,
  })
  maxLength: string;

  @prop({
    trim: true,
  })
  trimmed: string;

  @prop({
    uppercase: true,
  })
  uppercased: string;

  @prop({
    enum: ['one', 'two', 'three'],
  })
  enumed: string;
}

export const model = new StringValidators().getModelForClass(StringValidators);
