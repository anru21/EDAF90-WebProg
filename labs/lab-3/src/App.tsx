import "./App.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

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
    function AddSalad(saladToAdd: Salad) {
      setCart([...cart, saladToAdd]);
    }
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to='/'>Home</Link>
              </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to='/compose-salad'>Compose your salad</Link>
              </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to='/view-cart'>View your cart</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
  );
}

export default App;
