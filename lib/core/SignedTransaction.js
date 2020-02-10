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
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var utils_1 = require("../utils");
var RLP = require("rlp");
/**
 * A [Transaction](tx.html) signed by a private key. It is possible to request
 * the CodeChain network to process this tx with the
 * [sendSignedTransaction](chainrpc.html#sendsignedtransaction) function.
 *
 * Transactions signed with a regular key has the same effect as those signed with
 * the original key. The original key is the key of the account that registered
 * the regular key.
 *
 * If any of the following is true, the Transaction will not be processed:
 * - The Transaction's processing fee is less than 10.
 * - A network ID is not identical.
 * - A seq is not identical to the signer's seq.
 */
var SignedTransaction = /** @class */ (function () {
    /**
     * @param unsigned A Transaction.
     * @param signature An ECDSA signature which is a 65 byte hexadecimal string.
     * @param blockNumber The block number of the block that contains the tx.
     * @param blockHash The hash of the block that contains the tx.
     * @param transactionIndex The index(location) of the tx within the block.
     */
    function SignedTransaction(unsigned, signature, blockNumber, blockHash, transactionIndex) {
        this.unsigned = unsigned;
        this._signature = signature.startsWith("0x")
            ? signature.substr(2)
            : signature;
        this.blockNumber = blockNumber === undefined ? null : blockNumber;
        this.blockHash = blockHash || null;
        this.transactionIndex =
            transactionIndex === undefined ? null : transactionIndex;
    }
    /**
     * Get the signature of a tx.
     */
    SignedTransaction.prototype.signature = function () {
        return this._signature;
    };
    /**
     * Convert to an object for RLP encoding.
     */
    SignedTransaction.prototype.toEncodeObject = function () {
        var _a = this, unsigned = _a.unsigned, _signature = _a._signature;
        var result = unsigned.toEncodeObject();
        result.push("0x" + _signature);
        return result;
    };
    /**
     * Convert to RLP bytes.
     */
    SignedTransaction.prototype.rlpBytes = function () {
        return RLP.encode(this.toEncodeObject());
    };
    /**
     * Get the hash of a tx.
     * @returns A tx hash.
     */
    SignedTransaction.prototype.hash = function () {
        return new codechain_primitives_1.H256(utils_1.blake256(this.rlpBytes()));
    };
    SignedTransaction.prototype.getAsset = function () {
        // FIXME: Only UnwrapCCC has getAsset method
        return this.unsigned.getAsset();
    };
    /**
     * Get the account ID of a tx's signer.
     * @returns An account ID.
     * @deprecated
     */
    SignedTransaction.prototype.getSignerAccountId = function () {
        var _a = this, _signature = _a._signature, unsigned = _a.unsigned;
        var publicKey = utils_1.recoverEcdsa(unsigned.unsignedHash().value, _signature);
        return new codechain_primitives_1.H160(utils_1.blake160(publicKey));
    };
    /**
     * Get the platform address of a tx's signer.
     * @returns A PlatformAddress.
     * @deprecated
     */
    SignedTransaction.prototype.getSignerAddress = function (params) {
        return codechain_primitives_1.PlatformAddress.fromAccountId(this.getSignerAccountId(), params);
    };
    /**
     * Get the public key of a tx's signer.
     * @returns A public key.
     */
    SignedTransaction.prototype.getSignerPublic = function () {
        var _a = this, _signature = _a._signature, unsigned = _a.unsigned;
        return new codechain_primitives_1.H512(utils_1.recoverEcdsa(unsigned.unsignedHash().value, _signature));
    };
    /**
     * Convert to a SignedTransaction JSON object.
     * @returns A SignedTransaction JSON object.
     */
    SignedTransaction.prototype.toJSON = function () {
        var _a = this, blockNumber = _a.blockNumber, blockHash = _a.blockHash, transactionIndex = _a.transactionIndex, unsigned = _a.unsigned, _signature = _a._signature;
        var json = __assign(__assign({}, unsigned.toJSON()), { blockNumber: blockNumber, blockHash: blockHash === null ? null : blockHash.toJSON(), transactionIndex: transactionIndex, sig: "0x" + _signature, hash: this.hash().toJSON() });
        return json;
    };
    return SignedTransaction;
}());
exports.SignedTransaction = SignedTransaction;
