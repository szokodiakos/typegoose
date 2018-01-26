"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hooktestModel_1 = require("./hooktestModel");
const dummy_1 = require("./dummy");
const mongoConnect_1 = require("../utils/mongoConnect");
describe('Typegoose', () => {
    describe('Hooks', () => {
        before(() => mongoConnect_1.initDatabase());
        it('should update the property using isModified during pre save hook', () => __awaiter(this, void 0, void 0, function* () {
            const hook = yield hooktestModel_1.model.create({
                material: 'steel',
            });
            chai_1.expect(hook).to.have.property('shape', 'oldShape');
            hook.set('shape', 'changed');
            const savedHook = yield hook.save();
            chai_1.expect(savedHook).to.have.property('shape', 'newShape');
        }));
        it('should test findOne post hook', () => __awaiter(this, void 0, void 0, function* () {
            const dummy = yield dummy_1.model.create({ text: 'initial' });
            // text is changed in pre save hook
            const dummyFromDb = yield dummy_1.model.findOne({ text: 'saved' });
            chai_1.expect(dummyFromDb).to.have.property('text', 'changed in post findOne hook');
        }));
        it('should find the unexpected dummies because of pre and post hooks', () => __awaiter(this, void 0, void 0, function* () {
            const dummy = yield dummy_1.model.create([{ text: 'whatever' }, { text: 'whatever' }]);
            const foundDummies = yield dummy_1.model.find({ text: 'saved' });
            // pre-save-hook changed text to saved
            chai_1.expect(foundDummies.length).to.be.above(2);
            chai_1.expect(foundDummies[0]).to.have.property('text', 'changed in post find hook');
            chai_1.expect(foundDummies[1]).to.have.property('text', 'saved');
        }));
    });
});
//# sourceMappingURL=hooks.test.js.map