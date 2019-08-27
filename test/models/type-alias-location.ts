import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';
import { Event } from './type-alias-event1';

export class Location extends Typegoose {
  @prop({ _id: false, typeAlias: 'LocationEvent' })
  public event: Event;
}

export const LocationModel = new Location().getModelForClass(Location);
