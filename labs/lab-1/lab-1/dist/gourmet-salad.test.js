"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const inventory_1 = require("./inventory");
const gourmet_salad_1 = require("./gourmet-salad");
const test = vitest_1.test.extend({
    gourmetCaesarSalad: new gourmet_salad_1.GourmetSalad()
        .add('Sallad', inventory_1.inventory['Sallad'], 0.5)
        .add('Kycklingfilé', inventory_1.inventory['Kycklingfilé'], 2)
        .add('Bacon', inventory_1.inventory['Bacon'], 2)
        .add('Krutonger', inventory_1.inventory['Krutonger'])
        .add('Parmesan', inventory_1.inventory['Parmesan'])
        .add('Ceasardressing', inventory_1.inventory['Ceasardressing'])
        .add('Gurka', inventory_1.inventory['Gurka']),
});
test('price of gourmet caesar salad', ({ gourmetCaesarSalad }) => {
    (0, vitest_1.expect)(gourmetCaesarSalad.price()).toBe(65);
});
test('price of gourmet caesar salad, bacon added twice', ({ gourmetCaesarSalad, }) => {
    const extraBacon = gourmetCaesarSalad.add('Bacon', inventory_1.inventory['Bacon'], 2);
    (0, vitest_1.expect)(extraBacon.price()).toBe(85);
});
//# sourceMappingURL=gourmet-salad.test.js.map