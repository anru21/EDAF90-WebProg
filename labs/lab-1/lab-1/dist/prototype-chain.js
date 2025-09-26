"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.className = className;
exports.saladPrices = saladPrices;
exports.sharedOwnPropertyNamesOfObject = sharedOwnPropertyNamesOfObject;
exports.sharedOwnPropertyNamesOfClass = sharedOwnPropertyNamesOfClass;
const gourmet_salad_1 = require("./gourmet-salad");
const inventory_1 = require("./inventory");
const salad_1 = require("./salad");
const caesarSalad = new salad_1.Salad()
    .add('Sallad', inventory_1.inventory['Sallad'])
    .add('Kycklingfilé', inventory_1.inventory['Kycklingfilé'])
    .add('Bacon', inventory_1.inventory['Bacon'])
    .add('Krutonger', inventory_1.inventory['Krutonger'])
    .add('Parmesan', inventory_1.inventory['Parmesan'])
    .add('Ceasardressing', inventory_1.inventory['Ceasardressing'])
    .add('Gurka', inventory_1.inventory['Gurka']);
/*
console.log(
  'own properties of caesarSalad:',
  Object.getOwnPropertyNames(caesarSalad).join(', ')
);
console.log(
  'own properties of Salad:',
  Object.getOwnPropertyNames(Salad).join(', ')
);
*/
function sharedOwnPropertyNamesOfObject(obj) {
    return ['todo'];
}
function sharedOwnPropertyNamesOfClass(constructor) {
    return ['todo'];
}
// console.log('typeof Salad:', typeof Salad);
function className(obj) {
    return 'todo';
}
const chickenSalad = new gourmet_salad_1.GourmetSalad()
    .add('Sallad', inventory_1.inventory['Sallad'], 0.5)
    .add('Kycklingfilé', inventory_1.inventory['Kycklingfilé'], 2);
function saladPrices(salad) {
    const saladPrice = salad.price.call(salad); // TODO, call price() in Salad
    const gourmetSaladPrice = salad.price();
    return { saladPrice, gourmetSaladPrice };
}
//# sourceMappingURL=prototype-chain.js.map