"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var P2PKH_1 = require("../../key/P2PKH");
var P2PKHBurn_1 = require("../../key/P2PKHBurn");
var utils_1 = require("../../utils");
var AssetOutPoint_1 = require("./AssetOutPoint");
var RLP = require("rlp");
var Order = /** @class */ (function () {
    /**
     * @param data.assetTypeFrom The asset type of the asset to give.
     * @param data.assetTypeTo The asset type of the asset to get.
     * @param data.assetTypeFee The asset type of the asset for fee.
     * @param data.assetQuantityFrom The quantity of the asset to give.
     * @param data.assetQuantityTo The quantity of the asset to get.
     * @param data.assetQuantityFee The quantity of the asset for fee.
     * @param data.originOutputs The previous outputs to be consumed by the order.
     * @param data.expiration The expiration time of the order, by seconds.
     * @param data.lockScriptHash The lock script hash of the asset.
     * @param data.parameters The parameters of the asset.
     */
    function Order(data) {
        if ("recipientFrom" in data) {
            var _a = decomposeRecipient(data.recipientFrom), lockScriptHash = _a.lockScriptHash, parameters = _a.parameters;
            this.lockScriptHashFrom = lockScriptHash;
            this.parametersFrom = parameters;
        }
        else {
            var lockScriptHashFrom = data.lockScriptHashFrom, parametersFrom = data.parametersFrom;
            this.lockScriptHashFrom = lockScriptHashFrom;
            this.parametersFrom = parametersFrom;
        }
        if ("recipientFee" in data) {
            var _b = decomposeRecipient(data.recipientFee), lockScriptHash = _b.lockScriptHash, parameters = _b.parameters;
            this.lockScriptHashFee = lockScriptHash;
            this.parametersFee = parameters;
        }
        else {
            var lockScriptHashFee = data.lockScriptHashFee, parametersFee = data.parametersFee;
            this.lockScriptHashFee = lockScriptHashFee;
            this.parametersFee = parametersFee;
        }
        var assetTypeFrom = data.assetTypeFrom, assetTypeTo = data.assetTypeTo, _c = data.assetTypeFee, assetTypeFee = _c === void 0 ? codechain_primitives_1.H160.zero() : _c, shardIdFrom = data.shardIdFrom, shardIdTo = data.shardIdTo, _d = data.shardIdFee, shardIdFee = _d === void 0 ? 0 : _d, assetQuantityFrom = data.assetQuantityFrom, assetQuantityTo = data.assetQuantityTo, _e = data.assetQuantityFee, assetQuantityFee = _e === void 0 ? codechain_primitives_1.U64.ensure(0) : _e, originOutputs = data.originOutputs, expiration = data.expiration;
        // Called too many times, so moving to variables
        var assetQuantityFromIsZero = assetQuantityFrom.value.isZero();
        var assetQuantityToIsZero = assetQuantityTo.value.isZero();
        var assetQuantityFeeIsZero = assetQuantityFee.value.isZero();
        if (assetTypeFrom.isEqualTo(assetTypeTo) && shardIdFrom === shardIdTo) {
            throw Error("assetTypeFrom and assetTypeTo is same: " + assetTypeFrom + "(shard " + shardIdFrom + ")");
        }
        else if (!assetQuantityFeeIsZero) {
            if (assetTypeFrom.isEqualTo(assetTypeFee) &&
                shardIdFrom === shardIdFee) {
                throw Error("assetTypeFrom and assetTypeFee is same: " + assetTypeFrom + "(shard " + shardIdFrom + ")");
            }
            if (assetTypeTo.isEqualTo(assetTypeFee) &&
                shardIdTo === shardIdFee) {
                throw Error("assetTypeTo and assetTypeFee is same: " + assetTypeTo + "(shard " + shardIdTo + ")");
            }
        }
        if ((assetQuantityFromIsZero && !assetQuantityToIsZero) ||
            (!assetQuantityFromIsZero && assetQuantityToIsZero) ||
            (assetQuantityFromIsZero && assetQuantityFeeIsZero) ||
            (!assetQuantityFromIsZero &&
                !assetQuantityFee.value.mod(assetQuantityFrom.value).isZero())) {
            throw Error("The given quantity ratio is invalid: " + assetQuantityFrom + ":" + assetQuantityTo + ":" + assetQuantityFee);
        }
        if (originOutputs.length === 0) {
            throw Error("originOutputs is empty");
        }
        this.assetTypeFrom = assetTypeFrom;
        this.assetTypeTo = assetTypeTo;
        this.assetTypeFee = assetTypeFee;
        this.shardIdFrom = shardIdFrom;
        this.shardIdTo = shardIdTo;
        this.shardIdFee = shardIdFee;
        this.assetQuantityFrom = assetQuantityFrom;
        this.assetQuantityTo = assetQuantityTo;
        this.assetQuantityFee = assetQuantityFee;
        this.originOutputs = originOutputs;
        this.expiration = expiration;
    }
    /**
     * Create an Order from an OrderJSON object.
     * @param data An OrderJSON object.
     * @returns An Order.
     */
    Order.fromJSON = function (data) {
        var assetTypeFrom = data.assetTypeFrom, assetTypeTo = data.assetTypeTo, assetTypeFee = data.assetTypeFee, shardIdFrom = data.shardIdFrom, shardIdTo = data.shardIdTo, shardIdFee = data.shardIdFee, assetQuantityFrom = data.assetQuantityFrom, assetQuantityTo = data.assetQuantityTo, assetQuantityFee = data.assetQuantityFee, originOutputs = data.originOutputs, expiration = data.expiration, lockScriptHashFrom = data.lockScriptHashFrom, parametersFrom = data.parametersFrom, lockScriptHashFee = data.lockScriptHashFee, parametersFee = data.parametersFee;
        return new this({
            assetTypeFrom: new codechain_primitives_1.H160(assetTypeFrom),
            assetTypeTo: new codechain_primitives_1.H160(assetTypeTo),
            assetTypeFee: new codechain_primitives_1.H160(assetTypeFee),
            shardIdFrom: shardIdFrom,
            shardIdTo: shardIdTo,
            shardIdFee: shardIdFee,
            assetQuantityFrom: codechain_primitives_1.U64.ensure(assetQuantityFrom),
            assetQuantityTo: codechain_primitives_1.U64.ensure(assetQuantityTo),
            assetQuantityFee: codechain_primitives_1.U64.ensure(assetQuantityFee),
            originOutputs: originOutputs.map(function (point) {
                return AssetOutPoint_1.AssetOutPoint.fromJSON(point);
            }),
            expiration: codechain_primitives_1.U64.ensure(expiration),
            lockScriptHashFrom: new codechain_primitives_1.H160(lockScriptHashFrom),
            parametersFrom: parametersFrom.map(function (p) {
                return Buffer.from(p, "hex");
            }),
            lockScriptHashFee: new codechain_primitives_1.H160(lockScriptHashFee),
            parametersFee: parametersFee.map(function (p) {
                return Buffer.from(p, "hex");
            })
        });
    };
    /**
     * Convert to an object for RLP encoding.
     */
    Order.prototype.toEncodeObject = function () {
        var _a = this, assetTypeFrom = _a.assetTypeFrom, assetTypeTo = _a.assetTypeTo, assetTypeFee = _a.assetTypeFee, shardIdFrom = _a.shardIdFrom, shardIdTo = _a.shardIdTo, shardIdFee = _a.shardIdFee, assetQuantityFrom = _a.assetQuantityFrom, assetQuantityTo = _a.assetQuantityTo, assetQuantityFee = _a.assetQuantityFee, originOutputs = _a.originOutputs, expiration = _a.expiration, lockScriptHashFrom = _a.lockScriptHashFrom, parametersFrom = _a.parametersFrom, lockScriptHashFee = _a.lockScriptHashFee, parametersFee = _a.parametersFee;
        return [
            assetTypeFrom.toEncodeObject(),
            assetTypeTo.toEncodeObject(),
            assetTypeFee.toEncodeObject(),
            shardIdFrom,
            shardIdTo,
            shardIdFee,
            assetQuantityFrom.toEncodeObject(),
            assetQuantityTo.toEncodeObject(),
            assetQuantityFee.toEncodeObject(),
            originOutputs.map(function (output) { return output.toEncodeObject(); }),
            expiration.toEncodeObject(),
            lockScriptHashFrom.toEncodeObject(),
            parametersFrom.map(function (p) { return Buffer.from(p); }),
            lockScriptHashFee.toEncodeObject(),
            parametersFee.map(function (p) { return Buffer.from(p); })
        ];
    };
    /**
     * Convert to RLP bytes.
     */
    Order.prototype.rlpBytes = function () {
        return RLP.encode(this.toEncodeObject());
    };
    /**
     * Convert to an OrderJSON object.
     * @returns An OrderJSON object.
     */
    Order.prototype.toJSON = function () {
        var _a = this, assetTypeFrom = _a.assetTypeFrom, assetTypeTo = _a.assetTypeTo, assetTypeFee = _a.assetTypeFee, shardIdFrom = _a.shardIdFrom, shardIdTo = _a.shardIdTo, shardIdFee = _a.shardIdFee, assetQuantityFrom = _a.assetQuantityFrom, assetQuantityTo = _a.assetQuantityTo, assetQuantityFee = _a.assetQuantityFee, originOutputs = _a.originOutputs, expiration = _a.expiration, lockScriptHashFrom = _a.lockScriptHashFrom, parametersFrom = _a.parametersFrom, lockScriptHashFee = _a.lockScriptHashFee, parametersFee = _a.parametersFee;
        return {
            assetTypeFrom: assetTypeFrom.toJSON(),
            assetTypeTo: assetTypeTo.toJSON(),
            assetTypeFee: assetTypeFee.toJSON(),
            shardIdFrom: shardIdFrom,
            shardIdTo: shardIdTo,
            shardIdFee: shardIdFee,
            assetQuantityFrom: assetQuantityFrom.toJSON(),
            assetQuantityTo: assetQuantityTo.toJSON(),
            assetQuantityFee: assetQuantityFee.toJSON(),
            originOutputs: originOutputs.map(function (output) { return output.toJSON(); }),
            expiration: expiration.toString(),
            lockScriptHashFrom: lockScriptHashFrom.toJSON(),
            parametersFrom: parametersFrom.map(function (p) {
                return p.toString("hex");
            }),
            lockScriptHashFee: lockScriptHashFee.toJSON(),
            parametersFee: parametersFee.map(function (p) { return p.toString("hex"); })
        };
    };
    /**
     * Get the hash of an order.
     * @returns An order hash.
     */
    Order.prototype.hash = function () {
        return new codechain_primitives_1.H256(utils_1.blake256(this.rlpBytes()));
    };
    /**
     * Return the consumed order
     * @param params.quantity the consumed quantity of the asset to give
     */
    Order.prototype.consume = function (quantity) {
        var _a = this, assetTypeFrom = _a.assetTypeFrom, assetTypeTo = _a.assetTypeTo, assetTypeFee = _a.assetTypeFee, shardIdFrom = _a.shardIdFrom, shardIdTo = _a.shardIdTo, shardIdFee = _a.shardIdFee, assetQuantityFrom = _a.assetQuantityFrom, assetQuantityTo = _a.assetQuantityTo, assetQuantityFee = _a.assetQuantityFee, originOutputs = _a.originOutputs, expiration = _a.expiration, lockScriptHashFrom = _a.lockScriptHashFrom, parametersFrom = _a.parametersFrom, lockScriptHashFee = _a.lockScriptHashFee, parametersFee = _a.parametersFee;
        var quantityFrom = codechain_primitives_1.U64.ensure(quantity);
        if (quantityFrom.gt(assetQuantityFrom)) {
            throw Error("The given quantity is too big: " + quantityFrom + " > " + assetQuantityFrom);
        }
        var remainQuantityFrom = this.assetQuantityFrom.value.minus(quantityFrom.value);
        if (!remainQuantityFrom
            .times(assetQuantityTo.value)
            .mod(assetQuantityFrom.value)
            .isZero()) {
            throw Error("The given quantity does not fit to the ratio: " + assetQuantityFrom + ":" + assetQuantityTo);
        }
        var remainQuantityTo = remainQuantityFrom
            .times(assetQuantityTo.value)
            .idiv(assetQuantityFrom.value);
        var remainQuantityFee = remainQuantityFrom
            .times(assetQuantityFee.value)
            .idiv(assetQuantityFrom.value);
        return new Order({
            assetTypeFrom: assetTypeFrom,
            assetTypeTo: assetTypeTo,
            assetTypeFee: assetTypeFee,
            shardIdFrom: shardIdFrom,
            shardIdTo: shardIdTo,
            shardIdFee: shardIdFee,
            assetQuantityFrom: codechain_primitives_1.U64.ensure(remainQuantityFrom),
            assetQuantityTo: codechain_primitives_1.U64.ensure(remainQuantityTo),
            assetQuantityFee: codechain_primitives_1.U64.ensure(remainQuantityFee),
            originOutputs: originOutputs,
            expiration: expiration,
            lockScriptHashFrom: lockScriptHashFrom,
            parametersFrom: parametersFrom,
            lockScriptHashFee: lockScriptHashFee,
            parametersFee: parametersFee
        });
    };
    return Order;
}());
exports.Order = Order;
function decomposeRecipient(recipient) {
    // FIXME: Clean up by abstracting the standard scripts
    var type = recipient.type, payload = recipient.payload;
    if ("pubkeys" in payload) {
        throw Error("Multisig payload is not supported yet");
    }
    switch (type) {
        case 0x00: // LOCK_SCRIPT_HASH ONLY
            return {
                lockScriptHash: payload,
                parameters: []
            };
        case 0x01: // P2PKH
            return {
                lockScriptHash: P2PKH_1.P2PKH.getLockScriptHash(),
                parameters: [Buffer.from(payload.value, "hex")]
            };
        case 0x02: // P2PKHBurn
            return {
                lockScriptHash: P2PKHBurn_1.P2PKHBurn.getLockScriptHash(),
                parameters: [Buffer.from(payload.value, "hex")]
            };
        default:
            throw Error("Unexpected type of AssetAddress: " + type + ", " + recipient);
    }
}
