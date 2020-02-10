/// <reference types="node" />
import { H160, PlatformAddress, U64 } from "codechain-primitives";
import { Asset } from "../Asset";
import { AssetAddress } from "../classes";
import { AssetTransaction, Transaction } from "../Transaction";
import { NetworkId } from "../types";
export interface WrapCCCData {
    shardId: number;
    lockScriptHash: H160;
    parameters: Buffer[];
    quantity: U64;
    payer: PlatformAddress;
}
export interface WrapCCCAddressData {
    shardId: number;
    recipient: AssetAddress;
    quantity: U64;
    payer: PlatformAddress;
}
export interface WrapCCCActionJSON {
    shardId: number;
    lockScriptHash: string;
    parameters: string[];
    quantity: string;
    payer: string;
}
export declare class WrapCCC extends Transaction implements AssetTransaction {
    private readonly shardId;
    private readonly lockScriptHash;
    private readonly parameters;
    private readonly quantity;
    private readonly payer;
    constructor(data: WrapCCCData | WrapCCCAddressData, networkId: NetworkId);
    /**
     * Get the asset type of the output.
     * @returns An asset type which is H160.
     */
    getAssetType(): H160;
    /**
     * Get the wrapped CCC asset output of this tx.
     * @returns An Asset.
     */
    getAsset(): Asset;
    tracker(): import("codechain-primitives/lib").H256;
    /**
     * Add an approval to transaction.
     * @param approval An approval
     */
    addApproval(_approval: string): void;
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): WrapCCCActionJSON;
}
