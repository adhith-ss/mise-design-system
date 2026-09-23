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
    const archived = context.tags?.includes('archived') || context.tags?.includes('mvp-pilot');
    return (
      <>
        {archived ? (
          <p
            role="note"
            style={{
              margin: '0 0 16px',
              padding: '10px 12px',
              fontSize: 13,
              lineHeight: 1.4,
              border: '1px solid var(--mise-control-border, #c5cdc8)',
              borderRadius: 6,
              background: 'var(--mise-surface, #fff)',
              color: 'var(--mise-ink-700, #43524b)',
              maxWidth: 560,
              textAlign: 'left',
            }}
          >
            Archived · MVP Pilot (0.1.0). Reference only. Use 0.2.0 components.
          </p>
        ) : null}
        <Story/>
      </>
    );
  }],
  parameters: {
    docs:{page:Documentation},
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    backgrounds: { disable: true },
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] }, options:{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}} },
    // Foundations first, then categories A–Z, with Chat & Agent last because
    // it composes the rest. MVP Pilot archive is always last. Storybook
    // serialises this config, so the array has to be a literal here —
    // referencing a const throws at load.
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Overview', 'Colour', 'Type', 'Spacing & radius', 'Elevation', 'Motion'],
          'Patterns',
          'Action', 'Content', 'Data Input', 'Feedback & Status',
          'Navigation', 'Overlay', 'Table & List', 'Chat & Agent',
          'Future Scope',
          'MVP Pilot',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
