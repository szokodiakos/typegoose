"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
exports.plugin = (mongoosePlugin, options) => (constructor) => {
    const name = constructor.name;
    if (!data_1.plugins[name]) {
        data_1.plugins[name] = [];
    }
    data_1.plugins[name].push({ mongoosePlugin, options });
};
//# sourceMappingURL=plugin.js.map