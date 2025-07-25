import type { Config, LDLogLevel } from '@blueshift-ui/core/dist/types';

import { ThemeProvider, bossaAuroraThemeConfig, novaAuroraThemeConfig, solarMaximaThemeConfig } from "../packages/theme/src";

import Alert from '@blueshift-ui/feedback/dist/components/alert';
import Box from '@blueshift-ui/core/dist/components/box';
import ConfigProvider from '@blueshift-ui/core/dist/providers/config-provider';
import FetchProvider from '@blueshift-ui/fetch/dist/components/fetch-provider';
import I18nProvider from '@blueshift-ui/i18n/dist/components/provider';
import React, { useMemo } from "react";
import Stack from '@blueshift-ui/core/dist/components/stack';
import TrackInteractionProvider from '@blueshift-ui/telemetry/dist/components/track-interaction-provider';

const THEMES = {
  bossaAurora: bossaAuroraThemeConfig,
  novaAurora: novaAuroraThemeConfig,
  solarMaxima: solarMaximaThemeConfig
};

const APP_CONFIG: Config = {
  allowFeatureFlagOverride: 'true',
  apiHost: process.env.VITE_BASE_API_URL,
  bypassUserCache: true,
  host: process.env.PUBLIC_URL,
  launchDarklyApiBaseUrl: process.env.VITE_LAUNCH_DARKLY_API_BASE_URL,
  launchDarklyAppKey: process.env.VITE_LAUNCH_DARKLY_APP_KEY ?? '',
  launchDarklyAuth: process.env.VITE_LAUNCH_DARKLY_AUTH,
  launchDarklyLogLevel: process.env.VITE_LAUNCH_DARKLY_LOG_LEVEL as LDLogLevel | undefined,
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'novaAurora',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        {
          value: 'bossaAurora',
          title: 'Bossa Aurora',
          description: 'Customer-facing experiences'
        },
        {
          value: 'novaAurora',
          title: 'Nova Aurora',
          description: 'Customer-facing experiences'
        },
        {
          value: 'solarMaxima',
          title: 'Solar Maxima',
          description: 'Sales-facing experiences'
        },
      ],
    },
  },
};

const preview = {
  decorators: [
    function withMuiTheme(Story, context) {
      // The theme global we just declared
      const { theme: themeKey } = context.globals;

      // only recompute the theme if the themeKey changes
      const theme = useMemo(() => THEMES[themeKey] || THEMES["novaAurora"], [themeKey]);

      return (
        <ThemeProvider themeConfig={theme}>
          <Story />
        </ThemeProvider>
      );
    },
    function deprecationDecorator(Story, context) {
      return (
        <Stack spacing={2}>
          {/* TODO: Remove this check when we reach v3 */}
          {context.args?.color === 'info' ? <Alert severity="warning">The color <b>info</b> is deprecated and will be removed in a future version of Blueshift UI</Alert> : null}
          <Box display="flex" justifyContent="center">
            <Story />
          </Box>
        </Stack>
      );
    },
    function experimentalDecorator(Story, context) {
      return (
        <Stack spacing={2}>
        {context.parameters?.experimental ? <Alert severity="warning">This is an <b>experimental</b> component. Exert extra caution when using it as it may change or not be present in future versions</Alert> : null}
        <Box display="flex" justifyContent="center">
          <Story />
        </Box>
      </Stack>
      );
    },
    function withProviders(Story) {
      return (
        <ConfigProvider config={APP_CONFIG}>
          <FetchProvider>
            <TrackInteractionProvider applicationId='blueshift-ui' preview>
              <I18nProvider namespace="blueshift-ui">
                <Story />
              </I18nProvider>
            </TrackInteractionProvider>
          </FetchProvider>
        </ConfigProvider>
      );
    },
  ],

  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true, // Adds the description and default columns
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
  },

  tags: ['autodocs']
}

export default preview;
