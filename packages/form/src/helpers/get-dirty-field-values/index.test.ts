import getDirtyFieldValues from '.';

describe('getDirtyFieldValues()', () => {
  it('returns only dirty field values', () => {
    const result = getDirtyFieldValues(
      {
        foo: true,
        bar: true,
        baz: true,
        qux: false,
        qix: false,
      },
      {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz',
        qux: 'qux',
        qix: 'qix',
      }
    );

    expect(result).toStrictEqual({
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    });
  });

  it('handles nested fields', () => {
    const result = getDirtyFieldValues(
      {
        foo: false,
        bar: {
          baz: {
            qux: true,
          },
          qix: false,
        },
      },
      {
        foo: 'foo',
        bar: {
          baz: {
            qux: 'qux',
          },
          qix: 'qix',
        },
      }
    );

    expect(result).toStrictEqual({
      bar: {
        baz: {
          qux: 'qux',
        },
      },
    });
  });
});
