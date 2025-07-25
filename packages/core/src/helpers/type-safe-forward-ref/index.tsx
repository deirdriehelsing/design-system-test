import { forwardRef } from 'react';

/**
 * A helper function that redefines the forwardRef function type to support
 * component with type parameters.
 *
 * Implementation from: https://www.totaltypescript.com/forwardref-with-generic-components
 *
 * @param render - The render function that receives props and a ref.
 * @returns A type-safe forwardRef component.
 */
function TypeSafeForwardRef<T, P extends object = object>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return forwardRef(render) as any;
}

export default TypeSafeForwardRef;
