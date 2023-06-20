import CryptoJS from "crypto-js";
import jsonwebtoken from "jsonwebtoken";

export const encrypt = (content, key) => {
  return CryptoJS.AES.encrypt(content, key).toString();
};

export const decrypt = (content, key) => {
  return CryptoJS.AES.decrypt(content, key).toString(CryptoJS.enc.Utf8);
};

export const createToken = (content) => {
  return jsonwebtoken.sign(content, process.env.NEXT_PUBLIC_PRIVATE_TOKEN_KEY);
};

export const verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_PRIVATE_TOKEN_KEY);
};

export const encryptCards = (content, key, delimiter) => {
  return content.map((client) => {
    const props = client.split(delimiter);
    const encriptedCard = encrypt(props[3], key);
    props[3] = encriptedCard;
    return props.join(delimiter);
  });
};
