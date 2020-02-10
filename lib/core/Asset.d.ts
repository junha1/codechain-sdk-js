/// <reference types="node" />
import { AssetAddressValue, H160, H256, U64 } from "codechain-primitives";
import { AssetOutPoint } from "./transaction/AssetOutPoint";
import { AssetTransferInput, Timelock } from "./transaction/AssetTransferInput";
import { TransferAsset } from "./transaction/TransferAsset";
import { NetworkId } from "./types";
export interface AssetJSON {
    assetType: string;
    lockScriptHash: string;
    parameters: string[];
    quantity: string;
    orderHash: string | null;
    shardId: number;
    tracker: string;
    transactionOutputIndex: number;
}
export interface AssetData {
    assetType: H160;
    shardId: number;
    lockScriptHash: H160;
    parameters: Buffer[];
    quantity: U64;
    orderHash?: H256 | null;
    tracker: H256;
    transactionOutputIndex: number;
}
/**
 * Object created as an AssetMintTransaction or TransferAsset.
 */
export declare class Asset {
    static fromJSON(data: AssetJSON): Asset;
    readonly assetType: H160;
    readonly shardId: number;
    readonly lockScriptHash: H160;
    readonly parameters: Buffer[];
    readonly quantity: U64;
    readonly outPoint: AssetOutPoint;
    readonly orderHash: H256 | null;
    constructor(data: AssetData);
    toJSON(): AssetJSON;
    createTransferInput(options?: {
        timelock: Timelock | null;
    }): AssetTransferInput;
    createTransferTransaction(params: {
        recipients?: Array<{
            address: AssetAddressValue;
            quantity: U64;
        }>;
        timelock?: null | Timelock;
        networkId: NetworkId;
        metadata?: string | object;
        approvals?: string[];
        expiration?: number;
    }): TransferAsset;
}
