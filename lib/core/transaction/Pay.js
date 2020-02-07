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
var Pay = /** @class */ (function (_super) {
    __extends(Pay, _super);
    function Pay(receiver, quantity, networkId) {
        var _this = _super.call(this, networkId) || this;
        _this.receiver = receiver;
        _this.quantity = quantity;
        return _this;
    }
    Pay.prototype.type = function () {
        return "pay";
    };
    Pay.prototype.actionToEncodeObject = function () {
        return [
            2,
            this.receiver.getAccountId().toEncodeObject(),
            this.quantity.toEncodeObject()
        ];
    };
    Pay.prototype.actionToJSON = function () {
        return {
            receiver: this.receiver.value,
            quantity: this.quantity.toJSON()
        };
    };
    return Pay;
}(Transaction_1.Transaction));
exports.Pay = Pay;
