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
