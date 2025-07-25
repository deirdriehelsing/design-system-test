import formatAnalyticsValue from '.';

describe('formatAnalyticsValue', () => {
  it('should return an empty string for empty input', () => {
    expect(formatAnalyticsValue('', 'action')).toBe('');
  });

  it('should lowercase the input', () => {
    expect(formatAnalyticsValue('Hello World', 'category')).toBe('hello-world');
  });

  it('should remove non-breaking spaces', () => {
    expect(formatAnalyticsValue('Test &nbsp; String', 'label')).toBe('test-string');
  });

  it('should remove HTML tags', () => {
    expect(formatAnalyticsValue('<b>Bold Text</b>', 'value')).toBe('bold-text');
  });

  it('should trim whitespace', () => {
    expect(formatAnalyticsValue('  Trimmed String  ', 'category')).toBe('trimmed-string');
  });

  it('should replace multiple spaces with a single hyphen', () => {
    expect(formatAnalyticsValue('Multiple   Spaces', 'label')).toBe('multiple-spaces');
  });

  it('should truncate to the maximum length for the value type', () => {
    expect(
      formatAnalyticsValue('This is a very long string with more than 50 characteres', 'action')
    ).toBe('this-is-a-very-long-string-with-more-than-50-chara');
  });

  it('should not truncate if the input is shorter than the maximum length', () => {
    expect(formatAnalyticsValue('Shorter String', 'value')).toBe('shorter-string'); // Not truncated (value max length is 100)
  });
});
