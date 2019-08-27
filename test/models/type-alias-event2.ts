import * as mongoose from 'mongoose';

import { prop, Typegoose } from '../../src/typegoose';

export class Event extends Typegoose {
  // constructor(fieldTwo: string, fieldOne?: string) {
  //   super();
  //   this.fieldOne = fieldOne;
  //   this.fieldTwo = fieldTwo;
  // }

  @prop()
  public name: string;

  @prop({ required: true })
  public code: string;
}

export const EventModel = new Event().getModelForClass(Event, {
  typeAlias: 'EventEntity',
});
