import { IngredientInfo, Inventory } from './inventory';
import { Salad } from './salad';
interface GourmetIngredientInfo extends IngredientInfo {
    amount: number;
}
type GourmetInventory = Readonly<Record<keyof Inventory, GourmetIngredientInfo>>;
type PartialGourmetInventory = Readonly<Record<keyof GourmetInventory, GourmetIngredientInfo>>;
declare class GourmetSalad extends Salad {
    protected readonly ingredients: PartialGourmetInventory;
    constructor(init?: PartialGourmetInventory);
    add(name: string, info: IngredientInfo, amount?: number): GourmetSalad;
    price(): number;
}
export { GourmetSalad };
//# sourceMappingURL=gourmet-salad.d.ts.map