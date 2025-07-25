import { createStore } from 'jotai';
import fetchTranslationsJSON from '../fetch-translations-json';
import logHandledError from '@blueshift-ui/telemetry/dist/helpers/log-handled-error';
import requestTranslationFile from '.';

const mockedLogHandledError = logHandledError as jest.Mock;
const mockedFetchTranslationsJson = fetchTranslationsJSON as jest.Mock;

jest.mock('@blueshift-ui/telemetry/dist/helpers/log-handled-error');
jest.mock('../fetch-translations-json');

describe('requestTranslationFile()', () => {
  beforeEach(() => {
    mockedLogHandledError.mockClear();
  });

  it('returns early when no namespace is provided', async () => {
    const callback = jest.fn();
    await requestTranslationFile({
      callback,
      staticTranslationsURL: '',
      store: createStore(),
      translationPath: 'en/null',
    });

    expect(callback).toHaveBeenCalledWith(null, { status: 400, data: '' });
    expect(mockedFetchTranslationsJson).not.toHaveBeenCalled();
  });

  it('returns translations for the provided locale and namespace', async () => {
    const callback = jest.fn();

    mockedFetchTranslationsJson.mockResolvedValue({
      response: { ok: true, status: 200 },
      json: { en: { common: { key: 'value' } } },
    });

    await requestTranslationFile({
      callback,
      staticTranslationsURL: 'http://example.com/translations.json',
      store: createStore(),
      translationPath: 'en/common',
    });

    expect(mockedFetchTranslationsJson).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(null, {
      status: 200,
      data: JSON.stringify({ key: 'value' }),
    });
  });

  it('handles error when fetch fails', async () => {
    const callback = jest.fn();
    const errorMessage =
      'Failed to fetch translation file: [status: 500, statusText: Internal Server Error]';
    const error = new Error(errorMessage);
    mockedFetchTranslationsJson.mockResolvedValue({
      response: { ok: false, status: 500, statusText: 'Internal Server Error' },
      json: null,
    });

    await requestTranslationFile({
      callback,
      staticTranslationsURL: 'http://example.com/translations.json',
      store: createStore(),
      translationPath: 'en/common',
    });

    expect(mockedFetchTranslationsJson).toHaveBeenCalled();
    expect(mockedLogHandledError).toHaveBeenCalledWith(errorMessage);
    expect(callback).toHaveBeenCalledWith(error, { status: 500, data: '' });
  });

  it('handles error when no translation is found', async () => {
    const callback = jest.fn();
    const errorMessage = 'Translation not found for locale: es, namespace: unknown';
    const error = new Error(errorMessage);

    mockedFetchTranslationsJson.mockResolvedValue({
      response: { ok: true, status: 200 },
      json: { en: { common: { key: 'value' } } },
    });

    await requestTranslationFile({
      callback,
      staticTranslationsURL: 'http://example.com/translations.json',
      store: createStore(),
      translationPath: 'es/unknown',
    });

    expect(mockedLogHandledError).toHaveBeenCalledWith(errorMessage);
    expect(mockedFetchTranslationsJson).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(error, {
      status: 200,
      data: '',
    });
  });
});
