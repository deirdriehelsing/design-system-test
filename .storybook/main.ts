import type { StorybookConfig } from '@storybook/react-vite';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { dirname, join } from 'path';
import { loadEnv, mergeConfig } from 'vite';

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-themes'),
    '@chromatic-com/storybook'
  ],
  docs: {},
  framework: getAbsolutePath("@storybook/react-vite") as any,
  staticDirs: ['./static'],
  stories: [
    '../packages/!(search)/src/**/*.docs.mdx',
    '../packages/!(search)/src/**/*.stories.@(j|t)s?(x)'
  ],
  typescript: {
    reactDocgenTypescriptOptions: {
      // // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) => prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true,
    },
  },

  async viteFinal(config, { configType }) {
    const env = loadEnv(configType ?? '', process.cwd());

    return mergeConfig(config, {
      base: './',
      build: {
        sourcemap: false,
      },
      define: Object.entries(env).reduce(
        // Vite by default exposes environment variables in import.meta, but we are using
        // process.env for wider support in our apps, so configure this for storybook
        (prev, [key, value]) => ({ ...prev, [`process.env.${key}`]: `"${value}"` }),
        { 'process.env.STORYBOOK_ENV': true }
      ),
      plugins: [
        vanillaExtractPlugin()
      ],
      resolve: {
        dedupe: ['@emotion/react']
      }
    });
  },
};

export default config;