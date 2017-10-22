import * as mongoose from 'mongoose';

import { prop, getModelForClass, pre, post } from '../../typegoose';

@pre<Dummy>('save', function(next) {
  this.text = 'saved';

  next();
})
@post<Dummy>('find', (result) => {
  result[0].text = 'changed in post find hook';
})
@post<Dummy>('findOne', (result) => {
  result.text = 'changed in post findOne hook';
})
export class Dummy {
  @prop()
  text: string;
}

export const model = getModelForClass<Dummy, typeof Dummy>(Dummy);
