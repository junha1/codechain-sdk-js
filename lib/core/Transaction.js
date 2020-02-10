"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var utils_1 = require("../utils");
var SignedTransaction_1 = require("./SignedTransaction");
var RLP = require("rlp");
/**
 * A unit that collects transaction and requests processing to the network. A parsel signer pays for CCC processing fees.
 *
 * - The fee must be at least 10. The higher the fee, the higher the priority for the tx to be processed.
 * - It contains the network ID. This must be identical to the network ID to which the tx is being sent to.
 * - Its seq must be identical to the seq of the account that will sign the tx.
 * - It contains the transaction to process. After signing the Transaction's size must not exceed 1 MB.
 * - After signing with the sign() function, it can be sent to the network.
 */
var Transaction = /** @class */ (function () {
    function Transaction(networkId) {
        this._seq = null;
        this._fee = null;
        this._networkId = networkId;
    }
    Transaction.prototype.seq = function () {
        return this._seq;
    };
    Transaction.prototype.fee = function () {
        return this._fee;
    };
    Transaction.prototype.setSeq = function (seq) {
        this._seq = seq;
    };
    Transaction.prototype.setFee = function (fee) {
        this._fee = codechain_primitives_1.U64.ensure(fee);
    };
    Transaction.prototype.networkId = function () {
        return this._networkId;
    };
    Transaction.prototype.toEncodeObject = function () {
        var _a = __read([this._seq, this._fee, this._networkId], 3), seq = _a[0], fee = _a[1], networkId = _a[2];
        if (seq == null || !fee) {
            throw Error("Seq and fee in the tx must be present");
        }
        return [
            seq,
            fee.toEncodeObject(),
            networkId,
            this.actionToEncodeObject()
        ];
    };
    Transaction.prototype.rlpBytes = function () {
        return RLP.encode(this.toEncodeObject());
    };
    Transaction.prototype.unsignedHash = function () {
        return new codechain_primitives_1.H256(utils_1.blake256(this.rlpBytes()));
    };
    Transaction.prototype.sign = function (params) {
        var secret = params.secret, seq = params.seq, fee = params.fee;
        if (this._seq != null) {
            throw Error("The tx seq is already set");
        }
        this._seq = seq;
        if (this._fee != null) {
            throw Error("The tx fee is already set");
        }
        this._fee = codechain_primitives_1.U64.ensure(fee);
        return new SignedTransaction_1.SignedTransaction(this, utils_1.signEcdsa(this.unsignedHash().value, codechain_primitives_1.H256.ensure(secret).value));
    };
    Transaction.prototype.toJSON = function () {
        var seq = this._seq;
        var fee = this._fee;
        var networkId = this._networkId;
        var action = this.actionToJSON();
        var result = {
            networkId: networkId,
            action: __assign(__assign({}, action), { type: this.type() }),
            seq: seq != null ? seq : null,
            fee: fee != null ? fee.toJSON() : null
        };
        return result;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
