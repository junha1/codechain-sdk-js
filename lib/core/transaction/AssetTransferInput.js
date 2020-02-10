"use strict";
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
var AssetOutPoint_1 = require("./AssetOutPoint");
/**
 * An AssetTransferInput consists of the following:
 *  - An AssetOutPoint, which points to the asset to be spent.
 *  - A lock script and an unlock script, that prove ownership of the asset
 *  - The hashed value(blake160) of a lock script must be identical to that of the pointed asset's lock script hash.
 *  - The results of running the script must return successful in order for the Asset's input to be valid.
 */
var AssetTransferInput = /** @class */ (function () {
    /**
     * @param data.prevOut An AssetOutPoint of the input.
     * @param data.lockScript A lock script of the input.
     * @param data.unlockScript A unlock script of the input.
     */
    function AssetTransferInput(data) {
        var prevOut = data.prevOut, timelock = data.timelock, _a = data.lockScript, lockScript = _a === void 0 ? buffer_1.Buffer.from([]) : _a, _b = data.unlockScript, unlockScript = _b === void 0 ? buffer_1.Buffer.from([]) : _b;
        this.prevOut = prevOut;
        this.timelock = timelock;
        this.lockScript = buffer_1.Buffer.from(lockScript);
        this.unlockScript = buffer_1.Buffer.from(unlockScript);
    }
    /**
     * Create an AssetTransferInput from an AssetTransferInput JSON object.
     * @param data An AssetTransferInput JSON object.
     * @returns An AssetTransferInput.
     */
    AssetTransferInput.fromJSON = function (data) {
        var prevOut = data.prevOut, timelock = data.timelock, lockScript = data.lockScript, unlockScript = data.unlockScript;
        return new AssetTransferInput({
            prevOut: AssetOutPoint_1.AssetOutPoint.fromJSON(prevOut),
            timelock: timelock,
            lockScript: buffer_1.Buffer.from(lockScript),
            unlockScript: buffer_1.Buffer.from(unlockScript)
        });
    };
    /**
     * Convert to an object for RLP encoding.
     */
    AssetTransferInput.prototype.toEncodeObject = function () {
        var _a = this, prevOut = _a.prevOut, timelock = _a.timelock, lockScript = _a.lockScript, unlockScript = _a.unlockScript;
        return [
            prevOut.toEncodeObject(),
            convertTimelockToEncodeObject(timelock),
            lockScript,
            unlockScript
        ];
    };
    /**
     * Convert to an AssetTransferInput JSON object.
     * @returns An AssetTransferInput JSON object.
     */
    AssetTransferInput.prototype.toJSON = function () {
        var _a = this, prevOut = _a.prevOut, timelock = _a.timelock, lockScript = _a.lockScript, unlockScript = _a.unlockScript;
        return {
            prevOut: prevOut.toJSON(),
            timelock: timelock,
            lockScript: __spread(lockScript),
            unlockScript: __spread(unlockScript)
        };
    };
    /**
     * Clone a new AssetTransferInput that has empty lock script and empty
     * unlock script. The cloned object is used to sign a transaction.
     * @returns An AssetTransferInput.
     */
    AssetTransferInput.prototype.withoutScript = function () {
        var _a = this, prevOut = _a.prevOut, timelock = _a.timelock;
        return new AssetTransferInput({
            prevOut: prevOut,
            timelock: timelock,
            lockScript: buffer_1.Buffer.from([]),
            unlockScript: buffer_1.Buffer.from([])
        });
    };
    /**
     * Set a lock script.
     * @param lockScript A lock script.
     */
    AssetTransferInput.prototype.setLockScript = function (lockScript) {
        this.lockScript = lockScript;
    };
    /**
     * Set a unlock script.
     * @param unlockScript A unlock script.
     */
    AssetTransferInput.prototype.setUnlockScript = function (unlockScript) {
        this.unlockScript = unlockScript;
    };
    return AssetTransferInput;
}());
exports.AssetTransferInput = AssetTransferInput;
function convertTimelockToEncodeObject(timelock) {
    if (timelock == null) {
        return [];
    }
    var type = timelock.type, value = timelock.value;
    var typeEncoded;
    switch (type) {
        case "block":
            typeEncoded = 1;
            break;
        case "blockAge":
            typeEncoded = 2;
            break;
        case "time":
            typeEncoded = 3;
            break;
        case "timeAge":
            typeEncoded = 4;
            break;
        default:
            throw Error("Unexpected timelock type: " + type);
    }
    return [[typeEncoded, value]];
}
