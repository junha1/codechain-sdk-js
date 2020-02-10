"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
var codechain_primitives_1 = require("codechain-primitives");
var P2PKH_1 = require("../../key/P2PKH");
var P2PKHBurn_1 = require("../../key/P2PKHBurn");
var AssetMintOutput = /** @class */ (function () {
    /**
     * @param data.lockScriptHash A lock script hash of the output.
     * @param data.parameters Parameters of the output.
     * @param data.supply Asset supply of the output.
     */
    function AssetMintOutput(data) {
        if ("recipient" in data) {
            // FIXME: Clean up by abstracting the standard scripts
            var _a = data.recipient, type = _a.type, payload = _a.payload;
            if ("pubkeys" in payload) {
                throw Error("Multisig payload is not supported yet");
            }
            switch (type) {
                case 0x00: // LOCK_SCRIPT_HASH ONLY
                    this.lockScriptHash = payload;
                    this.parameters = [];
                    break;
                case 0x01: // P2PKH
                    this.lockScriptHash = P2PKH_1.P2PKH.getLockScriptHash();
                    this.parameters = [buffer_1.Buffer.from(payload.value, "hex")];
                    break;
                case 0x02: // P2PKHBurn
                    this.lockScriptHash = P2PKHBurn_1.P2PKHBurn.getLockScriptHash();
                    this.parameters = [buffer_1.Buffer.from(payload.value, "hex")];
                    break;
                default:
                    throw Error("Unexpected type of AssetAddress: " + type + ", " + data.recipient);
            }
        }
        else {
            var lockScriptHash = data.lockScriptHash, parameters = data.parameters;
            this.lockScriptHash = lockScriptHash;
            this.parameters = parameters;
        }
        this.supply = data.supply;
    }
    /**
     * Create an AssetMintOutput from an AssetMintOutput JSON object.
     * @param data An AssetMintOutput JSON object.
     * @returns An AssetMintOutput.
     */
    AssetMintOutput.fromJSON = function (data) {
        var lockScriptHash = data.lockScriptHash, parameters = data.parameters, supply = data.supply;
        return new this({
            lockScriptHash: codechain_primitives_1.H160.ensure(lockScriptHash),
            parameters: parameters.map(function (p) { return buffer_1.Buffer.from(p, "hex"); }),
            supply: codechain_primitives_1.U64.ensure(supply)
        });
    };
    /**
     * Convert to an AssetMintOutput JSON object.
     * @returns An AssetMintOutput JSON object.
     */
    AssetMintOutput.prototype.toJSON = function () {
        return {
            lockScriptHash: this.lockScriptHash.toJSON(),
            parameters: this.parameters.map(function (p) { return p.toString("hex"); }),
            supply: this.supply.toJSON()
        };
    };
    return AssetMintOutput;
}());
exports.AssetMintOutput = AssetMintOutput;
