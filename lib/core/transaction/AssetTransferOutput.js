"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
var codechain_primitives_1 = require("codechain-primitives");
var P2PKH_1 = require("../../key/P2PKH");
var P2PKHBurn_1 = require("../../key/P2PKHBurn");
/**
 * An AssetTransferOutput consists of:
 *  - A lock script hash and parameters, which mark ownership of the asset.
 *  - An asset type and quantity, which indicate the asset's type and quantity.
 */
var AssetTransferOutput = /** @class */ (function () {
    /**
     * @param data.lockScriptHash A lock script hash of the output.
     * @param data.parameters Parameters of the output.
     * @param data.assetType An asset type of the output.
     * @param data.shardId A shard ID of the output.
     * @param data.quantity An asset quantity of the output.
     */
    function AssetTransferOutput(data) {
        if ("recipient" in data) {
            // FIXME: Clean up by abstracting the standard scripts
            var _a = data.recipient, type = _a.type, payload = _a.payload;
            if ("pubkeys" in payload) {
                throw Error("Multisig payload is not supported yet");
            }
            switch (type) {
                case 0x00: // LOCK_SCRIPT_HASH ONLY
                    this.lockScriptHash = payload;
                    this.parameters = [];
                    break;
                case 0x01: // P2PKH
                    this.lockScriptHash = P2PKH_1.P2PKH.getLockScriptHash();
                    this.parameters = [buffer_1.Buffer.from(payload.value, "hex")];
                    break;
                case 0x02: // P2PKHBurn
                    this.lockScriptHash = P2PKHBurn_1.P2PKHBurn.getLockScriptHash();
                    this.parameters = [buffer_1.Buffer.from(payload.value, "hex")];
                    break;
                default:
                    throw Error("Unexpected type of AssetAddress: " + type + ", " + data.recipient);
            }
        }
        else {
            var lockScriptHash = data.lockScriptHash, parameters = data.parameters;
            this.lockScriptHash = lockScriptHash;
            this.parameters = parameters;
        }
        var assetType = data.assetType, shardId = data.shardId, quantity = data.quantity;
        this.assetType = assetType;
        this.shardId = shardId;
        this.quantity = quantity;
    }
    /**
     * Create an AssetTransferOutput from an AssetTransferOutput JSON object.
     * @param data An AssetTransferOutput JSON object.
     * @returns An AssetTransferOutput.
     */
    AssetTransferOutput.fromJSON = function (data) {
        var lockScriptHash = data.lockScriptHash, parameters = data.parameters, assetType = data.assetType, shardId = data.shardId, quantity = data.quantity;
        return new AssetTransferOutput({
            lockScriptHash: codechain_primitives_1.H160.ensure(lockScriptHash),
            parameters: parameters.map(function (p) { return buffer_1.Buffer.from(p, "hex"); }),
            assetType: codechain_primitives_1.H160.ensure(assetType),
            shardId: shardId,
            quantity: codechain_primitives_1.U64.ensure(quantity)
        });
    };
    /**
     * Convert to an object for RLP encoding.
     */
    AssetTransferOutput.prototype.toEncodeObject = function () {
        var _a = this, lockScriptHash = _a.lockScriptHash, parameters = _a.parameters, assetType = _a.assetType, shardId = _a.shardId, quantity = _a.quantity;
        return [
            lockScriptHash.toEncodeObject(),
            parameters.map(function (parameter) { return buffer_1.Buffer.from(parameter); }),
            assetType.toEncodeObject(),
            shardId,
            quantity.toEncodeObject()
        ];
    };
    /**
     * Convert to an AssetTransferOutput JSON object.
     * @returns An AssetTransferOutput JSON object.
     */
    AssetTransferOutput.prototype.toJSON = function () {
        var _a = this, lockScriptHash = _a.lockScriptHash, parameters = _a.parameters, assetType = _a.assetType, shardId = _a.shardId, quantity = _a.quantity;
        return {
            lockScriptHash: lockScriptHash.toJSON(),
            parameters: parameters.map(function (p) { return p.toString("hex"); }),
            assetType: assetType.toJSON(),
            shardId: shardId,
            quantity: quantity.toJSON()
        };
    };
    return AssetTransferOutput;
}());
exports.AssetTransferOutput = AssetTransferOutput;
