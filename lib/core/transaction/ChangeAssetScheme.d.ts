import { H160, H256 } from "codechain-primitives";
import { PlatformAddress } from "../classes";
import { Transaction } from "../Transaction";
import { NetworkId } from "../types";
export interface AssetSchemeChangeTransactionJSON {
    networkId: string;
    shardId: number;
    assetType: string;
    seq: number;
    metadata: string;
    approver: string | null;
    registrar: string | null;
    allowedScriptHashes: string[];
}
export interface ChangeAssetSchemeActionJSON extends AssetSchemeChangeTransactionJSON {
    approvals: string[];
}
export declare class ChangeAssetScheme extends Transaction {
    private readonly _transaction;
    private readonly approvals;
    constructor(input: {
        networkId: NetworkId;
        assetType: H160;
        shardId: number;
        seq: number;
        metadata: string | object;
        approver: PlatformAddress | null;
        registrar: PlatformAddress | null;
        allowedScriptHashes: H160[];
        approvals: string[];
    });
    /**
     * Get the tracker of an ChangeAssetScheme.
     * @returns A transaction hash.
     */
    tracker(): H256;
    /**
     * Add an approval to transaction.
     * @param approval An approval
     */
    addApproval(approval: string): void;
    type(): string;
    protected actionToEncodeObject(): (any)[];
    protected actionToJSON(): ChangeAssetSchemeActionJSON;
}
