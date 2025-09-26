import { expect, test } from 'vitest';
import { makeOptions } from './make-options';
import { inventory } from './inventory';

test("makeOptions({}, 'foundation')", () => {
  expect(makeOptions({}, 'foundation')).toStrictEqual([]);
});
test("makeOptions({}, 'unknown type')", () => {
  expect(makeOptions({}, 'foundation')).toStrictEqual([]);
});
test("makeOptions(inventory, 'foundation')", () => {
  expect(makeOptions(inventory, 'foundation')).toStrictEqual([
    '<option value="Pasta" key="Pasta"> Pasta, 10 kr</option>',
    '<option value="Sallad" key="Sallad"> Sallad, 10 kr</option>',
    '<option value="Sallad + Glasnudlar" key="Sallad + Glasnudlar"> Sallad + Glasnudlar, 10 kr</option>',
    '<option value="Sallad + Matvete" key="Sallad + Matvete"> Sallad + Matvete, 10 kr</option>',
    '<option value="Sallad + Pasta" key="Sallad + Pasta"> Sallad + Pasta, 10 kr</option>',
    '<option value="Sallad + Quinoa" key="Sallad + Quinoa"> Sallad + Quinoa, 10 kr</option>',
  ]);
});
test("makeOptions(inventory, 'protein')", () => {
  expect(makeOptions(inventory, 'protein')).toStrictEqual([
    '<option value="Handskalade räkor från Smögen" key="Handskalade räkor från Smögen"> Handskalade räkor från Smögen, 40 kr</option>',
    '<option value="Kycklingfilé" key="Kycklingfilé"> Kycklingfilé, 10 kr</option>',
    '<option value="Marinerad bönmix" key="Marinerad bönmix"> Marinerad bönmix, 10 kr</option>',
    '<option value="Norsk fjordlax" key="Norsk fjordlax"> Norsk fjordlax, 30 kr</option>',
    '<option value="Pulled beef från Sverige" key="Pulled beef från Sverige"> Pulled beef från Sverige, 15 kr</option>',
    '<option value="Rökt kalkonfilé" key="Rökt kalkonfilé"> Rökt kalkonfilé, 10 kr</option>',
  ]);
});
test("makeOptions(inventory, 'extra')", () => {
  expect(makeOptions(inventory, 'extra')).toStrictEqual([
    '<option value="Avocado" key="Avocado"> Avocado, 10 kr</option>',
    '<option value="Bacon" key="Bacon"> Bacon, 10 kr</option>',
    '<option value="Böngroddar" key="Böngroddar"> Böngroddar, 5 kr</option>',
    '<option value="Cashewnötter" key="Cashewnötter"> Cashewnötter, 5 kr</option>',
    '<option value="Chèvreost" key="Chèvreost"> Chèvreost, 15 kr</option>',
    '<option value="Fetaost" key="Fetaost"> Fetaost, 5 kr</option>',
    '<option value="Färsk koriander" key="Färsk koriander"> Färsk koriander, 10 kr</option>',
    '<option value="Gurka" key="Gurka"> Gurka, 5 kr</option>',
    '<option value="Inlagd lök" key="Inlagd lök"> Inlagd lök, 5 kr</option>',
    '<option value="Jalapeno" key="Jalapeno"> Jalapeno, 5 kr</option>',
    '<option value="Krossade jordnötter" key="Krossade jordnötter"> Krossade jordnötter, 5 kr</option>',
    '<option value="Krutonger" key="Krutonger"> Krutonger, 5 kr</option>',
    '<option value="Körsbärstomater" key="Körsbärstomater"> Körsbärstomater, 5 kr</option>',
    '<option value="Lime" key="Lime"> Lime, 5 kr</option>',
    '<option value="Majs" key="Majs"> Majs, 5 kr</option>',
    '<option value="Oliver" key="Oliver"> Oliver, 5 kr</option>',
    '<option value="Paprika" key="Paprika"> Paprika, 5 kr</option>',
    '<option value="Parmesan" key="Parmesan"> Parmesan, 5 kr</option>',
    '<option value="Rivna morötter" key="Rivna morötter"> Rivna morötter, 5 kr</option>',
    '<option value="Rostade sesamfrön" key="Rostade sesamfrön"> Rostade sesamfrön, 5 kr</option>',
    '<option value="Ruccola" key="Ruccola"> Ruccola, 5 kr</option>',
    '<option value="Rödlök" key="Rödlök"> Rödlök, 5 kr</option>',
    '<option value="Sojabönor" key="Sojabönor"> Sojabönor, 5 kr</option>',
    '<option value="Soltorkad tomat" key="Soltorkad tomat"> Soltorkad tomat, 5 kr</option>',
    '<option value="Tomat" key="Tomat"> Tomat, 5 kr</option>',
    '<option value="Valnötter" key="Valnötter"> Valnötter, 5 kr</option>',
    '<option value="Ägg" key="Ägg"> Ägg, 5 kr</option>',
  ]);
});
test("makeOptions(inventory, 'dressing')", () => {
  expect(makeOptions(inventory, 'dressing')).toStrictEqual([
    '<option value="Ceasardressing" key="Ceasardressing"> Ceasardressing, 5 kr</option>',
    '<option value="Dillmayo" key="Dillmayo"> Dillmayo, 5 kr</option>',
    '<option value="Honungsdijon" key="Honungsdijon"> Honungsdijon, 5 kr</option>',
    '<option value="Kimchimayo" key="Kimchimayo"> Kimchimayo, 5 kr</option>',
    '<option value="Pesto" key="Pesto"> Pesto, 5 kr</option>',
    '<option value="Rhodeisland" key="Rhodeisland"> Rhodeisland, 5 kr</option>',
    '<option value="Rostad aioli" key="Rostad aioli"> Rostad aioli, 5 kr</option>',
    '<option value="Soyavinägrett" key="Soyavinägrett"> Soyavinägrett, 5 kr</option>',
    '<option value="Örtvinägrett" key="Örtvinägrett"> Örtvinägrett, 5 kr</option>',
  ]);
});
