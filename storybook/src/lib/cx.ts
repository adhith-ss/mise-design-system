/** Minimal class joiner. Swap for clsx/cn if the host repo already has one. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
