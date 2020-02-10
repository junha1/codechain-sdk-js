import { PlatformAddress } from "codechain-primitives/lib";
import { SignatureTag } from "../../utils";
import { AssetTransferInput, H256 } from "../classes";
import { AssetTransaction, Transaction } from "../Transaction";
import { NetworkId } from "../types";
import { AssetTransferInputJSON } from "./AssetTransferInput";
export interface AssetUnwrapCCCTransactionJSON {
    networkId: string;
    burn: AssetTransferInputJSON;
    receiver: string;
}
export interface UnwrapCCCActionJSON {
    networkId: string;
    burn: AssetTransferInputJSON;
    receiver: string;
}
export declare class UnwrapCCC extends Transaction implements AssetTransaction {
    private readonly _transaction;
    constructor(input: {
        burn: AssetTransferInput;
        networkId: NetworkId;
        receiver: PlatformAddress;
    });
    /**
     * Get a hash of the transaction that doesn't contain the scripts. The hash
     * is used as a message to create a signature for a transaction.
     * @returns A hash.
     */
    hashWithoutScript(params?: {
        tag: SignatureTag;
        type: "input" | "burn";
        index: number;
    }): H256;
    burn(index: number): AssetTransferInput | null;
    tracker(): H256;
    /**
     * Add an approval to transaction.
     * @param approval An approval
     */
    addApproval(_approval: string): void;
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): UnwrapCCCActionJSON;
}
