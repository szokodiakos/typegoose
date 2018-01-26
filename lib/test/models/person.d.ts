/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import * as tg from '../../typegoose';
import { Car } from './car';
export declare abstract class PersistentModel extends tg.Typegoose {
    createdAt: Date;
    cars?: tg.Ref<Car>[];
    getClassName(): string;
    static getStaticName(): string;
    addCar(this: tg.InstanceType<PersistentModel>, car: Car): Promise<tg.InstanceType<PersistentModel>>;
}
export declare class Person extends PersistentModel {
    email: string;
    getClassName(): string;
    static getStaticName(): string;
}
export declare const model: mongoose.Model<tg.InstanceType<Person>> & Person & typeof Person;
