/// <reference types="node" />
import { AssetAddress, AssetAddressValue, H128, H160, H160Value, H256, H256Value, H512, H512Value, PlatformAddress, PlatformAddressValue, U256, U64, U64Value } from "codechain-primitives";
import { Asset } from "./Asset";
import { AssetScheme } from "./AssetScheme";
import { Block } from "./Block";
import { Script } from "./Script";
import { SignedTransaction } from "./SignedTransaction";
import { Transaction } from "./Transaction";
import { AssetOutPoint } from "./transaction/AssetOutPoint";
import { AssetTransferInput, Timelock } from "./transaction/AssetTransferInput";
import { AssetTransferOutput } from "./transaction/AssetTransferOutput";
import { ChangeAssetScheme } from "./transaction/ChangeAssetScheme";
import { CreateShard } from "./transaction/CreateShard";
import { Custom } from "./transaction/Custom";
import { IncreaseAssetSupply } from "./transaction/IncreaseAssetSupply";
import { MintAsset } from "./transaction/MintAsset";
import { Order } from "./transaction/Order";
import { OrderOnTransfer } from "./transaction/OrderOnTransfer";
import { Pay } from "./transaction/Pay";
import { Remove } from "./transaction/Remove";
import { SetRegularKey } from "./transaction/SetRegularKey";
import { SetShardOwners } from "./transaction/SetShardOwners";
import { SetShardUsers } from "./transaction/SetShardUsers";
import { Store } from "./transaction/Store";
import { TransferAsset } from "./transaction/TransferAsset";
import { UnwrapCCC } from "./transaction/UnwrapCCC";
import { WrapCCC } from "./transaction/WrapCCC";
import { NetworkId } from "./types";
export declare class Core {
    static classes: {
        H128: typeof H128;
        H160: typeof H160;
        H256: typeof H256;
        H512: typeof H512;
        U256: typeof U256;
        U64: typeof U64;
        Block: typeof Block;
        Transaction: typeof Transaction;
        SignedTransaction: typeof SignedTransaction;
        Pay: typeof Pay;
        SetRegularKey: typeof SetRegularKey;
        CreateShard: typeof CreateShard;
        SetShardOwners: typeof SetShardOwners;
        SetShardUsers: typeof SetShardUsers;
        WrapCCC: typeof WrapCCC;
        Store: typeof Store;
        Remove: typeof Remove;
        Custom: typeof Custom;
        AssetTransferInput: typeof AssetTransferInput;
        AssetTransferOutput: typeof AssetTransferOutput;
        AssetOutPoint: typeof AssetOutPoint;
        Asset: typeof Asset;
        AssetScheme: typeof AssetScheme;
        Script: typeof Script;
        PlatformAddress: typeof PlatformAddress;
        AssetAddress: typeof AssetAddress;
    };
    classes: {
        H128: typeof H128;
        H160: typeof H160;
        H256: typeof H256;
        H512: typeof H512;
        U256: typeof U256;
        U64: typeof U64;
        Block: typeof Block;
        Transaction: typeof Transaction;
        SignedTransaction: typeof SignedTransaction;
        Pay: typeof Pay;
        SetRegularKey: typeof SetRegularKey;
        CreateShard: typeof CreateShard;
        SetShardOwners: typeof SetShardOwners;
        SetShardUsers: typeof SetShardUsers;
        WrapCCC: typeof WrapCCC;
        Store: typeof Store;
        Remove: typeof Remove;
        Custom: typeof Custom;
        AssetTransferInput: typeof AssetTransferInput;
        AssetTransferOutput: typeof AssetTransferOutput;
        AssetOutPoint: typeof AssetOutPoint;
        Asset: typeof Asset;
        AssetScheme: typeof AssetScheme;
        Script: typeof Script;
        PlatformAddress: typeof PlatformAddress;
        AssetAddress: typeof AssetAddress;
    };
    private networkId;
    /**
     * @param params.networkId The network id of CodeChain.
     */
    constructor(params: {
        networkId: NetworkId;
    });
    /**
     * Creates Pay type which pays the value quantity of CCC(CodeChain Coin)
     * from the tx signer to the recipient. Who is signing the tx will pay.
     * @param params.recipient The platform account who receives CCC
     * @param params.quantity quantity of CCC to pay
     * @throws Given string for recipient is invalid for converting it to PlatformAddress
     * @throws Given number or string for quantity is invalid for converting it to U64
     */
    createPayTransaction(params: {
        recipient: PlatformAddressValue;
        quantity: U64Value;
    }): Pay;
    /**
     * Creates SetRegularKey type which sets the regular key of the tx signer.
     * @param params.key The public key of a regular key
     * @throws Given string for key is invalid for converting it to H512
     */
    createSetRegularKeyTransaction(params: {
        key: H512Value;
    }): SetRegularKey;
    /**
     * Creates CreateShard type which can create new shard
     */
    createCreateShardTransaction(params: {
        users: Array<PlatformAddressValue>;
    }): CreateShard;
    createSetShardOwnersTransaction(params: {
        shardId: number;
        owners: Array<PlatformAddressValue>;
    }): SetShardOwners;
    /**
     * Create SetShardUser type which can change shard users
     * @param params.shardId
     * @param params.users
     */
    createSetShardUsersTransaction(params: {
        shardId: number;
        users: Array<PlatformAddressValue>;
    }): SetShardUsers;
    /**
     * Creates Wrap CCC type which wraps the value quantity of CCC(CodeChain Coin)
     * in a wrapped CCC asset. Who is signing the tx will pay.
     * @param params.shardId A shard ID of the wrapped CCC asset.
     * @param params.lockScriptHash A lock script hash of the wrapped CCC asset.
     * @param params.parameters Parameters of the wrapped CCC asset.
     * @param params.quantity quantity of CCC to pay
     * @throws Given string for a lock script hash is invalid for converting it to H160
     * @throws Given number or string for quantity is invalid for converting it to U64
     */
    createWrapCCCTransaction(params: {
        shardId: number;
        lockScriptHash: H160Value;
        parameters: Buffer[];
        quantity: U64Value;
        payer: PlatformAddressValue;
    } | {
        shardId: number;
        recipient: AssetAddressValue;
        quantity: U64Value;
        payer: PlatformAddressValue;
    }): WrapCCC;
    /**
     * Creates Store type which store content with certifier on chain.
     * @param params.content Content to store
     * @param params.secret Secret key to sign
     * @param params.certifier Certifier of the text, which is PlatformAddress
     * @param params.signature Signature on the content by the certifier
     * @throws Given string for secret is invalid for converting it to H256
     */
    createStoreTransaction(params: {
        content: string;
        certifier: PlatformAddressValue;
        signature: string;
    } | {
        content: string;
        secret: H256Value;
    }): Store;
    /**
     * Creates Remove type which remove the text from the chain.
     * @param params.hash Transaction hash which stored the text
     * @param params.secret Secret key to sign
     * @param params.signature Signature on tx hash by the certifier of the text
     * @throws Given string for hash or secret is invalid for converting it to H256
     */
    createRemoveTransaction(params: {
        hash: H256Value;
        secret: H256Value;
    } | {
        hash: H256Value;
        signature: string;
    }): Remove;
    /**
     * Creates Custom type that will be handled by a specified type handler
     * @param params.handlerId An Id of an type handler which will handle a custom transaction
     * @param params.bytes A custom transaction body
     * @throws Given number for handlerId is invalid for converting it to U64
     */
    createCustomTransaction(params: {
        handlerId: number;
        bytes: Buffer;
    }): Custom;
    /**
     * Creates asset's scheme.
     * @param params.metadata Any string that describing the asset. For example,
     * stringified JSON containing properties.
     * @param params.supply Total supply of this asset
     * @param params.approver Platform account or null. If account is present, the
     * tx that includes AssetTransferTransaction of this asset must be signed by
     * the approver account.
     * @param params.registrar Platform account or null. The registrar
     * can transfer the asset without unlocking.
     * @throws Given string for approver is invalid for converting it to paltform account
     * @throws Given string for registrar is invalid for converting it to paltform account
     */
    createAssetScheme(params: {
        shardId: number;
        metadata: string | object;
        supply: U64Value;
        approver?: PlatformAddressValue;
        registrar?: PlatformAddressValue;
        allowedScriptHashes?: H160[];
        pool?: {
            assetType: H160Value;
            quantity: number;
        }[];
    }): AssetScheme;
    createOrder(params: {
        assetTypeFrom: H160Value;
        assetTypeTo: H160Value;
        assetTypeFee?: H160Value;
        shardIdFrom: number;
        shardIdTo: number;
        shardIdFee?: number;
        assetQuantityFrom: U64Value;
        assetQuantityTo: U64Value;
        assetQuantityFee?: U64Value;
        originOutputs: AssetOutPoint[] | {
            tracker: H256Value;
            index: number;
            assetType: H160Value;
            shardId: number;
            quantity: U64Value;
            lockScriptHash?: H256Value;
            parameters?: Buffer[];
        }[];
        expiration: U64Value;
    } & ({
        lockScriptHashFrom: H160Value;
        parametersFrom: Buffer[];
    } | {
        recipientFrom: AssetAddressValue;
    }) & ({
        lockScriptHashFee: H160Value;
        parametersFee: Buffer[];
    } | {
        recipientFee: AssetAddressValue;
    } | {})): Order;
    createOrderOnTransfer(params: {
        order: Order;
        spentQuantity: U64Value;
        inputFromIndices: number[];
        inputFeeIndices: number[];
        outputFromIndices: number[];
        outputToIndices: number[];
        outputOwnedFeeIndices: number[];
        outputTransferredFeeIndices: number[];
    }): OrderOnTransfer;
    createMintAssetTransaction(params: {
        scheme: AssetScheme | {
            networkId?: NetworkId;
            shardId: number;
            metadata: string | object;
            approver?: PlatformAddressValue;
            registrar?: PlatformAddressValue;
            allowedScriptHashes?: H160[];
            supply?: U64Value;
        };
        recipient: AssetAddressValue;
        approvals?: string[];
    }): MintAsset;
    createChangeAssetSchemeTransaction(params: {
        shardId: number;
        assetType: H160Value;
        seq?: number;
        scheme: AssetScheme | {
            networkId?: NetworkId;
            metadata: string | object;
            approver?: PlatformAddressValue;
            registrar?: PlatformAddressValue;
            allowedScriptHashes?: H160[];
        };
        approvals?: string[];
    }): ChangeAssetScheme;
    createIncreaseAssetSupplyTransaction(params: {
        shardId: number;
        assetType: H160Value;
        seq?: number;
        recipient: AssetAddressValue;
        supply?: U64Value;
        approvals?: string[];
    }): IncreaseAssetSupply;
    createTransferAssetTransaction(params?: {
        burns?: AssetTransferInput[];
        inputs?: AssetTransferInput[];
        outputs?: AssetTransferOutput[];
        orders?: OrderOnTransfer[];
        networkId?: NetworkId;
        metadata?: string | object;
        approvals?: string[];
        expiration?: number;
    }): TransferAsset;
    createUnwrapCCCTransaction(params: {
        burn: AssetTransferInput | Asset;
        receiver: PlatformAddressValue;
        networkId?: NetworkId;
    }): UnwrapCCC;
    createAssetTransferInput(params: {
        assetOutPoint: AssetOutPoint | {
            tracker: H256Value;
            index: number;
            assetType: H160Value;
            shardId: number;
            quantity: U64Value;
            lockScriptHash?: H256Value;
            parameters?: Buffer[];
        };
        timelock?: null | Timelock;
        lockScript?: Buffer;
        unlockScript?: Buffer;
    }): AssetTransferInput;
    createAssetOutPoint(params: {
        tracker: H256Value;
        index: number;
        assetType: H160Value;
        shardId: number;
        quantity: U64Value;
    }): AssetOutPoint;
    createAssetTransferOutput(params: {
        assetType: H160Value;
        shardId: number;
        quantity: U64Value;
    } & ({
        recipient: AssetAddressValue;
    } | {
        lockScriptHash: H256Value;
        parameters: Buffer[];
    })): AssetTransferOutput;
}
