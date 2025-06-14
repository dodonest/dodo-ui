import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/lib/stories/**/*.mdx', '../src/lib/stories/**/*.stories.@(js|ts|svelte)'],
  staticDirs: ['../static'],
  addons: [
    '@storybook/addon-svelte-csf',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@vueless/storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
};
export default config;
