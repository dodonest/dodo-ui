import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/lib/stories/**/*.mdx', '../src/lib/stories/**/*.stories.@(js|ts|svelte)'],
  staticDirs: ['../static'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-svelte-csf',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
};
export default config;
