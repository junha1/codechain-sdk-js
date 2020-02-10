"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An Invoice is used to know whether a transaction or a tx succeeded or
 * failed.
 */
var Invoice = /** @class */ (function () {
    /**
     * @param success Whether a transaction or a tx succeeded or failed.
     * @param error.type The type of the error.
     * @param error.content An explanation of the error.
     */
    function Invoice(success, error) {
        this.success = !!success;
        this.error = error;
    }
    /**
     * Create an Invoice from an Invoice JSON object.
     * @param data An Invoice JSON object.
     * @returns An Invoice.
     */
    Invoice.fromJSON = function (data) {
        var success = data.success, error = data.error;
        return new Invoice(success, error);
    };
    /**
     * Convert to an Invoice JSON object.
     * @returns An Invoice JSON object.
     */
    Invoice.prototype.toJSON = function () {
        var _a = this, success = _a.success, error = _a.error;
        return {
            success: success,
            error: error
        };
    };
    return Invoice;
}());
exports.Invoice = Invoice;
