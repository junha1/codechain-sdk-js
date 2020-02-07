"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
/**
 * Object used when getting a text by chain_getText.
 */
var Text = /** @class */ (function () {
    function Text(data) {
        var content = data.content, certifier = data.certifier;
        this.content = content;
        this.certifier = certifier;
    }
    Text.fromJSON = function (data) {
        var content = data.content, certifier = data.certifier;
        return new Text({
            content: content,
            certifier: codechain_primitives_1.PlatformAddress.ensure(certifier)
        });
    };
    Text.prototype.toJSON = function () {
        var _a = this, content = _a.content, certifier = _a.certifier;
        return {
            content: content,
            certifier: certifier.value
        };
    };
    return Text;
}());
exports.Text = Text;
