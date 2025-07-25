import { createStore } from 'jotai';
import fetchTranslationsJSON from '.';

const mockedFetch = jest.fn();

describe('fetchTranslationsJson()', () => {
  beforeAll(() => {
    global.fetch = mockedFetch;
  });

  beforeEach(() => {
    mockedFetch.mockClear();
  });

  it('fetches translations', async () => {
    const mockedStore = createStore();
    const response = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({ en: { common: { key: 'value' } } }),
    };
    mockedFetch.mockResolvedValue(response);

    await fetchTranslationsJSON({
      staticTranslationsURL: 'http://example.com/translations.json',
      store: mockedStore,
    });

    expect(mockedFetch).toHaveBeenCalled();
  });

  it('retrieves translations from memory without firing extra requests', async () => {
    const mockedStore = createStore();
    mockedFetch.mockResolvedValue({
      response: { ok: true, status: 200 },
      json: { en: { common: { key: 'value' } } },
    });

    const result1 = await fetchTranslationsJSON({
      staticTranslationsURL: 'http://example.com/translations.json',
      store: mockedStore,
    });

    expect(mockedFetch).toHaveBeenCalled();

    const result2 = await fetchTranslationsJSON({
      staticTranslationsURL: 'http://example.com/translations.json',
      store: mockedStore,
    });
    expect(result1).toBe(result2);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });
});
