import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import type { IngredientType, Inventory, PartialInventory } from "./inventory";
import { Button } from "./components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "./components/ui/label";
import React, { useState } from "react";
import { Checkbox } from "./components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Salad } from "./salad";

function selectType(type: IngredientType, inventory: Inventory): string[] {
  //return ["copy ", "the ", "structure ", "from ", "lab 1 ", "makeOptions "];
  return (
    Object.entries(inventory)
      // keep only the correct type
      .filter(([_, ingredientInfo]) => ingredientInfo.type === type)
      // sort alphabetically by ingredient name (Swedish locale, case-insensitive)
      .sort(([a], [b]) => a.localeCompare(b, "sv", { sensitivity: "case" }))
      // build the <option> string
      .map(
        ([ingredient]) =>
          //`<option value="${ingredient}" key="${ingredient}"> ${ingredient}, ${ingredientInfo.price} kr</option>`
          `${ingredient}`
      )
  );
}

type PropType = {
  inventory: Inventory;
  addSaladFunction: (saladToAdd: Salad) => void;
};

function ComposeSalad({ inventory, addSaladFunction }: PropType) {
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [extra, setExtra] = useState<PartialInventory>({});
  const [dressing, setDressing] = useState("");
  const baseNames = selectType("foundation", inventory);
  const proteinNames = selectType("protein", inventory);
  const extraNames = selectType("extra", inventory);
  const dressingNames = selectType("dressing", inventory);

  function handleChangeExtra(name: string, checked: CheckedState) {
    if (checked) {
      setExtra({ ...extra, [name]: inventory[name] });
    } else {
      const { [name]: _, ...restExtras } = extra;
      setExtra(restExtras);
    }
  }

  function handleSaladSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const extraList: string[] = Object.keys(extra);
    let saladToAdd: Salad = new Salad()
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein]);

    for (const item of extraList) {
      saladToAdd = saladToAdd.add(item, inventory[item]);
    }

    saladToAdd = saladToAdd.add(dressing, inventory[dressing]);

    addSaladFunction(saladToAdd);
  }

  const addSaladButton = (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center justify-end mr-">
          <Button type="submit" className="mr-4 cursor-pointer">
            Lägg till i varukorgen
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Under utveckling</AlertDialogTitle>
          <AlertDialogDescription>
            Denna funktion implementeras under labb 4.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <Card className="w-full p-3">
      {cardHead}
      <CardContent>
        <form onSubmit={handleSaladSubmit}>
          <SelectIngredient
            label="Välj bas"
            value={foundation}
            options={baseNames}
            onValueChange={setFoundation}
          ></SelectIngredient>

          <SelectIngredient
            label="Välj protein"
            value={protein}
            options={proteinNames}
            onValueChange={setProtein}
          ></SelectIngredient>

          <SelectExtras
            label="Välj minst två ingredienser"
            options={extraNames}
            inventory={inventory}
            changeExtra={handleChangeExtra}
          ></SelectExtras>

          <SelectIngredient
            label="Välj dressing"
            value={dressing}
            options={dressingNames}
            onValueChange={setDressing}
          ></SelectIngredient>

          {addSaladButton}
        </form>
      </CardContent>
    </Card>
  );
}

type SelectIngredientType = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
};
function SelectIngredient({
  label,
  value,
  onValueChange,
  options,
}: SelectIngredientType) {
  return (
    <Label className="grid grid-cols-1 gap-2 mb-4">
      <span className="text-base font-semibold -mb-1">{label}</span>
      <Select name={label} value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-sm cursor-pointer">
          <SelectValue placeholder="gör ett val" />
        </SelectTrigger>
        <SelectContent>
          {options.map((foundation) => (
            <SelectItem value={foundation} key={foundation}>
              {foundation}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
}

type SelectExtrasProps = {
  label: string;
  options: string[];
  inventory: Inventory;
  changeExtra: (name: string, checked: CheckedState) => void;
};

function SelectExtras({
  label,
  options,
  inventory,
  changeExtra,
}: SelectExtrasProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-7 gap-x-0 mb-4">
      <span className="col-span-4 text-base font-semibold -mb-1">{label}</span>
      {options.map((ingredient) => (
        <ExtraCheckboxes
          key={ingredient}
          ingredient={ingredient}
          inventory={inventory}
          changeExtra={changeExtra}
        ></ExtraCheckboxes>
      ))}
    </div>
  );
}

type ExtraCheckboxProps = {
  ingredient: string;
  inventory: Inventory;
  changeExtra: (name: string, checked: CheckedState) => void;
};

function ExtraCheckboxes({
  ingredient,
  inventory,
  changeExtra,
}: ExtraCheckboxProps) {
  const [checked, setChecked] = useState(false);

  const id = `extra-${ingredient}`;
  return (
    <Label
      htmlFor={id}
      className="col-span-1 flex items-center space-x-1 cursor-pointer"
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(newChecked: boolean) => {
          setChecked(newChecked);
          changeExtra(ingredient, newChecked);
        }}
        className="cursor-pointer"
      ></Checkbox>
      {ingredient + ", " + inventory[ingredient].price + " kr"}
    </Label>
  );
}

const cardHead = (
  <CardHeader>
    <CardTitle>Komponera en sallad</CardTitle>
    <CardDescription>Välj de ingredienser som ingår i salladen</CardDescription>
  </CardHeader>
);

export default ComposeSalad;
