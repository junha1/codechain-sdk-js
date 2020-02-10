/// <reference types="node" />
import { H160, H256, H512, PlatformAddress } from "codechain-primitives";
import { Asset } from "./Asset";
import { Transaction, TransactionJSON } from "./Transaction";
import { NetworkId } from "./types";
export interface SignedTransactionJSON extends TransactionJSON {
    blockNumber: number | null;
    blockHash: string | null;
    transactionIndex: number | null;
    sig: string;
    hash: string;
}
/**
 * A [Transaction](tx.html) signed by a private key. It is possible to request
 * the CodeChain network to process this tx with the
 * [sendSignedTransaction](chainrpc.html#sendsignedtransaction) function.
 *
 * Transactions signed with a regular key has the same effect as those signed with
 * the original key. The original key is the key of the account that registered
 * the regular key.
 *
 * If any of the following is true, the Transaction will not be processed:
 * - The Transaction's processing fee is less than 10.
 * - A network ID is not identical.
 * - A seq is not identical to the signer's seq.
 */
export declare class SignedTransaction {
    unsigned: Transaction;
    blockNumber: number | null;
    blockHash: H256 | null;
    transactionIndex: number | null;
    private _signature;
    /**
     * @param unsigned A Transaction.
     * @param signature An ECDSA signature which is a 65 byte hexadecimal string.
     * @param blockNumber The block number of the block that contains the tx.
     * @param blockHash The hash of the block that contains the tx.
     * @param transactionIndex The index(location) of the tx within the block.
     */
    constructor(unsigned: Transaction, signature: string, blockNumber?: number, blockHash?: H256, transactionIndex?: number);
    /**
     * Get the signature of a tx.
     */
    signature(): string;
    /**
     * Convert to an object for RLP encoding.
     */
    toEncodeObject(): any[];
    /**
     * Convert to RLP bytes.
     */
    rlpBytes(): Buffer;
    /**
     * Get the hash of a tx.
     * @returns A tx hash.
     */
    hash(): H256;
    getAsset(): Asset;
    /**
     * Get the account ID of a tx's signer.
     * @returns An account ID.
     * @deprecated
     */
    getSignerAccountId(): H160;
    /**
     * Get the platform address of a tx's signer.
     * @returns A PlatformAddress.
     * @deprecated
     */
    getSignerAddress(params: {
        networkId: NetworkId;
    }): PlatformAddress;
    /**
     * Get the public key of a tx's signer.
     * @returns A public key.
     */
    getSignerPublic(): H512;
    /**
     * Convert to a SignedTransaction JSON object.
     * @returns A SignedTransaction JSON object.
     */
    toJSON(): SignedTransactionJSON;
}
