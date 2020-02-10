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
var node_fetch_1 = require("node-fetch");
var account_1 = require("./account");
var chain_1 = require("./chain");
var devel_1 = require("./devel");
var engine_1 = require("./engine");
var network_1 = require("./network");
var node_1 = require("./node");
/**
 * @hidden
 */
var jaysonBrowserClient = require("jayson/lib/client/browser");
var Rpc = /** @class */ (function () {
    /**
     * @param params.server HTTP RPC server address.
     * @param params.options.transactionSigner The default account to sign the tx
     */
    function Rpc(params) {
        var _this = this;
        this.sendRpcRequest = function (name, params, options) { return __awaiter(_this, void 0, void 0, function () {
            var fallbackServers, allServers, errors, _loop_1, allServers_1, allServers_1_1, server, state_1;
            var e_1, _a;
            var _this = this;
            return __generator(this, function (_b) {
                fallbackServers = (options || { fallbackServers: [] }).fallbackServers;
                allServers = fallbackServers === undefined
                    ? [this.server]
                    : __spread([this.server], fallbackServers);
                errors = [];
                _loop_1 = function (server) {
                    var _a;
                    var id = (options || { id: undefined }).id;
                    try {
                        return { value: new Promise(function (resolve, reject) {
                                _this.client(server).request(name, params, id, function (err, res) {
                                    if (err || res.error) {
                                        reject(err || res.error);
                                    }
                                    else {
                                        resolve(res.result);
                                    }
                                });
                            }) };
                    }
                    catch (err) {
                        errors.push((_a = {}, _a[server] = err, _a));
                    }
                };
                try {
                    for (allServers_1 = __values(allServers), allServers_1_1 = allServers_1.next(); !allServers_1_1.done; allServers_1_1 = allServers_1.next()) {
                        server = allServers_1_1.value;
                        state_1 = _loop_1(server);
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (allServers_1_1 && !allServers_1_1.done && (_a = allServers_1.return)) _a.call(allServers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (errors.length === 1) {
                    return [2 /*return*/, Promise.reject(errors[0][this.server])];
                }
                return [2 /*return*/, Promise.reject(errors)];
            });
        }); };
        var server = params.server, _a = params.options, options = _a === void 0 ? {} : _a;
        this.server = server;
        this.client = function (rpcServer) {
            return jaysonBrowserClient(function (request, callback) {
                node_fetch_1.default(rpcServer, {
                    method: "POST",
                    body: request,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(function (res) {
                    return res.text();
                })
                    .then(function (text) {
                    return callback(null, text);
                })
                    .catch(function (err) {
                    return callback(err);
                });
            });
        };
        this.node = new node_1.NodeRpc(this);
        this.chain = new chain_1.ChainRpc(this, options);
        this.network = new network_1.NetworkRpc(this);
        this.account = new account_1.AccountRpc(this);
        this.engine = new engine_1.EngineRpc(this, options);
        this.devel = new devel_1.DevelRpc(this);
    }
    return Rpc;
}());
exports.Rpc = Rpc;
