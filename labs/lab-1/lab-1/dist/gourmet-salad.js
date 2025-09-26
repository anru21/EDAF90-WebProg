"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GourmetSalad = void 0;
const salad_1 = require("./salad");
class GourmetSalad extends salad_1.Salad {
    ingredients;
    constructor(init) {
        super(init);
        // TODO
        this.ingredients = {};
    }
    add(name, info, amount = 1) {
        // TODO
        return this;
    }
    price() {
        // TODO
        return -1;
    }
}
exports.GourmetSalad = GourmetSalad;
//# sourceMappingURL=gourmet-salad.js.map