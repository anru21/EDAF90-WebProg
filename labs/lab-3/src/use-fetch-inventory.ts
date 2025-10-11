import { useEffect, useState } from 'react';
import type {
  IngredientInfo,
  IngredientName,
  PartialInventory,
} from './inventory';

async function safeFetchJson<T>(url: string | URL, init?: RequestInit) {
  return fetch(url, init).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json() as Promise<T>;
  });
}

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
async function loadInventory(baseURL: string): Promise<PartialInventory> {
  const inventory: Writeable<PartialInventory> = {};
  // TODO, fetch ingredients and add them to inventory
  return inventory;
}

function useFetchInventory(baseURL: string) {
  const [data, setData] = useState({});
  useEffect(() => {
    let ignore = false;
    loadInventory(baseURL).then((inventory) => {
      if (!ignore) {
        setData(inventory);
      }
    });
    return () => {
      ignore = true;
    };
  }, [baseURL]);
  return data;
}

export { useFetchInventory, safeFetchJson };