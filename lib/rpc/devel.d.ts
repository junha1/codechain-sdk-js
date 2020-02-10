import { H256 } from "codechain-primitives";
import { Rpc } from ".";
export declare class DevelRpc {
    private rpc;
    /**
     * @hidden
     */
    constructor(rpc: Rpc);
    /**
     * Gets keys of the state trie with the given offset and limit.
     * @param offset number
     * @param limit number
     * @returns H256[]
     */
    getStateTrieKeys(offset: number, limit: number): Promise<H256[]>;
    /**
     * Gets the value of the state trie with the given key.
     * @param key H256
     * @returns string[]
     */
    getStateTrieValue(key: H256): Promise<string[]>;
    /**
     * Starts and Enable sealing transactions.
     * @returns null
     */
    startSealing(): Promise<null>;
    /**
     * Stops and Disable sealing transactions.
     * @returns null
     */
    stopSealing(): Promise<null>;
}
