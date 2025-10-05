import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  inventory,
  type IngredientType,
  type Inventory,
  type PartialInventory,
} from "./inventory";
import { Button } from "./components/ui/button";
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
import { Navigate, useNavigate, useOutletContext } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

function selectType(type: IngredientType, inventory: Inventory): string[] {
  //return ["copy ", "the ", "structure ", "from ", "lab 1 ", "makeOptions "];
  return (
    Object.entries(inventory)
      // keep only the correct type
      .filter(([, ingredientInfo]) => ingredientInfo.type === type)
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

type PropsType = {
  inventory: Inventory;
  addSalad: (saladToAdd: Salad) => void;
};

function ComposeSalad() {
  const { inventory, addSalad: addSaladFunction } = useOutletContext<PropsType>();

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [extra, setExtra] = useState<PartialInventory>({});
  const [dressing, setDressing] = useState("");
  const baseNames = selectType("foundation", inventory);
  const proteinNames = selectType("protein", inventory);
  const extraNames = selectType("extra", inventory);
  const dressingNames = selectType("dressing", inventory);

  const navigate = useNavigate();

  const [erroneousFields, setErroneousFields] = useState([""]);

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
      .add(protein, inventory[protein]) 

    for (const item of extraList) {
      saladToAdd = saladToAdd.add(item, inventory[item]);
    }

    saladToAdd = saladToAdd.add(dressing, inventory[dressing]);
    
    /*

    let newErroneousFields: string[];

    if (foundation === "") {
      newErroneousFields = [...erroneousFields, "foundation"];
      setErroneousFields(newErroneousFields);
    }

    if (protein === "") {
      newErroneousFields = [...erroneousFields, "protein"];
      setErroneousFields(newErroneousFields);
    }

    if (dressing === "") {
      newErroneousFields = [...erroneousFields, "dressing"];
      setErroneousFields(newErroneousFields);
    }

    */
    addSaladFunction(saladToAdd);

    setDressing("");
    setExtra({});
    setFoundation("");
    setProtein("");

    navigate("/view-cart/salad/" + saladToAdd.uuid);
  }

  return (
    <Card className="w-full p-3">
      {cardHead}
      <CardContent>
        <form onSubmit={handleSaladSubmit} className="">
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
            value={extra}
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

          <div className="flex items-center justify-end mr-">
            <Button type="submit" className="mr-4 cursor-pointer">
              Lägg till i varukorgen
            </Button>
          </div>
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
    <div className="gap-2 mb-4">
      <span className="text-base font-semibold -mb-1">{label}</span>
      <span aria-hidden="true">*</span>
      <Select 
        name={label} 
        value={value} 
        onValueChange={onValueChange}
        required
      >
        <SelectTrigger aria-invalid={true} className="w-sm cursor-pointer mb-1">
          <SelectValue placeholder="gör ett val"/>
        </SelectTrigger>
        <SelectContent>
          {options.map((ingredient) => (
            <SelectItem value={ingredient} key={ingredient}>
              {ingredient + ", " + inventory[ingredient].price + " kr"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Alert variant="destructive" className="hidden" >
        <AlertCircleIcon/>
        <AlertTitle className="pt-0.5">Gör ett val.</AlertTitle>
      </Alert>
    </div>
  );
}

type SelectExtrasProps = {
  label: string;
  value: PartialInventory;
  options: string[];
  inventory: Inventory;
  changeExtra: (name: string, checked: CheckedState) => void;
};

function SelectExtras({
  label,
  value,
  options,
  inventory,
  changeExtra,
}: SelectExtrasProps) {
  return (
    <>
      <div className="grid grid-cols-4 gap-x-0 mb-4">
      <span className="col-span-4 text-base font-semibold -mb-1">{label}</span>
      {options.map((ingredient) => (
        <Label
        key={ingredient}
        htmlFor={ingredient}
        className="col-span-1 flex items-center space-x-1 cursor-pointer"
        >
          <Checkbox
            id={ingredient}
            checked={!!value[ingredient]}
            onCheckedChange={(newChecked: boolean) => {
              changeExtra(ingredient, newChecked);
            }}
            className="cursor-pointer"
            ></Checkbox>
          {ingredient + ", " + inventory[ingredient].price + " kr"}
        </Label>
      ))}
      </div>
      <Alert variant="destructive" className="hidden" >
        <AlertCircleIcon/>
        <AlertTitle className="pt-0.5">För få ingredienser, välj minst två.</AlertTitle>
      </Alert>
    </>
  );
}

const cardHead = (
  <CardHeader>
    <CardTitle>Komponera en sallad</CardTitle>
    <CardDescription>Välj de ingredienser som ingår i salladen</CardDescription>
  </CardHeader>
);

export default ComposeSalad;
