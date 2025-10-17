const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { StatusCodes } = require('http-status-codes');

(function () {
  const port = 8080;
  const server = express();

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };

  server.use(cors(corsOptions));
  server.use(express.json());

  server.listen(port, () => {
    console.log('salad bar REST Server is listening on port ' + port);
  });

  function getDetails(req, res, next, kind) {
    const obj = inventory[req.params.name];
    if (obj) {
      if (obj.type === kind) {
        res.json(obj);
      } else {
        res.set('Content-Type', 'text/plain');
        res
          .status(StatusCodes.NOT_FOUND)
          .send(
            `Unknown ${kind}: ${req.params.name}. Did you mean /${obj.type}/${req.params.name}`
          );
      }
    } else {
      res.set('Content-Type', 'text/plain');
      res
        .status(StatusCodes.NOT_FOUND)
        .send(`Unknown ${kind}: ${req.params.name}`);
    }
  }

  function handleOrder(req, res, next) {
    try {
      if (!req.is('application/json')) {
        throw {
          httpStatus: StatusCodes.BAD_REQUEST,
          errorMessage: 'content-type is not json',
        };
      } else if (!Array.isArray(req.body)) {
        throw {
          httpStatus: StatusCodes.BAD_REQUEST,
          errorMessage:
            'Type check faild. The body must be an array of salads, but its type is ' +
            typeof req.body,
        };
      } else {
        const order = {
          status: 'confirmed',
          timestamp: new Date(),
          uuid: uuidv4(),
          price: req.body.reduce(
            (acc, salad, index) => getSaladPrice(salad, index) + acc,
            0
          ),
          order: req.body,
        };
        res.json(order);
      }
    } catch (e) {
      res.set('Content-Type', 'text/plain');
      res
        .status(e?.httpStatus || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(
          e?.errorMessage ||
            `Internal server error. An exception was thown while processing the request.\nmessage: ${e?.toString()} \nstack trace: ${
              e.stack
            }`
        );
    }
  }

  function getSaladPrice(list, saladIndex) {
    if (!Array.isArray(list)) {
      throw {
        httpStatus: StatusCodes.BAD_REQUEST,
        errorMessage: `Typecheck failed. A salad must be an array, but salad with index ${saladIndex} have type ${typeof list}.`,
      };
    }
    return list.reduce(
      (acc, ingredient, ingrIndex) =>
        acc + getIngredientPrice(ingredient, saladIndex, ingrIndex),
      0
    );
  }

  function getIngredientPrice(ingredient, saladIndex, ingrIndex) {
    if (typeof ingredient !== 'string') {
      throw {
        httpStatus: StatusCodes.BAD_REQUEST,
        errorMessage: `Typecheck failed. Ingredients must be strings but in salad with index ${saladIndex} ingredient with index ${ingrIndex} have type ${typeof ingredient}.`,
      };
    }
    return (
      inventory[ingredient]?.price ||
      ((_) => {
        throw {
          httpStatus: StatusCodes.NOT_FOUND,
          errorMessage: `Unknown ingredient: ingredient with index ${ingrIndex} "${ingredient}", in salad index ${saladIndex}.`,
        };
      })()
    );
  }
  function getList(req, res, next, kind) {
    let list = Object.keys(inventory).filter(
      (name) => inventory[name].type === kind
    );
    res.json(list);
  }

  function addInventoryListener(server, kind) {
    server.get('/' + kind + 's', (req, res, next) =>
      getList(req, res, next, kind)
    );
    server.get('/' + kind + 's/', (req, res, next) =>
      getList(req, res, next, kind)
    );
    server.get('/' + kind + 's/:name', (req, res, next) =>
      getDetails(req, res, next, kind)
    );
    server.get('/' + kind + '/:name', (req, res, next) =>
      getDetails(req, res, next, kind)
    );
  }

  server.get('/', (req, res, next) =>
    res.json({
      try: req.hostname + ':' + port + req.originalUrl + 'foundations',
    })
  );

  addInventoryListener(server, 'foundation');
  addInventoryListener(server, 'protein');
  addInventoryListener(server, 'extra');
  addInventoryListener(server, 'dressing');

  server.post('/order', handleOrder);
  server.post('/order/', handleOrder);
  server.post('/orders', handleOrder);
  server.post('/orders/', handleOrder);

  server.get('/order/', (req, res, next) => {
    res.set('Content-Type', 'text/plain');
    res
      .status(StatusCodes.BAD_REQUEST)
      .send('Use a POST request to place an order');
  });
  server.get('/orders/', (req, res, next) => {
    res.set('Content-Type', 'text/plain');
    res
      .status(StatusCodes.BAD_REQUEST)
      .send('Use a POST request to place an order');
  });

  const inventory = {
    Sallad: { price: 10, type: 'foundation', vegan: true },
    Pasta: { price: 10, type: 'foundation', gluten: true },
    'Sallad + Pasta': { price: 10, type: 'foundation', gluten: true },
    'Sallad + Matvete': {
      price: 10,
      type: 'foundation',
      vegan: true,
      gluten: true,
    },
    'Sallad + Glasnudlar': { price: 10, type: 'foundation', gluten: true },
    'Sallad + Quinoa': { price: 10, type: 'foundation', vegan: true },

    Kycklingfilé: { price: 10, type: 'protein' },
    'Rökt kalkonfilé': { price: 10, type: 'protein' },
    'Norsk fjordlax': { price: 30, type: 'protein' },
    'Handskalade räkor från Smögen': { price: 40, type: 'protein' },
    'Pulled beef från Sverige': { price: 15, type: 'protein' },
    'Marinerad bönmix': { price: 10, type: 'protein', vegan: true },

    Avocado: { price: 10, type: 'extra', vegan: true },
    Bacon: { price: 10, type: 'extra' },
    Böngroddar: { price: 5, type: 'extra', vegan: true },
    Cashewnötter: { price: 5, type: 'extra', vegan: true },
    Chèvreost: { price: 15, type: 'extra', lactose: true },
    Fetaost: { price: 5, type: 'extra', lactose: true },
    'Färsk koriander': { price: 10, type: 'extra', vegan: true },
    Gurka: { price: 5, type: 'extra', vegan: true },
    'Inlagd lök': { price: 5, type: 'extra', vegan: true },
    Jalapeno: { price: 5, type: 'extra', vegan: true },
    'Krossade jordnötter': { price: 5, type: 'extra', vegan: true },
    Krutonger: { price: 5, type: 'extra', gluten: true },
    Körsbärstomater: { price: 5, type: 'extra', vegan: true },
    Lime: { price: 5, type: 'extra', vegan: true },
    Majs: { price: 5, type: 'extra', vegan: true },
    Oliver: { price: 5, type: 'extra', vegan: true },
    Paprika: { price: 5, type: 'extra', vegan: true },
    Parmesan: { price: 5, type: 'extra', lactose: true },
    'Rivna morötter': { price: 5, type: 'extra', vegan: true },
    'Rostade sesamfrön': { price: 5, type: 'extra', vegan: true },
    Ruccola: { price: 5, type: 'extra', vegan: true },
    Rödlök: { price: 5, type: 'extra', vegan: true },
    Sojabönor: { price: 5, type: 'extra', vegan: true },
    'Soltorkad tomat': { price: 5, type: 'extra', vegan: true },
    Tomat: { price: 5, type: 'extra', vegan: true },
    Valnötter: { price: 5, type: 'extra', vegan: true },
    Ägg: { price: 5, type: 'extra' },

    Ceasardressing: { price: 5, type: 'dressing', lactose: true },
    Dillmayo: { price: 5, type: 'dressing' },
    Honungsdijon: { price: 5, type: 'dressing', vegan: true },
    Kimchimayo: { price: 5, type: 'dressing' },
    Pesto: { price: 5, type: 'dressing', lactose: true },
    Rhodeisland: { price: 5, type: 'dressing', lactose: true },
    'Rostad aioli': { price: 5, type: 'dressing' },
    Soyavinägrett: { price: 5, type: 'dressing', vegan: true },
    Örtvinägrett: { price: 5, type: 'dressing', vegan: true },
  };
})();
