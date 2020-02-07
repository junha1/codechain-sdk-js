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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = require("../Transaction");
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom(params, networkId) {
        var _this = _super.call(this, networkId) || this;
        _this.handlerId = params.handlerId;
        _this.bytes = params.bytes;
        return _this;
    }
    Custom.prototype.type = function () {
        return "custom";
    };
    Custom.prototype.actionToEncodeObject = function () {
        var _a = this, handlerId = _a.handlerId, bytes = _a.bytes;
        return [0xff, handlerId.toEncodeObject(), bytes];
    };
    Custom.prototype.actionToJSON = function () {
        var _a = this, handlerId = _a.handlerId, bytes = _a.bytes;
        return {
            handlerId: handlerId.toJSON(),
            bytes: __spread(bytes)
        };
    };
    return Custom;
}(Transaction_1.Transaction));
exports.Custom = Custom;
