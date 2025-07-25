import type { Message, ValidateResult } from '../../types';

// From https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const emailValidationRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email = '', message?: Message | Message[]): ValidateResult {
  const isValid = emailValidationRegex.test(email);

  if (isValid) {
    return true;
  }

  return message ?? false;
}

export { emailValidationRegex };

export default validateEmail;
