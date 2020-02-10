import { H160Value, H256, H256Value, H512, H512Value, PlatformAddress, PlatformAddressValue, U64, U64Value } from "codechain-primitives";
import { Rpc } from ".";
import { Asset } from "../core/Asset";
import { AssetScheme } from "../core/AssetScheme";
import { Block } from "../core/Block";
import { SignedTransaction } from "../core/SignedTransaction";
import { Text } from "../core/Text";
import { Transaction } from "../core/Transaction";
import { CommonParams, NetworkId } from "../core/types";
export declare class ChainRpc {
    private rpc;
    private transactionSigner?;
    private fallbackServers?;
    /**
     * @hidden
     */
    constructor(rpc: Rpc, options: {
        transactionSigner?: string;
        fallbackServers?: string[];
    });
    /**
     * Sends SignedTransaction to CodeChain's network.
     * @param tx SignedTransaction
     * @returns SignedTransaction's hash.
     */
    sendSignedTransaction(tx: SignedTransaction): Promise<H256>;
    /**
     * Signs a tx with the given account and sends it to CodeChain's network.
     * @param tx The tx to send
     * @param options.account The account to sign the tx
     * @param options.passphrase The account's passphrase
     * @param options.seq The seq of the tx
     * @param options.fee The fee of the tx
     * @returns SignedTransaction's hash
     * @throws When the given account cannot afford to pay the fee
     * @throws When the given fee is too low
     * @throws When the given seq does not match
     * @throws When the given account is unknown
     * @throws When the given passphrase does not match
     */
    sendTransaction(tx: Transaction, options?: {
        account?: PlatformAddressValue;
        passphrase?: string;
        seq?: number | null;
        fee?: U64Value;
        blockNumber?: number;
    }): Promise<H256>;
    /**
     * Gets SignedTransaction of given hash. Else returns null.
     * @param hash SignedTransaction's hash
     * @returns SignedTransaction, or null when SignedTransaction was not found.
     */
    getTransaction(hash: H256Value): Promise<SignedTransaction | null>;
    /**
     * Queries whether the chain has the transaction of given tx.
     * @param hash The tx hash of which to get the corresponding tx of.
     * @returns boolean when transaction of given hash not exists.
     */
    containsTransaction(hash: H256Value): Promise<boolean>;
    /**
     * Gets the regular key of an account of given address, recorded in the block of given blockNumber. If blockNumber is not given, then returns the regular key in the most recent block.
     * @param address An account address
     * @param blockNumber The specific block number to get account's regular key at given address.
     * @returns The regular key of account at specified block.
     */
    getRegularKey(address: PlatformAddressValue, blockNumber?: number): Promise<H512 | null>;
    /**
     * Gets the owner of a regular key, recorded in the block of given blockNumber.
     * @param regularKey A regular key.
     * @param blockNumber A block number.
     * @return The platform address that can use the regular key at the specified block.
     */
    getRegularKeyOwner(regularKey: H512Value, blockNumber?: number): Promise<PlatformAddress | null>;
    /**
     * Gets the shard id of the given hash of a CreateShard transaction.
     * @param hash A transaction hash of a CreateShard transaction.
     * @param blockNumber A block number.
     * @returns A shard id.
     */
    getShardIdByHash(hash: H256Value, blockNumber?: number): Promise<number | null>;
    /**
     * Gets the owners of the shard.
     * @param shardId A shard id.
     * @returns The platform addresses of the owners.
     */
    getShardOwners(shardId: number, blockNumber?: number): Promise<PlatformAddress[] | null>;
    /**
     * Gets the users of the shard.
     * @param shardId A shard id.
     * @returns The platform addresses of the users.
     */
    getShardUsers(shardId: number, blockNumber?: number): Promise<PlatformAddress[] | null>;
    /**
     * Gets a transaction of given hash.
     * @param tracker The tracker of which to get the corresponding transaction of.
     * @returns A transaction, or null when transaction of given hash not exists.
     */
    getTransactionByTracker(tracker: H256Value): Promise<SignedTransaction | null>;
    /**
     * Gets results of a transaction of given tracker.
     * @param tracker The transaction hash of which to get the corresponding transaction of.
     * @param options.timeout Indicating milliseconds to wait the transaction to be confirmed.
     * @returns List of boolean, or null when transaction of given hash not exists.
     */
    getTransactionResultsByTracker(tracker: H256Value, options?: {
        timeout?: number;
    }): Promise<boolean[]>;
    /**
     * Gets balance of an account of given address, recorded in the block of given blockNumber. If blockNumber is not given, then returns balance recorded in the most recent block.
     * @param address An account address
     * @param blockNumber The specific block number to get account's balance at given address.
     * @returns Balance of account at the specified block, or null if no such block exists.
     */
    getBalance(address: PlatformAddressValue, blockNumber?: number): Promise<U64>;
    /**
     * Gets a hint to find out why the transaction failed.
     * @param transactionHash A transaction hash from which the error hint would get.
     * @returns Null if the transaction is not involved in the chain or succeeded. If the transaction failed, this should return the reason for the transaction failing.
     */
    getErrorHint(transactionHash: H256Value): Promise<string | null>;
    /**
     * Gets seq of an account of given address, recorded in the block of given blockNumber. If blockNumber is not given, then returns seq recorded in the most recent block.
     * @param address An account address
     * @param blockNumber The specific block number to get account's seq at given address.
     * @returns Seq of account at the specified block, or null if no such block exists.
     */
    getSeq(address: PlatformAddressValue, blockNumber?: number): Promise<number>;
    /**
     * Gets number of the latest block.
     * @returns Number of the latest block.
     */
    getBestBlockNumber(): Promise<number>;
    /**
     * Gets block hash of given blockNumber.
     * @param blockNumber The block number of which to get the block hash of.
     * @returns BlockHash, if block exists. Else, returns null.
     */
    getBlockHash(blockNumber: number): Promise<H256 | null>;
    /**
     * Gets block of given block hash.
     * @param hashOrNumber The block hash or number of which to get the block of
     * @returns Block, if block exists. Else, returns null.
     */
    getBlock(hashOrNumber: H256Value | number): Promise<Block | null>;
    /**
     * Gets asset scheme of given tracker of the mint transaction.
     * @param tracker The tracker of the mint transaction.
     * @param shardId The shard id of Asset Scheme.
     * @param blockNumber The specific block number to get the asset scheme from
     * @returns AssetScheme, if asset scheme exists. Else, returns null.
     */
    getAssetSchemeByTracker(tracker: H256Value, shardId: number, blockNumber?: number | null): Promise<AssetScheme | null>;
    /**
     * Gets asset scheme of asset type
     * @param assetType The type of Asset.
     * @param shardId The shard id of Asset Scheme.
     * @param blockNumber The specific block number to get the asset scheme from
     * @returns AssetScheme, if asset scheme exists. Else, returns null.
     */
    getAssetSchemeByType(assetType: H160Value, shardId: number, blockNumber?: number | null): Promise<AssetScheme | null>;
    /**
     * Gets asset of given transaction hash and index.
     * @param tracker The tracker of previous input transaction.
     * @param index The index of output in the transaction.
     * @param shardId The shard id of output in the transaction.
     * @param blockNumber The specific block number to get the asset from
     * @returns Asset, if asset exists, Else, returns null.
     */
    getAsset(tracker: H256Value, index: number, shardId: number, blockNumber?: number): Promise<Asset | null>;
    /**
     * Gets the text of the given hash of tx with Store type.
     * @param txHash The tx hash of the Store tx.
     * @param blockNumber The specific block number to get the text from
     * @returns Text, if text exists. Else, returns null.
     */
    getText(txHash: H256Value, blockNumber?: number | null): Promise<Text | null>;
    /**
     * Checks whether an asset is spent or not.
     * @param txhash The tx hash of AssetMintTransaction or AssetTransferTransaction.
     * @param index The index of output in the transaction.
     * @param shardId The shard id of an Asset.
     * @param blockNumber The specific block number to get the asset from.
     * @returns True, if the asset is spent. False, if the asset is not spent. Null, if no such asset exists.
     */
    isAssetSpent(txhash: H256Value, index: number, shardId: number, blockNumber?: number): Promise<boolean | null>;
    /**
     * Gets pending transactions that have the insertion timestamp within the given range.
     * @param from The lower bound of the insertion timestamp.
     * @param to The upper bound of the insertion timestamp.
     * @returns List of SignedTransaction, with each tx has null for blockNumber/blockHash/transactionIndex.
     */
    getPendingTransactions(from?: number | null, to?: number | null): Promise<{
        transactions: SignedTransaction[];
        lastTimestamp: number | null;
    }>;
    /**
     * Gets the minimum transaction fee of the given transaction type in the given block.
     * @param transactionType
     * @param blockNumber
     * @returns The minimum transaction fee of the corresponding transactionType in the unit of CCC.
     */
    getMinTransactionFee(transactionType: string, blockNumber?: number | null): Promise<number | null>;
    /**
     * Gets the network ID of the node.
     * @returns A network ID, e.g. "tc".
     */
    getNetworkId(): Promise<NetworkId>;
    /**
     * Gets the number of shards, at the state of the given blockNumber
     * @param blockNumber A block number.
     * @returns A number of shards
     */
    getNumberOfShards(blockNumber?: number): Promise<number>;
    /**
     * Gets the platform account in the genesis block
     * @returns The platform addresses in the genesis block.
     */
    getGenesisAccounts(): Promise<PlatformAddress[]>;
    /**
     * Gets the root of the shard, at the state of the given blockNumber.
     * @param shardId A shard Id.
     * @param blockNumber A block number.
     * @returns The hash of root of the shard.
     */
    getShardRoot(shardId: number, blockNumber?: number): Promise<H256 | null>;
    /**
     * Gets the mining reward of the given block number.
     * @param blockNumber A block nubmer.
     * @returns The amount of mining reward, or null if the given block number is not mined yet.
     */
    getMiningReward(blockNumber: number): Promise<U64 | null>;
    /**
     * Executes the transactions.
     * @param tx A transaction to execute.
     * @param sender A platform address of sender.
     * @returns True, if the transaction is executed successfully. False, if the transaction is not executed.
     */
    executeTransaction(tx: Transaction, sender: PlatformAddressValue): Promise<string | null>;
    /**
     * Gets the id of the latest block.
     * @returns A number and the hash of the latest block.
     */
    getBestBlockId(): Promise<{
        hash: H256;
        number: number;
    }>;
    /**
     * Gets the number of transactions within a block that corresponds with the given hash.
     * @param hash The block hash.
     * @returns A number of transactions within a block.
     */
    getBlockTransactionCountByHash(hash: H256Value): Promise<number | null>;
    /**
     * Gets the count of the pending transactions within the given range from the transaction queues.
     * @param from The lower bound of collected pending transactions. If null, there is no lower bound.
     * @param to The upper bound of collected pending transactions. If null, there is no upper bound.
     * @returns The count of the pending transactions.
     */
    getPendingTransactionsCount(from?: number | null, to?: number | null): Promise<number>;
    /**
     * Execute the inputs of the AssetTransfer transaction in the CodeChain VM.
     * @param transaction The transaction that its inputs will be executed.
     * @param parameters Parameters of the outputs as an array.
     * @param indices Indices of inputs to run in VM.
     * @returns The results of VM execution.
     */
    executeVM(transaction: SignedTransaction, parameters: string[][], indices: number[]): Promise<string[]>;
    /**
     * Gets the common parameters.
     * @param blockNumber A block nubmer.
     * @returns The coomon params, or null if the given block number is not mined yet.
     */
    getCommonParams(blockNumber?: number): Promise<CommonParams | null>;
    /**
     * Get the list of accounts that can generate the blocks at the given block number.
     * @params blockNumber A block number.
     * @returns A list of possible authors, or null if anyone can generate the block
     */
    getPossibleAuthors(blockNumber?: number): Promise<PlatformAddress[] | null>;
    /**
     * Get the signer of the given transaction hash.
     * @param hash The tx hash of which to get the signer of the tx.
     * @returns A platform address of the signer, or null if the transaction hash does not exist.
     */
    getTransactionSigner(hash: H256Value): Promise<PlatformAddress | null>;
    /**
     * Gets the sequence of the chain's metadata.
     * @param blockNumber A block number.
     * @returns A sequence number, or null if the given block number is not mined yet.
     */
    getMetadataSeq(blockNumber?: number): Promise<number | null>;
}
