import { describe, expect, it } from 'vitest';


describe('centsToCsv', () => {
  it('convierte los ejemplos del contrato', () => {
    expect(centsToCsv(13370)).toBe('133,70');
    expect(centsToCsv(0)).toBe('0,00');
  });
  it('no pone separador de miles', () => {
    expect(centsToCsv(1042250)).toBe('10422,50');
  });
});

function centsToCsv(cents: number): string {
  const sign = cents < 0 ? '-' : '';
  const absoluteCents = Math.abs(cents);
  const wholeUnits = Math.floor(absoluteCents / 100);
  const fractionalCents = String(absoluteCents % 100).padStart(2, '0');

  return `${sign}${wholeUnits},${fractionalCents}`;
}
