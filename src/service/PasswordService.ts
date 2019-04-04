import * as bcrypt from "bcryptjs";
import * as sjcl from "sjcl";
import * as bip39 from "bip39";
import englishWords from "../assets/wordlist/english";
import chineseSimplifiedWords from "../assets/wordlist/chinese_simplified";

const wordlists = {
  english: englishWords,
  chinese_simplified: chineseSimplifiedWords
};

export const isPasswordValid = (password: string, passwordRepeat: string) => {
  if (password.length < 8) {
    return {
      success: false,
      payload: "Password needs to be at least 8 chars."
    };
  }
  if (password != passwordRepeat) {
    return {
      success: false,
      payload: "Passwords don't match, please check again."
    };
  }
  return {
    success: true,
    payload: null
  };
};

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const verifyPassword = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);

export const encrypt = (password: string, payload: {}): string => {
  const { iv, salt, ct } = JSON.parse(
    sjcl.encrypt(password, JSON.stringify(payload), { mode: "gcm" })
  );

  return JSON.stringify({ iv, salt, ct });
};

export const decrypt = (password: string, raw: string) => {
  const payload = JSON.stringify(
    Object.assign(JSON.parse(raw), { mode: "gcm" })
  );

  const clearText = sjcl.decrypt(password, payload);

  try {
    const data = JSON.parse(clearText);
    return {
      success: true,
      data
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e.message
    };
  }
};

export const sha256 = (input: string): string => {
  return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(input));
};

export const generateMnemonicWords = (
  passwordHash: string,
  wordlist: string
): string => {
  const digest = sha256(passwordHash);
  return bip39.entropyToMnemonic(digest, wordlists[wordlist]);
};

export const mnemonicToSeed = (password: string, words: string) =>
  bip39.mnemonicToSeedSync(words, "");
