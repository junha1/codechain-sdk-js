import { Rpc } from ".";
export declare class NetworkRpc {
    private rpc;
    /**
     * @hidden
     */
    constructor(rpc: Rpc);
    /**
     * Connect to node
     * @param address Node address which to connect
     * @param port
     */
    connect(address: string, port: number): Promise<null>;
    /**
     * Disconnect from the node
     * @param address Node address which to disconnect
     * @param port
     */
    disconnect(address: string, port: number): Promise<null>;
    /**
     * Check the node is connected
     * @param address Node address
     * @param port
     */
    isConnected(address: string, port: number): Promise<boolean>;
    /**
     * Get the port
     */
    getPort(): Promise<number>;
    /**
     * Get the number of established peers
     */
    getPeerCount(): Promise<number>;
    /**
     * Get the addresses of established peers
     */
    getPeers(): Promise<string[]>;
    /**
     * Add the IP to whitelist
     * @param ip Node IP
     */
    addToWhitelist(ipCidr: string, tag?: string): Promise<null>;
    /**
     * Remove the IP from whitelist
     * @param ip Node IP
     */
    removeFromWhitelist(ipCidr: string): Promise<null>;
    /**
     * Add the IP to blacklist
     * @param ip Node IP
     */
    addToBlacklist(ipCidr: string, tag?: string): Promise<null>;
    /**
     * Remove the IP from blacklist
     * @param ip Node IP
     */
    removeFromBlacklist(ipCidr: string): Promise<null>;
    /**
     * Enable whitelist
     */
    enableWhitelist(): Promise<null>;
    /**
     * Disable whitelist
     */
    disableWhitelist(): Promise<null>;
    /**
     * Enable blacklist
     */
    enableBlacklist(): Promise<null>;
    /**
     * Disable blacklist
     */
    disableBlacklist(): Promise<null>;
    /**
     * Get the status of whitelist
     */
    getWhitelist(): Promise<{
        list: string[];
        enabled: boolean;
    }>;
    /**
     * Get the status of blacklist
     */
    getBlacklist(): Promise<{
        list: string[];
        enabled: boolean;
    }>;
}
