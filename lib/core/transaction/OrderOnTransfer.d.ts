/// <reference types="node" />
import { U64 } from "codechain-primitives";
import { Order, OrderJSON } from "./Order";
export interface OrderOnTransferJSON {
    order: OrderJSON;
    spentQuantity: string;
    inputFromIndices: number[];
    inputFeeIndices: number[];
    outputFromIndices: number[];
    outputToIndices: number[];
    outputOwnedFeeIndices: number[];
    outputTransferredFeeIndices: number[];
}
export interface OrderOnTransferData {
    order: Order;
    spentQuantity: U64;
    inputFromIndices: number[];
    inputFeeIndices: number[];
    outputFromIndices: number[];
    outputToIndices: number[];
    outputOwnedFeeIndices: number[];
    outputTransferredFeeIndices: number[];
}
export declare class OrderOnTransfer {
    /**
     * Create an Order from an OrderJSON object.
     * @param data An OrderJSON object.
     * @returns An Order.
     */
    static fromJSON(data: OrderOnTransferJSON): OrderOnTransfer;
    readonly order: Order;
    readonly spentQuantity: U64;
    inputFromIndices: number[];
    inputFeeIndices: number[];
    outputFromIndices: number[];
    outputToIndices: number[];
    outputOwnedFeeIndices: number[];
    outputTransferredFeeIndices: number[];
    /**
     * @param params.order An order to apply to the transfer transaction.
     * @param data.spentQuantity A spent quantity of the asset to give(from) while transferring.
     * @param data.inputIndices The indices of inputs affected by the order
     * @param data.outputIndices The indices of outputs affected by the order
     */
    constructor(data: OrderOnTransferData);
    /**
     * Convert to an object for RLP encoding.
     */
    toEncodeObject(): (string | number | (string | number | Buffer[] | (string | number)[][])[])[];
    /**
     * Convert to RLP bytes.
     */
    rlpBytes(): Buffer;
    /**
     * Convert to an OrderOnTransferJSON object.
     * @returns An OrderOnTransferJSON object.
     */
    toJSON(): OrderOnTransferJSON;
    /**
     * Return a consumed order as the spentQuantity.
     * @returns An Order object.
     */
    getConsumedOrder(): Order;
}
