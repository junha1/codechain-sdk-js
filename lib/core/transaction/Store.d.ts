import { H256, PlatformAddress } from "../classes";
import { Text } from "../Text";
import { Transaction } from "../Transaction";
import { NetworkId } from "../types";
export interface StoreActionJSON {
    content: string;
    certifier: string;
    signature: string;
}
export declare class Store extends Transaction {
    private content;
    private certifier;
    private signature;
    constructor(params: {
        content: string;
        certifier: PlatformAddress;
        signature: string;
    } | {
        content: string;
        secret: H256;
    }, networkId: NetworkId);
    getText(): Text;
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): StoreActionJSON;
}
