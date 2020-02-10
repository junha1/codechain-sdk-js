/// <reference types="node" />
import { AssetAddress, H160, U64 } from "codechain-primitives";
export interface AssetMintOutputJSON {
    lockScriptHash: string;
    parameters: string[];
    supply: string;
}
export declare class AssetMintOutput {
    /**
     * Create an AssetMintOutput from an AssetMintOutput JSON object.
     * @param data An AssetMintOutput JSON object.
     * @returns An AssetMintOutput.
     */
    static fromJSON(data: AssetMintOutputJSON): AssetMintOutput;
    readonly lockScriptHash: H160;
    readonly parameters: Buffer[];
    readonly supply: U64;
    /**
     * @param data.lockScriptHash A lock script hash of the output.
     * @param data.parameters Parameters of the output.
     * @param data.supply Asset supply of the output.
     */
    constructor(data: {
        lockScriptHash: H160;
        parameters: Buffer[];
        supply: U64;
    } | {
        recipient: AssetAddress;
        supply: U64;
    });
    /**
     * Convert to an AssetMintOutput JSON object.
     * @returns An AssetMintOutput JSON object.
     */
    toJSON(): AssetMintOutputJSON;
}
