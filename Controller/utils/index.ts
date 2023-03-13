const isValidEmail = (input: string) => {
  return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
    input
  );
};

const isValidPassword = (input: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input);
};

const isValidName = (input: string) => {
  return /^[a-z ,.'-]+$/i.test(input);
};

const isValidUsername = (input: string) => {
  return /^(?=[a-zA-Z0-9_]{4,18}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(input);
};

const utils = {
  isValidEmail,
  isValidUsername,
  isValidPassword,
  isValidName,
};

export default utils;
