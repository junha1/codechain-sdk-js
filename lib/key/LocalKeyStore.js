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
var codechain_keystore_1 = require("codechain-keystore");
var _ = require("lodash");
var LocalKeyStore = /** @class */ (function () {
    function LocalKeyStore(cckey, hdKeyMapping) {
        var _this = this;
        this.platform = {
            getKeyList: function () { return __awaiter(_this, void 0, void 0, function () {
                var hdKeys, keys;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            hdKeys = _.keys(this.hdKeyMapping.platform);
                            return [4 /*yield*/, this.cckey.platform.getKeys()];
                        case 1:
                            keys = _a.sent();
                            return [2 /*return*/, __spread(hdKeys, keys)];
                    }
                });
            }); },
            createKey: function (params) {
                if (params === void 0) { params = {}; }
                return _this.cckey.platform.createKey(params);
            },
            removeKey: function (params) {
                var key = params.key;
                return _this.cckey.platform.deleteKey({ key: key });
            },
            exportRawKey: function (params) {
                var _a = params.passphrase, passphrase = _a === void 0 ? "" : _a;
                return _this.cckey.platform.exportRawKey(__assign(__assign({}, params), { passphrase: passphrase }));
            },
            getPublicKey: function (params) {
                var key = params.key, _a = params.passphrase, passphrase = _a === void 0 ? "" : _a;
                if (_this.hdKeyMapping.platform[params.key]) {
                    var _b = _this.hdKeyMapping.platform[params.key], seedHash = _b.seedHash, path = _b.path;
                    return _this.cckey.hdwseed.getPublicKeyFromSeed({
                        seedHash: seedHash,
                        path: path,
                        passphrase: passphrase
                    });
                }
                else {
                    return _this.cckey.platform.getPublicKey({ key: key, passphrase: passphrase });
                }
            },
            sign: function (params) {
                var _a = params.passphrase, passphrase = _a === void 0 ? "" : _a;
                if (_this.hdKeyMapping.platform[params.key]) {
                    var _b = _this.hdKeyMapping.platform[params.key], seedHash = _b.seedHash, path = _b.path;
                    return _this.cckey.hdwseed.signFromSeed({
                        seedHash: seedHash,
                        path: path,
                        passphrase: passphrase,
                        message: params.message
                    });
                }
                else {
                    return _this.cckey.platform.sign(__assign(__assign({}, params), { passphrase: passphrase }));
                }
            }
        };
        this.asset = {
            getKeyList: function () { return __awaiter(_this, void 0, void 0, function () {
                var hdKeys, keys;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            hdKeys = _.keys(this.hdKeyMapping.asset);
                            return [4 /*yield*/, this.cckey.asset.getKeys()];
                        case 1:
                            keys = _a.sent();
                            return [2 /*return*/, __spread(hdKeys, keys)];
                    }
                });
            }); },
            createKey: function (params) {
                if (params === void 0) { params = {}; }
                return _this.cckey.asset.createKey(params);
            },
            removeKey: function (params) {
                var key = params.key;
                return _this.cckey.asset.deleteKey({ key: key });
            },
            exportRawKey: function (params) {
                var _a = params.passphrase, passphrase = _a === void 0 ? "" : _a;
                return _this.cckey.asset.exportRawKey(__assign(__assign({}, params), { passphrase: passphrase }));
            },
            getPublicKey: function (params) {
                var key = params.key, _a = params.passphrase, passphrase = _a === void 0 ? "" : _a;
                if (_this.hdKeyMapping.asset[params.key]) {
                    var _b = _this.hdKeyMapping.asset[params.key], seedHash = _b.seedHash, path = _b.path;
                    return _this.cckey.hdwseed.getPublicKeyFromSeed({
                        seedHash: seedHash,
                        path: path,
                        passphrase: passphrase
                    });
                }
                else {
                    return _this.cckey.asset.getPublicKey({ key: key, passphrase: passphrase });
                }
            },
            sign: function (params) {
                var _a = params.passphrase, passphrase = _a === void 0 ? "" : _a;
                if (_this.hdKeyMapping.asset[params.key]) {
                    var _b = _this.hdKeyMapping.asset[params.key], seedHash = _b.seedHash, path = _b.path;
                    return _this.cckey.hdwseed.signFromSeed({
                        seedHash: seedHash,
                        path: path,
                        passphrase: passphrase,
                        message: params.message
                    });
                }
                else {
                    return _this.cckey.asset.sign(__assign(__assign({}, params), { passphrase: passphrase }));
                }
            }
        };
        this.cckey = cckey;
        this.hdKeyMapping = hdKeyMapping || {
            platform: {},
            asset: {}
        };
    }
    LocalKeyStore.create = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var cckey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, codechain_keystore_1.CCKey.create(options)];
                    case 1:
                        cckey = _a.sent();
                        return [2 /*return*/, new LocalKeyStore(cckey, options.mapping)];
                }
            });
        });
    };
    LocalKeyStore.createForTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cckey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, codechain_keystore_1.CCKey.create({ dbType: "in-memory" })];
                    case 1:
                        cckey = _a.sent();
                        return [2 /*return*/, new LocalKeyStore(cckey)];
                }
            });
        });
    };
    LocalKeyStore.prototype.close = function () {
        return this.cckey.close();
    };
    return LocalKeyStore;
}());
exports.LocalKeyStore = LocalKeyStore;
