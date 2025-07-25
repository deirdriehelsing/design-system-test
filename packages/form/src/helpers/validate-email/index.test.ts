import validateEmail, { emailValidationRegex } from '.';

const invalidEmail = 'invalid-email';
const validEmail = 'email@varsitytutors.com';
const message = 'Invalid Email';

describe('validateEmail()', () => {
  describe('when not given a message', () => {
    it('should return true when the email is valid', () => {
      const result = validateEmail(validEmail);

      expect(result).toBe(true);
    });

    it('should return false when the email is invalid', () => {
      const result = validateEmail(invalidEmail);

      expect(result).toBe(false);
    });
  });

  describe('when given a message', () => {
    it('should return true when the email is valid', () => {
      const result = validateEmail(validEmail, message);

      expect(result).toBe(true);
    });

    it('should return the message when the email is invalid', () => {
      const result = validateEmail(invalidEmail, message);

      expect(result).toBe(message);
    });
  });

  describe('emailValidationRegex', () => {
    it('is defined', () => {
      expect(emailValidationRegex).toBeDefined();
    });

    it('should be a regex instance', () => {
      expect(emailValidationRegex).toBeInstanceOf(RegExp);
    });
  });
});
