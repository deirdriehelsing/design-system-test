import { useEffect, useState } from 'react';

function useControlledValue<Value>(value?: Value, defaultValue?: Value) {
  const [controlledValue, setControlledValue] = useState<Value | undefined>(value ?? defaultValue);

  useEffect(() => {
    // Prevent controlled value from being updated if the value prop is not provided
    if (value !== null && value !== undefined) {
      setControlledValue(value);
    }
  }, [value]);

  return [controlledValue, setControlledValue] as const;
}

export default useControlledValue;
