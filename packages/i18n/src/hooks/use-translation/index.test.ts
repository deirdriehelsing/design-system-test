import logHandledError from '@blueshift-ui/telemetry/dist/helpers/log-handled-error';
import { renderHook } from '@testing-library/react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import useTranslation from '.';
import useTranslationNamespace from '../use-translation-namespace';

const mockedLogHandledError = logHandledError as jest.Mock;
const mockedUseTranslationNamespace = useTranslationNamespace as jest.Mock;
const mockedUseI18nextTranslation = useI18nextTranslation as jest.Mock;

jest.mock('@blueshift-ui/telemetry/dist/helpers/log-handled-error');
jest.mock('../use-translation-namespace');
jest.mock('react-i18next');

describe('useTranslation()', () => {
  beforeEach(() => {
    mockedUseI18nextTranslation.mockReturnValue({
      i18n: { isInitialized: true } as any,
      ready: true,
      t: (key: string) => `mock_translation_string_for:${key}`,
    });
    mockedLogHandledError.mockClear();
    mockedUseTranslationNamespace.mockReturnValue('mock_namespace');
  });

  it('returns the correct result', () => {
    const { result } = renderHook(() => useTranslation('mock_group_name'));
    expect(result.current).toEqual({
      i18n: expect.any(Object),
      loading: false,
      translate: expect.any(Function),
    });
  });

  describe('.translate()', () => {
    describe('when translation namespace is not available', () => {
      beforeEach(() => {
        mockedUseTranslationNamespace.mockReturnValue(false);
      });

      it('returns an empty string as fallback', () => {
        const { result } = renderHook(() => useTranslation('mock_group_name'));
        expect(result.current.translate('mock_translation_key')).toBe('');
      });
    });

    describe('when translation namespace is available', () => {
      beforeEach(() => {
        mockedUseTranslationNamespace.mockReturnValue('mock_namespace');
      });

      it('returns the translation', () => {
        const { result } = renderHook(() => useTranslation('mock_group_name'));
        expect(result.current.translate('mock_translation_key')).toBe(
          'mock_translation_string_for:mock_translation_key'
        );
      });
    });

    describe('when translation namespace does not exist', () => {
      beforeEach(() => {
        mockedUseTranslationNamespace.mockReturnValue('mock_namespace');
        mockedUseI18nextTranslation.mockReturnValue({
          i18n: { isInitialized: true } as any,
          ready: true,
          t: () => '',
        });
      });

      it('logs an error', () => {
        const { result } = renderHook(() => useTranslation('mock_group_name'));
        result.current.translate('mock_translation_key');
        expect(mockedLogHandledError).toHaveBeenCalled();
      });
    });
  });
});
