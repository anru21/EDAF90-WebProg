import { inventory } from '@/inventory';
import { loadInventory } from '@/use-fetch-inventory';
import { expect, test } from 'vitest';

test('load inventory', async () => {
  expect(await loadInventory('http://localhost:8080')).toStrictEqual(inventory);
});
