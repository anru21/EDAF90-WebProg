import "./App.css";

import { useState } from "react";

import { inventory } from "./inventory";
import { Salad } from "./salad";

import ViewCart from "./view-cart";
import ComposeSalad from "./compose-salad";
import { executionAsyncResource } from "async_hooks";

const initialCart = [
  new Salad()
    .add("Sallad", inventory["Sallad"])
    .add("Kycklingfilé", inventory["Kycklingfilé"])
    .add("Bacon", inventory["Bacon"])
    .add("Krutonger", inventory["Krutonger"])
    .add("Parmesan", inventory["Parmesan"])
    .add("Ceasardressing", inventory["Ceasardressing"])
    .add("Gurka", inventory["Gurka"]),
  new Salad()
    .add("Sallad + Quinoa", inventory["Sallad + Quinoa"])
    .add("Kycklingfilé", inventory["Kycklingfilé"])
    .add("Cashewnötter", inventory["Cashewnötter"])
    .add("Fetaost", inventory["Fetaost"])
    .add("Sojabönor", inventory["Sojabönor"])
    .add("Ceasardressing", inventory["Ceasardressing"]),
  new Salad()
    .add("Sallad", inventory["Sallad"])
    .add("Marinerad bönmix", inventory["Marinerad bönmix"])
    .add("Avocado", inventory["Avocado"])
    .add("Lime", inventory["Lime"])
    .add("Örtvinägrett", inventory["Örtvinägrett"]),
];

function App() {
  const [cart, setCart] = useState<Salad[]>(initialCart);
  return (
    <div className="grid grid-rows-1 gap-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-center ">Min egen salladsbar</h1>
      <ViewCart cart={cart} />
      <ComposeSalad inventory={inventory} addSaladFunction={AddSalad} />
    </div>
  );

  function AddSalad(saladToAdd: Salad) {
    setCart([...cart, saladToAdd]);
  }
}

export default App;
