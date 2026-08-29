import type { Meta, StoryObj } from '@storybook/react';
import { SideNav } from './SideNav';
import { Icon } from '../content/Icon';
import {
  Calendar, Bot, ShoppingCart, Receipt, Undo2, Building2, Package, Gauge,
  UtensilsCrossed, ChevronRight, Settings,
} from 'lucide-react';

const meta = {
  title: 'Navigation/Side Nav',
  component: SideNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The persistent left rail: where the operator is, and everything one click away. Groups are labelled only when the rail holds more than about seven items. Counts are right-aligned and quiet — they inform, they do not nag.',
      },
    },
  },
  args: {
    showIcons: true,
    header: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-brand-600">
            <Icon icon={UtensilsCrossed} size="md" className="text-white" />
          </span>
          <span className="text-[22px] font-extrabold tracking-[-0.01em]">Mise</span>
        </div>
        {/* The workspace switcher — a bordered card, not a bare row, so it
            reads as a control (something you click to change) rather than
            more static header text. Matches SideNav's dark-rail switcher
            card 1:1, just in light tokens. */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-[12px] border border-line px-[10px] py-[10px] text-left transition-colors duration-fast ease-mise hover:bg-canvas"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-surface-sunken text-[12px] font-bold text-ink-700"
          >
            HP
          </span>
          <span className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <span className="truncate text-[13.5px] font-bold text-ink-900">Harbor Produce Co.</span>
            <span className="font-data text-[11px] text-ink-500">Downtown kitchen</span>
          </span>
          <Icon icon={ChevronRight} size="sm" className="shrink-0 text-ink-400" />
        </button>
      </div>
    ),
    // Collapsed keeps only the mark — the wordmark and switcher have
    // nowhere to go at 64px, so showing half of them is worse than showing
    // neither.
    collapsedHeader: (
      <span aria-hidden="true" className="mx-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-600">
        <Icon icon={UtensilsCrossed} size="sm" className="text-white" />
      </span>
    ),
    groups: [
      {
        items: [
          { label: 'Today', href: '#', current: true, icon: <Icon icon={Calendar} size="sm" /> },
          { label: 'Agent', href: '#', count: 2, highlightCount: true, icon: <Icon icon={Bot} size="sm" /> },
        ],
      },
      {
        label: 'Purchasing',
        items: [
          { label: 'Orders', href: '#', count: 4, icon: <Icon icon={ShoppingCart} size="sm" /> },
          { label: 'Invoices', href: '#', count: 34, icon: <Icon icon={Receipt} size="sm" /> },
          { label: 'Credits', href: '#', count: 2, icon: <Icon icon={Undo2} size="sm" /> },
        ],
      },
      {
        label: 'Catalogue',
        items: [
          { label: 'Vendors', href: '#', icon: <Icon icon={Building2} size="sm" /> },
          { label: 'Items', href: '#', icon: <Icon icon={Package} size="sm" /> },
          { label: 'Par levels', href: '#', disabled: true, icon: <Icon icon={Gauge} size="sm" /> },
        ],
      },
    ],
    footer: (
      <div className="flex flex-col gap-3">
        <div className="border-t border-line pt-3">
          <a
            href="#"
            className="flex items-center gap-[9px] rounded-[8px] px-2 py-[7px] text-[13px] text-ink-700 no-underline transition-colors duration-fast ease-mise hover:bg-canvas"
          >
            <Icon icon={Settings} size="sm" />
            Settings
          </a>
        </div>
        <div className="flex items-center gap-[9px] px-2">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-pill bg-brand-600" />
          <span className="flex flex-col">
            <span className="text-[12.5px] font-semibold text-ink-900">All changes saved</span>
            <span className="font-data text-[11px] text-ink-500">Synced 2 min ago</span>
          </span>
        </div>
      </div>
    ),
    // Settings survives as an icon; the two-line status widget doesn't fit
    // 64px at all, so it's dropped rather than squeezed — same reasoning
    // collapsedHeader already uses for the wordmark and switcher card.
    collapsedFooter: (
      <div className="flex flex-col gap-3">
        <div className="border-t border-line pt-3">
          <a
            href="#"
            title="Settings"
            className="flex items-center justify-center rounded-[8px] px-2 py-[7px] text-ink-700 no-underline transition-colors duration-fast ease-mise hover:bg-canvas"
          >
            <Icon icon={Settings} size="sm" />
            <span className="sr-only">Settings</span>
          </a>
        </div>
        <span aria-hidden="true" className="mx-auto h-2 w-2 shrink-0 rounded-pill bg-brand-600" />
      </div>
    ),
  },
  // Taller than a plain-header rail — the switcher card and footer status
  // widget need more room, matching a real sidebar's full-viewport height
  // better than a cramped demo box. Same height as DarkRail's own override.
  render: (args) => <div className="h-[780px]"><SideNav {...args} /></div>,
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const CurrentWithCount: Story = {
  args: {
    groups: [{ label: 'Purchasing', items: [{ label: 'Orders', href: '#', current: true, count: 4, icon: <Icon icon={ShoppingCart} size="sm" /> }] }],
  },
  parameters: { docs: { description: { story: 'The count next to a selected item reads at the same weight as its label — it does not fall back to the quiet, unselected grey.' } } },
};
export const Flat: Story = {
  args: { groups: [{ items: [{ label: 'Today', href: '#', current: true }, { label: 'Orders', href: '#' }, { label: 'Invoices', href: '#' }] }] },
};

export const DarkRail: Story = {
  args: {
    tone: 'dark',
    showIcons: true,
    header: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-rail-mark">
            <Icon icon={UtensilsCrossed} size="md" className="text-rail-mark-ink" />
          </span>
          <span className="text-[22px] font-extrabold tracking-[-0.01em] text-rail-text">Mise</span>
        </div>
        {/* The workspace switcher — a bordered card, not a bare row, so it
            reads as a control (something you click to change) rather than
            more static header text. */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-[12px] border border-rail-border px-[10px] py-[10px] text-left transition-colors duration-fast ease-mise hover:bg-rail-bg-hover"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-rail-avatar-bg text-[12px] font-bold text-rail-text"
          >
            HP
          </span>
          <span className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <span className="truncate text-[13.5px] font-bold text-rail-text">Harbor Produce Co.</span>
            <span className="font-data text-[11px] text-rail-text-muted">Downtown kitchen</span>
          </span>
          <Icon icon={ChevronRight} size="sm" className="shrink-0 text-rail-text-muted" />
        </button>
      </div>
    ),
    collapsedHeader: (
      <span aria-hidden="true" className="mx-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-rail-mark">
        <Icon icon={UtensilsCrossed} size="sm" className="text-rail-mark-ink" />
      </span>
    ),
    groups: [
      {
        items: [
          { label: 'Today', href: '#', current: true, icon: <Icon icon={Calendar} size="sm" /> },
          { label: 'Agent', href: '#', count: 2, highlightCount: true, icon: <Icon icon={Bot} size="sm" /> },
        ],
      },
      {
        label: 'Purchasing',
        items: [
          { label: 'Orders', href: '#', count: 4, icon: <Icon icon={ShoppingCart} size="sm" /> },
          { label: 'Invoices', href: '#', count: 34, icon: <Icon icon={Receipt} size="sm" /> },
          { label: 'Credits', href: '#', count: 2, icon: <Icon icon={Undo2} size="sm" /> },
        ],
      },
      {
        label: 'Catalogue',
        items: [
          { label: 'Vendors', href: '#', icon: <Icon icon={Building2} size="sm" /> },
          { label: 'Items', href: '#', icon: <Icon icon={Package} size="sm" /> },
          { label: 'Par levels', href: '#', disabled: true, icon: <Icon icon={Gauge} size="sm" /> },
        ],
      },
    ],
    footer: (
      <div className="flex flex-col gap-3">
        <div className="border-t border-rail-border pt-3">
          <a
            href="#"
            className="flex items-center gap-[9px] rounded-[8px] px-2 py-[7px] text-[13px] text-rail-text no-underline transition-colors duration-fast ease-mise hover:bg-rail-bg-hover"
          >
            <Icon icon={Settings} size="sm" />
            Settings
          </a>
        </div>
        <div className="flex items-center gap-[9px] px-2">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-pill bg-brand-400" />
          <span className="flex flex-col">
            <span className="text-[12.5px] font-semibold text-rail-text">All changes saved</span>
            <span className="font-data text-[11px] text-rail-text-muted">Synced 2 min ago</span>
          </span>
        </div>
      </div>
    ),
    collapsedFooter: (
      <div className="flex flex-col gap-3">
        <div className="border-t border-rail-border pt-3">
          <a
            href="#"
            title="Settings"
            className="flex items-center justify-center rounded-[8px] px-2 py-[7px] text-rail-text no-underline transition-colors duration-fast ease-mise hover:bg-rail-bg-hover"
          >
            <Icon icon={Settings} size="sm" />
            <span className="sr-only">Settings</span>
          </a>
        </div>
        <span aria-hidden="true" className="mx-auto h-2 w-2 shrink-0 rounded-pill bg-brand-400" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The persistent-chrome variant — a dark rail that stays put while the rest of the product is light, closing a gap flagged since the library's first pass. rail-bg reuses ink/900; the workspace switcher's avatar reuses brand-800; the footer dot reuses brand-400. The amber mark and its badge twin are the two genuinely new colours, deliberately separate from warn/alert (both semantic) since a logo glyph and an emphasis pill aren't statuses. The light rail now matches this same composition — switcher card, icons, highlighted badge, footer status — just in light tokens, so the two tones read as one system rather than two different products.",
      },
    },
  },
};
