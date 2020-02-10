/// <reference types="node" />
import { AssetAddress, H160, H256 } from "codechain-primitives";
import { NetworkId } from "../core/types";
import { SignatureTag } from "../utils";
import { KeyStore } from "./KeyStore";
/**
 * AssetAgent which supports P2PKH(Pay to Public Key Hash).
 */
export declare class P2PKH {
    static getLockScript(): Buffer;
    static getLockScriptHash(): H160;
    private rawKeyStore;
    private networkId;
    constructor(params: {
        keyStore: KeyStore;
        networkId: NetworkId;
    });
    createAddress(options?: {
        passphrase?: string;
    }): Promise<AssetAddress>;
    createUnlockScript(publicKeyHash: string, txhash: H256, options?: {
        passphrase?: string;
        signatureTag?: SignatureTag;
    }): Promise<Buffer>;
}
