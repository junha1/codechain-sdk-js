"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
var key_1 = require("./key");
var rpc_1 = require("./rpc");
var utils_1 = require("./utils");
var SDK = /** @class */ (function () {
    /**
     * @param params.server HTTP RPC server address
     * @param params.keyStoreType Specify the type of the keystore. The default value is "local". It creates keystore.db file on the working directory.
     * @param params.networkId The network id of CodeChain. The default value is "tc" (testnet)
     */
    function SDK(params) {
        this.util = SDK.util;
        var server = params.server, _a = params.keyStoreType, keyStoreType = _a === void 0 ? "local" : _a, _b = params.networkId, networkId = _b === void 0 ? "tc" : _b, options = params.options;
        this.rpc = new rpc_1.Rpc({
            server: server,
            options: options
        });
        this.core = new core_1.Core({ networkId: networkId });
        this.key = new key_1.Key({
            networkId: networkId,
            keyStoreType: keyStoreType
        });
        this._networkId = networkId;
    }
    Object.defineProperty(SDK.prototype, "networkId", {
        get: function () {
            return this._networkId;
        },
        enumerable: true,
        configurable: true
    });
    SDK.Rpc = rpc_1.Rpc;
    SDK.Core = core_1.Core;
    SDK.Key = key_1.Key;
    SDK.util = {
        blake128: utils_1.blake128,
        blake128WithKey: utils_1.blake128WithKey,
        blake160: utils_1.blake160,
        blake160WithKey: utils_1.blake160WithKey,
        blake256: utils_1.blake256,
        blake256WithKey: utils_1.blake256WithKey,
        ripemd160: utils_1.ripemd160,
        signEcdsa: utils_1.signEcdsa,
        verifyEcdsa: utils_1.verifyEcdsa,
        recoverEcdsa: utils_1.recoverEcdsa,
        generatePrivateKey: utils_1.generatePrivateKey,
        getAccountIdFromPrivate: utils_1.getAccountIdFromPrivate,
        getPublicFromPrivate: utils_1.getPublicFromPrivate
    };
    SDK.SDK = SDK;
    return SDK;
}());
exports.SDK = SDK;
module.exports = SDK;
