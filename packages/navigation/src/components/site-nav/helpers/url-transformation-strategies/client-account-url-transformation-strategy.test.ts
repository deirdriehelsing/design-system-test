import clientAccountUrlTransformationStrategy from './client-account-url-transformation-strategy';

Object.defineProperty(window, 'location', {
  value: {
    origin: 'https://account.vtstaging.com',
  },
  writable: true,
});

describe('clientAccountUrlTransformationStrategy', () => {
  const currentApplicationId = 'client-account';
  const baseURL = 'https://www.vtstaging.com';
  let transformUrl: (href: string, applicationId?: string) => string;

  beforeEach(() => {
    transformUrl = clientAccountUrlTransformationStrategy({ currentApplicationId, baseURL });
  });

  it('returns empty href as-is', () => {
    expect(transformUrl('')).toBe('');
    expect(transformUrl(null as any)).toBe(null);
    expect(transformUrl(undefined as any)).toBe(undefined);
  });

  it('keeps relative paths as relative when they belong to current application', () => {
    expect(transformUrl('/settings', currentApplicationId)).toBe('/settings');
    expect(transformUrl('/client/dashboard', currentApplicationId)).toBe('/client/dashboard');
    expect(transformUrl('/path/to/resource', currentApplicationId)).toBe('/path/to/resource');
  });

  it('converts current application URLs to relative paths', () => {
    expect(
      transformUrl('https://account.vtstaging.com/client/settings', currentApplicationId)
    ).toBe('/client/settings');
    expect(transformUrl('https://account.vtstaging.com/client/program', currentApplicationId)).toBe(
      '/client/program'
    );
    expect(
      transformUrl('https://account.varsitytutors.com/client/payment', currentApplicationId)
    ).toBe('/client/payment');
    expect(
      transformUrl('https://account.varsitytutors.com/client/activity', currentApplicationId)
    ).toBe('/client/activity');
  });

  it('transforms other application URLs to use baseURL', () => {
    expect(transformUrl('/tutors', 'my-learning')).toBe('https://www.vtstaging.com/tutors');
    expect(transformUrl('/courses', 'vtwa')).toBe('https://www.vtstaging.com/courses');
  });

  it('transforms other application full URLs to use baseURL', () => {
    expect(transformUrl('https://www.varsitytutors.com/tutors', 'my-learning')).toBe(
      'https://www.vtstaging.com/tutors'
    );
    expect(transformUrl('https://www.vtstaging.com/courses', 'vtwa')).toBe(
      'https://www.vtstaging.com/courses'
    );
  });

  it('handles URLs without applicationId as other applications', () => {
    expect(transformUrl('/tutors')).toBe('https://www.vtstaging.com/tutors');
    expect(transformUrl('https://www.varsitytutors.com/courses')).toBe(
      'https://www.vtstaging.com/courses'
    );
  });

  it('preserves query parameters and fragments for current application', () => {
    expect(transformUrl('/client/settings?q=value', currentApplicationId)).toBe(
      '/client/settings?q=value'
    );
    expect(transformUrl('/client#test', currentApplicationId)).toBe('/client#test');
    expect(transformUrl('https://account.vtstaging.com/client?q=value', currentApplicationId)).toBe(
      '/client?q=value'
    );
  });

  it('preserves query parameters and fragments for other applications', () => {
    expect(transformUrl('/search?q=math', 'my-learning')).toBe(
      'https://www.vtstaging.com/search?q=math'
    );
  });

  describe('staging environment', () => {
    beforeEach(() => {
      transformUrl = clientAccountUrlTransformationStrategy({
        currentApplicationId,
        baseURL: 'https://www.vtstaging.com',
      });
    });

    it('transforms production URLs to staging for current application', () => {
      expect(
        transformUrl('https://account.varsitytutors.com/client/settings', currentApplicationId)
      ).toBe('/client/settings');
      expect(
        transformUrl('https://account.varsitytutors.com//client/program', currentApplicationId)
      ).toBe('//client/program');
    });

    it('transforms production URLs to staging for other applications', () => {
      expect(transformUrl('https://www.varsitytutors.com/tutors', 'my-learning')).toBe(
        'https://www.vtstaging.com/tutors'
      );
      expect(transformUrl('https://learn.varsitytutors.com/courses', 'vtwa')).toBe(
        'https://www.vtstaging.com/courses'
      );
    });
  });

  describe('production environment', () => {
    beforeEach(() => {
      transformUrl = clientAccountUrlTransformationStrategy({
        currentApplicationId,
        baseURL: 'https://www.varsitytutors.com',
      });
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://account.varsitytutors.com',
        },
        writable: true,
      });
    });

    it('keeps production URLs for current application as relative', () => {
      expect(
        transformUrl('https://account.varsitytutors.com/client/settings', currentApplicationId)
      ).toBe('/client/settings');
      expect(
        transformUrl('https://account.varsitytutors.com/client/program', currentApplicationId)
      ).toBe('/client/program');
    });

    it('uses production baseURL for other applications', () => {
      expect(transformUrl('/tutors', 'my-learning')).toBe('https://www.varsitytutors.com/tutors');
      expect(transformUrl('/courses', 'vtwa')).toBe('https://www.varsitytutors.com/courses');
    });
  });

  describe('localhost environment', () => {
    beforeEach(() => {
      transformUrl = clientAccountUrlTransformationStrategy({
        currentApplicationId,
        baseURL: 'https://www.vtstaging.com',
      });
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'http://account.vt.local:3000',
        },
        writable: true,
      });
    });

    it('handles localhost URLs for current application', () => {
      expect(
        transformUrl('http://account.vt.local:3000/client/settings', currentApplicationId)
      ).toBe('/client/settings');
      expect(transformUrl('/client/dashboard', currentApplicationId)).toBe('/client/dashboard');
    });

    it('uses staging baseURL for other applications in localhost', () => {
      expect(transformUrl('/tutors', 'my-learning')).toBe('https://www.vtstaging.com/tutors');
      expect(transformUrl('/courses', 'vtwa')).toBe('https://www.vtstaging.com/courses');
    });
  });
});
