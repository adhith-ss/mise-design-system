import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import '../src/styles/tailwind.css';
import '../src/styles/refresh.css';
import '../src/styles/plato.css';
import { useEffect } from 'react';
import { Documentation } from './Documentation';

const preview: Preview = {
  globalTypes: {
    theme: { description:'Color theme', toolbar:{icon:'paintbrush',items:['light','dark'],dynamicTitle:true} },
    motion: { description:'Motion preference', toolbar:{icon:'play',items:['on','off'],dynamicTitle:true} },
  },
  initialGlobals:{theme:'light',motion:'on'},
  decorators:[(Story, context)=>{
    useEffect(()=>{
      document.documentElement.classList.toggle('dark',context.globals.theme==='dark');
      document.documentElement.dataset.motion=context.globals.motion;
    },[context.globals.theme,context.globals.motion]);
    return <Story/>;
  }],
  parameters: {
    docs:{page:Documentation},
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: { disable: true },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] }, options:{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}} },
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
