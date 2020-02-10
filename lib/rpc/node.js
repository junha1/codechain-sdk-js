"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeRpc = /** @class */ (function () {
    /**
     * @hidden
     */
    function NodeRpc(rpc) {
        this.rpc = rpc;
    }
    /**
     * Sends ping to check whether CodeChain's RPC server is responding or not.
     * @returns String "pong"
     */
    NodeRpc.prototype.ping = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("ping", [], { id: id })
                .then(function (result) {
                if (typeof result === "string") {
                    return resolve(result);
                }
                return reject(Error("Expected ping() to return a string but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Gets the version of CodeChain node.
     * @returns The version of CodeChain node (e.g. 0.1.0)
     */
    NodeRpc.prototype.getNodeVersion = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("version", [])
                .then(function (result) {
                if (typeof result === "string") {
                    return resolve(result);
                }
                return reject(Error("Expected getNodeVersion() to return a string but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Gets the commit hash of the repository upon which the CodeChain executable was built.
     * @hidden
     */
    NodeRpc.prototype.getCommitHash = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("commitHash", [])
                .then(function (result) {
                if (typeof result === "string") {
                    return resolve(result);
                }
                return reject(Error("Expected getCommitHash() to return a string but it returned " + result));
            })
                .catch(reject);
        });
    };
    return NodeRpc;
}());
exports.NodeRpc = NodeRpc;
