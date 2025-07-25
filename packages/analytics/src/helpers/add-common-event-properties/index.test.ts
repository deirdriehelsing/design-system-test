import addCommonEventProperties from '.';

describe('addCommonEventProperties', () => {
  it('returns object with page_section when eventScope is provided', () => {
    const eventScope = {
      metadata: {
        scope_metadata: 'context-metadata-value',
      },
      pageSection: 'test-section',
    };
    const trackedProperties = [
      {
        metadata: {
          tracked_metadata: 'tracked-metadata-value',
        },
        some_prop: 'some-value',
      },
    ];

    const result = addCommonEventProperties({ eventScope, trackedProperties });

    expect(result).toEqual({
      metadata: {
        scope_metadata: 'context-metadata-value',
        tracked_metadata: 'tracked-metadata-value',
      },
      page_path: '/',
      page_section: 'test-section',
      some_prop: 'some-value',
    });
  });

  it('returns object without page_section when eventScope is null', () => {
    const trackedProperties = [{ some_prop: 'some-value' }];

    const result = addCommonEventProperties({ eventScope: null, trackedProperties });

    expect(result).toEqual({
      page_path: '/',
      page_section: undefined,
      some_prop: 'some-value',
    });
  });
});
