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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var classes_1 = require("../core/classes");
var TransferAsset_1 = require("../core/transaction/TransferAsset");
var LocalKeyStore_1 = require("./LocalKeyStore");
var MemoryKeyStore_1 = require("./MemoryKeyStore");
var P2PKH_1 = require("./P2PKH");
var P2PKHBurn_1 = require("./P2PKHBurn");
var RemoteKeyStore_1 = require("./RemoteKeyStore");
var Key = /** @class */ (function () {
    function Key(options) {
        this.classes = Key.classes;
        var networkId = options.networkId, keyStoreType = options.keyStoreType;
        if (!isKeyStoreType(keyStoreType)) {
            throw Error("Unexpected keyStoreType param: " + keyStoreType);
        }
        this.networkId = networkId;
        this.keyStore = null;
        this.keyStoreType = keyStoreType;
    }
    /**
     * Creates persistent key store
     * @param keystoreURL key store url (ex http://localhost:7007)
     */
    Key.prototype.createRemoteKeyStore = function (keystoreURL) {
        return RemoteKeyStore_1.RemoteKeyStore.create(keystoreURL);
    };
    /**
     * Creates persistent key store which stores data in the filesystem.
     * @param dbPath A keystore file path
     */
    Key.prototype.createLocalKeyStore = function (dbPath) {
        return LocalKeyStore_1.LocalKeyStore.create({ dbPath: dbPath });
    };
    /**
     * Creates a new platform address
     * @param params.keyStore A key store.
     * @returns A new platform address
     */
    Key.prototype.createPlatformAddress = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, keyStore, passphrase, _b, accountId, networkId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.keyStore;
                        if (!(_a === void 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ensureKeyStore()];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _a;
                        _c.label = 3;
                    case 3:
                        keyStore = _b, passphrase = params.passphrase;
                        if (!isKeyStore(keyStore)) {
                            throw Error("Expected keyStore param to be a KeyStore instance but found " + keyStore);
                        }
                        return [4 /*yield*/, keyStore.platform.createKey({ passphrase: passphrase })];
                    case 4:
                        accountId = _c.sent();
                        networkId = this.networkId;
                        return [2 /*return*/, codechain_primitives_1.PlatformAddress.fromAccountId(accountId, { networkId: networkId })];
                }
            });
        });
    };
    /**
     * Creates a new asset address
     * @param params.type The type of AssetAddress. The default value is "P2PKH".
     * @param params.keyStore A key store.
     * @returns A new asset address
     */
    Key.prototype.createAssetAddress = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, keyStore, _b, type, passphrase, _c, networkId, p2pkh, p2pkhBurn;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = params.keyStore;
                        if (!(_a === void 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ensureKeyStore()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = _a;
                        _d.label = 3;
                    case 3:
                        keyStore = _c, _b = params.type, type = _b === void 0 ? "P2PKH" : _b, passphrase = params.passphrase;
                        if (!isKeyStore(keyStore)) {
                            throw Error("Expected keyStore param to be a KeyStore instance but found " + keyStore);
                        }
                        networkId = this.networkId;
                        if (type === "P2PKH") {
                            p2pkh = new P2PKH_1.P2PKH({ keyStore: keyStore, networkId: networkId });
                            return [2 /*return*/, p2pkh.createAddress({ passphrase: passphrase })];
                        }
                        else if (type === "P2PKHBurn") {
                            p2pkhBurn = new P2PKHBurn_1.P2PKHBurn({ keyStore: keyStore, networkId: networkId });
                            return [2 /*return*/, p2pkhBurn.createAddress({ passphrase: passphrase })];
                        }
                        else {
                            throw Error("Expected the type param of createAssetAddress to be either P2PKH or P2PKHBurn but found " + type);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates P2PKH script generator.
     * @returns new instance of P2PKH
     */
    Key.prototype.createP2PKH = function (params) {
        var keyStore = params.keyStore;
        if (!isKeyStore(keyStore)) {
            throw Error("Expected keyStore param to be a KeyStore instance but found " + keyStore);
        }
        var networkId = this.networkId;
        return new P2PKH_1.P2PKH({ keyStore: keyStore, networkId: networkId });
    };
    /**
     * Creates P2PKHBurn script generator.
     * @returns new instance of P2PKHBurn
     */
    Key.prototype.createP2PKHBurn = function (params) {
        var keyStore = params.keyStore;
        if (!isKeyStore(keyStore)) {
            throw Error("Expected keyStore param to be a KeyStore instance but found " + keyStore);
        }
        var networkId = this.networkId;
        return new P2PKHBurn_1.P2PKHBurn({ keyStore: keyStore, networkId: networkId });
    };
    /**
     * Approves the transaction
     * @param transaction A transaction
     * @param params
     * @param params.keyStore A key store.
     * @param params.account An account.
     * @param params.passphrase The passphrase for the given account
     * @returns An approval
     */
    Key.prototype.approveTransaction = function (transaction, params) {
        return __awaiter(this, void 0, void 0, function () {
            var account, passphrase, _a, keyStore, _b, accountId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        account = params.account, passphrase = params.passphrase, _a = params.keyStore;
                        if (!(_a === void 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ensureKeyStore()];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _a;
                        _c.label = 3;
                    case 3:
                        keyStore = _b;
                        if (!isKeyStore(keyStore)) {
                            throw Error("Expected keyStore param to be a KeyStore instance but found " + keyStore);
                        }
                        if (!codechain_primitives_1.PlatformAddress.check(account)) {
                            throw Error("Expected account param to be a PlatformAddress value but found " + account);
                        }
                        accountId = codechain_primitives_1.PlatformAddress.ensure(account).getAccountId();
                        return [4 /*yield*/, keyStore.platform.sign({
                                key: accountId.value,
                                message: transaction.tracker().value,
                                passphrase: passphrase
                            })];
                    case 4: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    /**
     * Signs a Transaction with the given account.
     * @param tx A Transaction
     * @param params.keyStore A key store.
     * @param params.account An account.
     * @param params.passphrase The passphrase for the given account
     * @returns A SignedTransaction
     * @throws When seq or fee in the Transaction is null
     * @throws When account or its passphrase is invalid
     */
    Key.prototype.signTransaction = function (tx, params) {
        return __awaiter(this, void 0, void 0, function () {
            var account, passphrase, _a, keyStore, fee, seq, _b, accountId, sig;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(tx instanceof classes_1.Transaction)) {
                            throw Error("Expected the first argument of signTransaction to be a Transaction instance but found " + tx);
                        }
                        account = params.account, passphrase = params.passphrase, _a = params.keyStore;
                        if (!(_a === void 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ensureKeyStore()];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _a;
                        _c.label = 3;
                    case 3:
                        keyStore = _b, fee = params.fee, seq = params.seq;
                        if (!isKeyStore(keyStore)) {
                            throw Error("Expected keyStore param to be a KeyStore instance but found " + keyStore);
                        }
                        if (!codechain_primitives_1.PlatformAddress.check(account)) {
                            throw Error("Expected account param to be a PlatformAddress value but found " + account);
                        }
                        if (!classes_1.U64.check(fee)) {
                            throw Error("Expected fee param to be a U64 value but found " + fee);
                        }
                        if (typeof seq !== "number") {
                            throw Error("Expected seq param to be a number value but found " + seq);
                        }
                        tx.setFee(fee);
                        tx.setSeq(seq);
                        accountId = codechain_primitives_1.PlatformAddress.ensure(account).getAccountId();
                        return [4 /*yield*/, keyStore.platform.sign({
                                key: accountId.value,
                                message: tx.unsignedHash().value,
                                passphrase: passphrase
                            })];
                    case 4:
                        sig = _c.sent();
                        return [2 /*return*/, new classes_1.SignedTransaction(tx, sig)];
                }
            });
        });
    };
    /**
     * Signs a transaction's input with a given key store.
     * @param tx An TransferAsset.
     * @param index The index of an input to sign.
     * @param params.keyStore A key store.
     * @param params.passphrase The passphrase for the given input.
     */
    Key.prototype.signTransactionInput = function (tx, index, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var input, _a, lockScriptHash, parameters, publicKeyHash, _b, keyStore, passphrase, _c, signatureTag, _d, p2pkh, message, flag, _e, _f, order, inputIndices, _g, _h;
            var e_1, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        input = tx.input(index);
                        if (input == null) {
                            throw Error("Invalid index");
                        }
                        _a = input.prevOut, lockScriptHash = _a.lockScriptHash, parameters = _a.parameters;
                        if (lockScriptHash === undefined || parameters === undefined) {
                            throw Error("Invalid transaction input");
                        }
                        if (lockScriptHash.value !== P2PKH_1.P2PKH.getLockScriptHash().value) {
                            throw Error("Unexpected lock script hash");
                        }
                        if (parameters.length !== 1) {
                            throw Error("Unexpected length of parameters");
                        }
                        publicKeyHash = Buffer.from(parameters[0]).toString("hex");
                        input.setLockScript(P2PKH_1.P2PKH.getLockScript());
                        _b = params.keyStore;
                        if (!(_b === void 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ensureKeyStore()];
                    case 1:
                        _d = _k.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _d = _b;
                        _k.label = 3;
                    case 3:
                        keyStore = _d, passphrase = params.passphrase, _c = params.signatureTag, signatureTag = _c === void 0 ? { input: "all", output: "all" } : _c;
                        p2pkh = this.createP2PKH({ keyStore: keyStore });
                        if (tx instanceof TransferAsset_1.TransferAsset) {
                            flag = false;
                            try {
                                for (_e = __values(tx.orders()), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    order = _f.value;
                                    inputIndices = order.inputFromIndices.concat(order.inputFeeIndices);
                                    if (inputIndices.indexOf(index) !== -1) {
                                        message = order.order.hash();
                                        flag = true;
                                        break;
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_j = _e.return)) _j.call(_e);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            if (!flag) {
                                message = tx.hashWithoutScript({
                                    tag: signatureTag,
                                    type: "input",
                                    index: index
                                });
                            }
                        }
                        else {
                            throw Error("Invalid tx");
                        }
                        _h = (_g = input).setUnlockScript;
                        return [4 /*yield*/, p2pkh.createUnlockScript(publicKeyHash, message, {
                                passphrase: passphrase,
                                signatureTag: signatureTag
                            })];
                    case 4:
                        _h.apply(_g, [_k.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Signs a transaction's input with an order.
     * @param input An AssetTransferInput.
     * @param order An order to be used as a signature message.
     * @param params.keyStore A key store.
     * @param params.passphrase The passphrase for the given input.
     */
    Key.prototype.signTransactionInputWithOrder = function (input, order, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, lockScriptHash, parameters, publicKeyHash, _b, keyStore, passphrase, _c, p2pkh, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = input.prevOut, lockScriptHash = _a.lockScriptHash, parameters = _a.parameters;
                        if (lockScriptHash === undefined || parameters === undefined) {
                            throw Error("Invalid transaction input");
                        }
                        if (lockScriptHash.value !== P2PKH_1.P2PKH.getLockScriptHash().value) {
                            throw Error("Unexpected lock script hash");
                        }
                        if (parameters.length !== 1) {
                            throw Error("Unexpected length of parameters");
                        }
                        publicKeyHash = Buffer.from(parameters[0]).toString("hex");
                        input.setLockScript(P2PKH_1.P2PKH.getLockScript());
                        _b = params.keyStore;
                        if (!(_b === void 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ensureKeyStore()];
                    case 1:
                        _c = _f.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = _b;
                        _f.label = 3;
                    case 3:
                        keyStore = _c, passphrase = params.passphrase;
                        p2pkh = this.createP2PKH({ keyStore: keyStore });
                        _e = (_d = input).setUnlockScript;
                        return [4 /*yield*/, p2pkh.createUnlockScript(publicKeyHash, order.hash(), {
                                passphrase: passphrase,
                                signatureTag: { input: "all", output: "all" }
                            })];
                    case 4:
                        _e.apply(_d, [_f.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Signs a transaction's burn with a given key store.
     * @param tx An TransferAsset.
     * @param index The index of a burn to sign.
     * @param params.keyStore A key store.
     * @param params.passphrase The passphrase for the given burn.
     */
    Key.prototype.signTransactionBurn = function (tx, index, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var burn, _a, lockScriptHash, parameters, publicKeyHash, _b, keyStore, passphrase, _c, signatureTag, _d, p2pkhBurn, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        burn = tx.burn(index);
                        if (burn == null) {
                            throw Error("Invalid index");
                        }
                        _a = burn.prevOut, lockScriptHash = _a.lockScriptHash, parameters = _a.parameters;
                        if (lockScriptHash === undefined || parameters === undefined) {
                            throw Error("Invalid transaction burn");
                        }
                        if (lockScriptHash.value !== P2PKHBurn_1.P2PKHBurn.getLockScriptHash().value) {
                            throw Error("Unexpected lock script hash");
                        }
                        if (parameters.length !== 1) {
                            throw Error("Unexpected length of parameters");
                        }
                        publicKeyHash = Buffer.from(parameters[0]).toString("hex");
                        burn.setLockScript(P2PKHBurn_1.P2PKHBurn.getLockScript());
                        _b = params.keyStore;
                        if (!(_b === void 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ensureKeyStore()];
                    case 1:
                        _d = _g.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _d = _b;
                        _g.label = 3;
                    case 3:
                        keyStore = _d, passphrase = params.passphrase, _c = params.signatureTag, signatureTag = _c === void 0 ? { input: "all", output: "all" } : _c;
                        p2pkhBurn = this.createP2PKHBurn({ keyStore: keyStore });
                        _f = (_e = burn).setUnlockScript;
                        return [4 /*yield*/, p2pkhBurn.createUnlockScript(publicKeyHash, tx.hashWithoutScript({
                                tag: signatureTag,
                                type: "burn",
                                index: index
                            }), {
                                passphrase: passphrase,
                                signatureTag: signatureTag
                            })];
                    case 4:
                        _f.apply(_e, [_g.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Key.prototype.ensureKeyStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(this.keyStore == null)) return [3 /*break*/, 9];
                        if (!(this.keyStoreType === "local")) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, LocalKeyStore_1.LocalKeyStore.create()];
                    case 1:
                        _a.keyStore = _e.sent();
                        return [3 /*break*/, 9];
                    case 2:
                        if (!(this.keyStoreType === "memory")) return [3 /*break*/, 4];
                        _b = this;
                        return [4 /*yield*/, LocalKeyStore_1.LocalKeyStore.createForTest()];
                    case 3:
                        _b.keyStore = _e.sent();
                        return [3 /*break*/, 9];
                    case 4:
                        if (!(this.keyStoreType.type === "local")) return [3 /*break*/, 6];
                        _c = this;
                        return [4 /*yield*/, LocalKeyStore_1.LocalKeyStore.create({
                                dbPath: this.keyStoreType.path
                            })];
                    case 5:
                        _c.keyStore = _e.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        if (!(this.keyStoreType.type === "remote")) return [3 /*break*/, 8];
                        _d = this;
                        return [4 /*yield*/, RemoteKeyStore_1.RemoteKeyStore.create(this.keyStoreType.url)];
                    case 7:
                        _d.keyStore = _e.sent();
                        return [3 /*break*/, 9];
                    case 8: throw Error("Unreachable");
                    case 9: return [2 /*return*/, this.keyStore];
                }
            });
        });
    };
    Key.classes = {
        RemoteKeyStore: RemoteKeyStore_1.RemoteKeyStore,
        LocalKeyStore: LocalKeyStore_1.LocalKeyStore
    };
    return Key;
}());
exports.Key = Key;
function isKeyStore(value) {
    return (value instanceof LocalKeyStore_1.LocalKeyStore ||
        value instanceof RemoteKeyStore_1.RemoteKeyStore ||
        value instanceof MemoryKeyStore_1.MemoryKeyStore);
}
function isKeyStoreType(value) {
    if (typeof value === "string") {
        return value === "local" || value === "memory";
    }
    if (typeof value === "object" && value != null) {
        return ((value.type === "local" && typeof value.path === "string") ||
            (value.type === "remote" && typeof value.url === "string"));
    }
    return false;
}
