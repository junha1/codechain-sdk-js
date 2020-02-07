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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var utils_1 = require("../../utils");
var classes_1 = require("../classes");
var Transaction_1 = require("../Transaction");
var RLP = require("rlp");
var ChangeAssetScheme = /** @class */ (function (_super) {
    __extends(ChangeAssetScheme, _super);
    function ChangeAssetScheme(input) {
        var _this = _super.call(this, input.networkId) || this;
        _this._transaction = new AssetSchemeChangeTransaction(input);
        _this.approvals = input.approvals;
        return _this;
    }
    /**
     * Get the tracker of an ChangeAssetScheme.
     * @returns A transaction hash.
     */
    ChangeAssetScheme.prototype.tracker = function () {
        return new codechain_primitives_1.H256(utils_1.blake256(this._transaction.rlpBytes()));
    };
    /**
     * Add an approval to transaction.
     * @param approval An approval
     */
    ChangeAssetScheme.prototype.addApproval = function (approval) {
        this.approvals.push(approval);
    };
    ChangeAssetScheme.prototype.type = function () {
        return "changeAssetScheme";
    };
    ChangeAssetScheme.prototype.actionToEncodeObject = function () {
        var encoded = this._transaction.toEncodeObject();
        encoded.push(this.approvals);
        return encoded;
    };
    ChangeAssetScheme.prototype.actionToJSON = function () {
        var json = this._transaction.toJSON();
        return __assign(__assign({}, json), { approvals: this.approvals });
    };
    return ChangeAssetScheme;
}(Transaction_1.Transaction));
exports.ChangeAssetScheme = ChangeAssetScheme;
/**
 * Change asset scheme
 */
var AssetSchemeChangeTransaction = /** @class */ (function () {
    /**
     * @param params.networkId A network ID of the transaction.
     * @param params.shardId A shard ID of the asset that this transaction changes.
     * @param params.assetType A asset type of the asset that this transaction changes.
     * @param params.metadata A changed metadata of the asset.
     * @param params.approver A changed approver of the asset.
     * @param params.registrar A changed registrar of the asset.
     * @param params.allowedScriptHashes Allowed lock script hashes of the asset.
     */
    function AssetSchemeChangeTransaction(params) {
        var networkId = params.networkId, shardId = params.shardId, assetType = params.assetType, seq = params.seq, metadata = params.metadata, approver = params.approver, registrar = params.registrar, allowedScriptHashes = params.allowedScriptHashes;
        this.networkId = networkId;
        this.shardId = shardId;
        this.assetType = assetType;
        this.seq = seq;
        this.metadata =
            typeof metadata === "string" ? metadata : JSON.stringify(metadata);
        this.approver =
            approver == null ? null : classes_1.PlatformAddress.ensure(approver);
        this.registrar =
            registrar == null ? null : classes_1.PlatformAddress.ensure(registrar);
        this.allowedScriptHashes = allowedScriptHashes;
    }
    /**
     * Convert to an AssetSchemeChangeTransaction JSON object.
     * @returns An AssetSchemeChangeTransaction JSON object.
     */
    AssetSchemeChangeTransaction.prototype.toJSON = function () {
        return {
            networkId: this.networkId,
            shardId: this.shardId,
            assetType: this.assetType.toEncodeObject(),
            seq: this.seq,
            metadata: this.metadata,
            approver: this.approver == null ? null : this.approver.toString(),
            registrar: this.registrar == null ? null : this.registrar.toString(),
            allowedScriptHashes: this.allowedScriptHashes.map(function (hash) {
                return hash.toJSON();
            })
        };
    };
    /**
     * Convert to an object for RLP encoding.
     */
    AssetSchemeChangeTransaction.prototype.toEncodeObject = function () {
        var _a = this, networkId = _a.networkId, shardId = _a.shardId, assetType = _a.assetType, seq = _a.seq, metadata = _a.metadata, approver = _a.approver, registrar = _a.registrar, allowedScriptHashes = _a.allowedScriptHashes;
        return [
            0x15,
            networkId,
            shardId,
            assetType.toEncodeObject(),
            seq,
            metadata,
            approver ? [approver.getAccountId().toEncodeObject()] : [],
            registrar ? [registrar.getAccountId().toEncodeObject()] : [],
            allowedScriptHashes.map(function (hash) { return hash.toEncodeObject(); })
        ];
    };
    /**
     * Convert to RLP bytes.
     */
    AssetSchemeChangeTransaction.prototype.rlpBytes = function () {
        return RLP.encode(this.toEncodeObject());
    };
    return AssetSchemeChangeTransaction;
}());
