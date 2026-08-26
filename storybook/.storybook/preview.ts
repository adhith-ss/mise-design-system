import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import '../src/styles/tailwind.css';

/**
 * Sort order mirrors the DLS site: Foundations, then categories A–Z,
 * with Chat & Agent last because it composes the rest.
 */
const order = [
  'Foundations',
  ['Overview', 'Colour', 'Type', 'Spacing & radius', 'Elevation', 'Motion'],
  'Action', 'Content', 'Data Input', 'Feedback & Status',
  'Navigation', 'Overlay', 'Table & List', 'Chat & Agent',
];

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
    options: { storySort: { order } },
  },
  tags: ['autodocs'],
};

export default preview;
