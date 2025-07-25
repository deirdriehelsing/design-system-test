import ConfigProvider from '../../providers/config-provider';
import React from 'react';
import { renderHook } from '@testing-library/react';
import useConfigValue from '.';

describe('useConfigValue()', () => {
  const config = {
    apiHost: 'https://api.example.com',
  };

  function TestProvider({ children }) {
    return <ConfigProvider config={config}>{children}</ConfigProvider>;
  }

  it('provides access to config values', () => {
    const { result } = renderHook(() => useConfigValue('apiHost'), { wrapper: TestProvider });
    expect(result.current).toBe('https://api.example.com');
  });

  it('returns default value when config value is not available', () => {
    const { result } = renderHook(() => useConfigValue('missingValue' as any), {
      wrapper: TestProvider,
    });
    expect(result.current).toBe('');
  });

  it('returns custom default value when config value is not available', () => {
    // custom default
    const { result } = renderHook(() => useConfigValue('missingValue' as any, 'oops!'), {
      wrapper: TestProvider,
    });
    expect(result.current).toBe('oops!');
  });

  it('returns default value when config provider is not present', () => {
    const { result } = renderHook(() => useConfigValue('missingValue' as any));
    expect(result.current).toBe('');
  });
});
