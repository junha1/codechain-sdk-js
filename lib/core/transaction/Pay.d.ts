import { PlatformAddress, U64 } from "../classes";
import { Transaction } from "../Transaction";
import { NetworkId } from "../types";
export interface PayActionJSON {
    receiver: string;
    quantity: string;
}
export declare class Pay extends Transaction {
    private readonly receiver;
    private readonly quantity;
    constructor(receiver: PlatformAddress, quantity: U64, networkId: NetworkId);
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): PayActionJSON;
}
