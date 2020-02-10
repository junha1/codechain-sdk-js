/// <reference types="node" />
import { AssetAddress, H160, H256 } from "codechain-primitives";
import { NetworkId } from "../core/types";
import { SignatureTag } from "../utils";
import { KeyStore } from "./KeyStore";
export declare class P2PKHBurn {
    static getLockScript(): Buffer;
    static getLockScriptHash(): H160;
    private keyStore;
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
