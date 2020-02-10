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
var utils_1 = require("../../utils");
var Transaction_1 = require("../Transaction");
var Remove = /** @class */ (function (_super) {
    __extends(Remove, _super);
    function Remove(params, networkId) {
        var _this = _super.call(this, networkId) || this;
        if ("secret" in params) {
            var hash = params.hash, secret = params.secret;
            _this._hash = hash;
            _this.signature = utils_1.signEcdsa(hash.value, secret.value);
        }
        else {
            var signature = params.signature;
            if (signature.startsWith("0x")) {
                signature = signature.substr(2);
            }
            _this._hash = params.hash;
            _this.signature = signature;
        }
        return _this;
    }
    Remove.prototype.type = function () {
        return "remove";
    };
    Remove.prototype.actionToEncodeObject = function () {
        var _a = this, _hash = _a._hash, signature = _a.signature;
        return [9, _hash.toEncodeObject(), "0x" + signature];
    };
    Remove.prototype.actionToJSON = function () {
        var _a = this, _hash = _a._hash, signature = _a.signature;
        return {
            hash: _hash.toEncodeObject(),
            signature: "0x" + signature
        };
    };
    return Remove;
}(Transaction_1.Transaction));
exports.Remove = Remove;
