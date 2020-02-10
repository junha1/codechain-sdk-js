import { H256, H256Value, PlatformAddressValue, U64Value } from "codechain-primitives";
import { Transaction } from "../core/Transaction";
import { Rpc } from ".";
export declare class AccountRpc {
    private rpc;
    /**
     * @hidden
     */
    constructor(rpc: Rpc);
    /**
     * Gets a list of accounts.
     * @returns A list of accounts
     */
    getList(): Promise<string[]>;
    /**
     * Creates a new account.
     * @param passphrase A passphrase to be used by the account owner
     * @returns An account
     */
    create(passphrase?: string): Promise<string>;
    /**
     * Imports a secret key and add the corresponding account.
     * @param secret H256 or hexstring for 256-bit private key
     * @param passphrase A passphrase to be used by the account owner
     * @returns The account
     */
    importRaw(secret: H256Value, passphrase?: string): Promise<string>;
    /**
     * Calculates the account's signature for a given message.
     * @param messageDigest A message to sign
     * @param address A platform address
     * @param passphrase The account's passphrase
     */
    sign(messageDigest: H256Value, address: PlatformAddressValue, passphrase?: string): Promise<string>;
    /**
     * Sends a transaction with the account's signature.
     * @param params.tx A tx to send
     * @param params.account The platform account to sign the tx
     * @param params.passphrase The account's passphrase
     */
    sendTransaction(params: {
        tx: Transaction;
        account: PlatformAddressValue;
        fee?: U64Value;
        passphrase?: string;
        blockNumber?: number;
    }): Promise<{
        hash: H256;
        seq: number;
    }>;
    /**
     * Unlocks the account.
     * @param address A platform address
     * @param passphrase The account's passphrase
     * @param duration Time to keep the account unlocked. The default value is 300(seconds). Passing 0 unlocks the account indefinitely.
     */
    unlock(address: PlatformAddressValue, passphrase?: string, duration?: number): Promise<null>;
    /**
     * Changes the passpharse of the account
     * @param address A platform address
     * @param oldPassphrase The account's current passphrase
     * @param newPassphrase The new passphrase for the account
     */
    changePassword(address: PlatformAddressValue, oldPassphrase: string, newPassphrase: string): Promise<null>;
}
