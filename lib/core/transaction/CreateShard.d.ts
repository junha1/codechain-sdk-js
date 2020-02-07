import { PlatformAddress } from "codechain-primitives/lib";
import { Transaction } from "../Transaction";
import { NetworkId } from "../types";
export interface CreateShardActionJSON {
    users: string[];
}
export declare class CreateShard extends Transaction {
    private readonly users;
    constructor(params: {
        users: PlatformAddress[];
    }, networkId: NetworkId);
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): CreateShardActionJSON;
}
