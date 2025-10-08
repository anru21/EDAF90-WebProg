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
import { useNavigate, useOutletContext } from "react-router";
import { Alert, AlertTitle } from "./components/ui/alert";
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
  const { inventory, addSalad } = useOutletContext<PropsType>();

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [extra, setExtra] = useState<PartialInventory>({});
  const [dressing, setDressing] = useState("");
  const baseNames = selectType("foundation", inventory);
  const proteinNames = selectType("protein", inventory);
  const extraNames = selectType("extra", inventory);
  const dressingNames = selectType("dressing", inventory);
  const [erroneousFields, setErroneousFields] = useState<string[]>([]);

  const navigate = useNavigate();


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
    const newErroneousFields = validateSalad(foundation, protein, extraList, dressing);

    setErroneousFields(newErroneousFields);
    if (newErroneousFields.length > 0) return;  // Form validation failed. Return and do not create a new salad

    // Build salad
    const saladToAdd: Salad = buildSalad(foundation, protein, extraList, dressing);
    addSalad(saladToAdd);

    resetForm();
    navigate(`/view-cart/salad/${saladToAdd.uuid}`);
  }

  function validateSalad(foundation: string, protein: string, extras: string[], dressing: string): string[] {
    return [
      !foundation && "foundation",
      !protein && "protein",
      extras.length < 2 && "extra",
      !dressing && "dressing",
    ].filter(Boolean) as string[];
  }

  function buildSalad(foundation:string, protein: string, extras: string[], dressing: string): Salad {
    let salad = new Salad()
    .add(foundation, inventory[foundation])
    .add(protein, inventory[protein]);

    extras.forEach(item => {
      salad = salad.add(item, inventory[item]);
    });

    return salad.add(dressing, inventory[dressing]);
  }
  
  function resetForm() {
    setDressing("");
    setExtra({});
    setFoundation("");
    setProtein("");
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
            errorFields={erroneousFields}
            ingredientType="foundation"
          ></SelectIngredient>

          <SelectIngredient
            label="Välj protein"
            value={protein}
            options={proteinNames}
            onValueChange={setProtein}
            errorFields={erroneousFields}
            ingredientType="protein"
          ></SelectIngredient>

          <SelectExtras
            label="Välj minst två ingredienser"
            value={extra}
            options={extraNames}
            inventory={inventory}
            changeExtra={handleChangeExtra}
            errorFields={erroneousFields}
            ingredientType="extra"
          ></SelectExtras>

          <SelectIngredient
            label="Välj dressing"
            value={dressing}
            options={dressingNames}
            onValueChange={setDressing}
            errorFields={erroneousFields}
            ingredientType="dressing"
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
  errorFields: string[];
  ingredientType: string;
};
function SelectIngredient({
  label,
  value,
  onValueChange,
  options,
  errorFields,
  ingredientType
}: SelectIngredientType) {
  const [hasClosed, setHasClosed] = useState(false);

  return (
    <div className="gap-2 mb-4">
      <label className="text-base font-semibold -mb-1">
        {label}<span aria-hidden="true">*</span>
      </label>
      <Select 
        name={label} 
        value={value} 
        onValueChange={onValueChange}
        required
        onOpenChange={(isOpen) => {
          if (!isOpen && !hasClosed) {
            setHasClosed(true);
          }
        }}
      >
        <SelectTrigger aria-invalid={(errorFields.includes(ingredientType) && !value) || (hasClosed && !value)} className="w-sm cursor-pointer mb-1">
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
      {((errorFields.includes(ingredientType) && !value) || (hasClosed && !value))   && 
        <Alert variant="destructive">
          <AlertCircleIcon/>
          <AlertTitle>Gör ett val.</AlertTitle>
        </Alert>
      }
    </div>
  );
}

type SelectExtrasProps = {
  label: string;
  value: PartialInventory;
  options: string[];
  inventory: Inventory;
  changeExtra: (name: string, checked: CheckedState) => void;
  errorFields: string[];
  ingredientType: string;
};

function SelectExtras({
  label,
  value,
  options,
  inventory,
  changeExtra,
  errorFields,
  ingredientType
}: SelectExtrasProps) {
  return (
    <>
      <div className="grid grid-cols-4 gap-x-0 gap-y-1 mb-4">
        <label className="col-span-4 text-base font-semibold">{label}</label>
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
      {(errorFields.includes(ingredientType) && Object.keys(value).length < 2) && 
          <Alert variant="destructive">
            <AlertCircleIcon/>
            <AlertTitle>För få ingredienser, välj minst två.</AlertTitle>
          </Alert>
      }
      
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
