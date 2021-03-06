const SDK = require("codechain-sdk");

const sdk = new SDK({
    server: process.env.CODECHAIN_RPC_HTTP || "http://localhost:8080",
    networkId: process.env.CODECHAIN_NETWORK_ID || "tc"
});

const ACCOUNT_ADDRESS =
    process.env.ACCOUNT_ADDRESS ||
    "tccq9h7vnl68frvqapzv3tujrxtxtwqdnxw6yamrrgd";
const ACCOUNT_PASSPHRASE = process.env.ACCOUNT_PASSPHRASE || "satoshi";

(async () => {
    const address = await sdk.key.createAssetAddress({
        type: "P2PKH"
    });
    const quantity = 100;

    const balanceBefore = await sdk.rpc.chain.getBalance(ACCOUNT_ADDRESS);

    // Wrap 100 CCC into the Wrapped CCC asset type.
    const wrapCCC = sdk.core.createWrapCCCTransaction({
        shardId: 0,
        recipient: address,
        quantity,
        payer: ACCOUNT_ADDRESS
    });
    const hash = await sdk.rpc.chain.sendTransaction(wrapCCC, {
        account: ACCOUNT_ADDRESS,
        passphrase: ACCOUNT_PASSPHRASE
    });
    const result = await sdk.rpc.chain.containsTransaction(hash);
    console.log(result); // true

    // Difference should be sdk.rpc.chain.transactionFee + quantity
    const balanceAfter = await sdk.rpc.chain.getBalance(ACCOUNT_ADDRESS);
    console.log(balanceBefore.toString());
    console.log(balanceAfter.toString());
    console.log(sdk.rpc.chain.transactionFee + quantity);
})().catch(console.error);
