import { useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface TreeNode {
  id: string;
  label: string;
  /** Right-aligned figure or count. */
  trailing?: ReactNode;
  children?: TreeNode[];
}

export interface TreeListProps {
  nodes: TreeNode[];
  /** Required. Names the hierarchy. */
  label: string;
  /** Ids expanded on first render. */
  defaultExpanded?: string[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}

/** A hierarchy two or three levels deep — categories to items, locations to vendors. */
export function TreeList({ nodes, label, defaultExpanded = [], onSelect, selectedId }: TreeListProps) {
  const [open, setOpen] = useState<string[]>(defaultExpanded);
  const toggle = (id: string) =>
    setOpen((o) => (o.includes(id) ? o.filter((i) => i !== id) : [...o, id]));

  const row = (node: TreeNode, depth: number): ReactNode => {
    const expanded = open.includes(node.id);
    const branch = Boolean(node.children?.length);
    return (
      <li key={node.id} role="treeitem" aria-expanded={branch ? expanded : undefined} aria-selected={node.id === selectedId}>
        <div
          onClick={() => (branch ? toggle(node.id) : onSelect?.(node.id))}
          style={{ paddingLeft: 14 + depth * 18 }}
          className={cx(
            'flex cursor-pointer items-center gap-2 py-[9px] pr-[14px] transition-colors duration-fast ease-mise',
            node.id === selectedId ? 'bg-brand-50' : 'hover:bg-surface-raised',
          )}
        >
          {branch ? (
            <span aria-hidden="true" className="w-3 text-[11px] text-ink-500">{expanded ? '▾' : '▸'}</span>
          ) : (
            <span aria-hidden="true" className="w-3" />
          )}
          <span className={cx('text-[13.5px]', branch ? 'font-semibold' : 'font-normal')}>{node.label}</span>
          {node.trailing && <span className="ml-auto shrink-0">{node.trailing}</span>}
        </div>
        {branch && expanded && (
          <ul role="group" className="m-0 list-none p-0">
            {node.children!.map((c) => row(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul role="tree" aria-label={label} className="m-0 list-none overflow-hidden rounded-lg border border-line bg-surface p-0">
      {nodes.map((n) => row(n, 0))}
    </ul>
  );
}
