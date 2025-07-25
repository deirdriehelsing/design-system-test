import mocked_useTranslation from '../use-translation';
import { renderHook } from '@testing-library/react';
import useRichTranslation from '.';

jest.mock('../use-translation');

describe('useRichTranslation()', () => {
  it('calls `useTranslation` correctly', () => {
    renderHook(() => useRichTranslation('mock_group_name'));
    expect(mocked_useTranslation).toHaveBeenCalledWith('mock_group_name', ['rich']);
  });

  it(`returns the result of calling 'useTranslation'`, () => {
    const { result } = renderHook(() => useRichTranslation('mock_group_name'));
    expect(result.current).toEqual((mocked_useTranslation as jest.Mock).mock.results[0].value);
  });

  describe('includes passed flags', () => {
    it('calls `useTranslation` correctly', () => {
      renderHook(() => useRichTranslation('mock_group_name', ['blueshift']));
      expect(mocked_useTranslation).toHaveBeenCalledWith('mock_group_name', ['blueshift', 'rich']);
    });

    it(`returns the result of calling 'useTranslation'`, () => {
      const { result } = renderHook(() => useRichTranslation('mock_group_name', ['blueshift']));
      expect(result.current).toEqual((mocked_useTranslation as jest.Mock).mock.results[0].value);
    });
  });
});
