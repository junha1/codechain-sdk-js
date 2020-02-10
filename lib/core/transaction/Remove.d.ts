import { H256 } from "../classes";
import { Transaction } from "../Transaction";
import { NetworkId } from "../types";
export interface RemoveActionJSON {
    hash: string;
    signature: string;
}
export declare class Remove extends Transaction {
    private readonly _hash;
    private readonly signature;
    constructor(params: {
        hash: H256;
        signature: string;
    } | {
        hash: H256;
        secret: H256;
    }, networkId: NetworkId);
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): RemoveActionJSON;
}
