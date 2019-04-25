"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
exports.plugin = function (mongoosePlugin, options) { return function (constructor) {
    var name = constructor.name;
    if (!data_1.plugins[name]) {
        data_1.plugins[name] = [];
    }
    data_1.plugins[name].push({ mongoosePlugin: mongoosePlugin, options: options });
}; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZCwrQkFBaUM7QUFFcEIsUUFBQSxNQUFNLEdBQUcsVUFBQyxjQUFtQixFQUFFLE9BQWEsSUFBSyxPQUFBLFVBQUMsV0FBZ0I7SUFDN0UsSUFBTSxJQUFJLEdBQVcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUN0QyxJQUFJLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xCLGNBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDcEI7SUFDRCxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsY0FBYyxnQkFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsQ0FBQztBQUNsRCxDQUFDLEVBTjZELENBTTdELENBQUMifQ==