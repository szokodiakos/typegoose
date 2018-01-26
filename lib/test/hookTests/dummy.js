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
const typegoose_1 = require("../../typegoose");
let Dummy = class Dummy extends typegoose_1.Typegoose {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Dummy.prototype, "text", void 0);
Dummy = __decorate([
    typegoose_1.pre('save', function (next) {
        this.text = 'saved';
        next();
    }),
    typegoose_1.post('find', (result) => {
        result[0].text = 'changed in post find hook';
    }),
    typegoose_1.post('findOne', (result) => {
        result.text = 'changed in post findOne hook';
    })
], Dummy);
exports.Dummy = Dummy;
exports.model = new Dummy().getModelForClass(Dummy);
//# sourceMappingURL=dummy.js.map