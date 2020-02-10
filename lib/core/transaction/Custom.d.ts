/// <reference types="node" />
import { U64 } from "codechain-primitives";
import { Transaction } from "../Transaction";
import { NetworkId } from "../types";
export interface CustomActionJSON {
    handlerId: string;
    bytes: number[];
}
export declare class Custom extends Transaction {
    private readonly handlerId;
    private readonly bytes;
    constructor(params: {
        handlerId: U64;
        bytes: Buffer;
    }, networkId: NetworkId);
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): CustomActionJSON;
}
