import { useEffect, useState } from 'react';
import { Button } from '../components/action/Button';
import { Badge } from '../components/feedback/Badge';
import { Card } from '../components/content/Card';
import { SuggestionChips } from '../components/chat-agent/SuggestionChips';
import { Composer } from '../components/chat-agent/Composer';
import { PlatoAvatar, type PlatoState } from '../components/chat-agent/PlatoAvatar';
import { FileText, History, Package, PieChart, Wrench } from '../icons/basil';

export interface PlatoTask {
  id: string;
  label: string;
  hint: string;
  icon: 'risk' | 'brief' | 'data' | 'history' | 'scenario';
}

export interface PlatoDrawerProps {
  pageLabel?: string;
  prompt?: string;
  tasks?: PlatoTask[];
  /** Show welcome once per session; later visits open to thumbnail. */
  showWelcome?: boolean;
  state?: 'default' | 'empty' | 'error' | 'disabled' | 'success';
  disabled?: boolean;
  motionEnabled?: boolean;
  chatState?: PlatoState;
  onToggleMotion?: (enabled: boolean) => void;
  onSelectTask?: (id: string) => void;
}

const defaultTasks: PlatoTask[] = [
  {
    id: 'priorities',
    label: 'Prioritize this week',
    hint: 'Margin gaps and open plans',
    icon: 'risk',
  },
  {
    id: 'readiness',
    label: 'Check workspace readiness',
    hint: 'What needs updating',
    icon: 'data',
  },
  {
    id: 'brief',
    label: 'Prepare weekly brief',
    hint: 'Results, open plans, next steps',
    icon: 'brief',
  },
];

const TaskIcon = {
  risk: PieChart,
  brief: FileText,
  data: Package,
  history: History,
  scenario: Wrench,
};

/**
 * Plato companion drawer: welcome once per session, then thumbnail; page-context
 * chip; task chips; motion pause toggle; respects reduced motion.
 */
export function PlatoDrawer({
  pageLabel = 'Overview',
  prompt = 'Ask about your workspace…',
  tasks = defaultTasks,
  showWelcome: showWelcomeProp,
  state = 'default',
  disabled = false,
  motionEnabled: motionProp = true,
  chatState = 'ready',
  onToggleMotion,
  onSelectTask,
}: PlatoDrawerProps) {
  const [welcome, setWelcome] = useState(showWelcomeProp ?? state !== 'empty');
  const [motion, setMotion] = useState(motionProp);
  const [ask, setAsk] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [celebrate, setCelebrate] = useState(state === 'success');
  const isDisabled = disabled || state === 'disabled';
  const activeState: PlatoState =
    state === 'error' ? 'blocked' : state === 'success' ? 'success' : chatState;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (showWelcomeProp != null) setWelcome(showWelcomeProp);
  }, [showWelcomeProp]);

  useEffect(() => {
    setMotion(motionProp);
  }, [motionProp]);

  useEffect(() => {
    if (state === 'success') setCelebrate(true);
  }, [state]);

  const animate = motion && !reducedMotion;

  // Auto-dock welcome after a short delay when motion is on; skip flight when reduced.
  useEffect(() => {
    if (!welcome) return;
    if (!animate) {
      setWelcome(false);
      return;
    }
    const t = window.setTimeout(() => setWelcome(false), 2100);
    return () => window.clearTimeout(t);
  }, [welcome, animate]);

  return (
    <aside
      className="flex w-full max-w-[400px] flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-overlay"
      aria-label="Plato"
    >
      <header className="flex items-start gap-3 border-b border-line-soft px-4 py-4">
        <div className="plato-header-thumbnail" data-testid="plato-thumbnail">
          {!welcome && (
            <PlatoAvatar
              state={activeState}
              size={48}
              animate={animate}
              celebrate={celebrate && state === 'success'}
              labelled
            />
          )}
          {welcome && <span className="inline-block h-12 w-12" aria-hidden="true" />}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="m-0 text-[17px] font-bold">Plato</h2>
          <p className="mb-1 mt-0.5 text-[13px] text-ink-500">
            Your virtual partner
          </p>
          <div className="text-[13px] font-semibold text-ink-700" role="status">
            {activeState === 'blocked'
              ? 'Not connected'
              : activeState === 'success'
                ? 'Saved'
                : 'Ready'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        {!welcome && (
          <p className="m-0 text-[16px] font-semibold text-ink-900">What would you like to check?</p>
        )}

        {welcome && (
          <div
            className="flex flex-col items-center gap-3 rounded-lg bg-canvas px-4 py-6 text-center"
            data-testid="plato-welcome"
          >
            <PlatoAvatar size={112} animate={false} labelled />
            <div>
              <strong className="text-[15px]">Hi, I’m Plato.</strong>
              <p className="mb-0 mt-1 text-[13px] text-ink-700">What would you like to check?</p>
            </div>
          </div>
        )}

        {state === 'error' && (
          <Card padding="sm">
            <p className="m-0 text-[13px] text-ink-700">
              Live chat isn’t connected. Use page tasks below, or check sources.
            </p>
          </Card>
        )}

        <div className="flex items-center justify-between gap-2">
          <h3 className="m-0 text-[14px] font-bold">On this page</h3>
          <span data-testid="plato-page-context">
            <Badge size="sm">{pageLabel}</Badge>
          </span>
        </div>

        <div className="flex flex-col gap-2" data-testid="plato-context-tasks">
          {tasks.map((task) => {
            const Icon = TaskIcon[task.icon];
            return (
              <button
                key={task.id}
                type="button"
                disabled={isDisabled}
                className="flex items-start gap-3 rounded-control border border-line bg-surface px-3 py-3 text-left transition-colors duration-fast ease-mise hover:border-brand-200 hover:bg-brand-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-600 focus-visible:ring-[3px] focus-visible:ring-brand-50 disabled:cursor-not-allowed disabled:bg-canvas disabled:text-ink-400"
                onClick={() => {
                  setWelcome(false);
                  onSelectTask?.(task.id);
                }}
              >
                <Icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <strong className="block text-[13.5px] font-semibold">{task.label}</strong>
                  <small className="text-[13px] text-ink-500">{task.hint}</small>
                </span>
              </button>
            );
          })}
        </div>

        <SuggestionChips
          label="Suggested next steps"
          items={tasks.slice(0, 2).map((t) => ({
            label: t.label,
            intent: t.id,
            disabled: isDisabled,
          }))}
          onSelect={(intent) => {
            setWelcome(false);
            onSelectTask?.(intent);
          }}
        />

        {state === 'success' && celebrate && (
          <div className="flex items-center gap-2 rounded-control border border-line bg-tone-success-bg px-3 py-2" role="status">
            <PlatoAvatar state="success" size={32} animate={animate} celebrate />
            <span className="text-[13px] font-semibold">Saved to History.</span>
          </div>
        )}
      </div>

      <footer className="border-t border-line-soft bg-surface-raised px-4 py-3">
        <Composer
          value={ask}
          onChange={(v) => {
            setWelcome(false);
            setAsk(v);
          }}
          onSend={() => setAsk('')}
          disabled={isDisabled || state === 'error'}
          placeholder={prompt}
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[13px] text-ink-500">History lasts for this session</span>
          <Button
            size="sm"
            variant="ghost"
            disabled={isDisabled}
            aria-pressed={!motion}
            onClick={() => {
              const next = !motion;
              setMotion(next);
              onToggleMotion?.(next);
            }}
          >
            {motion ? 'Pause motion' : 'Enable motion'}
          </Button>
        </div>
        {reducedMotion && (
          <p className="mb-0 mt-2 text-[13px] text-ink-500">
            Reduced motion is on. Pause motion and reduced motion keep distinct, static poses.
          </p>
        )}
      </footer>
    </aside>
  );
}
