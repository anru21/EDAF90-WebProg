import { _ } from "vitest/dist/chunks/reporters.d.BFLkQcL6";
import { IngredientType, inventory, PartialInventory } from "./inventory";

// remove comment below to see printouts
/*
const names = Object.keys(inventory);
names.forEach((name) => console.log(name));

for (const name in inventory) {
  console.log(name);
}
const myString = `We have ${names
  .sort((a, b) => a.localeCompare(b, 'sv', { sensitivity: 'case' }))
  .join(', ')} in stock.`;
console.log(myString);
*/

function makeOptions(
  inventory: PartialInventory,
  type: IngredientType
): string[] {
  return (
    Object.entries(inventory)
      // keep only the correct type
      .filter(([_, ingredientInfo]) => ingredientInfo.type === type)
      // sort alphabetically by ingredient name (Swedish locale, case-insensitive)
      .sort(([a], [b]) => a.localeCompare(b, "sv", { sensitivity: "case" }))
      // build the <option> string
      .map(
        ([ingredient, ingredientInfo]) =>
          `<option value="${ingredient}" key="${ingredient}"> ${ingredient}, ${ingredientInfo.price} kr</option>`
      )
  );
}

export { makeOptions };
