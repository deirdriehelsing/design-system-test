import callable from './index';

describe('callable', () => {
  it('should return the function itself if a function is passed', () => {
    const function_ = () => 42;
    const result = callable(function_);
    expect(result).toBe(function_);
    expect(result()).toBe(42);
  });

  it('should return a function that returns the passed non-function value', () => {
    const nonFunction = 42;
    const result = callable(nonFunction);
    expect(result).toBeInstanceOf(Function);
    expect(result()).toBe(nonFunction);
  });

  it('should return a function that returns the passed string', () => {
    const stringInput = 'hello';
    const result = callable(stringInput);
    expect(result).toBeInstanceOf(Function);
    expect(result()).toBe(stringInput);
  });

  it('should return a function that returns the passed object', () => {
    const objectInput = { key: 'value' };
    const result = callable(objectInput);
    expect(result).toBeInstanceOf(Function);
    expect(result()).toEqual(objectInput);
  });

  it('should handle null and undefined correctly', () => {
    const nullResult = callable(null);
    expect(nullResult).toBeInstanceOf(Function);
    expect(nullResult()).toBeNull();

    const undefinedResult = callable(undefined);
    expect(undefinedResult).toBeInstanceOf(Function);
    expect(undefinedResult()).toBeUndefined();
  });
});
