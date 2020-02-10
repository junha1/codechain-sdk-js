/// <reference types="node" />
import { AssetAddress, H160, H256, U64, U64Value } from "codechain-primitives";
import { AssetOutPoint, AssetOutPointJSON } from "./AssetOutPoint";
export interface OrderJSON {
    assetTypeFrom: string;
    assetTypeTo: string;
    assetTypeFee: string;
    shardIdFrom: number;
    shardIdTo: number;
    shardIdFee: number;
    assetQuantityFrom: string;
    assetQuantityTo: string;
    assetQuantityFee: string;
    originOutputs: AssetOutPointJSON[];
    expiration: string;
    lockScriptHashFrom: string;
    parametersFrom: string[];
    lockScriptHashFee: string;
    parametersFee: string[];
}
export interface OrderDataBasic {
    assetTypeFrom: H160;
    assetTypeTo: H160;
    assetTypeFee?: H160;
    shardIdFrom: number;
    shardIdTo: number;
    shardIdFee?: number;
    assetQuantityFrom: U64;
    assetQuantityTo: U64;
    assetQuantityFee?: U64;
    originOutputs: AssetOutPoint[];
    expiration: U64;
}
export interface OrderAddressData {
    assetTypeFrom: H160;
    assetTypeTo: H160;
    assetTypeFee?: H160;
    shardIdFrom: number;
    shardIdTo: number;
    shardIdFee?: number;
    assetQuantityFrom: U64;
    assetQuantityTo: U64;
    assetQuantityFee?: U64;
    originOutputs: AssetOutPoint[];
    expiration: U64;
    recipientFrom: AssetAddress;
    recipientFee: AssetAddress;
}
export declare class Order {
    /**
     * Create an Order from an OrderJSON object.
     * @param data An OrderJSON object.
     * @returns An Order.
     */
    static fromJSON(data: OrderJSON): Order;
    readonly assetTypeFrom: H160;
    readonly assetTypeTo: H160;
    readonly assetTypeFee: H160;
    readonly shardIdFrom: number;
    readonly shardIdTo: number;
    readonly shardIdFee: number;
    readonly assetQuantityFrom: U64;
    readonly assetQuantityTo: U64;
    readonly assetQuantityFee: U64;
    readonly originOutputs: AssetOutPoint[];
    readonly expiration: U64;
    readonly lockScriptHashFrom: H160;
    readonly parametersFrom: Buffer[];
    readonly lockScriptHashFee: H160;
    readonly parametersFee: Buffer[];
    /**
     * @param data.assetTypeFrom The asset type of the asset to give.
     * @param data.assetTypeTo The asset type of the asset to get.
     * @param data.assetTypeFee The asset type of the asset for fee.
     * @param data.assetQuantityFrom The quantity of the asset to give.
     * @param data.assetQuantityTo The quantity of the asset to get.
     * @param data.assetQuantityFee The quantity of the asset for fee.
     * @param data.originOutputs The previous outputs to be consumed by the order.
     * @param data.expiration The expiration time of the order, by seconds.
     * @param data.lockScriptHash The lock script hash of the asset.
     * @param data.parameters The parameters of the asset.
     */
    constructor(data: OrderDataBasic & ({
        lockScriptHashFrom: H160;
        parametersFrom: Buffer[];
    } | {
        recipientFrom: AssetAddress;
    }) & ({
        lockScriptHashFee: H160;
        parametersFee: Buffer[];
    } | {
        recipientFee: AssetAddress;
    }));
    /**
     * Convert to an object for RLP encoding.
     */
    toEncodeObject(): (string | number | Buffer[] | (string | number)[][])[];
    /**
     * Convert to RLP bytes.
     */
    rlpBytes(): Buffer;
    /**
     * Convert to an OrderJSON object.
     * @returns An OrderJSON object.
     */
    toJSON(): OrderJSON;
    /**
     * Get the hash of an order.
     * @returns An order hash.
     */
    hash(): H256;
    /**
     * Return the consumed order
     * @param params.quantity the consumed quantity of the asset to give
     */
    consume(quantity: U64Value): Order;
}
