import { PlatformAddress } from "codechain-primitives";
export interface TextJSON {
    content: string;
    certifier: string;
}
/**
 * Object used when getting a text by chain_getText.
 */
export declare class Text {
    static fromJSON(data: TextJSON): Text;
    readonly content: string;
    readonly certifier: PlatformAddress;
    constructor(data: {
        content: string;
        certifier: PlatformAddress;
    });
    toJSON(): TextJSON;
}
