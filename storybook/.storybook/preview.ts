import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import '../src/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#F7F6F2' },
        { name: 'surface', value: '#FFFFFF' },
        { name: 'sunken', value: '#F1EFE9' },
        { name: 'ink', value: '#16211C' },
      ],
    },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
    // Foundations first, then categories A–Z, with Chat & Agent last because
    // it composes the rest. Storybook serialises this config, so the array has
    // to be a literal here — referencing a const throws at load.
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Overview', 'Colour', 'Type', 'Spacing & radius', 'Elevation', 'Motion'],
          'Action', 'Content', 'Data Input', 'Feedback & Status',
          'Navigation', 'Overlay', 'Table & List', 'Chat & Agent',
          'Future Scope',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
