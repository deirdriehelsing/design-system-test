import type { Dispatch, SetStateAction } from 'react';

import { useEffect, useState } from 'react';

function useControlledState<TValue = any>(
  value: TValue
): [TValue, Dispatch<SetStateAction<TValue>>] {
  const [controlledValue, setControlledValue] = useState<TValue>(value);

  useEffect(() => {
    setControlledValue(value);
  }, [value]);

  return [controlledValue, setControlledValue];
}

export default useControlledState;
