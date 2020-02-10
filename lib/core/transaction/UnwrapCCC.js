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
var Transaction_1 = require("../Transaction");
var RLP = require("rlp");
var UnwrapCCC = /** @class */ (function (_super) {
    __extends(UnwrapCCC, _super);
    function UnwrapCCC(input) {
        var _this = _super.call(this, input.networkId) || this;
        _this._transaction = new AssetUnwrapCCCTransaction(input);
        return _this;
    }
    /**
     * Get a hash of the transaction that doesn't contain the scripts. The hash
     * is used as a message to create a signature for a transaction.
     * @returns A hash.
     */
    UnwrapCCC.prototype.hashWithoutScript = function (params) {
        var _a = this._transaction, networkId = _a.networkId, burn = _a.burn, receiver = _a.receiver;
        var _b = (params || {}).tag, tag = _b === void 0 ? { input: "all", output: "all" } : _b;
        if (tag.input !== "all" || tag.output !== "all") {
            throw Error("Invalid tag input: " + tag);
        }
        return new classes_1.H256(utils_1.blake256WithKey(new AssetUnwrapCCCTransaction({
            burn: burn.withoutScript(),
            networkId: networkId,
            receiver: receiver
        }).rlpBytes(), Buffer.from(utils_1.blake128(utils_1.encodeSignatureTag(tag)), "hex")));
    };
    UnwrapCCC.prototype.burn = function (index) {
        if (0 < index) {
            return null;
        }
        return this._transaction.burn;
    };
    UnwrapCCC.prototype.tracker = function () {
        return new classes_1.H256(utils_1.blake256(this._transaction.rlpBytes()));
    };
    /**
     * Add an approval to transaction.
     * @param approval An approval
     */
    UnwrapCCC.prototype.addApproval = function (_approval) {
        throw Error("Cannot approve UnwrapCCC");
    };
    UnwrapCCC.prototype.type = function () {
        return "unwrapCCC";
    };
    UnwrapCCC.prototype.actionToEncodeObject = function () {
        var encoded = this._transaction.toEncodeObject();
        return encoded;
    };
    UnwrapCCC.prototype.actionToJSON = function () {
        var json = this._transaction.toJSON();
        return json;
    };
    return UnwrapCCC;
}(Transaction_1.Transaction));
exports.UnwrapCCC = UnwrapCCC;
/**
 * Spend a wrapped CCC asset and change it to CCC.
 *
 * An AssetUnwrapCCCTransaction consists of:
 *  - An AssetTransferInput of which asset type is wrapped CCC.
 *  - A network ID. This must be identical to the network ID of which the
 *  transaction is being sent to.
 *
 * All inputs must be valid for the transaction to be valid. When each asset
 * types' quantity have been summed, the sum of inputs and the sum of outputs
 * must be identical.
 */
var AssetUnwrapCCCTransaction = /** @class */ (function () {
    /**
     * @param params.burn An AssetTransferInput of which asset type is wrapped CCC.
     * @param params.networkId A network ID of the transaction.
     */
    function AssetUnwrapCCCTransaction(params) {
        var burn = params.burn, networkId = params.networkId, receiver = params.receiver;
        this.burn = burn;
        this.networkId = networkId;
        this.receiver = receiver;
    }
    /**
     * Convert to an object for RLP encoding.
     */
    AssetUnwrapCCCTransaction.prototype.toEncodeObject = function () {
        return [
            0x11,
            this.networkId,
            this.burn.toEncodeObject(),
            this.receiver.accountId.toEncodeObject()
        ];
    };
    /**
     * Convert to RLP bytes.
     */
    AssetUnwrapCCCTransaction.prototype.rlpBytes = function () {
        return RLP.encode(this.toEncodeObject());
    };
    /**
     * Convert to an AssetUnwrapCCCTransactionJSON object.
     * @returns An AssetUnwrapCCCTransactionJSON object.
     */
    AssetUnwrapCCCTransaction.prototype.toJSON = function () {
        var _a = this, networkId = _a.networkId, burn = _a.burn, receiver = _a.receiver;
        return {
            networkId: networkId,
            burn: burn.toJSON(),
            receiver: receiver.value
        };
    };
    return AssetUnwrapCCCTransaction;
}());
