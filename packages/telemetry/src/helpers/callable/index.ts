/**
 * Ensures that the given input is always callable as a function.
 *
 * This function accepts either a direct value or a function. If the input is a value, it returns a function
 * that returns that value, regardless of the input arguments it receives. If the input is a function,
 * it returns the function itself.
 *
 * @template T The type of the return value expected from the callable function.
 *
 * @param {T | ((...args: any[]) => T)} possibleFunction - A value or a function returning a value of type T.
 * @returns {(...args: any[]) => T} A function that returns a value of type T.
 *
 * @example
 * const value = 42;
 * const echo = callable(value);
 * console.log(echo()); // Outputs 42
 *
 * const greet = (value: number) => value;
 * const callableGreet = callable(greet);
 * console.log(callableGreet(42)); // Outputs 42
 */
function callable<T>(possibleFunction: T | ((...args: any[]) => T)): (...args: any[]) => T {
  // Check if the input is already a function
  if (typeof possibleFunction === 'function') {
    return possibleFunction as (...args: any[]) => T;
  }

  // If it is not a function, return a new function that ignores its arguments and returns the value
  return (...args: any[]) => possibleFunction;
}

export default callable;
