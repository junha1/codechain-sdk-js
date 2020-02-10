import { PlatformAddress, U64 } from "codechain-primitives";
import { Rpc } from ".";
export declare class EngineRpc {
    private rpc;
    private fallbackServers?;
    /**
     * @hidden
     */
    constructor(rpc: Rpc, options: {
        fallbackServers?: string[];
    });
    /**
     * Gets coinbase's account id.
     * @returns PlatformAddress or null
     */
    getCoinbase(): Promise<PlatformAddress | null>;
    /**
     * Gets coinbase's account id.
     * @returns PlatformAddress or null
     */
    getBlockReward(): Promise<U64>;
    /**
     * Gets coinbase's account id.
     * @returns PlatformAddress or null
     */
    getRecommendedConfirmation(): Promise<number>;
    /**
     * Gets custom type's data at blockNumber with keyFragments.
     * @param handlerId number
     * @param keyFragments any[]
     * @param blockNumber? number
     * @returns string or null returns
     */
    getCustomActionData(handlerId: number, keyFragments: any[], blockNumber?: number): Promise<string | null>;
}
