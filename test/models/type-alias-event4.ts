import * as mongoose from 'mongoose';

import { prop, Typegoose } from '../../src/typegoose';

export class Event extends Typegoose {
  @prop({ required: true })
  public supervisor: string;

  @prop()
  public attendees: number;
}

export const EventModel = new Event().getModelForClass(Event, {
  typeAlias: 'DummyEventEntity',
});
