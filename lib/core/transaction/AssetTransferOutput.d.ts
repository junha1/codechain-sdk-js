/// <reference types="node" />
import { AssetAddress, H160, U64 } from "codechain-primitives";
export interface AssetTransferOutputJSON {
    lockScriptHash: string;
    parameters: string[];
    assetType: string;
    shardId: number;
    quantity: string;
}
export interface AssetTransferOutputData {
    lockScriptHash: H160;
    parameters: Buffer[];
    assetType: H160;
    shardId: number;
    quantity: U64;
}
export interface AssetTransferOutputAddressData {
    recipient: AssetAddress;
    assetType: H160;
    shardId: number;
    quantity: U64;
}
/**
 * An AssetTransferOutput consists of:
 *  - A lock script hash and parameters, which mark ownership of the asset.
 *  - An asset type and quantity, which indicate the asset's type and quantity.
 */
export declare class AssetTransferOutput {
    /**
     * Create an AssetTransferOutput from an AssetTransferOutput JSON object.
     * @param data An AssetTransferOutput JSON object.
     * @returns An AssetTransferOutput.
     */
    static fromJSON(data: AssetTransferOutputJSON): AssetTransferOutput;
    readonly lockScriptHash: H160;
    readonly parameters: Buffer[];
    readonly assetType: H160;
    readonly shardId: number;
    readonly quantity: U64;
    /**
     * @param data.lockScriptHash A lock script hash of the output.
     * @param data.parameters Parameters of the output.
     * @param data.assetType An asset type of the output.
     * @param data.shardId A shard ID of the output.
     * @param data.quantity An asset quantity of the output.
     */
    constructor(data: AssetTransferOutputData | AssetTransferOutputAddressData);
    /**
     * Convert to an object for RLP encoding.
     */
    toEncodeObject(): (string | number | Buffer[])[];
    /**
     * Convert to an AssetTransferOutput JSON object.
     * @returns An AssetTransferOutput JSON object.
     */
    toJSON(): AssetTransferOutputJSON;
}
