// Required node_modules

const hash = require('object-hash');
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

// Making the keys with Node-rsa

const key = new NodeRSA({ b:512 });

const pubKey = key.exportKey('public');
const privKey = key.exportKey('private');

let publicKey = new NodeRSA(pubKey);
let privateKey = new NodeRSA(privKey);


// Encryption & Decryption with Node-rsa (First Example to see how the basics work)

// var encryptedString = privateKey.encryptPrivate(testobj1, 'base64');
// console.log(encryptedString);

// var decryptedString = publicKey.decryptPublic(encryptedString, 'json');
// console.log(decryptedString);


// Testruns through the functions

const testobj1 = {name: "Harry"};
const testobj2 = {name: "Barry"};
const testobj3 = {elephant: 14};

console.log(testobj1);
console.log(testobj2);
console.log(testobj3);

const testpacket1 = signObject(testobj1, privateKey);
const testpacket2 = signObject(testobj2, privateKey);
const testpacket3 = signObject(testobj3, privateKey);

console.log(testpacket1 + "\n");
console.log(testpacket2 + "\n");
console.log(testpacket3 + "\n");

console.log(verifyObject(testpacket1, testobj1, publicKey) + "\n");
console.log(verifyObject(testpacket2, testobj2, publicKey) + "\n");

// An example of when the object gets changed before verification

console.log(verifyObject(testpacket3, testobj2, publicKey) + "\n");

/**
 * Creates digital signature with a hash and a random UUID.
 * @param {object} object - The object or message you need a digital signature for.
 * @param {NodeRSA} privkey - The private key in node-rsa type.
 */

function signObject(object, privkey) {
    const unsigned = [hash(object), crypto.randomUUID()];

    return privkey.encryptPrivate(unsigned, 'base64');
}

/**
 * Verifies digital signature of an encrypted hashed object with a random UUID.
 * @param {object} packet - The encrypted packet which contains the hash and the random UUID.
 * @param {object} object - The object or message you need to verify the digital signature with.
 * @param {NodeRSA} pubkey - The public key in node-rsa type.
 */

function verifyObject(packet, object, pubkey) {
    const objectHash = hash(object);

    const decryptedHash = pubkey.decryptPublic(packet, 'json')[0];

    console.log("UUID = " + pubkey.decryptPublic(packet, 'json')[1] + "\n");

    console.log(objectHash + "\n" + decryptedHash);

    return objectHash === decryptedHash;
}
