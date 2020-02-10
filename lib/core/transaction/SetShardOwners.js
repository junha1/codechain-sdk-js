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
var SetShardOwners = /** @class */ (function (_super) {
    __extends(SetShardOwners, _super);
    function SetShardOwners(params, networkId) {
        var _this = _super.call(this, networkId) || this;
        _this.shardId = params.shardId;
        _this.owners = params.owners;
        return _this;
    }
    SetShardOwners.prototype.type = function () {
        return "setShardOwners";
    };
    SetShardOwners.prototype.actionToEncodeObject = function () {
        var _a = this, shardId = _a.shardId, owners = _a.owners;
        return [
            5,
            shardId,
            owners.map(function (owner) { return owner.getAccountId().toEncodeObject(); })
        ];
    };
    SetShardOwners.prototype.actionToJSON = function () {
        var _a = this, shardId = _a.shardId, owners = _a.owners;
        return {
            shardId: shardId,
            owners: owners.map(function (owner) { return owner.value; })
        };
    };
    return SetShardOwners;
}(Transaction_1.Transaction));
exports.SetShardOwners = SetShardOwners;
