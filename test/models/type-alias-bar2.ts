import * as mongoose from 'mongoose';

import { prop, Typegoose } from '../../src/typegoose';

export default class Bar extends Typegoose {
  // constructor(fieldTwo: string, fieldOne?: string) {
  //   super();
  //   this.fieldOne = fieldOne;
  //   this.fieldTwo = fieldTwo;
  // }

  @prop()
  public fieldOne: string;

  @prop({ required: true })
  public fieldTwo: string;
}

export const BarModel = new Bar().getModelForClass(Bar, {
  typeAlias: 'BarEntity'
});
// export const BarModel = new Bar().getModelForClass(Bar);
