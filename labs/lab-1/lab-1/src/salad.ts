import { IngredientInfo, PartialInventory } from "./inventory";
import { v4 as uuidv4 } from "uuid";

type SaladInfo = {
  vegan: boolean;
  gluten: boolean;
  lactose: boolean;
};

class Salad {
  protected static instanceCounter = 1;
  protected readonly ingredients: PartialInventory;
  readonly uuid: string;

  constructor(init?: PartialInventory, uuid?: string) {
    this.ingredients = init || {};
    this.uuid = uuid ?? "salad_" + uuidv4();
  }

  /**
   * @returns a new salad object with the ingredient @name added.
   */
  add(name: string, info: IngredientInfo): Salad {
    const newInventory = {
      ...this.ingredients,
      [name]: info,
    };
    return new Salad(newInventory, this.uuid);
  }

  /**
   * @returns a new salad object with the ingredient @name removed.
   */
  remove(name: string): Salad {
    const { [name]: _, ...rest } = this.ingredients;
    return new Salad(rest, this.uuid);
  }

  /**
   * @returns the price of this salad.
   */
  price(): number {
    return Object.values(this.ingredients).reduce(
      (acc, ingredientInfo) => acc + ingredientInfo.price,
      0
    );
  }

  /**
   * @returns the aggregated info of of all ingredients.
   * vegan is true if all ingredients are vegan.
   * lactose and gluten is true if any of the ingredients contain the allergenic
   */
  info(): SaladInfo {
    const isVegan: boolean = Object.values(this.ingredients).reduce(
      (acc, ingredientInfo) => acc && (ingredientInfo.vegan ? true : false),
      true
    );

    const isGluten: boolean = Object.values(this.ingredients).reduce(
      (acc, ingredientInfo) => acc || (ingredientInfo.gluten ? true : false),
      false
    );

    const isLactose: boolean = Object.values(this.ingredients).reduce(
      (acc, ingredientInfo) => acc || (ingredientInfo.lactose ? true : false),
      false
    );

    /*
    .every() stops early (short-circuits) once it finds the first false, while .reduce()
    keeps going through the whole array

    const isVegan: boolean = Object.values(this.ingredients).every(
      ingredientInfo => ingredientInfo.vegan === true
    );

    const isGluten: boolean = Object.values(this.ingredients).some(
      ingredientInfo => ingredientInfo.gluten === true
    );

    const isGluten: boolean = Object.values(this.ingredients).some(
      ingredientInfo => ingredientInfo.lactose === true
    );
    */

    return {
      vegan: isVegan,
      gluten: isGluten,
      lactose: isLactose,
    } as SaladInfo;
  }

  /**
   * @param json is a JSON string with an array of Salad objects
   * @returns an array of Salad objects.
   * @throws if json is not an array, or any of the objects do not
   * have the ingredients attribute
   */
  static parse(json: string): Salad[] {
    const list = JSON.parse(json);

    if (!Array.isArray(list)) {
      throw new Error("JSON must be an array");
    }

    // Map each plain object to a Salad instance
    const saladList: Salad[] = list.map((obj) => {
      // Validate that ingredients exist
      if (!obj.ingredients) {
        throw new Error("Each object must have an 'ingredients' attribute");
      }

      // Create a new Salad instance with the ingredients
      return new Salad(obj.ingredients, obj.uuid);
    });

    return saladList;
  }
}

export { Salad };
