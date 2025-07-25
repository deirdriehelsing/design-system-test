import removeBasePath from '.';

describe('removeBasePath()', () => {
  it('removes base paths', () => {
    expect(removeBasePath('/base/some/nested/path', '/base')).toBe('/some/nested/path');
  });

  it('removes nested base paths', () => {
    expect(removeBasePath('/nested/base/with/more/paths', '/nested/base')).toBe('/with/more/paths');
  });

  it('removes single base paths', () => {
    expect(removeBasePath('/base', '/base')).toBe('/');
  });

  it('keeps query parameters', () => {
    expect(removeBasePath('/base/path?q=123', '/base')).toBe('/path?q=123');
  });

  it('keeps hash marks', () => {
    expect(removeBasePath('/base/path#mark', '/base')).toBe('/path#mark');
  });

  it('keeps both query parameters and hash marks', () => {
    expect(removeBasePath('/base/path?q=123#mark', '/base')).toBe('/path?q=123#mark');
  });
});
