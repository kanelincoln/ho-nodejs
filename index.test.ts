import { describe, expect, test } from '@jest/globals';
import { getEvolutionChain } from './index';

import { Variation } from './types.index';

const isError = (obj: string | Error): obj is Error => {
  return obj instanceof Error;
}

describe('getEvolutionChain()', (): void => {
  test('returns the initial evolutionary state of the Pokémon at the "top" level', async (): Promise<void> => {
    const r: string | Error = await getEvolutionChain('caterpie');
    if (!isError(r)) {
      expect(JSON.parse(r).name).toBe('caterpie');
    }
  });

  test('returns the intermediary evolutionary state of the Pokémon at the "middle" level', async (): Promise<void> => {
    const r: string | Error = await getEvolutionChain('caterpie');

    if (!isError(r)) {
      expect(JSON.parse(r).variations[0]?.name).toBe('metapod');
    }
  });

  test('returns the intermediary evolutionary state of the Pokémon at the "middle" level', async (): Promise<void> => {
    const r: string | Error = await getEvolutionChain('rattata');

    if (!isError(r)) {
      expect(JSON.parse(r).variations[0]?.name).toBe('raticate');
    }
  });

  test('returns the final evolutionary state of the Pokémon at the "bottom" level', async (): Promise<void> => {
    const r: string | Error = await getEvolutionChain('caterpie');

    if (!isError(r)) {
      expect(JSON.parse(r).variations[0]?.variations[0]?.name).toBe('butterfree');
    }
  });

  test('returns the correct number of variations', async (): Promise<void> => {
    const hasCorrectNumberOfEvolutions = async (name: string, n: number): Promise<boolean> => {
      const r: string | Error = await getEvolutionChain(name);
      let evCount: number = 0;

      const traverseVariation = (ev: Variation): void => {
        evCount += 1;
        if (ev.variations.length > 0) {

          for (const variation of ev.variations) {
            if (variation) {
              traverseVariation(variation);
            }
          }
        }
      };

      if (!isError(r)) {
        traverseVariation(JSON.parse(r));
      }

      return evCount === n;
    };

    expect(await hasCorrectNumberOfEvolutions('caterpie', 3)).toBe(true); // Caterpie has 3 evolutionary states.
    expect(await hasCorrectNumberOfEvolutions('rattata', 2)).toBe(true); // Rattata has 2 evolutionary states.
  });

  test('is case-insensitive', async (): Promise<void> => {
    const inputs: string[] = ['caterpie', 'Caterpie', 'cAtErPiE'];

    for (const input in inputs) {
      const r: string | Error = await getEvolutionChain(input);
      if (!isError(r)) expect(JSON.parse(r).name).toBe('caterpie');
    }
  });
});