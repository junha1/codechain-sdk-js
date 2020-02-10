"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var AssetMintOutput_1 = require("./transaction/AssetMintOutput");
var MintAsset_1 = require("./transaction/MintAsset");
/**
 * Object that contains information about the Asset when performing AssetMintTransaction.
 */
var AssetScheme = /** @class */ (function () {
    function AssetScheme(data) {
        this.networkId = data.networkId;
        this.shardId = data.shardId;
        this.metadata =
            typeof data.metadata === "string"
                ? data.metadata
                : JSON.stringify(data.metadata);
        this.approver = data.approver;
        this.registrar = data.registrar;
        this.allowedScriptHashes = data.allowedScriptHashes;
        this.supply = data.supply;
        this.pool = data.pool;
        this.seq = data.seq || 0;
    }
    AssetScheme.fromJSON = function (data) {
        var metadata = data.metadata, supply = data.supply, approver = data.approver, registrar = data.registrar, allowedScriptHashes = data.allowedScriptHashes, pool = data.pool, seq = data.seq;
        return new AssetScheme({
            metadata: metadata,
            supply: codechain_primitives_1.U64.ensure(supply),
            approver: approver == null ? null : codechain_primitives_1.PlatformAddress.ensure(approver),
            registrar: registrar == null ? null : codechain_primitives_1.PlatformAddress.ensure(registrar),
            allowedScriptHashes: allowedScriptHashes == null
                ? []
                : allowedScriptHashes.map(function (hash) {
                    return codechain_primitives_1.H160.ensure(hash);
                }),
            pool: pool.map(function (_a) {
                var assetType = _a.assetType, assetQuantity = _a.quantity;
                return ({
                    assetType: codechain_primitives_1.H160.ensure(assetType),
                    quantity: codechain_primitives_1.U64.ensure(assetQuantity)
                });
            }),
            seq: seq
        });
    };
    AssetScheme.prototype.toJSON = function () {
        var _a = this, metadata = _a.metadata, supply = _a.supply, approver = _a.approver, registrar = _a.registrar, allowedScriptHashes = _a.allowedScriptHashes, pool = _a.pool, seq = _a.seq;
        return {
            metadata: metadata,
            supply: supply.toJSON(),
            approver: approver == null ? null : approver.toString(),
            registrar: registrar == null ? null : registrar.toString(),
            allowedScriptHashes: allowedScriptHashes.map(function (hash) { return hash.toJSON(); }),
            pool: pool.map(function (a) { return ({
                assetType: a.assetType.toJSON(),
                quantity: a.quantity.toJSON()
            }); }),
            seq: seq
        };
    };
    AssetScheme.prototype.createMintTransaction = function (params) {
        var recipient = params.recipient;
        var _a = this, networkId = _a.networkId, shardId = _a.shardId, metadata = _a.metadata, supply = _a.supply, approver = _a.approver, registrar = _a.registrar, allowedScriptHashes = _a.allowedScriptHashes;
        if (networkId === undefined) {
            throw Error("networkId is undefined");
        }
        if (shardId === undefined) {
            throw Error("shardId is undefined");
        }
        return new MintAsset_1.MintAsset({
            networkId: networkId,
            shardId: shardId,
            metadata: metadata,
            output: new AssetMintOutput_1.AssetMintOutput({
                supply: supply,
                recipient: codechain_primitives_1.AssetAddress.ensure(recipient)
            }),
            approver: approver,
            registrar: registrar,
            allowedScriptHashes: allowedScriptHashes,
            approvals: []
        });
    };
    return AssetScheme;
}());
exports.AssetScheme = AssetScheme;
