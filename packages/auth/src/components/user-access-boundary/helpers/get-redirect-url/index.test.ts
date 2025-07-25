import getRedirectUrl from '.';

describe('getRedirectUrl()', () => {
  it('appends `return_to` param correctly', () => {
    const url = getRedirectUrl({
      path: '/test',
      params: { return_to: 'https://www.vt.com/some/test/path' },
    });

    expect(url).toBe(
      'http://localhost/test?return_to=https%3A%2F%2Fwww.vt.com%2Fsome%2Ftest%2Fpath'
    );
  });

  it('appends `debug` params correctly', () => {
    const url = getRedirectUrl({
      debug: true,
      path: '/test',
      reason: 'oh, you know, just because',
      user: {
        user_id: 'mock-user-id',
        client_id: 'mock-client-id',
        product_state: 'mock-product-state',
        role: 'mock-role',
      } as any,
    });

    expect(url).toBe(
      'http://localhost/test?debug=true&redirect_reason=oh%2C+you+know%2C+just+because&user_id=mock-user-id&client_id=mock-client-id&product_state=mock-product-state&role=mock-role'
    );
  });
});
