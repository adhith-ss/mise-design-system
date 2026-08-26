import { DropdownMenu, type MenuItem, type MenuPlacement } from './DropdownMenu';
import { IconButton } from './IconButton';

export interface MoreMenuProps {
  items: MenuItem[];
  /** Names what the actions apply to, e.g. "PO-4471". */
  subject: string;
  placement?: MenuPlacement;
  defaultOpen?: boolean;
  size?: 'sm' | 'md';
}

/**
 * A Dropdown Menu behind an icon trigger, for secondary actions on a row or
 * card. Never the only place an action exists.
 */
export function MoreMenu({
  items, subject, placement = 'bottom-end', defaultOpen = false, size = 'sm',
}: MoreMenuProps) {
  return (
    <DropdownMenu
      items={items}
      placement={placement}
      defaultOpen={defaultOpen}
      trigger={
        <IconButton
          size={size}
          aria-label={`More actions for ${subject}`}
          tooltip="More actions"
          icon={<span aria-hidden="true" className="text-[15px] leading-none">···</span>}
        />
      }
    />
  );
}
