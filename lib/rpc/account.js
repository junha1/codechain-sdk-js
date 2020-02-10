"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var AccountRpc = /** @class */ (function () {
    /**
     * @hidden
     */
    function AccountRpc(rpc) {
        this.rpc = rpc;
    }
    /**
     * Gets a list of accounts.
     * @returns A list of accounts
     */
    AccountRpc.prototype.getList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("account_getList", [])
                .then(function (accounts) {
                try {
                    if (Array.isArray(accounts)) {
                        resolve(accounts.map(function (account) {
                            return codechain_primitives_1.PlatformAddress.ensure(account).toString();
                        }));
                    }
                    else {
                        reject(Error("Expected account_getList to return an array but it returned " + accounts));
                    }
                }
                catch (e) {
                    reject(Error("Expected account_getList to return an array of PlatformAddress string, but an error occurred: " + e.toString()));
                }
            })
                .catch(reject);
        });
    };
    /**
     * Creates a new account.
     * @param passphrase A passphrase to be used by the account owner
     * @returns An account
     */
    AccountRpc.prototype.create = function (passphrase) {
        var _this = this;
        if (passphrase && typeof passphrase !== "string") {
            throw Error("Expected the first argument to be a string but given " + passphrase);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("account_create", [passphrase])
                .then(function (account) {
                try {
                    resolve(codechain_primitives_1.PlatformAddress.ensure(account).toString());
                }
                catch (e) {
                    reject(Error("Expected account_create to return PlatformAddress string but an error occurred: " + e.toString()));
                }
            })
                .catch(reject);
        });
    };
    /**
     * Imports a secret key and add the corresponding account.
     * @param secret H256 or hexstring for 256-bit private key
     * @param passphrase A passphrase to be used by the account owner
     * @returns The account
     */
    AccountRpc.prototype.importRaw = function (secret, passphrase) {
        var _this = this;
        if (!codechain_primitives_1.H256.check(secret)) {
            throw Error("Expected the first argument to be an H256 value but found " + secret);
        }
        if (passphrase && typeof passphrase !== "string") {
            throw Error("Expected the second argument to be a string but found " + passphrase);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("account_importRaw", [
                "0x" + codechain_primitives_1.H256.ensure(secret).value,
                passphrase
            ])
                .then(function (account) {
                try {
                    resolve(codechain_primitives_1.PlatformAddress.ensure(account).toString());
                }
                catch (e) {
                    reject(Error("Expected account_importRaw to return PlatformAddress string but an error occurred: " + e.toString()));
                }
            })
                .catch(reject);
        });
    };
    /**
     * Calculates the account's signature for a given message.
     * @param messageDigest A message to sign
     * @param address A platform address
     * @param passphrase The account's passphrase
     */
    AccountRpc.prototype.sign = function (messageDigest, address, passphrase) {
        var _this = this;
        if (!codechain_primitives_1.H256.check(messageDigest)) {
            throw Error("Expected the first argument to be an H256 value but found " + messageDigest);
        }
        if (!codechain_primitives_1.PlatformAddress.check(address)) {
            throw Error("Expected the second argument to be a PlatformAddress value but found " + address);
        }
        if (passphrase && typeof passphrase !== "string") {
            throw Error("Expected the third argument to be a string but found " + passphrase);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("account_sign", [
                "0x" + codechain_primitives_1.H256.ensure(messageDigest).value,
                codechain_primitives_1.PlatformAddress.ensure(address).toString(),
                passphrase
            ])
                .then(function (result) {
                if (typeof result === "string" &&
                    result.match(/0x[0-9a-f]{130}/)) {
                    return resolve(result);
                }
                reject(Error("Expected account_sign to return a 65 byte hexstring but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Sends a transaction with the account's signature.
     * @param params.tx A tx to send
     * @param params.account The platform account to sign the tx
     * @param params.passphrase The account's passphrase
     */
    AccountRpc.prototype.sendTransaction = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, fee, account, passphrase, blockNumber, minFee, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tx = params.tx, fee = params.fee, account = params.account, passphrase = params.passphrase, blockNumber = params.blockNumber;
                        if (!codechain_primitives_1.PlatformAddress.check(account)) {
                            throw Error("Expected the account param to be a PlatformAddress value but found " + account);
                        }
                        if (passphrase && typeof passphrase !== "string") {
                            throw Error("Expected the passphrase param to be a string but found " + passphrase);
                        }
                        if (fee) {
                            tx.setFee(fee);
                        }
                        if (!(tx.fee() == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rpc.chain.getMinTransactionFee(tx.type(), blockNumber)];
                    case 1:
                        minFee = _a.sent();
                        if (minFee === null) {
                            throw new Error("The fee of the tx is not specified");
                        }
                        tx.setFee(minFee);
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.rpc.sendRpcRequest("account_sendTransaction", [
                            tx.toJSON(),
                            codechain_primitives_1.PlatformAddress.ensure(account).toString(),
                            passphrase
                        ])];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, {
                                hash: codechain_primitives_1.H256.ensure(result.hash),
                                seq: result.seq
                            }];
                }
            });
        });
    };
    /**
     * Unlocks the account.
     * @param address A platform address
     * @param passphrase The account's passphrase
     * @param duration Time to keep the account unlocked. The default value is 300(seconds). Passing 0 unlocks the account indefinitely.
     */
    AccountRpc.prototype.unlock = function (address, passphrase, duration) {
        var _this = this;
        if (!codechain_primitives_1.PlatformAddress.check(address)) {
            throw Error("Expected the first argument to be a PlatformAddress value but found " + address);
        }
        if (passphrase && typeof passphrase !== "string") {
            throw Error("Expected the second argument to be a string but found " + passphrase);
        }
        if (duration !== undefined &&
            (typeof duration !== "number" ||
                !Number.isInteger(duration) ||
                duration < 0)) {
            throw Error("Expected the third argument to be non-negative integer but found " + duration);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("account_unlock", [
                codechain_primitives_1.PlatformAddress.ensure(address).toString(),
                passphrase || "",
                duration
            ])
                .then(function (result) {
                if (result === null) {
                    return resolve(null);
                }
                reject(Error("Expected account_unlock to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    /**
     * Changes the passpharse of the account
     * @param address A platform address
     * @param oldPassphrase The account's current passphrase
     * @param newPassphrase The new passphrase for the account
     */
    AccountRpc.prototype.changePassword = function (address, oldPassphrase, newPassphrase) {
        var _this = this;
        if (oldPassphrase && typeof oldPassphrase !== "string") {
            throw Error("Expected the second argument to be a string but given " + oldPassphrase);
        }
        if (newPassphrase && typeof newPassphrase !== "string") {
            throw Error("Expected the second argument to be a string but given " + newPassphrase);
        }
        return new Promise(function (resolve, reject) {
            _this.rpc
                .sendRpcRequest("account_changePassword", [
                address,
                oldPassphrase,
                newPassphrase
            ])
                .then(function (result) {
                if (result == null) {
                    return resolve(null);
                }
                reject(Error("Expected account_changePassword to return null but it returned " + result));
            })
                .catch(reject);
        });
    };
    return AccountRpc;
}());
exports.AccountRpc = AccountRpc;
