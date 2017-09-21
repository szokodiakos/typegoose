import * as mongoose from 'mongoose';

import { getModelForClass, prop, pre } from '../../typegoose';

@pre<Car>('save', function(next) {
  if (this.model === 'Trabant') {
    this.isSedan = true;
  }
  next();
})
export class Car {
  @prop({ required: true })
  model: string;

  @prop()
  isSedan?: boolean;
}

export const model = getModelForClass<Car, typeof Car>(Car);
