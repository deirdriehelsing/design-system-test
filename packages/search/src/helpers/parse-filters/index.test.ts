import parseFilters from '.';

describe('parseFilters()', () => {
  it('should return an empty array if no filters are passed', () => {
    expect(parseFilters({})).toEqual([]);
  });

  it('should return an array of filters', () => {
    expect(parseFilters({ foo: 'bar', baz: 'qux' })).toEqual([
      {
        term: {
          foo: 'bar',
        },
      },
      {
        term: {
          baz: 'qux',
        },
      },
    ]);
  });

  it('should return an array of filters with an exists filter', () => {
    expect(parseFilters({ foo: 'bar', baz: 'qux', exists: 'quux' })).toEqual([
      {
        term: {
          foo: 'bar',
        },
      },
      {
        term: {
          baz: 'qux',
        },
      },
      {
        exists: {
          field: 'quux',
        },
      },
    ]);
  });
});
