import { expect, test as baseTest } from 'vitest';
import { IngredientInfo, inventory } from './inventory';
import { GourmetSalad } from './gourmet-salad';

const test = baseTest.extend({
  gourmetCaesarSalad: new GourmetSalad()
    .add('Sallad', inventory['Sallad'], 0.5)
    .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
    .add('Bacon', inventory['Bacon'], 2)
    .add('Krutonger', inventory['Krutonger'])
    .add('Parmesan', inventory['Parmesan'])
    .add('Ceasardressing', inventory['Ceasardressing'])
    .add('Gurka', inventory['Gurka']),
});

test('price of gourmet caesar salad', ({ gourmetCaesarSalad }) => {
  expect(gourmetCaesarSalad.price()).toBe(65);
});

test('price of gourmet caesar salad, bacon added twice', ({
  gourmetCaesarSalad,
}) => {
  const extraBacon = gourmetCaesarSalad.add(
    'Bacon',
    inventory['Bacon'] as IngredientInfo,
    2
  );
  expect(extraBacon.price()).toBe(85);
});
