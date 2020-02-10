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
var CreateShard = /** @class */ (function (_super) {
    __extends(CreateShard, _super);
    function CreateShard(params, networkId) {
        var _this = this;
        throw Error("CreateShard is disabled");
        _this = _super.call(this, networkId) || this;
        var users = params.users;
        _this.users = users;
        return _this;
    }
    CreateShard.prototype.type = function () {
        return "createShard";
    };
    CreateShard.prototype.actionToEncodeObject = function () {
        return [
            4,
            this.users.map(function (user) { return user.getAccountId().toEncodeObject(); })
        ];
    };
    CreateShard.prototype.actionToJSON = function () {
        var users = this.users;
        return { users: users.map(function (user) { return user.toString(); }) };
    };
    return CreateShard;
}(Transaction_1.Transaction));
exports.CreateShard = CreateShard;
