import { AccountRpc } from "./account";
import { ChainRpc } from "./chain";
import { DevelRpc } from "./devel";
import { EngineRpc } from "./engine";
import { NetworkRpc } from "./network";
import { NodeRpc } from "./node";
export declare class Rpc {
    /**
     * RPC module for retrieving the node info.
     */
    node: NodeRpc;
    /**
     * RPC module for accessing the blockchain.
     */
    chain: ChainRpc;
    /**
     * RPC module for configuring P2P networking of the node.
     */
    network: NetworkRpc;
    /**
     * RPC module for account management and signing
     */
    account: AccountRpc;
    /**
     * RPC module for retrieving the engine info.
     */
    engine: EngineRpc;
    /**
     * RPC module for developer functions
     */
    devel: DevelRpc;
    private client;
    private server;
    /**
     * @param params.server HTTP RPC server address.
     * @param params.options.transactionSigner The default account to sign the tx
     */
    constructor(params: {
        server: string;
        options?: {
            transactionSigner?: string;
            fallbackServers?: string[];
        };
    });
    sendRpcRequest: (name: string, params: any[], options?: {
        id?: string | undefined;
        fallbackServers?: string[] | undefined;
    } | undefined) => Promise<any>;
}
