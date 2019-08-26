import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { Foo } from '../models/type-alias-foo';
import { Bar } from '../models/type-alias-bar1';
import Bar2, { BarModel } from '../models/type-alias-bar2';
import { InstanceType } from '../../src/typegoose';

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
  it("shouldn't clash two classes with same name using type alias", async () => {
    const FooModel = new Foo().getModelForClass(Foo);

    const foo: InstanceType<Foo> = new FooModel();
    const bar = new Bar();
    bar.fieldOne = 'hello';
    foo.bar = bar;

    await foo.save();

    expect(foo).not.null;

    const bar2: InstanceType<Bar2> = new BarModel();
    bar2.fieldTwo = 'world';

    await bar2.save();

    expect(bar).not.null;

    // const car = await Car.create({
    //   model: 'Tesla',
    //   price: mongoose.Types.Decimal128.fromString('50123.25')
    // });
    // const carReflectedType = getClassForDocument(car);
    // expect(carReflectedType).to.equals(CarType);

    // const user = await User.create({
    //   firstName: 'John2',
    //   lastName: 'Doe2',
    //   gender: Genders.MALE,
    //   languages: ['english2', 'typescript2'],
    //   uniqueId: 'not-needed'
    // });
    // const userReflectedType = getClassForDocument(user);
    // expect(userReflectedType).to.equals(UserType);

    // // assert negative to be sure (false positive)
    // expect(carReflectedType).to.not.equals(UserType);
    // expect(userReflectedType).to.not.equals(CarType);
  });
}
