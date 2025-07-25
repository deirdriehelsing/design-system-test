import {
  IntegrationWrapper,
  fixtures,
  mockFeatureFlags,
  nock,
  nocks,
} from '@blueshift-ui/testing-library';
import { renderHook, waitFor } from '@testing-library/react';
import { useNavContentData } from './index';

const buildPayload = (menus: Record<string, any>[]) => ({
  results: [
    {
      data: {
        navigation: {
          menus,
        },
      },
    },
  ],
});

nock.disableNetConnect();

beforeEach(() => {
  nocks.authenticatedUser().reply(200, fixtures.authenticatedUser.membershipClient);
  nocks.launchDarklyEvents().reply(200, '');
  mockFeatureFlags();
});

afterEach(() => nock.cleanAll());

Object.defineProperty(window, 'location', {
  value: new URL('https://www.example.com'),
});

describe('useNavContentData()', () => {
  const menus = [
    {
      slug: 'account_1',
      text: 'Account',
      items: [{ text: 'Settings', href: '/settings' }],
    },
    { slug: 'logo_1', text: 'Logo', items: [] },
    { slug: 'menu_1', text: 'Menu 1', items: [{ text: 'Item A', href: '/a' }] },
    { slug: 'menu_2', text: 'Menu 2', items: [{ text: 'Item B', href: '/b' }] },
  ];

  it('returns nav data', async () => {
    nocks.navContentData().reply(200, buildPayload(menus));

    const { result } = renderHook(
      () =>
        useNavContentData({
          currentApplicationId: 'my-learning',
          preview: true,
          slug: 'mock_nav_slug',
          baseUrl: 'https://www.vtstaging.com',
        }),
      { wrapper: IntegrationWrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeTruthy();
  });

  it('manipulates the data appropriately', async () => {
    nocks.navContentData().reply(200, buildPayload(menus));

    const { result } = renderHook(
      () =>
        useNavContentData({
          currentApplicationId: 'my-learning',
          preview: true,
          slug: 'mock_nav_slug',
          baseUrl: 'https://www.vtstaging.com',
        }),
      { wrapper: IntegrationWrapper }
    );

    await waitFor(() => expect(result.current.data).toBeTruthy());
    expect(result.current.data).toEqual({
      accountNavItems: [menus[0]],
      logoNavItem: menus[1],
      primaryNavItems: [menus[2], menus[3]],
      unreadMessageNavItem: {
        href: '/my-learning/tutors/message',
        slug: 'message',
      },
    });
  });

  describe('when feature access is loading', () => {
    beforeEach(() => {
      nocks.launchDarkly().delay(5000).replyWithError('timeout');
      nocks.authenticatedUser().delay(5000).replyWithError('timeout');
    });

    it('does not perform access checks', async () => {
      const menuWithAccessChecks = {
        slug: 'menu_3',
        text: 'Menu 3',
        items: [
          {
            text: 'Item C',
            href: '/c',
            enablement: 'enablement-mock',
            feature_flag: 'feature-mock',
          },
        ],
      };

      const menusWithAccessChecks = [...menus, menuWithAccessChecks];
      nocks.navContentData().reply(200, buildPayload(menusWithAccessChecks));

      const { result } = renderHook(
        () =>
          useNavContentData({
            currentApplicationId: 'my-learning',
            preview: true,
            slug: 'mock_nav_slug',
            baseUrl: 'https://www.vtstaging.com',
          }),
        { wrapper: IntegrationWrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual({
        accountNavItems: [menus[0]],
        logoNavItem: menus[1],
        primaryNavItems: [menus[2], menus[3], { ...menuWithAccessChecks, items: [] }], // Does not include Item C
        unreadMessageNavItem: {
          href: '/my-learning/tutors/message',
          slug: 'message',
        },
      });
    });
  });

  describe('when feature access is loaded', () => {
    beforeEach(() => {
      mockFeatureFlags({});
      nocks.authenticatedUser().reply(200, {
        ...fixtures.authenticatedUser.membershipClient,
        students: [
          {
            ...fixtures.authenticatedUser.membershipClient.students[0],
            enablements: [],
          },
        ],
      });
    });

    it('performs access checks', async () => {
      const menuWithAccessChecks = {
        slug: 'menu_3',
        text: 'Menu 3',
        items: [
          {
            text: 'Item C',
            href: '/c',
            // Trigger access checks
            enablement: 'enablement-mock',
            feature_flag: 'feature-mock',
          },
          // Alt href
          {
            text: 'Item D',
            href: '/d',
            // Trigger access checks
            enablement: 'enablement-mock',
            feature_flag: 'feature-mock',
            alt_href: '/d-alt',
          },
          // Alt application ID
          {
            text: 'Item E',
            href: '/e',
            // Trigger access checks
            enablement: 'enablement-mock',
            feature_flag: 'feature-mock',
            alt_href: '/e-alt',
            // Use alt_href_application_id over application_id
            alt_href_application_id: 'my-learning',
            application_id: 'my-learning',
          },
        ],
      };

      const menusWithAccessChecks = [...menus, menuWithAccessChecks];
      nocks.navContentData().reply(200, buildPayload(menusWithAccessChecks));

      const { result } = renderHook(
        () =>
          useNavContentData({
            currentApplicationId: 'my-learning',
            preview: true,
            slug: 'mock_nav_slug',
            baseUrl: 'https://www.vtstaging.com',
          }),
        { wrapper: IntegrationWrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual({
        accountNavItems: [menus[0]],
        logoNavItem: menus[1],
        primaryNavItems: [
          menus[2],
          menus[3],
          {
            ...menuWithAccessChecks,
            // Does not include "Item C"
            items: [
              // Includes "Item D" with alt href
              {
                text: 'Item D',
                href: '/d-alt',
                // Trigger access checks
                enablement: 'enablement-mock',
                feature_flag: 'feature-mock',
                alt_href: '/d-alt',
              },
              // Includes "Item E" with alt href and alt application ID
              {
                text: 'Item E',
                href: '/e-alt',
                // Trigger access checks
                enablement: 'enablement-mock',
                feature_flag: 'feature-mock',
                alt_href: '/e-alt',
                // Use alt_href_application_id over application_id
                application_id: 'my-learning',
                alt_href_application_id: 'my-learning',
              },
            ],
          },
        ], // Does not include Item C
        unreadMessageNavItem: {
          href: '/my-learning/tutors/message',
          slug: 'message',
        },
      });
    });
  });

  describe('unreadMessageNavItem.href behavior', () => {
    it('prefixes href with baseUrl when currentApplicationId is different from my-learning', async () => {
      nocks.navContentData().reply(200, buildPayload(menus));

      const { result } = renderHook(
        () =>
          useNavContentData({
            currentApplicationId: 'client-account',
            preview: true,
            slug: 'mock_nav_slug',
            baseUrl: 'https://www.vtstaging.com',
          }),
        { wrapper: IntegrationWrapper }
      );

      await waitFor(() => expect(result.current.data).toBeTruthy());
      expect(result.current.data?.unreadMessageNavItem).toEqual({
        href: 'https://www.vtstaging.com/my-learning/tutors/message',
        slug: 'message',
      });
    });

    it('keeps href relative when currentApplicationId is my-learning', async () => {
      nocks.navContentData().reply(200, buildPayload(menus));

      const { result } = renderHook(
        () =>
          useNavContentData({
            currentApplicationId: 'my-learning',
            preview: true,
            slug: 'mock_nav_slug',
            baseUrl: 'https://www.vtstaging.com',
          }),
        { wrapper: IntegrationWrapper }
      );

      await waitFor(() => expect(result.current.data).toBeTruthy());
      expect(result.current.data?.unreadMessageNavItem).toEqual({
        href: '/my-learning/tutors/message',
        slug: 'message',
      });
    });
  });
});
