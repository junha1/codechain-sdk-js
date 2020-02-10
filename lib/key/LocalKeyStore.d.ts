import { CCKey } from "codechain-keystore";
import { KeyStore } from "./KeyStore";
export interface HDKeyMapping {
    platform: {
        [key: string]: {
            seedHash: string;
            path: string;
        };
    };
    asset: {
        [key: string]: {
            seedHash: string;
            path: string;
        };
    };
}
export declare class LocalKeyStore implements KeyStore {
    static create(options?: {
        dbPath?: string;
        mapping?: HDKeyMapping;
    }): Promise<KeyStore>;
    static createForTest(): Promise<KeyStore>;
    cckey: CCKey;
    platform: {
        getKeyList: () => Promise<string[]>;
        createKey: (params?: {
            passphrase?: string | undefined;
        }) => Promise<string>;
        removeKey: (params: {
            key: string;
        }) => Promise<boolean>;
        exportRawKey: (params: {
            key: string;
            passphrase?: string | undefined;
        }) => Promise<string>;
        getPublicKey: (params: {
            key: string;
            passphrase?: string | undefined;
        }) => Promise<string | null>;
        sign: (params: {
            key: string;
            message: string;
            passphrase?: string | undefined;
        }) => Promise<string>;
    };
    asset: {
        getKeyList: () => Promise<string[]>;
        createKey: (params?: {
            passphrase?: string | undefined;
        }) => Promise<string>;
        removeKey: (params: {
            key: string;
        }) => Promise<boolean>;
        exportRawKey: (params: {
            key: string;
            passphrase?: string | undefined;
        }) => Promise<string>;
        getPublicKey: (params: {
            key: string;
            passphrase?: string | undefined;
        }) => Promise<string | null>;
        sign: (params: {
            key: string;
            message: string;
            passphrase?: string | undefined;
        }) => Promise<string>;
    };
    private hdKeyMapping;
    constructor(cckey: CCKey, hdKeyMapping?: HDKeyMapping);
    close(): Promise<void>;
}
