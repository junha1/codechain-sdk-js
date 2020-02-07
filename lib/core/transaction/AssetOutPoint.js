"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
/**
 * AssetOutPoint consists of tracker and index, asset type, and quantity.
 *
 * - The transaction that it points to must be either AssetMint or AssetTransfer.
 * - Index is what decides which Asset to point to amongst the Asset list that transaction creates.
 * - The asset type and quantity must be identical to the Asset that it points to.
 */
var AssetOutPoint = /** @class */ (function () {
    /**
     * @param data.tracker A transaction tracker where the Asset is created.
     * @param data.index The index in the output of the transaction.
     * @param data.assetType The asset type of the asset that it points to.
     * @param data.assetType The shard ID of the asset that it points to.
     * @param data.quantity The asset quantity of the asset that it points to.
     * @param data.lockScriptHash The lock script hash of the asset.
     * @param data.parameters The parameters of the asset.
     */
    function AssetOutPoint(data) {
        var tracker = data.tracker, index = data.index, assetType = data.assetType, shardId = data.shardId, quantity = data.quantity, lockScriptHash = data.lockScriptHash, parameters = data.parameters;
        this.tracker = tracker;
        this.index = index;
        this.assetType = assetType;
        this.shardId = shardId;
        this.quantity = quantity;
        this.lockScriptHash = lockScriptHash;
        this.parameters = parameters;
    }
    /**
     * Create an AssetOutPoint from an AssetOutPoint JSON object.
     * @param data An AssetOutPoint JSON object.
     * @returns An AssetOutPoint.
     */
    AssetOutPoint.fromJSON = function (data) {
        var tracker = data.tracker, index = data.index, assetType = data.assetType, shardId = data.shardId, quantity = data.quantity, lockScriptHash = data.lockScriptHash, parameters = data.parameters;
        return new this({
            tracker: new codechain_primitives_1.H256(tracker),
            index: index,
            assetType: new codechain_primitives_1.H160(assetType),
            shardId: shardId,
            quantity: codechain_primitives_1.U64.ensure(quantity),
            lockScriptHash: lockScriptHash == null ? undefined : new codechain_primitives_1.H160(lockScriptHash),
            parameters: parameters == null
                ? undefined
                : parameters.map(function (p) { return Buffer.from(p, "hex"); })
        });
    };
    /**
     * Convert to an object for RLP encoding.
     */
    AssetOutPoint.prototype.toEncodeObject = function () {
        var _a = this, tracker = _a.tracker, index = _a.index, assetType = _a.assetType, shardId = _a.shardId, quantity = _a.quantity;
        return [
            tracker.toEncodeObject(),
            index,
            assetType.toEncodeObject(),
            shardId,
            quantity.toEncodeObject()
        ];
    };
    /**
     * Convert to an AssetOutPoint JSON object.
     * @returns An AssetOutPoint JSON object.
     */
    AssetOutPoint.prototype.toJSON = function () {
        var _a = this, tracker = _a.tracker, index = _a.index, assetType = _a.assetType, shardId = _a.shardId, quantity = _a.quantity, lockScriptHash = _a.lockScriptHash, parameters = _a.parameters;
        return {
            tracker: tracker.toJSON(),
            index: index,
            assetType: assetType.toJSON(),
            shardId: shardId,
            quantity: quantity.toJSON(),
            lockScriptHash: lockScriptHash && lockScriptHash.toJSON(),
            parameters: parameters && parameters.map(function (p) { return p.toString("hex"); })
        };
    };
    return AssetOutPoint;
}());
exports.AssetOutPoint = AssetOutPoint;
