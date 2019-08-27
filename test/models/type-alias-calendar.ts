import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';
import { Event } from './type-alias-event3';

export class Calendar extends Typegoose {
  @prop({ _id: false, typeAlias: 'CalendarEvent' })
  public event: Event;
}

export const CalendarModel = new Calendar().getModelForClass(Calendar);
