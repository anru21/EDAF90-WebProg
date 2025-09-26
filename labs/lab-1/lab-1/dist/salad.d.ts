import { IngredientInfo, PartialInventory } from './inventory';
type SaladInfo = {
    vegan: boolean;
    gluten: boolean;
    lactose: boolean;
};
declare class Salad {
    protected static instanceCounter: number;
    protected readonly ingredients: PartialInventory;
    readonly uuid: string;
    constructor(init?: PartialInventory);
    /**
     * @returns a new salad object with the ingredient @name added.
     */
    add(name: string, info: IngredientInfo): Salad;
    /**
     * @returns a new salad object with the ingredient @name removed.
     */
    remove(name: string): Salad;
    /**
     * @returns the price of this salad.
     */
    price(): number;
    /**
     * @returns the aggregated info of of all ingredients.
     * vegan is true if all ingredients are vegan.
     * lactose and gluten is true if any of the ingredients contain the allergenic
     */
    info(): SaladInfo;
    /**
     * @param json is a JSON string with an array of Salad objects
     * @returns an array of Salad objects.
     * @throws if json is not an array, or any of the objects do not
     * have the ingredients attribute
     */
    static parse(json: string): Salad[];
}
export { Salad };
//# sourceMappingURL=salad.d.ts.map