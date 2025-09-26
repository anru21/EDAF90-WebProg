"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const salad_1 = require("./salad");
const inventory_1 = require("./inventory");
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
const test = vitest_1.test.extend({
    caesarSalad: new salad_1.Salad()
        .add('Sallad', inventory_1.inventory['Sallad'])
        .add('Kycklingfilé', inventory_1.inventory['Kycklingfilé'])
        .add('Bacon', inventory_1.inventory['Bacon'])
        .add('Krutonger', inventory_1.inventory['Krutonger'])
        .add('Parmesan', inventory_1.inventory['Parmesan'])
        .add('Ceasardressing', inventory_1.inventory['Ceasardressing'])
        .add('Gurka', inventory_1.inventory['Gurka']),
});
test('Salad.prorotype.add returns a new Salad instance', ({ caesarSalad }) => {
    const salad2 = caesarSalad.add('Lime', inventory_1.inventory['Lime']);
    (0, vitest_1.expect)(caesarSalad).not.toBe(salad2);
    (0, vitest_1.expect)(salad2).toBeInstanceOf(salad_1.Salad);
});
test('Salad.prorotype.delete removes the ingredient', ({ caesarSalad }) => {
    const salad2 = caesarSalad.remove('Gurka');
    (0, vitest_1.expect)(caesarSalad).toHaveProperty('ingredients', saladNoGurka);
});
test('Salad.prorotype.add preserves the uuid', ({ caesarSalad }) => {
    const salad2 = caesarSalad.add('Lime', inventory_1.inventory['Lime']);
    (0, vitest_1.expect)(caesarSalad.uuid).toStrictEqual(salad2.uuid);
});
test('Salad.prorotype.delete preserves the uuid', ({ caesarSalad }) => {
    const salad2 = caesarSalad.remove('Gurka');
    (0, vitest_1.expect)(caesarSalad.uuid).toStrictEqual(salad2.uuid);
});
test('price of an empty salad', ({ caesarSalad }) => {
    (0, vitest_1.expect)(new salad_1.Salad().price()).toBe(0);
});
test('price of ceasar salad', ({ caesarSalad }) => {
    (0, vitest_1.expect)(caesarSalad.price()).toBe(50);
});
test('info of an empty salad', ({ caesarSalad }) => {
    (0, vitest_1.expect)(new salad_1.Salad().info()).toStrictEqual({
        vegan: true,
        gluten: false,
        lactose: false,
    });
});
test('info of a salad with Krutonger', ({ caesarSalad }) => {
    const salad = new salad_1.Salad()
        .add('Sallad', inventory_1.inventory['Sallad'])
        .add('Krutonger', inventory_1.inventory['Krutonger']);
    (0, vitest_1.expect)(salad.info()).toStrictEqual({
        vegan: false,
        gluten: true,
        lactose: false,
    });
});
test('ceasar salad info', ({ caesarSalad }) => {
    (0, vitest_1.expect)(caesarSalad.info()).toStrictEqual({
        vegan: false,
        gluten: true,
        lactose: true,
    });
});
test('parse an array of caesar salads', ({ caesarSalad }) => {
    const input = [caesarSalad, caesarSalad];
    const json = JSON.stringify(input);
    (0, vitest_1.expect)(salad_1.Salad.parse(json)).toStrictEqual(input);
});
test('parse error, detect non array', ({ caesarSalad }) => {
    (0, vitest_1.expect)(() => salad_1.Salad.parse(JSON.stringify(caesarSalad))).toThrowError();
});
test('parse error, detect missing inventory', ({ caesarSalad }) => {
    const json = '[{ "missingIngredients": {}}]';
    (0, vitest_1.expect)(() => salad_1.Salad.parse(json)).toThrowError();
});
//# sourceMappingURL=salad.test.js.map