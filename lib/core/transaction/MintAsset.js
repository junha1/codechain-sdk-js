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
var utils_1 = require("../../utils");
var Asset_1 = require("../Asset");
var classes_1 = require("../classes");
var Transaction_1 = require("../Transaction");
var RLP = require("rlp");
var MintAsset = /** @class */ (function (_super) {
    __extends(MintAsset, _super);
    function MintAsset(input) {
        var _this = _super.call(this, input.networkId) || this;
        _this._transaction = new AssetMintTransaction(input);
        _this.approvals = input.approvals;
        return _this;
    }
    /**
     * Get the tracker of an AssetMintTransaction.
     * @returns A transaction tracker.
     */
    MintAsset.prototype.tracker = function () {
        return new classes_1.H256(utils_1.blake256(this._transaction.rlpBytes()));
    };
    /**
     * Add an approval to transaction.
     * @param approval An approval
     */
    MintAsset.prototype.addApproval = function (approval) {
        this.approvals.push(approval);
    };
    MintAsset.prototype.output = function () {
        return this._transaction.output;
    };
    /**
     * Get the output of this transaction.
     * @returns An Asset.
     */
    MintAsset.prototype.getMintedAsset = function () {
        var _a = this._transaction.output, lockScriptHash = _a.lockScriptHash, parameters = _a.parameters, supply = _a.supply;
        if (supply == null) {
            throw Error("not implemented");
        }
        return new Asset_1.Asset({
            assetType: this.getAssetType(),
            shardId: this._transaction.shardId,
            lockScriptHash: lockScriptHash,
            parameters: parameters,
            quantity: supply,
            tracker: this.tracker(),
            transactionOutputIndex: 0
        });
    };
    /**
     * Get the asset scheme of this transaction.
     * @return An AssetScheme.
     */
    MintAsset.prototype.getAssetScheme = function () {
        var _a = this._transaction, networkId = _a.networkId, shardId = _a.shardId, metadata = _a.metadata, supply = _a.output.supply, approver = _a.approver, registrar = _a.registrar, allowedScriptHashes = _a.allowedScriptHashes;
        if (supply == null) {
            throw Error("not implemented");
        }
        return new classes_1.AssetScheme({
            networkId: networkId,
            shardId: shardId,
            metadata: metadata,
            supply: supply,
            approver: approver,
            registrar: registrar,
            allowedScriptHashes: allowedScriptHashes,
            pool: []
        });
    };
    /**
     * Get the asset type of the output.
     * @returns An asset type which is H160.
     */
    MintAsset.prototype.getAssetType = function () {
        var blake = utils_1.blake160(this.tracker().value);
        return new classes_1.H160(blake);
    };
    MintAsset.prototype.type = function () {
        return "mintAsset";
    };
    MintAsset.prototype.actionToEncodeObject = function () {
        var encoded = this._transaction.toEncodeObject();
        encoded.push(this.approvals);
        return encoded;
    };
    MintAsset.prototype.actionToJSON = function () {
        var json = this._transaction.toJSON();
        return __assign(__assign({}, json), { approvals: this.approvals });
    };
    return MintAsset;
}(Transaction_1.Transaction));
exports.MintAsset = MintAsset;
/**
 * Creates a new asset type and that asset itself.
 *
 * The owner of the new asset created can be assigned by a lock script hash and parameters.
 *  - A metadata is a string that explains the asset's type.
 *  - Supply defines the quantity of asset to be created. If set as null, it
 *  will be set as the maximum value of a 64-bit unsigned integer by default.
 *  - If approver exists, the approver must be the Signer of the Transaction when
 *  sending the created asset through AssetTransferTransaction.
 *  - If registrar exists, the registrar can transfer without unlocking.
 */
var AssetMintTransaction = /** @class */ (function () {
    /**
     * @param data.networkId A network ID of the transaction.
     * @param data.shardId A shard ID of the transaction.
     * @param data.metadata A metadata of the asset.
     * @param data.output.lockScriptHash A lock script hash of the output.
     * @param data.output.parameters Parameters of the output.
     * @param data.output.supply Asset supply of the output.
     * @param data.approver A approver of the asset.
     * @param data.registrar A registrar of the asset.
     * @param data.allowedScriptHashes Allowed lock script hashes of the asset.
     */
    function AssetMintTransaction(data) {
        var networkId = data.networkId, shardId = data.shardId, metadata = data.metadata, output = data.output, approver = data.approver, registrar = data.registrar, allowedScriptHashes = data.allowedScriptHashes;
        this.networkId = networkId;
        this.shardId = shardId;
        this.metadata =
            typeof metadata === "string" ? metadata : JSON.stringify(metadata);
        this.output = output;
        this.approver = approver;
        this.registrar = registrar;
        this.allowedScriptHashes = allowedScriptHashes;
    }
    /**
     * Convert to an AssetMintTransaction JSON object.
     * @returns An AssetMintTransaction JSON object.
     */
    AssetMintTransaction.prototype.toJSON = function () {
        var _a = this, networkId = _a.networkId, shardId = _a.shardId, metadata = _a.metadata, output = _a.output, approver = _a.approver, registrar = _a.registrar, allowedScriptHashes = _a.allowedScriptHashes;
        return {
            networkId: networkId,
            shardId: shardId,
            metadata: metadata,
            output: output.toJSON(),
            approver: approver == null ? null : approver.toString(),
            registrar: registrar == null ? null : registrar.toString(),
            allowedScriptHashes: allowedScriptHashes.map(function (hash) { return hash.toJSON(); })
        };
    };
    /**
     * Convert to an object for RLP encoding.
     */
    AssetMintTransaction.prototype.toEncodeObject = function () {
        var _a = this, networkId = _a.networkId, shardId = _a.shardId, metadata = _a.metadata, _b = _a.output, lockScriptHash = _b.lockScriptHash, parameters = _b.parameters, supply = _b.supply, approver = _a.approver, registrar = _a.registrar, allowedScriptHashes = _a.allowedScriptHashes;
        return [
            0x13,
            networkId,
            shardId,
            metadata,
            lockScriptHash.toEncodeObject(),
            parameters.map(function (parameter) { return Buffer.from(parameter); }),
            supply.toEncodeObject(),
            approver ? [approver.getAccountId().toEncodeObject()] : [],
            registrar ? [registrar.getAccountId().toEncodeObject()] : [],
            allowedScriptHashes.map(function (hash) { return hash.toEncodeObject(); })
        ];
    };
    /**
     * Convert to RLP bytes.
     */
    AssetMintTransaction.prototype.rlpBytes = function () {
        return RLP.encode(this.toEncodeObject());
    };
    return AssetMintTransaction;
}());
