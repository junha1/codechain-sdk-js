import { H160, H256 } from "codechain-primitives";
import { Asset } from "../Asset";
import { AssetTransaction, Transaction } from "../Transaction";
import { NetworkId } from "../types";
import { AssetMintOutput, AssetMintOutputJSON } from "./AssetMintOutput";
export interface IncreaseAssetSupplyTransactionJSON {
    networkId: string;
    shardId: number;
    assetType: string;
    seq: number;
    output: AssetMintOutputJSON;
}
export interface IncreaseAssetSupplyActionJSON extends IncreaseAssetSupplyTransactionJSON {
    approvals: string[];
}
export declare class IncreaseAssetSupply extends Transaction implements AssetTransaction {
    private readonly transaction;
    private readonly approvals;
    constructor(params: {
        networkId: NetworkId;
        shardId: number;
        assetType: H160;
        seq: number;
        output: AssetMintOutput;
        approvals: string[];
    });
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
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): IncreaseAssetSupplyActionJSON;
}
