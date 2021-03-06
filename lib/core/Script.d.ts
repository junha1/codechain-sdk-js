/// <reference types="node" />
export declare class Script {
    static Opcode: {
        NOP: number;
        BURN: number;
        SUCCESS: number;
        FAIL: number;
        NOT: number;
        EQ: number;
        JMP: number;
        JNZ: number;
        JZ: number;
        PUSH: number;
        POP: number;
        PUSHB: number;
        DUP: number;
        SWAP: number;
        COPY: number;
        DROP: number;
        CHKSIG: number;
        CHKMULTISIG: number;
        BLAKE256: number;
        SHA256: number;
        RIPEMD160: number;
        KECCAK256: number;
        BLAKE160: number;
        BLKNUM: number;
        CHKTIMELOCK: number;
    };
    /**
     * Creates empty script.
     * @returns Script
     */
    static empty(): Script;
    data: Buffer;
    constructor(data: Buffer);
    /**
     * Converts script to string tokens.
     * @returns Array of string. Each string is a Opcode name or hexadecimal
     *          string for a value
     * @throws When unknown opcode exists in the script
     * @throws When the parameter is expected but not exists
     */
    toTokens(): string[];
}
