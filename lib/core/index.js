"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var Asset_1 = require("./Asset");
var AssetScheme_1 = require("./AssetScheme");
var Block_1 = require("./Block");
var Script_1 = require("./Script");
var SignedTransaction_1 = require("./SignedTransaction");
var Transaction_1 = require("./Transaction");
var AssetMintOutput_1 = require("./transaction/AssetMintOutput");
var AssetOutPoint_1 = require("./transaction/AssetOutPoint");
var AssetTransferInput_1 = require("./transaction/AssetTransferInput");
var AssetTransferOutput_1 = require("./transaction/AssetTransferOutput");
var ChangeAssetScheme_1 = require("./transaction/ChangeAssetScheme");
var CreateShard_1 = require("./transaction/CreateShard");
var Custom_1 = require("./transaction/Custom");
var IncreaseAssetSupply_1 = require("./transaction/IncreaseAssetSupply");
var MintAsset_1 = require("./transaction/MintAsset");
var Order_1 = require("./transaction/Order");
var OrderOnTransfer_1 = require("./transaction/OrderOnTransfer");
var Pay_1 = require("./transaction/Pay");
var Remove_1 = require("./transaction/Remove");
var SetRegularKey_1 = require("./transaction/SetRegularKey");
var SetShardOwners_1 = require("./transaction/SetShardOwners");
var SetShardUsers_1 = require("./transaction/SetShardUsers");
var Store_1 = require("./transaction/Store");
var TransferAsset_1 = require("./transaction/TransferAsset");
var UnwrapCCC_1 = require("./transaction/UnwrapCCC");
var WrapCCC_1 = require("./transaction/WrapCCC");
var Core = /** @class */ (function () {
    /**
     * @param params.networkId The network id of CodeChain.
     */
    function Core(params) {
        this.classes = Core.classes;
        var networkId = params.networkId;
        this.networkId = networkId;
    }
    /**
     * Creates Pay type which pays the value quantity of CCC(CodeChain Coin)
     * from the tx signer to the recipient. Who is signing the tx will pay.
     * @param params.recipient The platform account who receives CCC
     * @param params.quantity quantity of CCC to pay
     * @throws Given string for recipient is invalid for converting it to PlatformAddress
     * @throws Given number or string for quantity is invalid for converting it to U64
     */
    Core.prototype.createPayTransaction = function (params) {
        var recipient = params.recipient, quantity = params.quantity;
        checkPlatformAddressRecipient(recipient);
        checkAmount(quantity);
        return new Pay_1.Pay(codechain_primitives_1.PlatformAddress.ensure(recipient), codechain_primitives_1.U64.ensure(quantity), this.networkId);
    };
    /**
     * Creates SetRegularKey type which sets the regular key of the tx signer.
     * @param params.key The public key of a regular key
     * @throws Given string for key is invalid for converting it to H512
     */
    Core.prototype.createSetRegularKeyTransaction = function (params) {
        var key = params.key;
        checkKey(key);
        return new SetRegularKey_1.SetRegularKey(codechain_primitives_1.H512.ensure(key), this.networkId);
    };
    /**
     * Creates CreateShard type which can create new shard
     */
    Core.prototype.createCreateShardTransaction = function (params) {
        var users = params.users;
        return new CreateShard_1.CreateShard({
            users: users.map(codechain_primitives_1.PlatformAddress.ensure)
        }, this.networkId);
    };
    Core.prototype.createSetShardOwnersTransaction = function (params) {
        var shardId = params.shardId, owners = params.owners;
        checkShardId(shardId);
        checkOwners(owners);
        return new SetShardOwners_1.SetShardOwners({
            shardId: shardId,
            owners: owners.map(codechain_primitives_1.PlatformAddress.ensure)
        }, this.networkId);
    };
    /**
     * Create SetShardUser type which can change shard users
     * @param params.shardId
     * @param params.users
     */
    Core.prototype.createSetShardUsersTransaction = function (params) {
        var shardId = params.shardId, users = params.users;
        checkShardId(shardId);
        checkUsers(users);
        return new SetShardUsers_1.SetShardUsers({
            shardId: shardId,
            users: users.map(codechain_primitives_1.PlatformAddress.ensure)
        }, this.networkId);
    };
    /**
     * Creates Wrap CCC type which wraps the value quantity of CCC(CodeChain Coin)
     * in a wrapped CCC asset. Who is signing the tx will pay.
     * @param params.shardId A shard ID of the wrapped CCC asset.
     * @param params.lockScriptHash A lock script hash of the wrapped CCC asset.
     * @param params.parameters Parameters of the wrapped CCC asset.
     * @param params.quantity quantity of CCC to pay
     * @throws Given string for a lock script hash is invalid for converting it to H160
     * @throws Given number or string for quantity is invalid for converting it to U64
     */
    Core.prototype.createWrapCCCTransaction = function (params) {
        var shardId = params.shardId, quantity = params.quantity, payer = params.payer;
        checkShardId(shardId);
        checkAmount(quantity);
        checkPayer(payer);
        var data;
        if ("recipient" in params) {
            checkAssetAddressRecipient(params.recipient);
            data = {
                shardId: shardId,
                recipient: codechain_primitives_1.AssetAddress.ensure(params.recipient),
                quantity: codechain_primitives_1.U64.ensure(quantity),
                payer: codechain_primitives_1.PlatformAddress.ensure(payer)
            };
        }
        else {
            var lockScriptHash = params.lockScriptHash, parameters = params.parameters;
            checkLockScriptHash(lockScriptHash);
            checkParameters(parameters);
            data = {
                shardId: shardId,
                lockScriptHash: codechain_primitives_1.H160.ensure(lockScriptHash),
                parameters: parameters,
                quantity: codechain_primitives_1.U64.ensure(quantity),
                payer: codechain_primitives_1.PlatformAddress.ensure(payer)
            };
        }
        return new WrapCCC_1.WrapCCC(data, this.networkId);
    };
    /**
     * Creates Store type which store content with certifier on chain.
     * @param params.content Content to store
     * @param params.secret Secret key to sign
     * @param params.certifier Certifier of the text, which is PlatformAddress
     * @param params.signature Signature on the content by the certifier
     * @throws Given string for secret is invalid for converting it to H256
     */
    Core.prototype.createStoreTransaction = function (params) {
        var storeParams;
        if ("secret" in params) {
            var content = params.content, secret = params.secret;
            checkSecret(secret);
            storeParams = {
                content: content,
                secret: codechain_primitives_1.H256.ensure(secret)
            };
        }
        else {
            var content = params.content, certifier = params.certifier, signature = params.signature;
            checkCertifier(certifier);
            checkSignature(signature);
            storeParams = {
                content: content,
                certifier: codechain_primitives_1.PlatformAddress.ensure(certifier),
                signature: signature
            };
        }
        return new Store_1.Store(storeParams, this.networkId);
    };
    /**
     * Creates Remove type which remove the text from the chain.
     * @param params.hash Transaction hash which stored the text
     * @param params.secret Secret key to sign
     * @param params.signature Signature on tx hash by the certifier of the text
     * @throws Given string for hash or secret is invalid for converting it to H256
     */
    Core.prototype.createRemoveTransaction = function (params) {
        var removeParam = null;
        if ("secret" in params) {
            var hash = params.hash, secret = params.secret;
            checkTransactionHash(hash);
            checkSecret(secret);
            removeParam = {
                hash: codechain_primitives_1.H256.ensure(hash),
                secret: codechain_primitives_1.H256.ensure(secret)
            };
        }
        else {
            var hash = params.hash, signature = params.signature;
            checkTransactionHash(hash);
            checkSignature(signature);
            removeParam = {
                hash: codechain_primitives_1.H256.ensure(hash),
                signature: signature
            };
        }
        return new Remove_1.Remove(removeParam, this.networkId);
    };
    /**
     * Creates Custom type that will be handled by a specified type handler
     * @param params.handlerId An Id of an type handler which will handle a custom transaction
     * @param params.bytes A custom transaction body
     * @throws Given number for handlerId is invalid for converting it to U64
     */
    Core.prototype.createCustomTransaction = function (params) {
        var handlerId = params.handlerId, bytes = params.bytes;
        checkHandlerId(handlerId);
        checkBytes(bytes);
        var customParam = {
            handlerId: codechain_primitives_1.U64.ensure(handlerId),
            bytes: bytes
        };
        return new Custom_1.Custom(customParam, this.networkId);
    };
    /**
     * Creates asset's scheme.
     * @param params.metadata Any string that describing the asset. For example,
     * stringified JSON containing properties.
     * @param params.supply Total supply of this asset
     * @param params.approver Platform account or null. If account is present, the
     * tx that includes AssetTransferTransaction of this asset must be signed by
     * the approver account.
     * @param params.registrar Platform account or null. The registrar
     * can transfer the asset without unlocking.
     * @throws Given string for approver is invalid for converting it to paltform account
     * @throws Given string for registrar is invalid for converting it to paltform account
     */
    Core.prototype.createAssetScheme = function (params) {
        var shardId = params.shardId, supply = params.supply, _a = params.approver, approver = _a === void 0 ? null : _a, _b = params.registrar, registrar = _b === void 0 ? null : _b, _c = params.allowedScriptHashes, allowedScriptHashes = _c === void 0 ? null : _c, _d = params.pool, pool = _d === void 0 ? [] : _d;
        checkMetadata(params.metadata);
        var metadata = typeof params.metadata === "string"
            ? params.metadata
            : JSON.stringify(params.metadata);
        checkShardId(shardId);
        checkAmount(supply);
        checkApprover(approver);
        checkregistrar(registrar);
        return new AssetScheme_1.AssetScheme({
            networkId: this.networkId,
            shardId: shardId,
            metadata: metadata,
            supply: codechain_primitives_1.U64.ensure(supply),
            approver: approver == null ? null : codechain_primitives_1.PlatformAddress.ensure(approver),
            registrar: registrar == null ? null : codechain_primitives_1.PlatformAddress.ensure(registrar),
            allowedScriptHashes: allowedScriptHashes == null ? [] : allowedScriptHashes,
            pool: pool.map(function (_a) {
                var assetType = _a.assetType, assetQuantity = _a.quantity;
                return ({
                    assetType: codechain_primitives_1.H160.ensure(assetType),
                    quantity: codechain_primitives_1.U64.ensure(assetQuantity)
                });
            })
        });
    };
    Core.prototype.createOrder = function (params) {
        var assetTypeFrom = params.assetTypeFrom, assetTypeTo = params.assetTypeTo, _a = params.assetTypeFee, assetTypeFee = _a === void 0 ? codechain_primitives_1.H160.zero() : _a, shardIdFrom = params.shardIdFrom, shardIdTo = params.shardIdTo, _b = params.shardIdFee, shardIdFee = _b === void 0 ? 0 : _b, assetQuantityFrom = params.assetQuantityFrom, assetQuantityTo = params.assetQuantityTo, _c = params.assetQuantityFee, assetQuantityFee = _c === void 0 ? 0 : _c, originOutputs = params.originOutputs, expiration = params.expiration;
        checkAssetType(assetTypeFrom);
        checkAssetType(assetTypeTo);
        checkAssetType(assetTypeFee);
        checkShardId(shardIdFrom);
        checkShardId(shardIdTo);
        checkShardId(shardIdFee);
        checkAmount(assetQuantityFrom);
        checkAmount(assetQuantityTo);
        checkAmount(assetQuantityFee);
        checkExpiration(expiration);
        var originOutputsConv = [];
        for (var i = 0; i < originOutputs.length; i++) {
            var originOutput = originOutputs[i];
            var tracker = originOutput.tracker, index = originOutput.index, assetType = originOutput.assetType, shardId = originOutput.shardId, quantity = originOutput.quantity, lockScriptHash = originOutput.lockScriptHash, parameters = originOutput.parameters;
            checkAssetOutPoint(originOutput);
            originOutputsConv[i] =
                originOutput instanceof AssetOutPoint_1.AssetOutPoint
                    ? originOutput
                    : new AssetOutPoint_1.AssetOutPoint({
                        tracker: codechain_primitives_1.H256.ensure(tracker),
                        index: index,
                        assetType: codechain_primitives_1.H160.ensure(assetType),
                        shardId: shardId,
                        quantity: codechain_primitives_1.U64.ensure(quantity),
                        lockScriptHash: lockScriptHash
                            ? codechain_primitives_1.H160.ensure(lockScriptHash)
                            : undefined,
                        parameters: parameters
                    });
        }
        var baseParams = {
            assetTypeFrom: codechain_primitives_1.H160.ensure(assetTypeFrom),
            assetTypeTo: codechain_primitives_1.H160.ensure(assetTypeTo),
            assetTypeFee: codechain_primitives_1.H160.ensure(assetTypeFee),
            shardIdFrom: shardIdFrom,
            shardIdTo: shardIdTo,
            shardIdFee: shardIdFee,
            assetQuantityFrom: codechain_primitives_1.U64.ensure(assetQuantityFrom),
            assetQuantityTo: codechain_primitives_1.U64.ensure(assetQuantityTo),
            assetQuantityFee: codechain_primitives_1.U64.ensure(assetQuantityFee),
            expiration: codechain_primitives_1.U64.ensure(expiration),
            originOutputs: originOutputsConv
        };
        var toParams;
        var feeParams;
        if ("recipientFrom" in params) {
            checkAssetAddressRecipient(params.recipientFrom);
            toParams = {
                recipientFrom: codechain_primitives_1.AssetAddress.ensure(params.recipientFrom)
            };
        }
        else {
            var lockScriptHashFrom = params.lockScriptHashFrom, parametersFrom = params.parametersFrom;
            checkLockScriptHash(lockScriptHashFrom);
            checkParameters(parametersFrom);
            toParams = {
                lockScriptHashFrom: codechain_primitives_1.H160.ensure(lockScriptHashFrom),
                parametersFrom: parametersFrom
            };
        }
        if ("recipientFee" in params) {
            checkAssetAddressRecipient(params.recipientFee);
            feeParams = {
                recipientFee: codechain_primitives_1.AssetAddress.ensure(params.recipientFee)
            };
        }
        else if ("lockScriptHashFee" in params) {
            var lockScriptHashFee = params.lockScriptHashFee, parametersFee = params.parametersFee;
            checkLockScriptHash(lockScriptHashFee);
            checkParameters(parametersFee);
            feeParams = {
                lockScriptHashFee: codechain_primitives_1.H160.ensure(lockScriptHashFee),
                parametersFee: parametersFee
            };
        }
        else {
            feeParams = {
                lockScriptHashFee: codechain_primitives_1.H160.ensure("0".repeat(40)),
                parametersFee: []
            };
        }
        return new Order_1.Order(__assign(__assign(__assign({}, baseParams), toParams), feeParams));
    };
    Core.prototype.createOrderOnTransfer = function (params) {
        var order = params.order, spentQuantity = params.spentQuantity, inputFromIndices = params.inputFromIndices, inputFeeIndices = params.inputFeeIndices, outputFromIndices = params.outputFromIndices, outputToIndices = params.outputToIndices, outputOwnedFeeIndices = params.outputOwnedFeeIndices, outputTransferredFeeIndices = params.outputTransferredFeeIndices;
        checkOrder(order);
        checkAmount(spentQuantity);
        checkIndices(inputFromIndices);
        checkIndices(inputFeeIndices);
        checkIndices(outputFromIndices);
        checkIndices(outputToIndices);
        checkIndices(outputOwnedFeeIndices);
        checkIndices(outputTransferredFeeIndices);
        return new OrderOnTransfer_1.OrderOnTransfer({
            order: order,
            spentQuantity: codechain_primitives_1.U64.ensure(spentQuantity),
            inputFromIndices: inputFromIndices,
            inputFeeIndices: inputFeeIndices,
            outputFromIndices: outputFromIndices,
            outputToIndices: outputToIndices,
            outputOwnedFeeIndices: outputOwnedFeeIndices,
            outputTransferredFeeIndices: outputTransferredFeeIndices
        });
    };
    Core.prototype.createMintAssetTransaction = function (params) {
        var scheme = params.scheme, recipient = params.recipient, _a = params.approvals, approvals = _a === void 0 ? [] : _a;
        if (scheme != null && typeof scheme !== "object") {
            throw Error("Expected scheme param to be either an AssetScheme or an object but found " + scheme);
        }
        var _b = scheme.networkId, networkId = _b === void 0 ? this.networkId : _b, shardId = scheme.shardId, _c = scheme.approver, approver = _c === void 0 ? null : _c, _d = scheme.registrar, registrar = _d === void 0 ? null : _d, _e = scheme.allowedScriptHashes, allowedScriptHashes = _e === void 0 ? null : _e, _f = scheme.supply, supply = _f === void 0 ? codechain_primitives_1.U64.MAX_VALUE : _f;
        checkMetadata(scheme.metadata);
        var metadata = typeof scheme.metadata === "string"
            ? scheme.metadata
            : JSON.stringify(scheme.metadata);
        checkAssetAddressRecipient(recipient);
        checkNetworkId(networkId);
        if (shardId === undefined) {
            throw Error("shardId is undefined");
        }
        checkShardId(shardId);
        checkApprover(approver);
        checkregistrar(registrar);
        checkAmount(supply);
        return new MintAsset_1.MintAsset({
            networkId: networkId,
            shardId: shardId,
            approver: approver == null ? null : codechain_primitives_1.PlatformAddress.ensure(approver),
            registrar: registrar == null ? null : codechain_primitives_1.PlatformAddress.ensure(registrar),
            allowedScriptHashes: allowedScriptHashes == null ? [] : allowedScriptHashes,
            metadata: metadata,
            output: new AssetMintOutput_1.AssetMintOutput({
                supply: codechain_primitives_1.U64.ensure(supply),
                recipient: codechain_primitives_1.AssetAddress.ensure(recipient)
            }),
            approvals: approvals
        });
    };
    Core.prototype.createChangeAssetSchemeTransaction = function (params) {
        var shardId = params.shardId, assetType = params.assetType, _a = params.seq, seq = _a === void 0 ? 0 : _a, scheme = params.scheme, _b = params.approvals, approvals = _b === void 0 ? [] : _b;
        if (scheme != null && typeof scheme !== "object") {
            throw Error("Expected scheme param to be either an AssetScheme or an object but found " + scheme);
        }
        var _c = scheme.networkId, networkId = _c === void 0 ? this.networkId : _c, _d = scheme.approver, approver = _d === void 0 ? null : _d, _e = scheme.registrar, registrar = _e === void 0 ? null : _e, _f = scheme.allowedScriptHashes, allowedScriptHashes = _f === void 0 ? null : _f;
        checkMetadata(scheme.metadata);
        var metadata = typeof scheme.metadata === "string"
            ? scheme.metadata
            : JSON.stringify(scheme.metadata);
        checkNetworkId(networkId);
        checkAssetType(assetType);
        checkApprover(approver);
        checkregistrar(registrar);
        return new ChangeAssetScheme_1.ChangeAssetScheme({
            networkId: networkId,
            shardId: shardId,
            assetType: codechain_primitives_1.H160.ensure(assetType),
            seq: seq,
            metadata: metadata,
            approver: approver == null ? null : codechain_primitives_1.PlatformAddress.ensure(approver),
            registrar: registrar == null ? null : codechain_primitives_1.PlatformAddress.ensure(registrar),
            allowedScriptHashes: allowedScriptHashes == null ? [] : allowedScriptHashes,
            approvals: approvals
        });
    };
    Core.prototype.createIncreaseAssetSupplyTransaction = function (params) {
        var shardId = params.shardId, assetType = params.assetType, recipient = params.recipient, _a = params.seq, seq = _a === void 0 ? 0 : _a, _b = params.supply, supply = _b === void 0 ? codechain_primitives_1.U64.MAX_VALUE : _b, _c = params.approvals, approvals = _c === void 0 ? [] : _c;
        checkNetworkId(this.networkId);
        checkShardId(shardId);
        checkAssetType(assetType);
        checkAmount(supply);
        return new IncreaseAssetSupply_1.IncreaseAssetSupply({
            networkId: this.networkId,
            shardId: shardId,
            assetType: codechain_primitives_1.H160.ensure(assetType),
            seq: seq,
            output: new AssetMintOutput_1.AssetMintOutput({
                supply: codechain_primitives_1.U64.ensure(supply),
                recipient: codechain_primitives_1.AssetAddress.ensure(recipient)
            }),
            approvals: approvals
        });
    };
    Core.prototype.createTransferAssetTransaction = function (params) {
        var _a = params || {}, _b = _a.burns, burns = _b === void 0 ? [] : _b, _c = _a.inputs, inputs = _c === void 0 ? [] : _c, _d = _a.outputs, outputs = _d === void 0 ? [] : _d, _e = _a.orders, orders = _e === void 0 ? [] : _e, _f = _a.networkId, networkId = _f === void 0 ? this.networkId : _f, _g = _a.metadata, metadata = _g === void 0 ? "" : _g, _h = _a.approvals, approvals = _h === void 0 ? [] : _h, _j = _a.expiration, expiration = _j === void 0 ? null : _j;
        checkMetadata(metadata);
        checkTransferBurns(burns);
        checkTransferInputs(inputs);
        checkTransferOutputs(outputs);
        checkNetworkId(networkId);
        return new TransferAsset_1.TransferAsset({
            burns: burns,
            inputs: inputs,
            outputs: outputs,
            orders: orders,
            networkId: networkId,
            metadata: typeof metadata === "string"
                ? metadata
                : JSON.stringify(metadata),
            approvals: approvals,
            expiration: expiration
        });
    };
    Core.prototype.createUnwrapCCCTransaction = function (params) {
        var burn = params.burn, _a = params.networkId, networkId = _a === void 0 ? this.networkId : _a;
        var receiver = codechain_primitives_1.PlatformAddress.ensure(params.receiver);
        checkNetworkId(networkId);
        if (burn instanceof Asset_1.Asset) {
            var burnInput = burn.createTransferInput();
            checkTransferBurns([burnInput]);
            return new UnwrapCCC_1.UnwrapCCC({
                burn: burnInput,
                networkId: networkId,
                receiver: receiver
            });
        }
        else {
            checkTransferBurns([burn]);
            return new UnwrapCCC_1.UnwrapCCC({
                burn: burn,
                networkId: networkId,
                receiver: receiver
            });
        }
    };
    Core.prototype.createAssetTransferInput = function (params) {
        var assetOutPoint = params.assetOutPoint, _a = params.timelock, timelock = _a === void 0 ? null : _a, lockScript = params.lockScript, unlockScript = params.unlockScript;
        checkAssetOutPoint(assetOutPoint);
        checkTimelock(timelock);
        if (lockScript) {
            checkLockScript(lockScript);
        }
        if (unlockScript) {
            checkUnlockScript(unlockScript);
        }
        var tracker = assetOutPoint.tracker, index = assetOutPoint.index, assetType = assetOutPoint.assetType, shardId = assetOutPoint.shardId, quantity = assetOutPoint.quantity, lockScriptHash = assetOutPoint.lockScriptHash, parameters = assetOutPoint.parameters;
        return new AssetTransferInput_1.AssetTransferInput({
            prevOut: assetOutPoint instanceof AssetOutPoint_1.AssetOutPoint
                ? assetOutPoint
                : new AssetOutPoint_1.AssetOutPoint({
                    tracker: codechain_primitives_1.H256.ensure(tracker),
                    index: index,
                    assetType: codechain_primitives_1.H160.ensure(assetType),
                    shardId: shardId,
                    quantity: codechain_primitives_1.U64.ensure(quantity),
                    lockScriptHash: lockScriptHash
                        ? codechain_primitives_1.H160.ensure(lockScriptHash)
                        : undefined,
                    parameters: parameters
                }),
            timelock: timelock,
            lockScript: lockScript,
            unlockScript: unlockScript
        });
    };
    Core.prototype.createAssetOutPoint = function (params) {
        var tracker = params.tracker, index = params.index, assetType = params.assetType, shardId = params.shardId, quantity = params.quantity;
        checkTracker(tracker);
        checkIndex(index);
        checkAssetType(assetType);
        checkShardId(shardId);
        checkAmount(quantity);
        return new AssetOutPoint_1.AssetOutPoint({
            tracker: codechain_primitives_1.H256.ensure(tracker),
            index: index,
            assetType: codechain_primitives_1.H160.ensure(assetType),
            shardId: shardId,
            quantity: codechain_primitives_1.U64.ensure(quantity)
        });
    };
    Core.prototype.createAssetTransferOutput = function (params) {
        var assetType = params.assetType, shardId = params.shardId;
        var quantity = codechain_primitives_1.U64.ensure(params.quantity);
        checkAssetType(assetType);
        checkShardId(shardId);
        checkAmount(quantity);
        if ("recipient" in params) {
            var recipient = params.recipient;
            checkAssetAddressRecipient(recipient);
            return new AssetTransferOutput_1.AssetTransferOutput({
                recipient: codechain_primitives_1.AssetAddress.ensure(recipient),
                assetType: codechain_primitives_1.H160.ensure(assetType),
                shardId: shardId,
                quantity: quantity
            });
        }
        else if ("lockScriptHash" in params && "parameters" in params) {
            var lockScriptHash = params.lockScriptHash, parameters = params.parameters;
            checkLockScriptHash(lockScriptHash);
            checkParameters(parameters);
            return new AssetTransferOutput_1.AssetTransferOutput({
                lockScriptHash: codechain_primitives_1.H160.ensure(lockScriptHash),
                parameters: parameters,
                assetType: codechain_primitives_1.H160.ensure(assetType),
                shardId: shardId,
                quantity: quantity
            });
        }
        else {
            throw Error("Unexpected params: " + params);
        }
    };
    Core.classes = {
        // Data
        H128: codechain_primitives_1.H128,
        H160: codechain_primitives_1.H160,
        H256: codechain_primitives_1.H256,
        H512: codechain_primitives_1.H512,
        U256: codechain_primitives_1.U256,
        U64: codechain_primitives_1.U64,
        // Block
        Block: Block_1.Block,
        // Transaction
        Transaction: Transaction_1.Transaction,
        SignedTransaction: SignedTransaction_1.SignedTransaction,
        // Transaction
        Pay: Pay_1.Pay,
        SetRegularKey: SetRegularKey_1.SetRegularKey,
        CreateShard: CreateShard_1.CreateShard,
        SetShardOwners: SetShardOwners_1.SetShardOwners,
        SetShardUsers: SetShardUsers_1.SetShardUsers,
        WrapCCC: WrapCCC_1.WrapCCC,
        Store: Store_1.Store,
        Remove: Remove_1.Remove,
        Custom: Custom_1.Custom,
        AssetTransferInput: AssetTransferInput_1.AssetTransferInput,
        AssetTransferOutput: AssetTransferOutput_1.AssetTransferOutput,
        AssetOutPoint: AssetOutPoint_1.AssetOutPoint,
        // Asset and AssetScheme
        Asset: Asset_1.Asset,
        AssetScheme: AssetScheme_1.AssetScheme,
        // Script
        Script: Script_1.Script,
        // Addresses
        PlatformAddress: codechain_primitives_1.PlatformAddress,
        AssetAddress: codechain_primitives_1.AssetAddress
    };
    return Core;
}());
exports.Core = Core;
function checkNetworkId(networkId) {
    if (typeof networkId !== "string" || networkId.length !== 2) {
        throw Error("Expected networkId param to be a string of length 2 but found " + networkId);
    }
}
function checkPlatformAddressRecipient(recipient) {
    if (!codechain_primitives_1.PlatformAddress.check(recipient)) {
        throw Error("Expected recipient param to be a PlatformAddress but found " + recipient);
    }
}
function checkAssetAddressRecipient(recipient) {
    if (!codechain_primitives_1.AssetAddress.check(recipient)) {
        throw Error("Expected recipient param to be a AssetAddress but found " + recipient);
    }
}
function checkAmount(amount) {
    if (!codechain_primitives_1.U64.check(amount)) {
        throw Error("Expected amount param to be a U64 value but found " + amount);
    }
}
function checkExpiration(expiration) {
    if (!codechain_primitives_1.U64.check(expiration)) {
        throw Error("Expected expiration param to be a U64 value but found " + expiration);
    }
}
function checkKey(key) {
    if (!codechain_primitives_1.H512.check(key)) {
        throw Error("Expected key param to be an H512 value but found " + key);
    }
}
function checkShardId(shardId) {
    if (typeof shardId !== "number" ||
        !Number.isInteger(shardId) ||
        shardId < 0 ||
        shardId > 0xffff) {
        throw Error("Expected shardId param to be a number but found " + shardId);
    }
}
function checkMetadata(metadata) {
    if (typeof metadata !== "string" &&
        typeof metadata !== "object" &&
        metadata != null) {
        throw Error("Expected metadata param to be either a string or an object but found " + metadata);
    }
}
function checkApprover(approver) {
    if (approver != null && !codechain_primitives_1.PlatformAddress.check(approver)) {
        throw Error("Expected approver param to be either null or a PlatformAddress value but found " + approver);
    }
}
function checkregistrar(registrar) {
    if (registrar != null && !codechain_primitives_1.PlatformAddress.check(registrar)) {
        throw Error("Expected registrar param to be either null or a PlatformAddress value but found " + registrar);
    }
}
function checkCertifier(certifier) {
    if (!codechain_primitives_1.PlatformAddress.check(certifier)) {
        throw Error("Expected certifier param to be a PlatformAddress but found " + certifier);
    }
}
function checkPayer(payer) {
    if (!codechain_primitives_1.PlatformAddress.check(payer)) {
        throw Error("Expected payer param to be a PlatformAddress but found " + payer);
    }
}
function checkOwners(owners) {
    if (!Array.isArray(owners)) {
        throw Error("Expected owners param to be an array but found " + owners);
    }
    owners.forEach(function (owner, index) {
        if (!codechain_primitives_1.PlatformAddress.check(owner)) {
            throw Error("Expected an owner address to be a PlatformAddress value but found " + owner + " at index " + index);
        }
    });
}
function checkUsers(users) {
    if (!Array.isArray(users)) {
        throw Error("Expected users param to be an array but found " + users);
    }
    users.forEach(function (user, index) {
        if (!codechain_primitives_1.PlatformAddress.check(user)) {
            throw Error("Expected a user address to be a PlatformAddress value but found " + user + " at index " + index);
        }
    });
}
function checkTransferBurns(burns) {
    if (!Array.isArray(burns)) {
        throw Error("Expected burns param to be an array but found " + burns);
    }
    burns.forEach(function (burn, index) {
        if (!(burn instanceof AssetTransferInput_1.AssetTransferInput)) {
            throw Error("Expected an item of burns to be an AssetTransferInput but found " + burn + " at index " + index);
        }
    });
}
function checkTransferInputs(inputs) {
    if (!Array.isArray(inputs)) {
        throw Error("Expected inputs param to be an array but found " + inputs);
    }
    inputs.forEach(function (input, index) {
        if (!(input instanceof AssetTransferInput_1.AssetTransferInput)) {
            throw Error("Expected an item of inputs to be an AssetTransferInput but found " + input + " at index " + index);
        }
    });
}
function checkTransferOutputs(outputs) {
    if (!Array.isArray(outputs)) {
        throw Error("Expected outputs param to be an array but found " + outputs);
    }
    outputs.forEach(function (output, index) {
        if (!(output instanceof AssetTransferOutput_1.AssetTransferOutput)) {
            throw Error("Expected an item of outputs to be an AssetTransferOutput but found " + output + " at index " + index);
        }
    });
}
function checkTracker(value) {
    if (!codechain_primitives_1.H256.check(value)) {
        throw Error("Expected tracker param to be an H256 value but found " + value);
    }
}
function checkIndex(index) {
    if (typeof index !== "number") {
        throw Error("Expected index param to be a number but found " + index);
    }
}
function checkAssetType(value) {
    if (!codechain_primitives_1.H160.check(value)) {
        throw Error("Expected assetType param to be an H160 value but found " + value);
    }
}
function checkAssetOutPoint(value) {
    if (value != null && typeof value !== "object") {
        throw Error("Expected assetOutPoint param to be either an AssetOutPoint or an object but found " + value);
    }
    var tracker = value.tracker, index = value.index, assetType = value.assetType, shardId = value.shardId, quantity = value.quantity, lockScriptHash = value.lockScriptHash, parameters = value.parameters;
    checkTracker(tracker);
    checkIndex(index);
    checkAssetType(assetType);
    checkShardId(shardId);
    checkAmount(quantity);
    if (lockScriptHash) {
        checkLockScriptHash(lockScriptHash);
    }
    if (parameters) {
        checkParameters(parameters);
    }
}
function checkOrder(order) {
    if (order != null && !(order instanceof Order_1.Order)) {
        throw Error("Expected order param to be either null or an Order value but found " + order);
    }
}
function checkIndices(indices) {
    if (!Array.isArray(indices)) {
        throw Error("Expected indices param to be an array but found " + indices);
    }
    indices.forEach(function (value, idx) {
        if (typeof value !== "number") {
            throw Error("Expected an indices to be an array of numbers but found " + value + " at index " + idx);
        }
    });
}
function checkLockScriptHash(value) {
    if (!codechain_primitives_1.H160.check(value)) {
        throw Error("Expected lockScriptHash param to be an H160 value but found " + value);
    }
}
function checkTransactionHash(value) {
    if (!codechain_primitives_1.H256.check(value)) {
        throw Error("Expected hash param to be an H256 value but found " + value);
    }
}
function checkSecret(value) {
    if (!codechain_primitives_1.H256.check(value)) {
        throw Error("Expected secret param to be an H256 value but found " + value);
    }
}
function checkParameters(parameters) {
    if (!Array.isArray(parameters)) {
        throw Error("Expected parameters param to be an array but found " + parameters);
    }
    parameters.forEach(function (p, index) {
        if (!(p instanceof Buffer)) {
            throw Error("Expected an item of parameters to be a Buffer instance but found " + p + " at index " + index);
        }
    });
}
function checkTimelock(timelock) {
    if (timelock == null) {
        return;
    }
    var type = timelock.type, value = timelock.value;
    if (type === "block" ||
        type === "blockAge" ||
        type === "time" ||
        type === "timeAge") {
        return;
    }
    if (typeof value === "number") {
        return;
    }
    throw Error("Expected timelock param to be either null or an object containing both type and value but found " + timelock);
}
function checkLockScript(lockScript) {
    if (!(lockScript instanceof Buffer)) {
        throw Error("Expedted lockScript param to be an instance of Buffer but found " + lockScript);
    }
}
function checkUnlockScript(unlockScript) {
    if (!(unlockScript instanceof Buffer)) {
        throw Error("Expected unlockScript param to be an instance of Buffer but found " + unlockScript);
    }
}
function checkSignature(signature) {
    // ECDSA Signature
    if (typeof signature !== "string" ||
        !/^(0x)?[0-9a-fA-F]{130}$/.test(signature)) {
        throw Error("Expected signature param to be a 65 byte hexstring but found " + signature);
    }
}
function checkHandlerId(handlerId) {
    if (typeof handlerId !== "number" ||
        !Number.isInteger(handlerId) ||
        handlerId < 0) {
        throw Error("Expected handlerId param to be a non-negative number value but found " + handlerId);
    }
}
function checkBytes(bytes) {
    if (!(bytes instanceof Buffer)) {
        throw Error("Expected bytes param to be an instance of Buffer but found " + bytes);
    }
}
