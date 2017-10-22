import * as mongoose from 'mongoose';

import { getModelForClass, prop, pre } from '../../typegoose';

@pre<Hook>('save', function(next) {
  if (this.isModified('shape')) {
    this.shape = 'newShape';
  } else {
    this.shape = 'oldShape';
  }

  next();
})
export class Hook {
  @prop({ required: true })
  material: string;

  @prop()
  shape?: string;
}

export const model = getModelForClass<Hook, typeof Hook>(Hook);
