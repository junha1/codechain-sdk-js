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
/**
 * Converts buffer to hexadecimal string.
 * @param buffer arbritrary length of data
 * @returns hexadecimal string
 */
exports.toHex = function (buffer) { return codechain_primitives_1.toHex(buffer); };
/**
 * Gets data's 256 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 32 byte hexadecimal string
 */
exports.blake256 = function (data) { return codechain_primitives_1.blake256(data); };
/**
 * Gets data's 160 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 20 byte hexadecimal string
 */
exports.blake160 = function (data) { return codechain_primitives_1.blake160(data); };
/**
 * Gets data's 128 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 16 byte hexadecimal string
 */
exports.blake128 = function (data) { return codechain_primitives_1.blake128(data); };
/**
 * Gets data's 256 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 32 byte hexadecimal string
 */
exports.blake256WithKey = function (data, key) { return codechain_primitives_1.blake256WithKey(data, key); };
/**
 * Gets data's 160 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 20 byte hexadecimal string
 */
exports.blake160WithKey = function (data, key) { return codechain_primitives_1.blake160WithKey(data, key); };
/**
 * Gets data's 128 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 16 byte hexadecimal string
 */
exports.blake128WithKey = function (data, key) { return codechain_primitives_1.blake128WithKey(data, key); };
/**
 * Gets data's 160 bit RIPEMD hash.
 * @param data buffer or hexadecimal string
 * @returns 20 byte hexadecimal string
 */
exports.ripemd160 = function (data) { return codechain_primitives_1.ripemd160(data); };
/**
 * @hidden
 */
exports.encodeSignatureTag = function (tag) {
    var input = tag.input, output = tag.output;
    if (input !== "all" && input !== "single") {
        throw Error("Expected the input of the tag to be either \"all\" or \"single\" but found " + input);
    }
    var inputMask = input === "all" ? 1 : 0;
    var outputMask = output === "all" ? 2 : 0;
    if (Array.isArray(output)) {
        // NOTE: Remove duplicates by using Set
        var encoded = encodeSignatureTagOutput(Array.from(new Set(output)).sort(function (a, b) { return a - b; }));
        if (encoded.length >= 64) {
            throw Error("The output length is too big");
        }
        return Buffer.from(__spread(encoded, [
            (encoded.length << 2) | outputMask | inputMask
        ]));
    }
    else if (output === "all") {
        return Buffer.from([outputMask | inputMask]);
    }
    else {
        throw Error("Expected the output of the tag to be either string \"all\" or an array of number but found " + output);
    }
};
/**
 * @hidden
 */
var encodeSignatureTagOutput = function (output) {
    var e_1, _a;
    // NOTE: Assume all numbers are distinct and the array is sorted by increasing order.
    if (output[0] < 0) {
        throw Error("Invalid signature tag. Out of range: " + output[0]);
    }
    else if (output[output.length - 1] > 503) {
        throw Error("Invalid signature tag. Out of range: " + output[output.length - 1]);
    }
    var offset = 0;
    var byte = 0;
    var bytes = [];
    try {
        for (var output_1 = __values(output), output_1_1 = output_1.next(); !output_1_1.done; output_1_1 = output_1.next()) {
            var index = output_1_1.value;
            if (typeof index !== "number") {
                throw Error("Expected an array of number but found " + index + " at " + output.indexOf(index));
            }
            if (index < offset + 8) {
                byte |= 1 << (index - offset);
            }
            else {
                bytes.push(byte);
                offset += 8;
                while (index >= offset + 8) {
                    bytes.push(0);
                    offset += 8;
                }
                byte = 1 << (index - offset);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (output_1_1 && !output_1_1.done && (_a = output_1.return)) _a.call(output_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (byte !== 0) {
        bytes.push(byte);
    }
    return bytes.reverse();
};
/**
 * Gets signature for message from private key.
 * @param message arbitrary length string
 * @param priv 32 byte hexstring of private key
 * @returns 65 byte hexstring of ECDSA signature
 */
exports.signEcdsa = function (message, priv) {
    return codechain_primitives_1.signEcdsa(message, priv);
};
/**
 * Checks if the signature from signEcdsa is correct.
 * @param message arbitrary length string
 * @param signature 65 byte hexstring of ECDSA signature
 * @param pub 64 byte hexstring of public key
 * @returns if signature is valid, true. Else false.
 */
exports.verifyEcdsa = function (message, signature, pub) {
    if (signature.startsWith("0x")) {
        signature = signature.substr(2);
    }
    return codechain_primitives_1.verifyEcdsa(message, signature, pub);
};
/**
 * Gets public key from the message and signature.
 * @param message arbitrary length string
 * @param signature 65 byte hexstring of ECDSA signature
 * @returns 64 byte hexstring public key
 */
exports.recoverEcdsa = function (message, signature) {
    if (signature.startsWith("0x")) {
        signature = signature.substr(2);
    }
    return codechain_primitives_1.recoverEcdsa(message, signature);
};
/**
 * Generates a private key.
 * @returns 32 byte hexadecimal string of private key
 */
exports.generatePrivateKey = function () { return codechain_primitives_1.generatePrivateKey(); };
/**
 * Gets account id from private key.
 * @param priv 32 byte hexadecimal string of private key
 * @returns 20 byte hexadecimal string of account id
 */
exports.getAccountIdFromPrivate = function (priv) {
    return codechain_primitives_1.getAccountIdFromPrivate(priv);
};
/**
 * Gets account id from the given public key.
 * @param publicKey 64 byte hexadecimal string of uncompressed public key
 * @returns 20 byte hexadecimal string of account id
 */
exports.getAccountIdFromPublic = function (publicKey) {
    return codechain_primitives_1.getAccountIdFromPublic(publicKey);
};
/**
 * Gets public key from private key.
 * @param priv 32 byte hexadecimal string of private key
 * @returns 64 byte hexadecimal string of public key
 */
exports.getPublicFromPrivate = function (priv) {
    return codechain_primitives_1.getPublicFromPrivate(priv);
};
