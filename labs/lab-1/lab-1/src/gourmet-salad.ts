import { IngredientInfo, Inventory } from "./inventory";
import { Salad } from "./salad";

interface GourmetIngredientInfo extends IngredientInfo {
  amount: number;
}

type GourmetInventory = Readonly<
  Record<keyof Inventory, GourmetIngredientInfo>
>;
type PartialGourmetInventory = Readonly<
  Record<keyof GourmetInventory, GourmetIngredientInfo>
>;

class GourmetSalad extends Salad {
  protected readonly ingredients: PartialGourmetInventory;

  constructor(init?: PartialGourmetInventory) {
    super(init);
    this.ingredients = init || {};
  }

  add(name: string, info: IngredientInfo, amount = 1): GourmetSalad {
    if (this.ingredients[name]) {
      const updatedInventory = {
        ...this.ingredients,
        [name]: {
          ...this.ingredients[name],
          amount: this.ingredients[name].amount + amount,
        },
      };
      return new GourmetSalad(updatedInventory);
    } else {
      const newInventory = {
        ...this.ingredients,
        [name]: { ...info, amount },
      };
      return new GourmetSalad(newInventory);
    }
  }

  price(): number {
    return Object.values(this.ingredients).reduce(
      (acc, ingredientInfo) =>
        acc + ingredientInfo.price * ingredientInfo.amount,
      0
    );
  }
}

export { GourmetSalad };
