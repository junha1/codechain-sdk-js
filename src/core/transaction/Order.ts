import { AssetTransferAddress } from "codechain-primitives";

import { P2PKH } from "../../key/P2PKH";
import { P2PKHBurn } from "../../key/P2PKHBurn";

import { blake256 } from "../../utils";
import { H160 } from "../H160";
import { H256 } from "../H256";
import { U64 } from "../U64";

import { AssetOutPoint, AssetOutPointJSON } from "./AssetOutPoint";

const RLP = require("rlp");

export interface OrderJSON {
    assetTypeFrom: string;
    assetTypeTo: string;
    assetTypeFee: string;
    assetAmountFrom: string;
    assetAmountTo: string;
    assetAmountFee: string;
    originOutputs: AssetOutPointJSON[];
    expiration: string;
    lockScriptHashFrom: string;
    parametersFrom: number[][];
    lockScriptHashFee: string;
    parametersFee: number[][];
}

export interface OrderDataBasic {
    assetTypeFrom: H256;
    assetTypeTo: H256;
    assetTypeFee?: H256;
    assetAmountFrom: U64;
    assetAmountTo: U64;
    assetAmountFee?: U64;
    originOutputs: AssetOutPoint[];
    expiration: U64;
}

export interface OrderAddressData {
    assetTypeFrom: H256;
    assetTypeTo: H256;
    assetTypeFee?: H256;
    assetAmountFrom: U64;
    assetAmountTo: U64;
    assetAmountFee?: U64;
    originOutputs: AssetOutPoint[];
    expiration: U64;
    recipientFrom: AssetTransferAddress;
    recipientFee: AssetTransferAddress;
}

export class Order {
    /**
     * Create an Order from an OrderJSON object.
     * @param data An OrderJSON object.
     * @returns An Order.
     */
    public static fromJSON(data: OrderJSON) {
        const {
            assetTypeFrom,
            assetTypeTo,
            assetTypeFee,
            assetAmountFrom,
            assetAmountTo,
            assetAmountFee,
            originOutputs,
            expiration,
            lockScriptHashFrom,
            parametersFrom,
            lockScriptHashFee,
            parametersFee
        } = data;
        return new this({
            assetTypeFrom: new H256(assetTypeFrom),
            assetTypeTo: new H256(assetTypeTo),
            assetTypeFee: new H256(assetTypeFee),
            assetAmountFrom: U64.ensure(assetAmountFrom),
            assetAmountTo: U64.ensure(assetAmountTo),
            assetAmountFee: U64.ensure(assetAmountFee),
            originOutputs: originOutputs.map((point: AssetOutPointJSON) =>
                AssetOutPoint.fromJSON(point)
            ),
            expiration: U64.ensure(expiration),
            lockScriptHashFrom: new H160(lockScriptHashFrom),
            parametersFrom: parametersFrom.map((p: Buffer | number[]) =>
                Buffer.from(p)
            ),
            lockScriptHashFee: new H160(lockScriptHashFee),
            parametersFee: parametersFee.map((p: Buffer | number[]) =>
                Buffer.from(p)
            )
        });
    }

    public readonly assetTypeFrom: H256;
    public readonly assetTypeTo: H256;
    public readonly assetTypeFee: H256;
    public readonly assetAmountFrom: U64;
    public readonly assetAmountTo: U64;
    public readonly assetAmountFee: U64;
    public readonly originOutputs: AssetOutPoint[];
    public readonly expiration: U64;
    public readonly lockScriptHashFrom: H160;
    public readonly parametersFrom: Buffer[];
    public readonly lockScriptHashFee: H160;
    public readonly parametersFee: Buffer[];

    /**
     * @param data.assetTypeFrom The asset type of the asset to give.
     * @param data.assetTypeTo The asset type of the asset to get.
     * @param data.assetTypeFee The asset type of the asset for fee.
     * @param data.assetAmountFrom The amount of the asset to give.
     * @param data.assetAmountTo The amount of the asset to get.
     * @param data.assetAmountFee The amount of the asset for fee.
     * @param data.originOutputs The previous outputs to be consumed by the order.
     * @param data.expiration The expiration time of the order, by seconds.
     * @param data.lockScriptHash The lock script hash of the asset.
     * @param data.parameters The parameters of the asset.
     */
    constructor(
        data: OrderDataBasic &
            (
                | {
                      lockScriptHashFrom: H160;
                      parametersFrom: Buffer[];
                  }
                | {
                      recipientFrom: AssetTransferAddress;
                  }) &
            (
                | {
                      lockScriptHashFee: H160;
                      parametersFee: Buffer[];
                  }
                | {
                      recipientFee: AssetTransferAddress;
                  })
    ) {
        if ("recipientFrom" in data) {
            const { lockScriptHash, parameters } = decomposeRecipient(
                data.recipientFrom
            );
            this.lockScriptHashFrom = lockScriptHash;
            this.parametersFrom = parameters;
        } else {
            const { lockScriptHashFrom, parametersFrom } = data;
            this.lockScriptHashFrom = lockScriptHashFrom;
            this.parametersFrom = parametersFrom;
        }
        if ("recipientFee" in data) {
            const { lockScriptHash, parameters } = decomposeRecipient(
                data.recipientFee
            );
            this.lockScriptHashFee = lockScriptHash;
            this.parametersFee = parameters;
        } else {
            const { lockScriptHashFee, parametersFee } = data;
            this.lockScriptHashFee = lockScriptHashFee;
            this.parametersFee = parametersFee;
        }
        const {
            assetTypeFrom,
            assetTypeTo,
            assetTypeFee = new H256(
                "0000000000000000000000000000000000000000000000000000000000000000"
            ),
            assetAmountFrom,
            assetAmountTo,
            assetAmountFee = U64.ensure(0),
            originOutputs,
            expiration
        } = data;
        // Called too many times, so moving to variables
        const assetAmountFromIsZero = assetAmountFrom.value.isZero();
        const assetAmountToIsZero = assetAmountTo.value.isZero();
        const assetAmountFeeIsZero = assetAmountFee.value.isZero();

        if (assetTypeFrom.isEqualTo(assetTypeTo)) {
            throw Error(
                `assetTypeFrom and assetTypeTo is same: ${assetTypeFrom}`
            );
        } else if (
            !assetAmountFeeIsZero &&
            (assetTypeFrom.isEqualTo(assetTypeFee) ||
                assetTypeTo.isEqualTo(assetTypeFee))
        ) {
            throw Error(
                `assetTypeFrom and assetTypeTo is same: ${assetTypeFrom}`
            );
        }

        if (
            (assetAmountFromIsZero && !assetAmountToIsZero) ||
            (!assetAmountFromIsZero && assetAmountToIsZero) ||
            (assetAmountFromIsZero && assetAmountFeeIsZero) ||
            (!assetAmountFromIsZero &&
                !assetAmountFee.value.mod(assetAmountFrom.value).isZero())
        ) {
            throw Error(
                `The given amount ratio is invalid: ${assetAmountFrom}:${assetAmountTo}:${assetAmountFee}`
            );
        }
        if (originOutputs.length === 0) {
            throw Error(`originOutputs is empty`);
        }
        this.assetTypeFrom = assetTypeFrom;
        this.assetTypeTo = assetTypeTo;
        this.assetTypeFee = assetTypeFee;
        this.assetAmountFrom = assetAmountFrom;
        this.assetAmountTo = assetAmountTo;
        this.assetAmountFee = assetAmountFee;
        this.originOutputs = originOutputs;
        this.expiration = expiration;
    }

    /**
     * Convert to an object for RLP encoding.
     */
    public toEncodeObject() {
        const {
            assetTypeFrom,
            assetTypeTo,
            assetTypeFee,
            assetAmountFrom,
            assetAmountTo,
            assetAmountFee,
            originOutputs,
            expiration,
            lockScriptHashFrom,
            parametersFrom,
            lockScriptHashFee,
            parametersFee
        } = this;
        return [
            assetTypeFrom.toEncodeObject(),
            assetTypeTo.toEncodeObject(),
            assetTypeFee.toEncodeObject(),
            assetAmountFrom.toEncodeObject(),
            assetAmountTo.toEncodeObject(),
            assetAmountFee.toEncodeObject(),
            originOutputs.map(output => output.toEncodeObject()),
            expiration.toEncodeObject(),
            lockScriptHashFrom.toEncodeObject(),
            parametersFrom.map(p => Buffer.from(p)),
            lockScriptHashFee.toEncodeObject(),
            parametersFee.map(p => Buffer.from(p))
        ];
    }

    /**
     * Convert to RLP bytes.
     */
    public rlpBytes(): Buffer {
        return RLP.encode(this.toEncodeObject());
    }

    /**
     * Convert to an OrderJSON object.
     * @returns An OrderJSON object.
     */
    public toJSON(): OrderJSON {
        const {
            assetTypeFrom,
            assetTypeTo,
            assetTypeFee,
            assetAmountFrom,
            assetAmountTo,
            assetAmountFee,
            originOutputs,
            expiration,
            lockScriptHashFrom,
            parametersFrom,
            lockScriptHashFee,
            parametersFee
        } = this;
        return {
            assetTypeFrom: assetTypeFrom.toJSON(),
            assetTypeTo: assetTypeTo.toJSON(),
            assetTypeFee: assetTypeFee.toJSON(),
            assetAmountFrom: assetAmountFrom.toJSON(),
            assetAmountTo: assetAmountTo.toJSON(),
            assetAmountFee: assetAmountFee.toJSON(),
            originOutputs: originOutputs.map(output => output.toJSON()),
            expiration: expiration.toString(),
            lockScriptHashFrom: lockScriptHashFrom.toJSON(),
            parametersFrom: parametersFrom.map(parameter => [...parameter]),
            lockScriptHashFee: lockScriptHashFee.toJSON(),
            parametersFee: parametersFee.map(parameter => [...parameter])
        };
    }

    /**
     * Get the hash of an order.
     * @returns An order hash.
     */
    public hash(): H256 {
        return new H256(blake256(this.rlpBytes()));
    }

    /**
     * Return the consumed order
     * @param params.amount the consumed amount of the asset to give
     */
    public consume(amount: U64 | number | string): Order {
        const {
            assetTypeFrom,
            assetTypeTo,
            assetTypeFee,
            assetAmountFrom,
            assetAmountTo,
            assetAmountFee,
            originOutputs,
            expiration,
            lockScriptHashFrom,
            parametersFrom,
            lockScriptHashFee,
            parametersFee
        } = this;
        const amountFrom = U64.ensure(amount);
        if (amountFrom.gt(assetAmountFrom)) {
            throw Error(
                `The given amount is too big: ${amountFrom} > ${assetAmountFrom}`
            );
        }
        const remainAmountFrom = this.assetAmountFrom.value.minus(
            amountFrom.value
        );
        if (
            !remainAmountFrom
                .times(assetAmountTo.value)
                .mod(assetAmountFrom.value)
                .isZero()
        ) {
            throw Error(
                `The given amount does not fit to the ratio: ${assetAmountFrom}:${assetAmountTo}`
            );
        }
        const remainAmountTo = remainAmountFrom
            .times(assetAmountTo.value)
            .idiv(assetAmountFrom.value);
        const remainAmountFee = remainAmountFrom
            .times(assetAmountFee.value)
            .idiv(assetAmountFrom.value);
        return new Order({
            assetTypeFrom,
            assetTypeTo,
            assetTypeFee,
            assetAmountFrom: U64.ensure(remainAmountFrom),
            assetAmountTo: U64.ensure(remainAmountTo),
            assetAmountFee: U64.ensure(remainAmountFee),
            originOutputs,
            expiration,
            lockScriptHashFrom,
            parametersFrom,
            lockScriptHashFee,
            parametersFee
        });
    }
}

function decomposeRecipient(
    recipient: AssetTransferAddress
): {
    lockScriptHash: H160;
    parameters: Buffer[];
} {
    // FIXME: Clean up by abstracting the standard scripts
    const { type, payload } = recipient;
    if ("pubkeys" in payload) {
        throw Error("Multisig payload is not supported yet");
    }
    switch (type) {
        case 0x00: // LOCK_SCRIPT_HASH ONLY
            return {
                lockScriptHash: payload,
                parameters: []
            };
        case 0x01: // P2PKH
            return {
                lockScriptHash: P2PKH.getLockScriptHash(),
                parameters: [Buffer.from(payload.value, "hex")]
            };
        case 0x02: // P2PKHBurn
            return {
                lockScriptHash: P2PKHBurn.getLockScriptHash(),
                parameters: [Buffer.from(payload.value, "hex")]
            };
        default:
            throw Error(
                `Unexpected type of AssetTransferAddress: ${type}, ${recipient}`
            );
    }
}