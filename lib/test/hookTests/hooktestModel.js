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
let Hook = class Hook extends typegoose_1.Typegoose {
};
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Hook.prototype, "material", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Hook.prototype, "shape", void 0);
Hook = __decorate([
    typegoose_1.pre('save', function (next) {
        if (this.isModified('shape')) {
            this.shape = 'newShape';
        }
        else {
            this.shape = 'oldShape';
        }
        next();
    })
], Hook);
exports.Hook = Hook;
exports.model = new Hook().getModelForClass(Hook);
//# sourceMappingURL=hooktestModel.js.map