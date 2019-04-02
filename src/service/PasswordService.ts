import * as bcrypt from "bcryptjs";
import sjcl from "sjcl";

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
