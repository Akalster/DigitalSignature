import { default as genKeys } from "./genKeys.js";
import { default as signObject} from "./signObject.js";
import { default as verifyObject} from "./verifyObject.js";
const [publicKey,privateKey] = genKeys();

const message = "helloworld";
const changedMessage = "helooworld";

const signedObject = signObject(message,privateKey);
const decryptedObject = verifyObject(signedObject,message,publicKey);
console.log(decryptedObject.isValid)

const falseDecryptedObject = verifyObject(signedObject,changedMessage,publicKey)
console.log(falseDecryptedObject.isValid)