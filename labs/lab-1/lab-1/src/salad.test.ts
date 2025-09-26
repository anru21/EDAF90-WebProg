import { expect, test as baseTest } from 'vitest';
import { Salad } from './salad';
import { inventory } from './inventory';
const saladNoGurka = {
  Bacon: {
    price: 10,
    type: 'extra',
  },
  Ceasardressing: {
    lactose: true,
    price: 5,
    type: 'dressing',
  },
  Gurka: {
    price: 5,
    type: 'extra',
    vegan: true,
  },
  Krutonger: {
    gluten: true,
    price: 5,
    type: 'extra',
  },
  Kycklingfilé: {
    price: 10,
    type: 'protein',
  },
  Parmesan: {
    lactose: true,
    price: 5,
    type: 'extra',
  },
  Sallad: {
    price: 10,
    type: 'foundation',
    vegan: true,
  },
};

const test = baseTest.extend({
  caesarSalad: new Salad()
    .add('Sallad', inventory['Sallad'])
    .add('Kycklingfilé', inventory['Kycklingfilé'])
    .add('Bacon', inventory['Bacon'])
    .add('Krutonger', inventory['Krutonger'])
    .add('Parmesan', inventory['Parmesan'])
    .add('Ceasardressing', inventory['Ceasardressing'])
    .add('Gurka', inventory['Gurka']),
});

test('Salad.prorotype.add returns a new Salad instance', ({ caesarSalad }) => {
  const salad2 = caesarSalad.add('Lime', inventory['Lime']);
  expect(caesarSalad).not.toBe(salad2);
  expect(salad2).toBeInstanceOf(Salad);
});

test('Salad.prorotype.delete removes the ingredient', ({ caesarSalad }) => {
  const salad2 = caesarSalad.remove('Gurka');
  expect(caesarSalad).toHaveProperty('ingredients', saladNoGurka);
});

test('Salad.prorotype.add preserves the uuid', ({ caesarSalad }) => {
  const salad2 = caesarSalad.add('Lime', inventory['Lime']);
  expect(caesarSalad.uuid).toStrictEqual(salad2.uuid);
});
test('Salad.prorotype.delete preserves the uuid', ({ caesarSalad }) => {
  const salad2 = caesarSalad.remove('Gurka');
  expect(caesarSalad.uuid).toStrictEqual(salad2.uuid);
});

test('price of an empty salad', ({ caesarSalad }) => {
  expect(new Salad().price()).toBe(0);
});
test('price of ceasar salad', ({ caesarSalad }) => {
  expect(caesarSalad.price()).toBe(50);
});

test('info of an empty salad', ({ caesarSalad }) => {
  expect(new Salad().info()).toStrictEqual({
    vegan: true,
    gluten: false,
    lactose: false,
  });
});
test('info of a salad with Krutonger', ({ caesarSalad }) => {
  const salad = new Salad()
    .add('Sallad', inventory['Sallad'])
    .add('Krutonger', inventory['Krutonger']);
  expect(salad.info()).toStrictEqual({
    vegan: false,
    gluten: true,
    lactose: false,
  });
});
test('ceasar salad info', ({ caesarSalad }) => {
  expect(caesarSalad.info()).toStrictEqual({
    vegan: false,
    gluten: true,
    lactose: true,
  });
});

test('parse an array of caesar salads', ({ caesarSalad }) => {
  const input = [caesarSalad, caesarSalad];
  const json = JSON.stringify(input);
  expect(Salad.parse(json)).toStrictEqual(input);
});
test('parse error, detect non array', ({ caesarSalad }) => {
  expect(() => Salad.parse(JSON.stringify(caesarSalad))).toThrowError();
});
test('parse error, detect missing inventory', ({ caesarSalad }) => {
  const json = '[{ "missingIngredients": {}}]';
  expect(() => Salad.parse(json)).toThrowError();
});
