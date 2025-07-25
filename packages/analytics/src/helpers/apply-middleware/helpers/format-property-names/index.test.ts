import formatPropertyNames from './index';

describe('formatPropertyNames', () => {
  it('returns undefined when no properties are provided', () => {
    expect(formatPropertyNames(undefined)).toBeUndefined();
  });

  it('returns an empty object when an empty object is provided', () => {
    expect(formatPropertyNames({})).toEqual({});
  });

  it('converts camelCase property names to snake_case', () => {
    const input = {
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
    };

    const expected = {
      first_name: 'John',
      last_name: 'Doe',
      email_address: 'john.doe@example.com',
    };

    expect(formatPropertyNames(input)).toEqual(expected);
  });

  it('converts CONSTANT_CASE property names to snake_case', () => {
    const input = {
      FIRST_NAME: 'John',
      LAST_NAME: 'Doe',
    };

    const expected = {
      first_name: 'John',
      last_name: 'Doe',
    };

    expect(formatPropertyNames(input)).toEqual(expected);
  });

  it('converts CAPITAL property names to snake_case', () => {
    const input = {
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
    };

    const expected = {
      firstname: 'John',
      lastname: 'Doe',
    };

    expect(formatPropertyNames(input)).toEqual(expected);
  });

  it('converts Capital Case property names to snake_case', () => {
    const input = {
      'First Name': 'John',
      'Last Name': 'Doe',
    };

    const expected = {
      first_name: 'John',
      last_name: 'Doe',
    };

    expect(formatPropertyNames(input)).toEqual(expected);
  });

  it('converts hyphenated property names to snake_case', () => {
    const input = {
      'first-name': 'John',
      'last-name': 'Doe',
    };

    const expected = {
      first_name: 'John',
      last_name: 'Doe',
    };

    expect(formatPropertyNames(input)).toEqual(expected);
  });

  it('removes duplicate underscores', () => {
    const input = {
      first__name: 'John',
      last___name: 'Doe',
    };

    const expected = {
      first_name: 'John',
      last_name: 'Doe',
    };

    expect(formatPropertyNames(input)).toEqual(expected);
  });

  it('removes leading and trailing underscores', () => {
    const input = {
      _firstName: 'John',
      lastName_: 'Doe',
      _middle_name_: 'Smith',
    };

    const expected = {
      first_name: 'John',
      last_name: 'Doe',
      middle_name: 'Smith',
    };

    expect(formatPropertyNames(input)).toEqual(expected);
  });
});
