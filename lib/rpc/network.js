"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetworkRpc = /** @class */ (function () {
    /**
     * @hidden
     */
    function NetworkRpc(rpc) {
        this.rpc = rpc;
    }
    /**
     * Connect to node
     * @param address Node address which to connect
     * @param port
     */
    NetworkRpc.prototype.connect = function (address, port) {
        var _this = this;
        if (!isIpAddressString(address)) {
            throw Error("Expected the first argument of connect to be an IP address string but found " + address);
        }
        if (!isPortNumber(port)) {
            throw Error("Expected the second argument of connect to be a port number but found " + port);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_connect", [address, port])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_connect to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Disconnect from the node
     * @param address Node address which to disconnect
     * @param port
     */
    NetworkRpc.prototype.disconnect = function (address, port) {
        var _this = this;
        if (!isIpAddressString(address)) {
            throw Error("Expected the first argument of disconnect to be an IP address string but found " + address);
        }
        if (!isPortNumber(port)) {
            throw Error("Expected the second argument of disconnect to be a port number but found " + port);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_disconnect", [address, port])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_disconnect to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Check the node is connected
     * @param address Node address
     * @param port
     */
    NetworkRpc.prototype.isConnected = function (address, port) {
        var _this = this;
        if (!isIpAddressString(address)) {
            throw Error("Expected the first argument of isConnected to be an IP address string but found " + address);
        }
        if (!isPortNumber(port)) {
            throw Error("Expected the second argument of isConnected to be a port number but found " + port);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_isConnected", [address, port])
                .then(function (result) {
                if (typeof result === "boolean") {
                    return resolve(result);
                }
                reject(Error("Expected net_isConnected to return a boolean but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Get the port
     */
    NetworkRpc.prototype.getPort = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_getPort", [])
                .then(function (result) {
                if (isPortNumber(result)) {
                    return resolve(result);
                }
                reject(Error("Expected net_getPort to return a port number but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Get the number of established peers
     */
    NetworkRpc.prototype.getPeerCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_getPeerCount", [])
                .then(function (result) {
                if (typeof result === "number") {
                    return resolve(result);
                }
                reject(Error("Expected net_getPeerCount to return a number but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Get the addresses of established peers
     */
    NetworkRpc.prototype.getPeers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_getEstablishedPeers", [])
                .then(function (result) {
                if (!Array.isArray(result)) {
                    return reject(Error("Expected net_getEstablishedPeers to return an array but it returned " + result));
                }
                result.forEach(function (address, index) {
                    if (!isSocketAddressString(address)) {
                        return reject(Error("Expected net_getEstablishedPeers to return an array of IPv4 address but found " + address + " at " + index));
                    }
                });
                resolve(result);
            })
                .catch(reject);
        });
    };
    /**
     * Add the IP to whitelist
     * @param ip Node IP
     */
    NetworkRpc.prototype.addToWhitelist = function (ipCidr, tag) {
        var _this = this;
        if (!isIpCidrAddressString(ipCidr)) {
            throw Error("Expected the first argument of addToWhitelist to be an IP Cidr block address string but found " + ipCidr);
        }
        if (tag !== undefined && typeof tag !== "string") {
            throw Error("Expected the second arguments of addToWhitelist to be a string but found " + tag);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_addToWhitelist", [ipCidr, tag || null])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_addToWhitelist to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Remove the IP from whitelist
     * @param ip Node IP
     */
    NetworkRpc.prototype.removeFromWhitelist = function (ipCidr) {
        var _this = this;
        if (!isIpCidrAddressString(ipCidr)) {
            throw Error("Expected the first argument of removeFromWhitelist to be an IP Cidr block address string but found " + ipCidr);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_removeFromWhitelist", [ipCidr])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_removeFromWhitelist to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Add the IP to blacklist
     * @param ip Node IP
     */
    NetworkRpc.prototype.addToBlacklist = function (ipCidr, tag) {
        var _this = this;
        if (!isIpCidrAddressString(ipCidr)) {
            throw Error("Expected the first argument of addToBlacklist to be an IP Cidr block address string but found " + ipCidr);
        }
        if (tag !== undefined && typeof tag !== "string") {
            throw Error("Expected the second arguments of addToWhitelist to be a string but found " + tag);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_addToBlacklist", [ipCidr, tag || null])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_addToBlacklist to return null but it returned " + result));
            });
        });
    };
    /**
     * Remove the IP from blacklist
     * @param ip Node IP
     */
    NetworkRpc.prototype.removeFromBlacklist = function (ipCidr) {
        var _this = this;
        if (!isIpCidrAddressString(ipCidr)) {
            throw Error("Expected the first argument of removeFromBlacklist to be an IP Cidr block address string but found " + ipCidr);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_removeFromBlacklist", [ipCidr])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_removeFromBlacklist to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Enable whitelist
     */
    NetworkRpc.prototype.enableWhitelist = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_enableWhitelist", [])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_enableWhitelist to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Disable whitelist
     */
    NetworkRpc.prototype.disableWhitelist = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_disableWhitelist", [])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_disableWhitelist to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Enable blacklist
     */
    NetworkRpc.prototype.enableBlacklist = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_enableBlacklist", [])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_enableBlacklist to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Disable blacklist
     */
    NetworkRpc.prototype.disableBlacklist = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_disableBlacklist", [])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected net_disableBlacklist to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Get the status of whitelist
     */
    NetworkRpc.prototype.getWhitelist = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_getWhitelist", [])
                .then(function (result) {
                if (result === null || typeof result !== "object") {
                    return reject(Error("Expected net_getWhitelist to return an object but it returned " + result));
                }
                var list = result.list, enabled = result.enabled;
                if (Array.isArray(list) && typeof enabled === "boolean") {
                    // FIXME: Check whether the strings in the list are valid.
                    return resolve(result);
                }
                reject(Error("Expected net_getWhitelist to return { list: string[], enabled: boolean } but it returned " + JSON.stringify(result)));
            })
                .catch(reject);
        });
    };
    /**
     * Get the status of blacklist
     */
    NetworkRpc.prototype.getBlacklist = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("net_getBlacklist", [])
                .then(function (result) {
                if (result === null || typeof result !== "object") {
                    return reject(Error("Expected net_getBlacklist to return an object but it returned " + result));
                }
                var list = result.list, enabled = result.enabled;
                if (Array.isArray(list) && typeof enabled === "boolean") {
                    // FIXME: Check whether the strings in the list are valid.
                    return resolve(result);
                }
                reject(Error("Expected net_getBlacklist to return { list: string[], enabled: boolean } but it returned " + JSON.stringify(result)));
            })
                .catch(reject);
        });
    };
    return NetworkRpc;
}());
exports.NetworkRpc = NetworkRpc;
function isIpAddressString(value) {
    return /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test(value);
}
function isIpCidrAddressString(value) {
    return /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))?$/.test(value);
}
function isSocketAddressString(value) {
    return /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|:)){4}([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/.test(value);
}
function isPortNumber(value) {
    return (typeof value === "number" &&
        Number.isInteger(value) &&
        0 <= value &&
        value < 0xffff);
}
