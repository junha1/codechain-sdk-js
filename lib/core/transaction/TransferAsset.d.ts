import { U64Value } from "codechain-primitives/lib";
import { SignatureTag } from "../../utils";
import { Asset } from "../Asset";
import { H256, Order, OrderOnTransfer } from "../classes";
import { AssetTransaction, Transaction } from "../Transaction";
import { AssetTransferOutputValue, NetworkId } from "../types";
import { AssetTransferInput, AssetTransferInputJSON } from "./AssetTransferInput";
import { AssetTransferOutput, AssetTransferOutputJSON } from "./AssetTransferOutput";
import { OrderOnTransferJSON } from "./OrderOnTransfer";
export interface AssetTransferTransactionJSON {
    networkId: string;
    burns: AssetTransferInputJSON[];
    inputs: AssetTransferInputJSON[];
    outputs: AssetTransferOutputJSON[];
    orders: OrderOnTransferJSON[];
}
export interface TransferAssetActionJSON extends AssetTransferTransactionJSON {
    metadata: string;
    approvals: string[];
    expiration: number | null;
}
export declare class TransferAsset extends Transaction implements AssetTransaction {
    private readonly _transaction;
    private readonly approvals;
    private readonly metadata;
    private readonly expiration;
    constructor(input: {
        burns: AssetTransferInput[];
        inputs: AssetTransferInput[];
        outputs: AssetTransferOutput[];
        orders: OrderOnTransfer[];
        networkId: NetworkId;
        metadata: string | object;
        approvals: string[];
        expiration: number | null;
    });
    /**
     * Get the tracker of an AssetDecomposeTransaction.
     * @returns A transaction tracker.
     */
    tracker(): H256;
    /**
     * Add an approval to transaction.
     * @param approval An approval
     */
    addApproval(approval: string): void;
    /**
     * Add an AssetTransferInput to burn.
     * @param burns An array of either an AssetTransferInput or an Asset.
     * @returns The TransferAsset, which is modified by adding them.
     */
    addBurns(burns: AssetTransferInput | Asset | Array<AssetTransferInput | Asset>, ...rest: Array<AssetTransferInput | Asset>): TransferAsset;
    burns(): AssetTransferInput[];
    burn(index: number): AssetTransferInput | null;
    /**
     * Add an AssetTransferInput to spend.
     * @param inputs An array of either an AssetTransferInput or an Asset.
     * @returns The TransferAsset, which is modified by adding them.
     */
    addInputs(inputs: AssetTransferInput | Asset | Array<AssetTransferInput | Asset>, ...rest: Array<AssetTransferInput | Asset>): TransferAsset;
    inputs(): AssetTransferInput[];
    input(index: number): AssetTransferInput | null;
    /**
     * Add an AssetTransferOutput to create.
     * @param outputs An array of either an AssetTransferOutput or an object
     * that has quantity, assetType and recipient values.
     * @param output.quantity Asset quantity of the output.
     * @param output.assetType An asset type of the output.
     * @param output.recipient A recipient of the output.
     */
    addOutputs(outputs: AssetTransferOutputValue | Array<AssetTransferOutputValue>, ...rest: Array<AssetTransferOutputValue>): TransferAsset;
    outputs(): AssetTransferOutput[];
    output(index: number): AssetTransferOutput | null;
    /**
     * Add an Order to create.
     * @param params.order An order to apply to the transfer transaction.
     * @param params.spentQuantity A spent quantity of the asset to give(from) while transferring.
     * @param params.inputIndices The indices of inputs affected by the order
     * @param params.outputIndices The indices of outputs affected by the order
     */
    addOrder(params: {
        order: Order;
        spentQuantity: U64Value;
        inputFromIndices: number[];
        inputFeeIndices: number[];
        outputFromIndices: number[];
        outputToIndices: number[];
        outputOwnedFeeIndices: number[];
        outputTransferredFeeIndices: number[];
    }): this;
    orders(): OrderOnTransfer[];
    /**
     * Get the output of the given index, of this transaction.
     * @param index An index indicating an output.
     * @returns An Asset.
     */
    getTransferredAsset(index: number): Asset;
    /**
     * Get the outputs of this transaction.
     * @returns An array of an Asset.
     */
    getTransferredAssets(): Asset[];
    /**
     * Get a hash of the transaction that doesn't contain the scripts. The hash
     * is used as a message to create a signature for a transaction.
     * @returns A hash.
     */
    hashWithoutScript(params?: {
        tag: SignatureTag;
        type: "input" | "burn";
        index: number;
    }): H256;
    type(): string;
    protected actionToEncodeObject(): any[];
    protected actionToJSON(): TransferAssetActionJSON;
}
