/** Shared story parameters for Patterns. */
export const patternViewports = {
  chromatic: { viewports: [320, 1440] as number[] },
  viewport: {
    viewports: {
      narrow320: {
        name: '320',
        styles: { width: '320px', height: '900px' },
        type: 'mobile' as const,
      },
      wide1440: {
        name: '1440',
        styles: { width: '1440px', height: '900px' },
        type: 'desktop' as const,
      },
    },
  },
};

export const money = (n: number, fractionDigits = 2) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits === 0 ? 0 : fractionDigits,
  });

export const signedMoney = (n: number) =>
  `${n >= 0 ? '+' : '−'}${money(Math.abs(n))}`;
