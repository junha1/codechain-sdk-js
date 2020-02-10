import { PlatformAddress } from "../classes";
import { Transaction } from "../Transaction";
import { NetworkId } from "../types";
export interface SetShardOwnersActionJSON {
    shardId: number;
    owners: string[];
}
export declare class SetShardOwners extends Transaction {
    private readonly shardId;
    private readonly owners;
    constructor(params: {
        shardId: number;
        owners: PlatformAddress[];
    }, networkId: NetworkId);
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): SetShardOwnersActionJSON;
}
