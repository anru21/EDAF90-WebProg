import "./App.css";

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { inventory } from "./inventory";
import { Salad } from "./salad";

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
    
    function addSalad(saladToAdd: Salad) {
      setCart([saladToAdd, ...cart]);
    }
    return (
      <>
        <div className="flex flex-col items-center justify-center text-gray-800 p-6">
          <h1 className="text-6xl font-extrabold text-green-900 mb-8">
            Salladsbaren
          </h1>

        <NavigationMenu className="mb-10">
          <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to='/' 
                    className="px-5 py-2 bg-green-600 text-white rounded-lg shadow transition hover:bg-green-700 hover:text-white focus:ring-2 focus:ring-green-400"
                  >
                    Hem
                  </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to='/compose-salad'
                    className="px-5 py-2 bg-green-600 text-white rounded-lg shadow transition hover:bg-green-700 hover:text-white focus:ring-2 focus:ring-green-400"
                  >
                    Gör din sallad
                  </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to='/view-cart' 
                  className="px-5 py-2 bg-green-600 text-white rounded-lg shadow transition hover:bg-green-700 hover:text-white focus:ring-2 focus:ring-green-400"
                >
                  Varukorg
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Outlet context= { { inventory, cart, addSalad }} />
        </div>
      </>
  );
}

export default App;
