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
var SetShardUsers = /** @class */ (function (_super) {
    __extends(SetShardUsers, _super);
    function SetShardUsers(params, networkId) {
        var _this = _super.call(this, networkId) || this;
        _this.shardId = params.shardId;
        _this.users = params.users;
        return _this;
    }
    SetShardUsers.prototype.type = function () {
        return "setShardUsers";
    };
    SetShardUsers.prototype.actionToEncodeObject = function () {
        var _a = this, shardId = _a.shardId, users = _a.users;
        return [
            6,
            shardId,
            users.map(function (user) { return user.getAccountId().toEncodeObject(); })
        ];
    };
    SetShardUsers.prototype.actionToJSON = function () {
        var _a = this, shardId = _a.shardId, users = _a.users;
        return {
            shardId: shardId,
            users: users.map(function (user) { return user.toString(); })
        };
    };
    return SetShardUsers;
}(Transaction_1.Transaction));
exports.SetShardUsers = SetShardUsers;
