import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { Location, LocationModel } from '../models/type-alias-location';
import * as TypeAliasBar1 from '../models/type-alias-event1';
import * as TypeAliasBar2 from '../models/type-alias-event2';
import * as TypeAliasBar3 from '../models/type-alias-event3';
import { InstanceType } from '../../src/typegoose';
import { CalendarModel, Calendar } from '../models/type-alias-calendar';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as TypeAliasTest } from './typeAlias.test'
 * ...
 * describe('Type Alias', TypeAliasTest.bind(this));
 * ...
 * ```
 */
export function suite() {
  it("shouldn't clash two classes with same name", async () => {
    const location: InstanceType<Location> = new LocationModel();
    const locationEvent = new TypeAliasBar1.Event();
    locationEvent.name = 'Nobel Prize';
    location.event = locationEvent;
    await location.save();
    expect(location).not.null;

    const eventEntity: InstanceType<TypeAliasBar2.Event> = new TypeAliasBar2.EventModel();
    eventEntity.code = 'OSCAR_PRIZE';
    await eventEntity.save();
    expect(eventEntity).not.null;
  });

  it("shouldn't clash two nested classes with same name", async () => {
    const location: InstanceType<Location> = new LocationModel();
    const locationEvent = new TypeAliasBar1.Event();
    locationEvent.name = 'Nobel Prize';
    location.event = locationEvent;
    await location.save();
    expect(location).not.null;

    const eventEntity: InstanceType<TypeAliasBar2.Event> = new TypeAliasBar2.EventModel();
    eventEntity.code = 'OSCAR_PRIZE';
    await eventEntity.save();
    expect(eventEntity).not.null;

    const caledar: InstanceType<Calendar> = new CalendarModel();
    const calendarEvent = new TypeAliasBar3.Event();
    calendarEvent.descr = 'A wonderful event';
    caledar.event = calendarEvent;
    await caledar.save();
    expect(caledar).not.null;
  });
}
