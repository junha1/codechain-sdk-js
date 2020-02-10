"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var json_1 = require("./transaction/json");
var RLP = require("rlp");
/**
 * Block is the unit of processes being handled by CodeChain. Contains information related to SignedTransaction's list and block creation.
 */
var Block = /** @class */ (function () {
    function Block(data) {
        var parentHash = data.parentHash, timestamp = data.timestamp, number = data.number, author = data.author, extraData = data.extraData, transactionsRoot = data.transactionsRoot, stateRoot = data.stateRoot, score = data.score, seal = data.seal, hash = data.hash, transactions = data.transactions;
        this.parentHash = parentHash;
        this.timestamp = timestamp;
        this.number = number;
        this.author = author;
        this.extraData = extraData;
        this.transactionsRoot = transactionsRoot;
        this.stateRoot = stateRoot;
        this.score = score;
        this.seal = seal;
        this.hash = hash;
        this.transactions = transactions;
    }
    Block.fromJSON = function (data) {
        var parentHash = data.parentHash, timestamp = data.timestamp, number = data.number, author = data.author, extraData = data.extraData, transactionsRoot = data.transactionsRoot, stateRoot = data.stateRoot, score = data.score, seal = data.seal, hash = data.hash, transactions = data.transactions;
        return new this({
            parentHash: new codechain_primitives_1.H256(parentHash),
            timestamp: timestamp,
            number: number,
            author: codechain_primitives_1.PlatformAddress.fromString(author),
            extraData: extraData,
            transactionsRoot: new codechain_primitives_1.H256(transactionsRoot),
            stateRoot: new codechain_primitives_1.H256(stateRoot),
            score: new codechain_primitives_1.U256(score),
            seal: seal,
            hash: new codechain_primitives_1.H256(hash),
            transactions: transactions.map(json_1.fromJSONToSignedTransaction)
        });
    };
    Block.prototype.toJSON = function () {
        var _a = this, parentHash = _a.parentHash, timestamp = _a.timestamp, number = _a.number, author = _a.author, extraData = _a.extraData, transactionsRoot = _a.transactionsRoot, stateRoot = _a.stateRoot, score = _a.score, seal = _a.seal, hash = _a.hash, transactions = _a.transactions;
        return {
            parentHash: parentHash.toJSON(),
            timestamp: timestamp,
            number: number,
            author: author.toString(),
            extraData: __spread(extraData),
            transactionsRoot: transactionsRoot.toJSON(),
            stateRoot: stateRoot.toJSON(),
            score: score.value.toString(),
            seal: seal.map(function (buffer) { return __spread(buffer); }),
            hash: hash.toJSON(),
            transactions: transactions.map(function (p) { return p.toJSON(); })
        };
    };
    Block.prototype.getSize = function () {
        var _a = this, parentHash = _a.parentHash, timestamp = _a.timestamp, number = _a.number, author = _a.author, extraData = _a.extraData, transactionsRoot = _a.transactionsRoot, stateRoot = _a.stateRoot, score = _a.score, seal = _a.seal, transactions = _a.transactions;
        var blockHeader = [];
        blockHeader.push(parentHash.toEncodeObject());
        blockHeader.push(author.getAccountId().toEncodeObject());
        blockHeader.push(stateRoot.toEncodeObject());
        blockHeader.push(transactionsRoot.toEncodeObject());
        blockHeader.push(score.toEncodeObject());
        blockHeader.push(number);
        blockHeader.push(timestamp);
        blockHeader.push("0x" + Buffer.from(extraData).toString("hex"));
        blockHeader.push.apply(blockHeader, __spread(seal.map(function (s) { return "0x" + Buffer.from(s).toString("hex"); })));
        var encoded = RLP.encode([
            blockHeader,
            transactions.map(function (tx) { return tx.toEncodeObject(); })
        ]);
        return encoded.byteLength;
    };
    return Block;
}());
exports.Block = Block;
