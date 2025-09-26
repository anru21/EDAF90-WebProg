type IngredientType = 'foundation' | 'protein' | 'extra' | 'dressing';
interface IngredientInfo {
    readonly type: IngredientType;
    readonly price: number;
    readonly vegan?: boolean;
    readonly gluten?: boolean;
    readonly lactose?: boolean;
}
declare const baseInventory: {
    Sallad: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Pasta: {
        price: number;
        type: string;
        gluten: boolean;
    };
    'Sallad + Pasta': {
        price: number;
        type: string;
        gluten: boolean;
    };
    'Sallad + Matvete': {
        price: number;
        type: string;
        vegan: boolean;
        gluten: boolean;
    };
    'Sallad + Glasnudlar': {
        price: number;
        type: string;
        gluten: boolean;
    };
    'Sallad + Quinoa': {
        price: number;
        type: string;
        vegan: boolean;
    };
    Kycklingfilé: {
        price: number;
        type: string;
    };
    'R\u00F6kt kalkonfil\u00E9': {
        price: number;
        type: string;
    };
    'Norsk fjordlax': {
        price: number;
        type: string;
    };
    'Handskalade r\u00E4kor fr\u00E5n Sm\u00F6gen': {
        price: number;
        type: string;
    };
    'Pulled beef fr\u00E5n Sverige': {
        price: number;
        type: string;
    };
    'Marinerad b\u00F6nmix': {
        price: number;
        type: string;
        vegan: boolean;
    };
    Avocado: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Bacon: {
        price: number;
        type: string;
    };
    Böngroddar: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Cashewnötter: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Chèvreost: {
        price: number;
        type: string;
        lactose: boolean;
    };
    Fetaost: {
        price: number;
        type: string;
        lactose: boolean;
    };
    'F\u00E4rsk koriander': {
        price: number;
        type: string;
        vegan: boolean;
    };
    Gurka: {
        price: number;
        type: string;
        vegan: boolean;
    };
    'Inlagd l\u00F6k': {
        price: number;
        type: string;
        vegan: boolean;
    };
    Jalapeno: {
        price: number;
        type: string;
        vegan: boolean;
    };
    'Krossade jordn\u00F6tter': {
        price: number;
        type: string;
        vegan: boolean;
    };
    Krutonger: {
        price: number;
        type: string;
        gluten: boolean;
    };
    Körsbärstomater: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Lime: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Majs: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Oliver: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Paprika: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Parmesan: {
        price: number;
        type: string;
        lactose: boolean;
    };
    'Rivna mor\u00F6tter': {
        price: number;
        type: string;
        vegan: boolean;
    };
    'Rostade sesamfr\u00F6n': {
        price: number;
        type: string;
        vegan: boolean;
    };
    Ruccola: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Rödlök: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Sojabönor: {
        price: number;
        type: string;
        vegan: boolean;
    };
    'Soltorkad tomat': {
        price: number;
        type: string;
        vegan: boolean;
    };
    Tomat: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Valnötter: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Ägg: {
        price: number;
        type: string;
    };
    Ceasardressing: {
        price: number;
        type: string;
        lactose: boolean;
    };
    Dillmayo: {
        price: number;
        type: string;
    };
    Honungsdijon: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Kimchimayo: {
        price: number;
        type: string;
    };
    Pesto: {
        price: number;
        type: string;
        lactose: boolean;
    };
    Rhodeisland: {
        price: number;
        type: string;
        lactose: boolean;
    };
    'Rostad aioli': {
        price: number;
        type: string;
    };
    Soyavinägrett: {
        price: number;
        type: string;
        vegan: boolean;
    };
    Örtvinägrett: {
        price: number;
        type: string;
        vegan: boolean;
    };
};
type IngredientName = keyof typeof baseInventory;
type Inventory = Readonly<Record<IngredientName, IngredientInfo> & {
    [otherName: string]: IngredientInfo;
}>;
declare const inventory: Inventory;
type PartialInventory = Readonly<Record<keyof Inventory, IngredientInfo>>;
export { inventory, type Inventory, type IngredientType, type IngredientInfo, type PartialInventory, };
//# sourceMappingURL=inventory.d.ts.map