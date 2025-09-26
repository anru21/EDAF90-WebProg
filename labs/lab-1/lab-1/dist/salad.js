"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salad = void 0;
class Salad {
    static instanceCounter = 1;
    ingredients;
    uuid;
    constructor(init) {
        this.ingredients = {};
        this.uuid = 'salad_' + '1'; //Salad.instanceCounter++;
    }
    /**
     * @returns a new salad object with the ingredient @name added.
     */
    add(name, info) {
        return this;
    }
    /**
     * @returns a new salad object with the ingredient @name removed.
     */
    remove(name) {
        return this;
    }
    /**
     * @returns the price of this salad.
     */
    price() {
        return -1;
    }
    /**
     * @returns the aggregated info of of all ingredients.
     * vegan is true if all ingredients are vegan.
     * lactose and gluten is true if any of the ingredients contain the allergenic
     */
    info() {
        return { vegan: false, gluten: false, lactose: false };
    }
    /**
     * @param json is a JSON string with an array of Salad objects
     * @returns an array of Salad objects.
     * @throws if json is not an array, or any of the objects do not
     * have the ingredients attribute
     */
    static parse(json) {
        const list = JSON.parse(json);
        return [];
    }
}
exports.Salad = Salad;
//# sourceMappingURL=salad.js.map