import NodeRSA from "node-rsa";
export default function () {
    const key = new NodeRSA({ b: 512 });

    const pubKey = key.exportKey('public');
    const privKey = key.exportKey('private');

    return [pubKey, privKey];
}
