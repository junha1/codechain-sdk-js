import * as _ from "lodash";

import { signEcdsa } from "../../utils";
import { H256 } from "../classes";
import { Parcel } from "../Parcel";
import { NetworkId } from "../types";

export class Remove extends Parcel {
    private readonly _hash: H256;
    private readonly signature: string;

    public constructor(
        params:
            | {
                  hash: H256;
                  signature: string;
              }
            | {
                  hash: H256;
                  secret: H256;
              },
        networkId: NetworkId
    ) {
        super(networkId);

        if ("secret" in params) {
            const { hash, secret } = params;
            this._hash = hash;
            const { r, s, v } = signEcdsa(hash.value, secret.value);
            this.signature = `${_.padStart(r, 64, "0")}${_.padStart(
                s,
                64,
                "0"
            )}${_.padStart(v.toString(16), 2, "0")}`;
        } else {
            let signature = params.signature;
            if (signature.startsWith("0x")) {
                signature = signature.substr(2);
            }
            this._hash = params.hash;
            this.signature = signature;
        }
    }

    protected actionToEncodeObject(): any[] {
        const { _hash, signature } = this;
        return [9, _hash.toEncodeObject(), `0x${signature}`];
    }

    protected actionToJSON(): any {
        const { _hash, signature } = this;
        return {
            hash: _hash.toEncodeObject(),
            signature: `0x${signature}`
        };
    }

    protected action(): string {
        return "remove";
    }
}