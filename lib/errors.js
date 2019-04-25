"use strict";
/** @format */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidPropError = /** @class */ (function (_super) {
    __extends(InvalidPropError, _super);
    function InvalidPropError(typeName, key) {
        return _super.call(this, "In property " + key + ": " + typeName + " is not a primitive type nor a Typegoose schema (Not extending it).") || this;
    }
    return InvalidPropError;
}(Error));
exports.InvalidPropError = InvalidPropError;
var NotNumberTypeError = /** @class */ (function (_super) {
    __extends(NotNumberTypeError, _super);
    function NotNumberTypeError(key) {
        return _super.call(this, "Type of " + key + " property is not a number.") || this;
    }
    return NotNumberTypeError;
}(Error));
exports.NotNumberTypeError = NotNumberTypeError;
var NotStringTypeError = /** @class */ (function (_super) {
    __extends(NotStringTypeError, _super);
    function NotStringTypeError(key) {
        return _super.call(this, "Type of " + key + " property is not a string.") || this;
    }
    return NotStringTypeError;
}(Error));
exports.NotStringTypeError = NotStringTypeError;
var NoMetadataError = /** @class */ (function (_super) {
    __extends(NoMetadataError, _super);
    function NoMetadataError(key) {
        return _super.call(this, "There is no metadata for the \"" + key + "\" property. " +
            'Check if emitDecoratorMetadata is enabled in tsconfig.json ' +
            "or check if you've declared a sub document's class after usage.") || this;
    }
    return NoMetadataError;
}(Error));
exports.NoMetadataError = NoMetadataError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0FBRWQ7SUFBc0Msb0NBQUs7SUFDekMsMEJBQVksUUFBZ0IsRUFBRSxHQUFXO2VBQ3ZDLGtCQUFNLGlCQUFlLEdBQUcsVUFBSyxRQUFRLHdFQUFxRSxDQUFDO0lBQzdHLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFKRCxDQUFzQyxLQUFLLEdBSTFDO0FBSlksNENBQWdCO0FBTTdCO0lBQXdDLHNDQUFLO0lBQzNDLDRCQUFZLEdBQVc7ZUFDckIsa0JBQU0sYUFBVyxHQUFHLCtCQUE0QixDQUFDO0lBQ25ELENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFKRCxDQUF3QyxLQUFLLEdBSTVDO0FBSlksZ0RBQWtCO0FBTS9CO0lBQXdDLHNDQUFLO0lBQzNDLDRCQUFZLEdBQVc7ZUFDckIsa0JBQU0sYUFBVyxHQUFHLCtCQUE0QixDQUFDO0lBQ25ELENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFKRCxDQUF3QyxLQUFLLEdBSTVDO0FBSlksZ0RBQWtCO0FBTS9CO0lBQXFDLG1DQUFLO0lBQ3hDLHlCQUFZLEdBQVc7ZUFDckIsa0JBQ0Usb0NBQWlDLEdBQUcsa0JBQWM7WUFDaEQsNkRBQTZEO1lBQzdELGlFQUFpRSxDQUNwRTtJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFSRCxDQUFxQyxLQUFLLEdBUXpDO0FBUlksMENBQWUifQ==