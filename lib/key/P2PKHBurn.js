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
var buffer_1 = require("buffer");
var codechain_primitives_1 = require("codechain-primitives");
var Script_1 = require("../core/Script");
var utils_1 = require("../utils");
var P2PKHBurn = /** @class */ (function () {
    function P2PKHBurn(params) {
        var keyStore = params.keyStore, networkId = params.networkId;
        this.keyStore = keyStore;
        this.networkId = networkId;
    }
    P2PKHBurn.getLockScript = function () {
        var _a = Script_1.Script.Opcode, COPY = _a.COPY, BLAKE160 = _a.BLAKE160, EQ = _a.EQ, JZ = _a.JZ, CHKSIG = _a.CHKSIG, BURN = _a.BURN;
        return buffer_1.Buffer.from([
            COPY,
            0x01,
            BLAKE160,
            EQ,
            JZ,
            0xff,
            CHKSIG,
            JZ,
            0xff,
            BURN
        ]);
    };
    P2PKHBurn.getLockScriptHash = function () {
        return new codechain_primitives_1.H160("37572bdcc22d39a59c0d12d301f6271ba3fdd451");
    };
    P2PKHBurn.prototype.createAddress = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var passphrase, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        passphrase = options.passphrase;
                        return [4 /*yield*/, this.keyStore.asset.createKey({ passphrase: passphrase })];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, codechain_primitives_1.AssetAddress.fromTypeAndPayload(2, hash, {
                                networkId: this.networkId
                            })];
                }
            });
        });
    };
    P2PKHBurn.prototype.createUnlockScript = function (publicKeyHash, txhash, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var passphrase, _a, signatureTag, publicKey, signature, encodedTag, PUSHB;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        passphrase = options.passphrase, _a = options.signatureTag, signatureTag = _a === void 0 ? { input: "all", output: "all" } : _a;
                        return [4 /*yield*/, this.keyStore.asset.getPublicKey({
                                key: publicKeyHash,
                                passphrase: passphrase
                            })];
                    case 1:
                        publicKey = _b.sent();
                        if (!publicKey) {
                            throw Error("Unable to get original key from the given public key hash: " + publicKeyHash);
                        }
                        return [4 /*yield*/, this.keyStore.asset.sign({
                                key: publicKeyHash,
                                message: txhash.value,
                                passphrase: passphrase
                            })];
                    case 2:
                        signature = _b.sent();
                        encodedTag = utils_1.encodeSignatureTag(signatureTag);
                        PUSHB = Script_1.Script.Opcode.PUSHB;
                        return [2 /*return*/, buffer_1.Buffer.from(__spread([
                                PUSHB,
                                65
                            ], buffer_1.Buffer.from(signature, "hex"), [
                                PUSHB,
                                encodedTag.byteLength
                            ], encodedTag, [
                                PUSHB,
                                64
                            ], buffer_1.Buffer.from(publicKey, "hex")))];
                }
            });
        });
    };
    return P2PKHBurn;
}());
exports.P2PKHBurn = P2PKHBurn;
