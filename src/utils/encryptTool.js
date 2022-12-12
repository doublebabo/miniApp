import {JSEncrypt} from "jsencrypt";

export const encryptTool = (data, pubKey) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubKey);
  return encrypt.encrypt(data) || '';
};