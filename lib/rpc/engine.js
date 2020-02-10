"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var utils_1 = require("../utils");
var RLP = require("rlp");
var EngineRpc = /** @class */ (function () {
    /**
     * @hidden
     */
    function EngineRpc(rpc, options) {
        this.rpc = rpc;
        var fallbackServers = options.fallbackServers;
        this.fallbackServers = fallbackServers;
    }
    /**
     * Gets coinbase's account id.
     * @returns PlatformAddress or null
     */
    EngineRpc.prototype.getCoinbase = function () {
        var _this = this;
        var fallbackServers = this.fallbackServers;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("engine_getCoinbase", [], { fallbackServers: fallbackServers })
                .then(function (result) {
                try {
                    resolve(result === null
                        ? null
                        : codechain_primitives_1.PlatformAddress.fromString(result));
                }
                catch (e) {
                    reject(Error("Expected engine_getCoinbase to return a PlatformAddress string or null, but an error occurred: " + e.toString()));
                }
            })
                .catch(reject);
        });
    };
    /**
     * Gets coinbase's account id.
     * @returns PlatformAddress or null
     */
    EngineRpc.prototype.getBlockReward = function () {
        var _this = this;
        var fallbackServers = this.fallbackServers;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("engine_getBlockReward", [], {
                fallbackServers: fallbackServers
            })
                .then(function (result) {
                try {
                    resolve(codechain_primitives_1.U64.ensure(result));
                }
                catch (e) {
                    reject(Error("Expected engine_getBlockReward to return a U64, but an error occurred: " + e.toString()));
                }
            })
                .catch(reject);
        });
    };
    /**
     * Gets coinbase's account id.
     * @returns PlatformAddress or null
     */
    EngineRpc.prototype.getRecommendedConfirmation = function () {
        var _this = this;
        var fallbackServers = this.fallbackServers;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("engine_getRecommendedConfirmation", [], {
                fallbackServers: fallbackServers
            })
                .then(function (result) {
                if (typeof result === "number") {
                    return resolve(result);
                }
                reject(Error("Expected engine_getRecommendedConfirmation to return a number but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Gets custom type's data at blockNumber with keyFragments.
     * @param handlerId number
     * @param keyFragments any[]
     * @param blockNumber? number
     * @returns string or null returns
     */
    EngineRpc.prototype.getCustomActionData = function (handlerId, keyFragments, blockNumber) {
        var _this = this;
        if (typeof handlerId !== "number" ||
            !Number.isInteger(handlerId) ||
            handlerId < 0) {
            throw Error("Expected the first argument to be non-negative integer but found " + handlerId);
        }
        if (typeof blockNumber !== "undefined" &&
            (typeof blockNumber !== "number" ||
                !Number.isInteger(blockNumber) ||
                blockNumber < 0)) {
            throw Error("Expected the third argument to be non-negative integer but found " + blockNumber);
        }
        return new Promise(function (resolve, reject) {
            var fallbackServers = _this.fallbackServers;
            var rlpKeyFragments = utils_1.toHex(RLP.encode(keyFragments));
            _this.rpc
                .sendRpcRequest("engine_getCustomActionData", [handlerId, "0x" + rlpKeyFragments, blockNumber], { fallbackServers: fallbackServers })
                .then(function (result) {
                if (result == null) {
                    return resolve(null);
                }
                else if (typeof result === "string" &&
                    /^([A-Fa-f0-9]|\s)*$/.test(result)) {
                    return resolve(result);
                }
                reject(Error("Expected engine_getCustomActionData to return a hex string or null but it returned " + result));
            })
                .catch(reject);
        });
    };
    return EngineRpc;
}());
exports.EngineRpc = EngineRpc;
