import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';

const config: StorybookConfig = {
  staticDirs:['../public'],
  viteFinal: async(config)=>({...config,resolve:{...config.resolve,alias:{...config.resolve?.alias,'@mise':fileURLToPath(new URL('../src',import.meta.url))}}}),
  stories: [
    '../src/docs/**/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { defaultName: 'Docs' },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (p) => !p.parent || !/node_modules/.test(p.parent.fileName),
    },
  },
};

export default config;
