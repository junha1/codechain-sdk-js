import { AssetAddressValue, H160, PlatformAddress, U64 } from "codechain-primitives";
import { MintAsset } from "./transaction/MintAsset";
import { NetworkId } from "./types";
export interface AssetSchemeJSON {
    metadata: string;
    supply: string;
    approver: string | null;
    registrar: string | null;
    allowedScriptHashes: string[] | null;
    pool: {
        assetType: string;
        quantity: string;
    }[];
    seq: number;
}
/**
 * Object that contains information about the Asset when performing AssetMintTransaction.
 */
export declare class AssetScheme {
    static fromJSON(data: AssetSchemeJSON): AssetScheme;
    readonly networkId?: NetworkId;
    readonly shardId?: number;
    readonly metadata: string;
    readonly supply: U64;
    readonly approver: PlatformAddress | null;
    readonly registrar: PlatformAddress | null;
    readonly allowedScriptHashes: H160[];
    readonly pool: {
        assetType: H160;
        quantity: U64;
    }[];
    readonly seq: number;
    constructor(data: {
        networkId?: NetworkId;
        shardId?: number;
        metadata: string | object;
        supply: U64;
        approver: PlatformAddress | null;
        registrar: PlatformAddress | null;
        allowedScriptHashes: H160[];
        pool: {
            assetType: H160;
            quantity: U64;
        }[];
        seq?: number;
    });
    toJSON(): AssetSchemeJSON;
    createMintTransaction(params: {
        recipient: AssetAddressValue;
    }): MintAsset;
}
