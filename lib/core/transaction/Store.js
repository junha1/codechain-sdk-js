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
var classes_1 = require("../classes");
var Text_1 = require("../Text");
var Transaction_1 = require("../Transaction");
var RLP = require("rlp");
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store(params, networkId) {
        var _this = _super.call(this, networkId) || this;
        if ("secret" in params) {
            var content = params.content, secret = params.secret;
            _this.content = content;
            _this.certifier = classes_1.PlatformAddress.fromPublic(utils_1.getPublicFromPrivate(secret.value), { networkId: networkId });
            _this.signature = utils_1.signEcdsa(utils_1.blake256(RLP.encode(content)), secret.value);
        }
        else {
            var content = params.content, certifier = params.certifier;
            var signature = params.signature;
            if (signature.startsWith("0x")) {
                signature = signature.substr(2);
            }
            _this.content = content;
            _this.certifier = certifier;
            _this.signature = signature;
        }
        return _this;
    }
    Store.prototype.getText = function () {
        var _a = this, content = _a.content, certifier = _a.certifier;
        return new Text_1.Text({
            content: content,
            certifier: certifier
        });
    };
    Store.prototype.type = function () {
        return "store";
    };
    Store.prototype.actionToEncodeObject = function () {
        var _a = this, content = _a.content, certifier = _a.certifier, signature = _a.signature;
        return [
            8,
            content,
            certifier.getAccountId().toEncodeObject(),
            "0x" + signature
        ];
    };
    Store.prototype.actionToJSON = function () {
        var _a = this, content = _a.content, certifier = _a.certifier, signature = _a.signature;
        return {
            content: content,
            certifier: certifier.value,
            signature: "0x" + signature
        };
    };
    return Store;
}(Transaction_1.Transaction));
exports.Store = Store;
