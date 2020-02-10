"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var Order_1 = require("./Order");
var RLP = require("rlp");
var OrderOnTransfer = /** @class */ (function () {
    /**
     * @param params.order An order to apply to the transfer transaction.
     * @param data.spentQuantity A spent quantity of the asset to give(from) while transferring.
     * @param data.inputIndices The indices of inputs affected by the order
     * @param data.outputIndices The indices of outputs affected by the order
     */
    function OrderOnTransfer(data) {
        var order = data.order, spentQuantity = data.spentQuantity, inputFromIndices = data.inputFromIndices, inputFeeIndices = data.inputFeeIndices, outputFromIndices = data.outputFromIndices, outputToIndices = data.outputToIndices, outputOwnedFeeIndices = data.outputOwnedFeeIndices, outputTransferredFeeIndices = data.outputTransferredFeeIndices;
        this.order = order;
        this.spentQuantity = spentQuantity;
        this.inputFromIndices = inputFromIndices;
        this.inputFeeIndices = inputFeeIndices;
        this.outputFromIndices = outputFromIndices;
        this.outputToIndices = outputToIndices;
        this.outputOwnedFeeIndices = outputOwnedFeeIndices;
        this.outputTransferredFeeIndices = outputTransferredFeeIndices;
    }
    /**
     * Create an Order from an OrderJSON object.
     * @param data An OrderJSON object.
     * @returns An Order.
     */
    OrderOnTransfer.fromJSON = function (data) {
        var order = data.order, spentQuantity = data.spentQuantity, inputFromIndices = data.inputFromIndices, inputFeeIndices = data.inputFeeIndices, outputFromIndices = data.outputFromIndices, outputToIndices = data.outputToIndices, outputOwnedFeeIndices = data.outputOwnedFeeIndices, outputTransferredFeeIndices = data.outputTransferredFeeIndices;
        return new OrderOnTransfer({
            order: Order_1.Order.fromJSON(order),
            spentQuantity: codechain_primitives_1.U64.ensure(spentQuantity),
            inputFromIndices: inputFromIndices,
            inputFeeIndices: inputFeeIndices,
            outputFromIndices: outputFromIndices,
            outputToIndices: outputToIndices,
            outputOwnedFeeIndices: outputOwnedFeeIndices,
            outputTransferredFeeIndices: outputTransferredFeeIndices
        });
    };
    /**
     * Convert to an object for RLP encoding.
     */
    OrderOnTransfer.prototype.toEncodeObject = function () {
        var _a = this, order = _a.order, spentQuantity = _a.spentQuantity, inputFromIndices = _a.inputFromIndices, inputFeeIndices = _a.inputFeeIndices, outputFromIndices = _a.outputFromIndices, outputToIndices = _a.outputToIndices, outputOwnedFeeIndices = _a.outputOwnedFeeIndices, outputTransferredFeeIndices = _a.outputTransferredFeeIndices;
        return [
            order.toEncodeObject(),
            spentQuantity.toEncodeObject(),
            inputFromIndices,
            inputFeeIndices,
            outputFromIndices,
            outputToIndices,
            outputOwnedFeeIndices,
            outputTransferredFeeIndices
        ];
    };
    /**
     * Convert to RLP bytes.
     */
    OrderOnTransfer.prototype.rlpBytes = function () {
        return RLP.encode(this.toEncodeObject());
    };
    /**
     * Convert to an OrderOnTransferJSON object.
     * @returns An OrderOnTransferJSON object.
     */
    OrderOnTransfer.prototype.toJSON = function () {
        var _a = this, order = _a.order, spentQuantity = _a.spentQuantity, inputFromIndices = _a.inputFromIndices, inputFeeIndices = _a.inputFeeIndices, outputFromIndices = _a.outputFromIndices, outputToIndices = _a.outputToIndices, outputOwnedFeeIndices = _a.outputOwnedFeeIndices, outputTransferredFeeIndices = _a.outputTransferredFeeIndices;
        return {
            order: order.toJSON(),
            spentQuantity: spentQuantity.toJSON(),
            inputFromIndices: inputFromIndices,
            inputFeeIndices: inputFeeIndices,
            outputFromIndices: outputFromIndices,
            outputToIndices: outputToIndices,
            outputOwnedFeeIndices: outputOwnedFeeIndices,
            outputTransferredFeeIndices: outputTransferredFeeIndices
        };
    };
    /**
     * Return a consumed order as the spentQuantity.
     * @returns An Order object.
     */
    OrderOnTransfer.prototype.getConsumedOrder = function () {
        return this.order.consume(this.spentQuantity);
    };
    return OrderOnTransfer;
}());
exports.OrderOnTransfer = OrderOnTransfer;
