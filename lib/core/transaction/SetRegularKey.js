"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = require("../Transaction");
var SetRegularKey = /** @class */ (function (_super) {
    __extends(SetRegularKey, _super);
    function SetRegularKey(key, networkId) {
        var _this = _super.call(this, networkId) || this;
        _this.key = key;
        return _this;
    }
    SetRegularKey.prototype.type = function () {
        return "setRegularKey";
    };
    SetRegularKey.prototype.actionToEncodeObject = function () {
        return [3, this.key.toEncodeObject()];
    };
    SetRegularKey.prototype.actionToJSON = function () {
        return {
            key: this.key.toJSON()
        };
    };
    return SetRegularKey;
}(Transaction_1.Transaction));
exports.SetRegularKey = SetRegularKey;
