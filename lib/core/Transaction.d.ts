/// <reference types="node" />
import { H256, H256Value, U64, U64Value } from "codechain-primitives";
import { SignedTransaction } from "./SignedTransaction";
import { ChangeAssetSchemeActionJSON } from "./transaction/ChangeAssetScheme";
import { CreateShardActionJSON } from "./transaction/CreateShard";
import { CustomActionJSON } from "./transaction/Custom";
import { IncreaseAssetSupplyActionJSON } from "./transaction/IncreaseAssetSupply";
import { MintAssetActionJSON } from "./transaction/MintAsset";
import { PayActionJSON } from "./transaction/Pay";
import { RemoveActionJSON } from "./transaction/Remove";
import { SetRegularKeyActionJSON } from "./transaction/SetRegularKey";
import { SetShardOwnersActionJSON } from "./transaction/SetShardOwners";
import { SetShardUsersActionJSON } from "./transaction/SetShardUsers";
import { StoreActionJSON } from "./transaction/Store";
import { TransferAssetActionJSON } from "./transaction/TransferAsset";
import { UnwrapCCCActionJSON } from "./transaction/UnwrapCCC";
import { WrapCCCActionJSON } from "./transaction/WrapCCC";
import { NetworkId } from "./types";
export interface AssetTransaction {
    tracker(): H256;
    addApproval(approval: string): void;
}
declare type ActionJSON = PayActionJSON | SetRegularKeyActionJSON | SetShardOwnersActionJSON | SetShardUsersActionJSON | IncreaseAssetSupplyActionJSON | CreateShardActionJSON | MintAssetActionJSON | TransferAssetActionJSON | ChangeAssetSchemeActionJSON | StoreActionJSON | RemoveActionJSON | CustomActionJSON | WrapCCCActionJSON | UnwrapCCCActionJSON;
export interface TransactionJSON {
    action: ActionJSON & {
        type: string;
    };
    networkId: string;
    seq: number | null;
    fee: string | null;
}
/**
 * A unit that collects transaction and requests processing to the network. A parsel signer pays for CCC processing fees.
 *
 * - The fee must be at least 10. The higher the fee, the higher the priority for the tx to be processed.
 * - It contains the network ID. This must be identical to the network ID to which the tx is being sent to.
 * - Its seq must be identical to the seq of the account that will sign the tx.
 * - It contains the transaction to process. After signing the Transaction's size must not exceed 1 MB.
 * - After signing with the sign() function, it can be sent to the network.
 */
export declare abstract class Transaction {
    private _seq;
    private _fee;
    private readonly _networkId;
    protected constructor(networkId: NetworkId);
    seq(): number | null;
    fee(): U64 | null;
    setSeq(seq: number): void;
    setFee(fee: U64Value): void;
    networkId(): NetworkId;
    toEncodeObject(): any[];
    rlpBytes(): Buffer;
    unsignedHash(): H256;
    sign(params: {
        secret: H256Value;
        seq: number;
        fee: U64Value;
    }): SignedTransaction;
    toJSON(): TransactionJSON;
    abstract type(): string;
    protected abstract actionToJSON(): ActionJSON;
    protected abstract actionToEncodeObject(): any[];
}
export {};
