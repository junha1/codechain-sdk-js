"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
var codechain_primitives_1 = require("codechain-primitives");
var AssetOutPoint_1 = require("./transaction/AssetOutPoint");
var AssetTransferInput_1 = require("./transaction/AssetTransferInput");
var AssetTransferOutput_1 = require("./transaction/AssetTransferOutput");
var TransferAsset_1 = require("./transaction/TransferAsset");
/**
 * Object created as an AssetMintTransaction or TransferAsset.
 */
var Asset = /** @class */ (function () {
    function Asset(data) {
        var tracker = data.tracker, transactionOutputIndex = data.transactionOutputIndex, assetType = data.assetType, shardId = data.shardId, quantity = data.quantity, _a = data.orderHash, orderHash = _a === void 0 ? null : _a, lockScriptHash = data.lockScriptHash, parameters = data.parameters;
        this.assetType = assetType;
        this.shardId = shardId;
        this.lockScriptHash = lockScriptHash;
        this.parameters = parameters;
        this.quantity = quantity;
        this.orderHash = orderHash;
        this.outPoint = new AssetOutPoint_1.AssetOutPoint({
            tracker: tracker,
            index: transactionOutputIndex,
            assetType: assetType,
            shardId: shardId,
            quantity: quantity,
            lockScriptHash: lockScriptHash,
            parameters: parameters
        });
    }
    Asset.fromJSON = function (data) {
        var assetType = data.assetType, shardId = data.shardId, lockScriptHash = data.lockScriptHash, parameters = data.parameters, quantity = data.quantity, orderHash = data.orderHash, tracker = data.tracker, transactionOutputIndex = data.transactionOutputIndex;
        return new Asset({
            assetType: new codechain_primitives_1.H160(assetType),
            shardId: shardId,
            lockScriptHash: new codechain_primitives_1.H160(lockScriptHash),
            parameters: parameters.map(function (p) { return buffer_1.Buffer.from(p, "hex"); }),
            quantity: codechain_primitives_1.U64.ensure(quantity),
            orderHash: orderHash == null ? orderHash : codechain_primitives_1.H256.ensure(orderHash),
            tracker: new codechain_primitives_1.H256(tracker),
            transactionOutputIndex: transactionOutputIndex
        });
    };
    Asset.prototype.toJSON = function () {
        var _a = this, assetType = _a.assetType, shardId = _a.shardId, lockScriptHash = _a.lockScriptHash, parameters = _a.parameters, orderHash = _a.orderHash, quantity = _a.quantity, outPoint = _a.outPoint;
        var tracker = outPoint.tracker, index = outPoint.index;
        return {
            assetType: assetType.toJSON(),
            shardId: shardId,
            lockScriptHash: lockScriptHash.toJSON(),
            parameters: parameters.map(function (p) { return p.toString("hex"); }),
            quantity: quantity.toJSON(),
            orderHash: orderHash == null ? null : orderHash.toJSON(),
            tracker: tracker.toJSON(),
            transactionOutputIndex: index
        };
    };
    Asset.prototype.createTransferInput = function (options) {
        var _a = (options || {}).timelock, timelock = _a === void 0 ? null : _a;
        return new AssetTransferInput_1.AssetTransferInput({
            prevOut: this.outPoint,
            timelock: timelock
        });
    };
    Asset.prototype.createTransferTransaction = function (params) {
        var _a = this, outPoint = _a.outPoint, assetType = _a.assetType, shardId = _a.shardId;
        var _b = params.recipients, recipients = _b === void 0 ? [] : _b, _c = params.timelock, timelock = _c === void 0 ? null : _c, networkId = params.networkId, _d = params.metadata, metadata = _d === void 0 ? "" : _d, _e = params.approvals, approvals = _e === void 0 ? [] : _e, _f = params.expiration, expiration = _f === void 0 ? null : _f;
        return new TransferAsset_1.TransferAsset({
            burns: [],
            inputs: [
                new AssetTransferInput_1.AssetTransferInput({
                    prevOut: outPoint,
                    timelock: timelock,
                    lockScript: buffer_1.Buffer.from([]),
                    unlockScript: buffer_1.Buffer.from([])
                })
            ],
            outputs: recipients.map(function (recipient) {
                return new AssetTransferOutput_1.AssetTransferOutput({
                    recipient: codechain_primitives_1.AssetAddress.ensure(recipient.address),
                    assetType: assetType,
                    shardId: shardId,
                    quantity: recipient.quantity
                });
            }),
            orders: [],
            networkId: networkId,
            metadata: metadata,
            approvals: approvals,
            expiration: expiration
        });
    };
    return Asset;
}());
exports.Asset = Asset;
