import { GourmetSalad } from './gourmet-salad';
declare function sharedOwnPropertyNamesOfObject(obj: Object): string[];
declare function sharedOwnPropertyNamesOfClass(constructor: Function): string[];
declare function className(obj: Object): string;
type SaladPrices = {
    saladPrice: number;
    gourmetSaladPrice: number;
};
declare function saladPrices(salad: GourmetSalad): SaladPrices;
export { className, saladPrices, sharedOwnPropertyNamesOfObject, sharedOwnPropertyNamesOfClass, };
//# sourceMappingURL=prototype-chain.d.ts.map