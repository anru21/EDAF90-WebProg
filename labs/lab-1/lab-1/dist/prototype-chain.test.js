"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const salad_1 = require("./salad");
const inventory_1 = require("./inventory");
const gourmet_salad_1 = require("./gourmet-salad");
const prototype_chain_1 = require("./prototype-chain");
const test = vitest_1.test.extend({
    caesarSalad: new salad_1.Salad()
        .add('Sallad', inventory_1.inventory['Sallad'])
        .add('Kycklingfilé', inventory_1.inventory['Kycklingfilé'])
        .add('Bacon', inventory_1.inventory['Bacon'])
        .add('Krutonger', inventory_1.inventory['Krutonger'])
        .add('Parmesan', inventory_1.inventory['Parmesan'])
        .add('Ceasardressing', inventory_1.inventory['Ceasardressing'])
        .add('Gurka', inventory_1.inventory['Gurka']),
    gourmetCaesarSalad: new gourmet_salad_1.GourmetSalad()
        .add('Sallad', inventory_1.inventory['Sallad'], 0.5)
        .add('Kycklingfilé', inventory_1.inventory['Kycklingfilé'], 2)
        .add('Bacon', inventory_1.inventory['Bacon'], 2)
        .add('Krutonger', inventory_1.inventory['Krutonger'])
        .add('Parmesan', inventory_1.inventory['Parmesan'])
        .add('Ceasardressing', inventory_1.inventory['Ceasardressing'])
        .add('Gurka', inventory_1.inventory['Gurka']),
});
test('sharedOwnPropertyNamesOfObject(caesarSalad)', ({ caesarSalad }) => {
    (0, vitest_1.expect)((0, prototype_chain_1.sharedOwnPropertyNamesOfObject)(caesarSalad)).toStrictEqual([
        'constructor',
        'add',
        'remove',
        'price',
        'info',
    ]);
});
test('sharedOwnPropertyNamesOfObject(gourmetCaesarSalad)', ({ gourmetCaesarSalad, }) => {
    (0, vitest_1.expect)((0, prototype_chain_1.sharedOwnPropertyNamesOfObject)(gourmetCaesarSalad)).toStrictEqual([
        'constructor',
        'add',
        'price',
    ]);
});
test('sharedOwnPropertyNamesOfClass(caesarSalad)', ({ caesarSalad }) => {
    (0, vitest_1.expect)((0, prototype_chain_1.sharedOwnPropertyNamesOfClass)(salad_1.Salad)).toStrictEqual([
        'constructor',
        'add',
        'remove',
        'price',
        'info',
    ]);
});
test('sharedOwnPropertyNamesOfClass(GoumetSalad)', () => {
    (0, vitest_1.expect)((0, prototype_chain_1.sharedOwnPropertyNamesOfClass)(gourmet_salad_1.GourmetSalad)).toStrictEqual([
        'constructor',
        'add',
        'price',
    ]);
});
test('className(caesarSalad)', ({ caesarSalad }) => {
    (0, vitest_1.expect)((0, prototype_chain_1.className)(caesarSalad)).toStrictEqual('Salad');
});
test('className(gourmetCaesarSalad)', ({ gourmetCaesarSalad }) => {
    (0, vitest_1.expect)((0, prototype_chain_1.className)(gourmetCaesarSalad)).toStrictEqual('GourmetSalad');
});
test('saladPrices calls the original methods and computes the right prices', ({ gourmetCaesarSalad, }) => {
    const saladPriceSpy = vitest_1.vi.spyOn(salad_1.Salad.prototype, 'price');
    const gourmetSaladPriceSpy = vitest_1.vi.spyOn(gourmet_salad_1.GourmetSalad.prototype, 'price');
    (0, vitest_1.expect)((0, prototype_chain_1.saladPrices)(gourmetCaesarSalad)).toStrictEqual({
        saladPrice: 50,
        gourmetSaladPrice: 65,
    });
    (0, vitest_1.expect)(saladPriceSpy).toHaveBeenCalledOnce();
    (0, vitest_1.expect)(gourmetSaladPriceSpy).toHaveBeenCalledOnce();
});
//# sourceMappingURL=prototype-chain.test.js.map