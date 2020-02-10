"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var DevelRpc = /** @class */ (function () {
    /**
     * @hidden
     */
    function DevelRpc(rpc) {
        this.rpc = rpc;
    }
    /**
     * Gets keys of the state trie with the given offset and limit.
     * @param offset number
     * @param limit number
     * @returns H256[]
     */
    DevelRpc.prototype.getStateTrieKeys = function (offset, limit) {
        var _this = this;
        if (typeof offset !== "number" ||
            !Number.isInteger(offset) ||
            offset < 0) {
            throw Error("Expected the first argument to be non-negative integer but found " + offset);
        }
        if (typeof limit !== "number" ||
            !Number.isInteger(limit) ||
            limit <= 0) {
            throw Error("Expected the second argument to be posivit integer but found " + limit);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("devel_getStateTrieKeys", [offset, limit])
                .then(function (result) {
                if (!Array.isArray(result)) {
                    return reject(Error("Expected devel_getStateTrieKeys to return an array but it returned " + result));
                }
                result.forEach(function (value, index, arr) {
                    try {
                        arr[index] = new codechain_primitives_1.H256(value);
                    }
                    catch (e) {
                        return reject(Error("Expected devel_getStateTrieKeys() to return an array of H256, but an error occurred: " + e.toString()));
                    }
                });
                resolve(result);
            })
                .catch(reject);
        });
    };
    /**
     * Gets the value of the state trie with the given key.
     * @param key H256
     * @returns string[]
     */
    DevelRpc.prototype.getStateTrieValue = function (key) {
        var _this = this;
        if (!codechain_primitives_1.H256.check(key)) {
            throw Error("Expected the first argument to be an H256 value but found " + key);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("devel_getStateTrieValue", [
                "0x" + codechain_primitives_1.H256.ensure(key).value
            ])
                .then(function (result) {
                if (!Array.isArray(result)) {
                    return reject(Error("Expected devel_getStateTrieValue to return an array but it returned " + result));
                }
                result.forEach(function (value, index) {
                    if (typeof value !== "string") {
                        return reject(Error("Expected devel_getStateTrieValue to return an array of strings but found " + value + " at " + index));
                    }
                });
                resolve(result);
            })
                .catch(reject);
        });
    };
    /**
     * Starts and Enable sealing transactions.
     * @returns null
     */
    DevelRpc.prototype.startSealing = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("devel_startSealing", [])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected devel_startSealing to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Stops and Disable sealing transactions.
     * @returns null
     */
    DevelRpc.prototype.stopSealing = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("devel_stopSealing", [])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected devel_stopSealing to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    return DevelRpc;
}());
exports.DevelRpc = DevelRpc;
