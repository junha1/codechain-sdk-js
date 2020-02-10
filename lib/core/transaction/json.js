"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("../classes");
var AssetMintOutput_1 = require("./AssetMintOutput");
var AssetTransferInput_1 = require("./AssetTransferInput");
var AssetTransferOutput_1 = require("./AssetTransferOutput");
var ChangeAssetScheme_1 = require("./ChangeAssetScheme");
var CreateShard_1 = require("./CreateShard");
var Custom_1 = require("./Custom");
var IncreaseAssetSupply_1 = require("./IncreaseAssetSupply");
var MintAsset_1 = require("./MintAsset");
var OrderOnTransfer_1 = require("./OrderOnTransfer");
var Pay_1 = require("./Pay");
var Remove_1 = require("./Remove");
var SetRegularKey_1 = require("./SetRegularKey");
var SetShardOwners_1 = require("./SetShardOwners");
var SetShardUsers_1 = require("./SetShardUsers");
var Store_1 = require("./Store");
var TransferAsset_1 = require("./TransferAsset");
var UnwrapCCC_1 = require("./UnwrapCCC");
var WrapCCC_1 = require("./WrapCCC");
function fromJSONToTransaction(result) {
    var seq = result.seq, fee = result.fee, networkId = result.networkId, action = result.action;
    var tx;
    switch (action.type) {
        case "mintAsset": {
            var shardId = action.shardId, metadata = action.metadata, approvals = action.approvals;
            var approver = action.approver == null
                ? null
                : classes_1.PlatformAddress.ensure(action.approver);
            var registrar = action.registrar == null
                ? null
                : classes_1.PlatformAddress.ensure(action.registrar);
            var allowedScriptHashes = action.allowedScriptHashes == null
                ? null
                : action.allowedScriptHashes.map(function (hash) {
                    return classes_1.H160.ensure(hash);
                });
            var output = AssetMintOutput_1.AssetMintOutput.fromJSON(action.output);
            tx = new MintAsset_1.MintAsset({
                networkId: networkId,
                shardId: shardId,
                metadata: metadata,
                output: output,
                approver: approver,
                registrar: registrar,
                allowedScriptHashes: allowedScriptHashes,
                approvals: approvals
            });
            break;
        }
        case "changeAssetScheme": {
            var metadata = action.metadata, approvals = action.approvals, shardId = action.shardId;
            var assetSchemeSeq = action.seq;
            var assetType = new classes_1.H160(action.assetType);
            var approver = action.approver == null
                ? null
                : classes_1.PlatformAddress.ensure(action.approver);
            var registrar = action.registrar == null
                ? null
                : classes_1.PlatformAddress.ensure(action.registrar);
            var allowedScriptHashes = action.allowedScriptHashes.map(function (hash) { return classes_1.H160.ensure(hash); });
            tx = new ChangeAssetScheme_1.ChangeAssetScheme({
                networkId: networkId,
                shardId: shardId,
                assetType: assetType,
                seq: assetSchemeSeq,
                metadata: metadata,
                approver: approver,
                registrar: registrar,
                allowedScriptHashes: allowedScriptHashes,
                approvals: approvals
            });
            break;
        }
        case "increaseAssetSupply": {
            var approvals = action.approvals, shardId = action.shardId;
            var assetSchemeSeq = action.seq;
            var assetType = new classes_1.H160(action.assetType);
            var output = AssetMintOutput_1.AssetMintOutput.fromJSON(action.output);
            tx = new IncreaseAssetSupply_1.IncreaseAssetSupply({
                networkId: networkId,
                shardId: shardId,
                assetType: assetType,
                seq: assetSchemeSeq,
                output: output,
                approvals: approvals
            });
            break;
        }
        case "transferAsset": {
            var metadata = action.metadata;
            var approvals = action.approvals;
            var expiration = action.expiration;
            var burns = action.burns.map(AssetTransferInput_1.AssetTransferInput.fromJSON);
            var inputs = action.inputs.map(AssetTransferInput_1.AssetTransferInput.fromJSON);
            var outputs = action.outputs.map(AssetTransferOutput_1.AssetTransferOutput.fromJSON);
            var orders = action.orders.map(OrderOnTransfer_1.OrderOnTransfer.fromJSON);
            tx = new TransferAsset_1.TransferAsset({
                networkId: networkId,
                burns: burns,
                inputs: inputs,
                outputs: outputs,
                orders: orders,
                metadata: metadata,
                approvals: approvals,
                expiration: expiration
            });
            break;
        }
        case "unwrapCCC": {
            var burn = AssetTransferInput_1.AssetTransferInput.fromJSON(action.burn);
            var receiver = classes_1.PlatformAddress.ensure(action.receiver);
            tx = new UnwrapCCC_1.UnwrapCCC({
                burn: burn,
                networkId: networkId,
                receiver: receiver
            });
            break;
        }
        case "pay": {
            var receiver = classes_1.PlatformAddress.ensure(action.receiver);
            var quantity = new classes_1.U64(action.quantity);
            tx = new Pay_1.Pay(receiver, quantity, networkId);
            break;
        }
        case "setRegularKey": {
            var key = new classes_1.H512(action.key);
            tx = new SetRegularKey_1.SetRegularKey(key, networkId);
            break;
        }
        case "createShard": {
            var users = action.users.map(classes_1.PlatformAddress.ensure);
            tx = new CreateShard_1.CreateShard({ users: users }, networkId);
            break;
        }
        case "setShardOwners": {
            var shardId = action.shardId;
            var owners = action.owners.map(classes_1.PlatformAddress.ensure);
            tx = new SetShardOwners_1.SetShardOwners({
                shardId: shardId,
                owners: owners
            }, networkId);
            break;
        }
        case "setShardUsers": {
            var shardId = action.shardId;
            var users = action.users.map(classes_1.PlatformAddress.ensure);
            tx = new SetShardUsers_1.SetShardUsers({
                shardId: shardId,
                users: users
            }, networkId);
            break;
        }
        case "wrapCCC": {
            var shardId = action.shardId;
            var lockScriptHash = classes_1.H160.ensure(action.lockScriptHash);
            var parameters = action.parameters.map(function (p) {
                return Buffer.from(p, "hex");
            });
            var quantity = classes_1.U64.ensure(action.quantity);
            var payer = classes_1.PlatformAddress.ensure(action.payer);
            tx = new WrapCCC_1.WrapCCC({
                shardId: shardId,
                lockScriptHash: lockScriptHash,
                parameters: parameters,
                quantity: quantity,
                payer: payer
            }, networkId);
            break;
        }
        case "store": {
            var content = action.content, signature = action.signature;
            var certifier = classes_1.PlatformAddress.ensure(action.certifier);
            tx = new Store_1.Store({
                content: content,
                certifier: classes_1.PlatformAddress.ensure(certifier),
                signature: signature
            }, networkId);
            break;
        }
        case "remove": {
            var signature = action.signature;
            var hash = classes_1.H256.ensure(action.hash);
            tx = new Remove_1.Remove({
                hash: classes_1.H256.ensure(hash),
                signature: signature
            }, networkId);
            break;
        }
        case "custom": {
            var handlerId = classes_1.U64.ensure(action.handlerId);
            var bytes = Buffer.from(action.bytes);
            tx = new Custom_1.Custom({
                handlerId: handlerId,
                bytes: bytes
            }, networkId);
            break;
        }
        default:
            throw Error("Unexpected action: " + action);
    }
    if (seq != null) {
        tx.setSeq(seq);
    }
    if (fee != null) {
        tx.setFee(fee);
    }
    return tx;
}
exports.fromJSONToTransaction = fromJSONToTransaction;
/**
 * Create a SignedTransaction from a SignedTransaction JSON object.
 * @param data A SignedTransaction JSON object.
 * @returns A SignedTransaction.
 */
function fromJSONToSignedTransaction(data) {
    var sig = data.sig, blockNumber = data.blockNumber, blockHash = data.blockHash, transactionIndex = data.transactionIndex;
    if (typeof sig !== "string") {
        throw Error("Unexpected type of sig");
    }
    if (blockNumber != null && blockHash != null && transactionIndex != null) {
        return new classes_1.SignedTransaction(fromJSONToTransaction(data), sig, blockNumber, new classes_1.H256(blockHash), transactionIndex);
    }
    else {
        return new classes_1.SignedTransaction(fromJSONToTransaction(data), sig);
    }
}
exports.fromJSONToSignedTransaction = fromJSONToSignedTransaction;
