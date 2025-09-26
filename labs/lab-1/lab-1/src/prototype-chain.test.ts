import { expect, test as baseTest, vi } from 'vitest';
import { Salad } from './salad';
import { IngredientInfo, inventory } from './inventory';
import { GourmetSalad } from './gourmet-salad';
import {
  sharedOwnPropertyNamesOfObject,
  sharedOwnPropertyNamesOfClass,
  saladPrices,
  className,
} from './prototype-chain';

const test = baseTest.extend({
  caesarSalad: new Salad()
    .add('Sallad', inventory['Sallad'])
    .add('Kycklingfilé', inventory['Kycklingfilé'])
    .add('Bacon', inventory['Bacon'])
    .add('Krutonger', inventory['Krutonger'])
    .add('Parmesan', inventory['Parmesan'])
    .add('Ceasardressing', inventory['Ceasardressing'])
    .add('Gurka', inventory['Gurka']),
  gourmetCaesarSalad: new GourmetSalad()
    .add('Sallad', inventory['Sallad'], 0.5)
    .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
    .add('Bacon', inventory['Bacon'], 2)
    .add('Krutonger', inventory['Krutonger'])
    .add('Parmesan', inventory['Parmesan'])
    .add('Ceasardressing', inventory['Ceasardressing'])
    .add('Gurka', inventory['Gurka']),
});

test('sharedOwnPropertyNamesOfObject(caesarSalad)', ({ caesarSalad }) => {
  expect(sharedOwnPropertyNamesOfObject(caesarSalad)).toStrictEqual([
    'constructor',
    'add',
    'remove',
    'price',
    'info',
  ]);
});
test('sharedOwnPropertyNamesOfObject(gourmetCaesarSalad)', ({
  gourmetCaesarSalad,
}) => {
  expect(sharedOwnPropertyNamesOfObject(gourmetCaesarSalad)).toStrictEqual([
    'constructor',
    'add',
    'price',
  ]);
});

test('sharedOwnPropertyNamesOfClass(caesarSalad)', ({ caesarSalad }) => {
  expect(sharedOwnPropertyNamesOfClass(Salad)).toStrictEqual([
    'constructor',
    'add',
    'remove',
    'price',
    'info',
  ]);
});
test('sharedOwnPropertyNamesOfClass(GoumetSalad)', () => {
  expect(sharedOwnPropertyNamesOfClass(GourmetSalad)).toStrictEqual([
    'constructor',
    'add',
    'price',
  ]);
});

test('className(caesarSalad)', ({ caesarSalad }) => {
  expect(className(caesarSalad)).toStrictEqual('Salad');
});
test('className(gourmetCaesarSalad)', ({ gourmetCaesarSalad }) => {
  expect(className(gourmetCaesarSalad)).toStrictEqual('GourmetSalad');
});

test('saladPrices calls the original methods and computes the right prices', ({
  gourmetCaesarSalad,
}) => {
  const saladPriceSpy = vi.spyOn(Salad.prototype, 'price');
  const gourmetSaladPriceSpy = vi.spyOn(GourmetSalad.prototype, 'price');
  expect(saladPrices(gourmetCaesarSalad)).toStrictEqual({
    saladPrice: 50,
    gourmetSaladPrice: 65,
  });
  expect(saladPriceSpy).toHaveBeenCalledOnce();
  expect(gourmetSaladPriceSpy).toHaveBeenCalledOnce();
});
