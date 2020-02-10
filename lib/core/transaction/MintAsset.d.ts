import { Asset } from "../Asset";
import { AssetScheme, H160, H256, PlatformAddress } from "../classes";
import { AssetTransaction, Transaction } from "../Transaction";
import { NetworkId } from "../types";
import { AssetMintOutput, AssetMintOutputJSON } from "./AssetMintOutput";
export interface AssetMintTransactionJSON {
    networkId: string;
    shardId: number;
    metadata: string;
    output: AssetMintOutputJSON;
    approver: string | null;
    registrar: string | null;
    allowedScriptHashes: string[];
}
export interface MintAssetActionJSON extends AssetMintTransactionJSON {
    approvals: string[];
}
export declare class MintAsset extends Transaction implements AssetTransaction {
    private readonly _transaction;
    private readonly approvals;
    constructor(input: {
        networkId: NetworkId;
        shardId: number;
        metadata: string | object;
        output: AssetMintOutput;
        approver: PlatformAddress | null;
        registrar: PlatformAddress | null;
        allowedScriptHashes: H160[];
        approvals: string[];
    });
    /**
     * Get the tracker of an AssetMintTransaction.
     * @returns A transaction tracker.
     */
    tracker(): H256;
    /**
     * Add an approval to transaction.
     * @param approval An approval
     */
    addApproval(approval: string): void;
    output(): AssetMintOutput;
    /**
     * Get the output of this transaction.
     * @returns An Asset.
     */
    getMintedAsset(): Asset;
    /**
     * Get the asset scheme of this transaction.
     * @return An AssetScheme.
     */
    getAssetScheme(): AssetScheme;
    /**
     * Get the asset type of the output.
     * @returns An asset type which is H160.
     */
    getAssetType(): H160;
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): MintAssetActionJSON;
}
