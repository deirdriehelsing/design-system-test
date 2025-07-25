import type { ComponentType, PropsWithChildren, ReactElement } from 'react';

import React, { createContext } from 'react';
import { activeStepAtom, labelsAtom, stepsCountAtom } from '../state/stepper-atoms';
import { ScopeProvider as JotaiProvider } from 'jotai-scope';

const StepperContext = createContext<boolean | null>(null);

function StepperProvider({ children }: PropsWithChildren<object>) {
  return <StepperContext.Provider value={true}>{children}</StepperContext.Provider>;
}

function withStepperProvider<T extends object>(
  Component: ComponentType<T>
): (props: PropsWithChildren<T>) => ReactElement {
  return function WithStepperProvider(props: PropsWithChildren<T>) {
    return (
      <JotaiProvider atoms={[activeStepAtom, labelsAtom, stepsCountAtom]}>
        <StepperProvider>
          <Component {...props} />
        </StepperProvider>
      </JotaiProvider>
    );
  };
}

export { StepperContext, withStepperProvider };

export default StepperProvider;
