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
const _ = require("lodash");
// tslint:disable-next-line:no-var-requires
const findOrCreate = require('mongoose-findorcreate');
const job_1 = require("./job");
const car_1 = require("./car");
const genders_1 = require("../enums/genders");
const role_1 = require("../enums/role");
const typegoose_1 = require("../../typegoose");
let User = User_1 = class User extends typegoose_1.Typegoose {
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    set fullName(full) {
        const split = full.split(' ');
        this.firstName = split[0];
        this.lastName = split[1];
    }
    static findByAge(age) {
        return this.findOne({ age });
    }
    incrementAge() {
        const age = this.age || 1;
        this.age = age + 1;
        return this.save();
    }
    addLanguage() {
        this.languages.push('Hungarian');
        return this.save();
    }
    addJob(job = {}) {
        this.previousJobs.push(job);
        return this.save();
    }
};
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typegoose_1.prop({ mixed: true }),
    __metadata("design:type", Object)
], User.prototype, "importedData", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], User.prototype, "fullName", null);
__decorate([
    typegoose_1.prop({ default: 'Nothing' }),
    __metadata("design:type", String)
], User.prototype, "nick", void 0);
__decorate([
    typegoose_1.prop({ index: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "uniqueId", void 0);
__decorate([
    typegoose_1.prop({ unique: true, sparse: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({ expires: '24h' }),
    __metadata("design:type", Date)
], User.prototype, "expireAt", void 0);
__decorate([
    typegoose_1.prop({ min: 10, max: 21 }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    typegoose_1.prop({ enum: _.values(genders_1.Genders), required: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    typegoose_1.prop({ enum: role_1.Role }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", job_1.Job)
], User.prototype, "job", void 0);
__decorate([
    typegoose_1.prop({ ref: car_1.Car }),
    __metadata("design:type", Object)
], User.prototype, "car", void 0);
__decorate([
    typegoose_1.arrayProp({ items: String, required: true }),
    __metadata("design:type", Array)
], User.prototype, "languages", void 0);
__decorate([
    typegoose_1.arrayProp({ items: job_1.Job }),
    __metadata("design:type", Array)
], User.prototype, "previousJobs", void 0);
__decorate([
    typegoose_1.arrayProp({ itemsRef: car_1.Car }),
    __metadata("design:type", Array)
], User.prototype, "previousCars", void 0);
__decorate([
    typegoose_1.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "incrementAge", null);
__decorate([
    typegoose_1.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "addLanguage", null);
__decorate([
    typegoose_1.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], User.prototype, "addJob", null);
__decorate([
    typegoose_1.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], User, "findByAge", null);
User = User_1 = __decorate([
    typegoose_1.plugin(findOrCreate)
], User);
exports.User = User;
exports.model = new User().getModelForClass(User);
var User_1;
//# sourceMappingURL=user.js.map