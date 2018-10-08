import {
    recoverSchnorr,
    verifySchnorr,
    getPublicFromPrivate,
    getAccountIdFromPublic
} from "../../utils";
import { LocalKeyStore } from "../LocalKeyStore";

test("createKey", async () => {
    const store = await LocalKeyStore.createForTest();
    await expect(store.asset.createKey()).resolves.toEqual(expect.anything());
});

test("removeKey", async () => {
    const store = await LocalKeyStore.createForTest();
    const key1 = await store.asset.createKey();
    expect(await store.asset.removeKey({ key: key1 })).toBe(true);
    expect(await store.asset.removeKey({ key: key1 })).toBe(false);
});

test("getKeyList", async () => {
    const store = await LocalKeyStore.createForTest();
    const key1 = await store.asset.createKey();
    const key2 = await store.asset.createKey();
    expect(await store.asset.getKeyList()).toContain(key1);
    expect(await store.asset.getKeyList()).toContain(key2);

    await store.asset.removeKey({ key: key1 });

    expect(await store.asset.getKeyList()).not.toContain(key1);
});

test("exportRawKey", async () => {
    const store = await LocalKeyStore.createForTest();
    const key = await store.platform.createKey({ passphrase: "satoshi" });
    const privateKey = await store.platform.exportRawKey({
        key,
        passphrase: "satoshi"
    });

    const publicKey = getPublicFromPrivate(privateKey);
    const accountId = getAccountIdFromPublic(publicKey);
    expect(accountId).toBe(key);
});

test.skip("sign", async () => {
    const store = await LocalKeyStore.createForTest();
    const key = await store.asset.createKey();
    const publicKey = await store.asset.getPublicKey({ key });
    const message =
        "00000000c0dec6a100000000c0dec6a100000000c0dec6a100000000c0dec6a1";
    const signature = await store.asset.sign({
        key,
        message
    });
    const r = `${signature.substr(0, 64)}`;
    const s = `${signature.substr(64, 64)}`;

    expect(verifySchnorr(message, { r, s }, publicKey)).toBe(true);
    expect(recoverSchnorr(message, { r, s })).toEqual(publicKey);
});
