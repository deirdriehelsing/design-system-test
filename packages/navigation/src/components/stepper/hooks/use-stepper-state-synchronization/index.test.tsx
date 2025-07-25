import { act, renderHook } from '@testing-library/react';
import { activeStepAtom, labelsAtom } from '../../../../state/stepper-atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import Step from '../../components/step';
import useStepperStateSynchronization from '.';

describe('useStepperStateSynchronization', () => {
  const resetActiveStep = () => {
    const { result } = renderHook(() => useSetAtom(activeStepAtom));
    act(() => {
      result.current(0);
    });
  };

  it('syncs labels with atoms', () => {
    resetActiveStep();

    renderHook(() =>
      useStepperStateSynchronization({
        children: [
          <Step key={1} label="mock-step-1" />,
          <Step key={2} label="mock-step-2" />,
          <Step key={3} label="mock-step-3" />,
        ],
      })
    );

    const { result } = renderHook(() => useAtomValue(labelsAtom));

    expect(result.current).toEqual({
      0: 'mock-step-1',
      1: 'mock-step-2',
      2: 'mock-step-3',
    });
  });

  it('syncs active step with atoms', () => {
    resetActiveStep();

    renderHook(() =>
      useStepperStateSynchronization({
        children: [
          <Step key={1} label="mock-step-1" />,
          <Step key={2} label="mock-step-2" />,
          <Step key={3} label="mock-step-3" />,
        ],
        givenActiveStep: 1,
      })
    );

    const { result } = renderHook(() => useAtomValue(activeStepAtom));

    expect(result.current).toBe(1);
  });
});
