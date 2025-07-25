import formatEventName from './index';

describe('formatEventName', () => {
  it('returns empty string when input is empty', () => {
    expect(formatEventName()).toBe('');
    expect(formatEventName('')).toBe('');
  });

  it('formats camelCase strings to Start Case', () => {
    expect(formatEventName('anotherTestCase')).toBe('Another Test Case');
    expect(formatEventName('userClickedButton')).toBe('User Clicked Button');
  });

  it('formats kebab-case strings to Start Case', () => {
    expect(formatEventName('user-clicked-button')).toBe('User Clicked Button');
    expect(formatEventName('page-load-complete')).toBe('Page Load Complete');
  });

  it('formats snake_case strings to Start Case', () => {
    expect(formatEventName('user_clicked_button')).toBe('User Clicked Button');
    expect(formatEventName('page_load_complete')).toBe('Page Load Complete');
  });

  it('formats space-separated strings to Start Case', () => {
    expect(formatEventName('some event')).toBe('Some Event');
    expect(formatEventName('user clicked button')).toBe('User Clicked Button');
    expect(formatEventName('page load complete')).toBe('Page Load Complete');
  });

  it('formats mixed format strings to Start Case', () => {
    expect(formatEventName('some_Event-with Mixed_format')).toBe('Some Event With Mixed Format');
    expect(formatEventName('API_response-handler')).toBe('API Response Handler');
    expect(formatEventName('user-Profile_view')).toBe('User Profile View');
  });

  it('formats single word strings to Start Case', () => {
    expect(formatEventName('event')).toBe('Event');
    expect(formatEventName('click')).toBe('Click');
    expect(formatEventName('SUBMIT')).toBe('SUBMIT');
  });

  it('normalizes and formats strings with extra spaces', () => {
    expect(formatEventName('  extra  spaces  ')).toBe('Extra Spaces');
    expect(formatEventName('multiple   spaces between')).toBe('Multiple Spaces Between');
  });
});
