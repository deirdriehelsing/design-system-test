import nockApi, { headers } from '../nock-api';
import nock from 'nock';

/**
 * Shortcuts for nocks of common hooks defined in blueshift.
 *
 * The pattern is for the key to reflect the `use` hook name, or the third-party API being mocked,
 * and the value to be a function that returns the nock. Any arguments to the hook should
 * be passed in as arguments to the function (which would typically update the nock URL or body).
 *
 *     nocks.authenticatedUser().reply(200, { user: { id: 1 } });
 *
 *     // or use a fixture
 *     nocks.navContentData().reply(200, fixtures.navContentData.membershipStandard });
 */
const nocks = {
  authenticatedUser: () => nockApi().get(/^\/v1\/users\/me/),

  launchDarkly: () =>
    nock('https://app.launchdarkly.com')
      .defaultReplyHeaders({
        ...headers,
        'Access-Control-Allow-Headers':
          'Accept,Content-Type,Content-Length,Accept-Encoding,X-LaunchDarkly-Event-Schema,X-LaunchDarkly-User-Agent,X-LaunchDarkly-Payload-ID,X-LaunchDarkly-Wrapper,X-LaunchDarkly-Tags',
      })
      .options(/sdk\/evalx/)
      .reply(200, '')
      .get(/sdk\/evalx/) as nock.Interceptor,

  launchDarklyEvents: () =>
    nock('https://events.launchdarkly.com')
      .defaultReplyHeaders({
        ...headers,
        'Access-Control-Allow-Headers':
          'Accept,Content-Type,Content-Length,Accept-Encoding,X-LaunchDarkly-Event-Schema,X-LaunchDarkly-User-Agent,X-LaunchDarkly-Payload-ID,X-LaunchDarkly-Wrapper,X-LaunchDarkly-Tags',
      })
      .options('/events/bulk/launch_darkly_key')
      .reply(200, '')
      .post('/events/bulk/launch_darkly_key'),

  navContentData: () => nockApi().post('/v2/cms/content', /query SiteNav/),
};

export default nocks;
