"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const tg = require("../../typegoose");
const car_1 = require("./car");
// add a pre-save hook to PersistentModel
let PersistentModel = class PersistentModel extends tg.Typegoose {
    // define an 'instanceMethod' that will be overwritten
    getClassName() {
        return 'PersistentModel';
    }
    // define an 'instanceMethod' that will be overwritten
    static getStaticName() {
        return 'PersistentModel';
    }
    // define an instanceMethod that is called by the derived class
    addCar(car) {
        if (!this.cars) {
            this.cars = [];
        }
        this.cars.push(car);
        return this.save();
    }
};
__decorate([
    tg.prop(),
    __metadata("design:type", Date)
], PersistentModel.prototype, "createdAt", void 0);
__decorate([
    tg.arrayProp({ itemsRef: car_1.Car }),
    __metadata("design:type", Array)
], PersistentModel.prototype, "cars", void 0);
__decorate([
    tg.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PersistentModel.prototype, "getClassName", null);
__decorate([
    tg.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [car_1.Car]),
    __metadata("design:returntype", void 0)
], PersistentModel.prototype, "addCar", null);
__decorate([
    tg.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PersistentModel, "getStaticName", null);
PersistentModel = __decorate([
    tg.pre('save', function (next) {
        if (!this.createdAt) {
            this.createdAt = new Date();
        }
        next();
    })
], PersistentModel);
exports.PersistentModel = PersistentModel;
class Person extends PersistentModel {
    // override instanceMethod
    getClassName() {
        return 'Person';
    }
    // override staticMethod
    static getStaticName() {
        return 'Person';
    }
}
__decorate([
    tg.prop({ required: true }),
    __metadata("design:type", String)
], Person.prototype, "email", void 0);
__decorate([
    tg.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Person.prototype, "getClassName", null);
__decorate([
    tg.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Person, "getStaticName", null);
exports.Person = Person;
exports.model = new Person().getModelForClass(Person);
//# sourceMappingURL=person.js.map