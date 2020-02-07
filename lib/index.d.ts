/// <reference types="node" />
import { Core } from "./core";
import { NetworkId } from "./core/types";
import { Key, KeyStoreType } from "./key";
import { Rpc } from "./rpc";
declare class SDK {
    static Rpc: typeof Rpc;
    static Core: typeof Core;
    static Key: typeof Key;
    static util: {
        blake128: (data: string | Buffer) => string;
        blake128WithKey: (data: string | Buffer, key: Uint8Array) => string;
        blake160: (data: string | Buffer) => string;
        blake160WithKey: (data: string | Buffer, key: Uint8Array) => string;
        blake256: (data: string | Buffer) => string;
        blake256WithKey: (data: string | Buffer, key: Uint8Array) => string;
        ripemd160: (data: string | Buffer) => string;
        signEcdsa: (message: string, priv: string) => string;
        verifyEcdsa: (message: string, signature: string, pub: string) => boolean;
        recoverEcdsa: (message: string, signature: string) => string;
        generatePrivateKey: () => string;
        getAccountIdFromPrivate: (priv: string) => string;
        getPublicFromPrivate: (priv: string) => string;
    };
    static SDK: typeof SDK;
    rpc: Rpc;
    core: Core;
    key: Key;
    util: {
        blake128: (data: string | Buffer) => string;
        blake128WithKey: (data: string | Buffer, key: Uint8Array) => string;
        blake160: (data: string | Buffer) => string;
        blake160WithKey: (data: string | Buffer, key: Uint8Array) => string;
        blake256: (data: string | Buffer) => string;
        blake256WithKey: (data: string | Buffer, key: Uint8Array) => string;
        ripemd160: (data: string | Buffer) => string;
        signEcdsa: (message: string, priv: string) => string;
        verifyEcdsa: (message: string, signature: string, pub: string) => boolean;
        recoverEcdsa: (message: string, signature: string) => string;
        generatePrivateKey: () => string;
        getAccountIdFromPrivate: (priv: string) => string;
        getPublicFromPrivate: (priv: string) => string;
    };
    private _networkId;
    /**
     * @param params.server HTTP RPC server address
     * @param params.keyStoreType Specify the type of the keystore. The default value is "local". It creates keystore.db file on the working directory.
     * @param params.networkId The network id of CodeChain. The default value is "tc" (testnet)
     */
    constructor(params: {
        server: string;
        keyStoreType?: KeyStoreType;
        networkId?: NetworkId;
        options?: {
            transactionSigner?: string;
            fallbackServers?: string[];
        };
    });
    get networkId(): string;
}
export { SDK };
