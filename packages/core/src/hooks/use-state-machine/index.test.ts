import { act, renderHook } from '@testing-library/react';
import useStateMachine from '.';

enum Ticket {
  Todo,
  Done,
  Cancelled,
}

describe('useStateMachine', () => {
  it('initializes with a state', () => {
    const { result } = renderHook(() => useStateMachine<Ticket>(Ticket.Todo));
    expect(result.current.state).toBe(Ticket.Todo);
  });

  it('can transition to a new state', async () => {
    const { result } = renderHook(() => useStateMachine<Ticket>(Ticket.Todo));
    expect(result.current.state).toBe(Ticket.Todo);
    await act(() => result.current.transition(Ticket.Done));
    expect(result.current.state).toBe(Ticket.Done);
  });

  it('sends events', async () => {
    const onTransitioning = jest.fn();
    const onTransitioned = jest.fn();

    const { result } = renderHook(() =>
      useStateMachine<Ticket>(Ticket.Todo, { onTransitioned, onTransitioning })
    );

    await act(() => result.current.transition(Ticket.Done));
    expect(onTransitioned).toHaveBeenCalledWith(Ticket.Done, Ticket.Todo);
    expect(onTransitioning).toHaveBeenCalledWith(Ticket.Done, Ticket.Todo);
  });

  it('can be cancelled', async () => {
    const onTransitioning = jest.fn().mockImplementationOnce(() => false);
    const { result } = renderHook(() => useStateMachine<Ticket>(Ticket.Todo, { onTransitioning }));

    await act(() => result.current.transition(Ticket.Done));
    expect(result.current.state).toBe(Ticket.Todo);
  });

  it('can be redirected before changing state', async () => {
    const onTransitioning = jest.fn().mockImplementationOnce(() => Ticket.Cancelled);
    const { result } = renderHook(() => useStateMachine<Ticket>(Ticket.Todo, { onTransitioning }));

    await act(() => result.current.transition(Ticket.Done));
    expect(result.current.state).toBe(Ticket.Cancelled);
  });

  it('can be redirected after changing state', async () => {
    const onTransitioned = jest.fn().mockImplementationOnce(() => Ticket.Cancelled);
    const { result } = renderHook(() => useStateMachine<Ticket>(Ticket.Todo, { onTransitioned }));

    await act(() => result.current.transition(Ticket.Done));
    expect(result.current.state).toBe(Ticket.Cancelled);
  });

  it('waits for callback promises to complete', async () => {
    const onTransitioning = jest.fn().mockImplementationOnce(
      () =>
        new Promise<Ticket>((resolve) => {
          setTimeout(() => resolve(Ticket.Cancelled), 100);
        })
    );

    const { result } = renderHook(() => useStateMachine<Ticket>(Ticket.Todo, { onTransitioning }));

    await act(() => result.current.transition(Ticket.Done));
    expect(result.current.state).toBe(Ticket.Cancelled);
  });
});
