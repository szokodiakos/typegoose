import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { Foo, FooModel } from '../models/type-alias-foo';
import * as TypeAliasBar1 from '../models/type-alias-bar1';
import * as TypeAliasBar2 from '../models/type-alias-bar2';
import * as TypeAliasBar3 from '../models/type-alias-bar3';
import { InstanceType } from '../../src/typegoose';
import { BazModel, Baz } from '../models/type-alias-baz';

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
    const foo: InstanceType<Foo> = new FooModel();
    const nestedBar = new TypeAliasBar1.Bar();
    nestedBar.fieldOne = 'hello';
    foo.bar = nestedBar;
    await foo.save();
    expect(foo).not.null;

    const barEntity: InstanceType<TypeAliasBar2.Bar> = new TypeAliasBar2.BarModel();
    barEntity.fieldTwo = 'world';
    await barEntity.save();
    expect(barEntity).not.null;
  });

  it("shouldn't clash two nested classes with same name", async () => {
    const foo: InstanceType<Foo> = new FooModel();
    const nestedBar = new TypeAliasBar1.Bar();
    nestedBar.fieldOne = 'hello';
    foo.bar = nestedBar;
    await foo.save();
    expect(foo).not.null;

    const barEntity: InstanceType<TypeAliasBar2.Bar> = new TypeAliasBar2.BarModel();
    barEntity.fieldTwo = 'world';
    await barEntity.save();
    expect(barEntity).not.null;

    const baz: InstanceType<Baz> = new BazModel();
    const nestedBar3 = new TypeAliasBar3.Bar();
    nestedBar3.fieldThree = '!';
    baz.bar = nestedBar3;
    await baz.save();
    expect(baz).not.null;
  });
}
