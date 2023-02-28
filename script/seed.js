"use strict";

const {
  db,
  models: { User, Item, Order, Item_Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await User.bulkCreate(USER_SEED_DATA, { validate: true });

  //Creating Items
  const items = await Item.bulkCreate(ITEM_SEED_DATA, { validate: true });

  //Creating Orders
  const orders = await Order.bulkCreate(ORDER_SEED_DATA, { validate: true });

  //Filling some carts
  const itemOrders = await Item_Order.bulkCreate(CART_SEED_DATA, { validate: true });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${items.length} items`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded ${itemOrders.length} items in carts`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

const USER_SEED_DATA = [
  {
    id: 1,
    username: "rmacdavitt0",
    password: "3533 Sherman Trail",
    firstName: "Rhoda",
    lastName: "MacDavitt",
    email: "rmacdavitt0@paginegialle.it",
    address: "960 Cambridge Parkway",
    role: "customer",
  },
  {
    id: 2,
    username: "ghaysom1",
    password: "532 Pennsylvania Circle",
    firstName: "Glendon",
    lastName: "Haysom",
    email: "ghaysom1@cdbaby.com",
    address: "8 Onsgard Terrace",
    role: "customer",
  },
  {
    id: 3,
    username: "shuikerby2",
    password: "1 Farwell Terrace",
    firstName: "Sela",
    lastName: "Huikerby",
    email: "shuikerby2@godaddy.com",
    address: "797 Sheridan Avenue",
    role: "customer",
  },
  {
    id: 4,
    username: "blogsdail3",
    password: "96671 Orin Park",
    firstName: "Barbee",
    lastName: "Logsdail",
    email: "blogsdail3@hibu.com",
    address: "331 Glacier Hill Parkway",
    role: "customer",
  },
  {
    id: 5,
    username: "narckoll4",
    password: "1 Hauk Center",
    firstName: "Nevile",
    lastName: "Arckoll",
    email: "narckoll4@patch.com",
    address: "37 Oakridge Park",
    role: "customer",
  },
  {
    id: 6,
    username: "hchapleo5",
    password: "7 Browning Plaza",
    firstName: "Herschel",
    lastName: "Chapleo",
    email: "hchapleo5@latimes.com",
    address: "220 Mendota Circle",
    role: "customer",
  },
  {
    id: 7,
    username: "rkeedy6",
    password: "14066 Calypso Hill",
    firstName: "Rochette",
    lastName: "Keedy",
    email: "rkeedy6@360.cn",
    address: "99824 Grasskamp Parkway",
    role: "customer",
  },
  {
    id: 8,
    username: "ksinnat7",
    password: "96401 Alpine Park",
    firstName: "Kore",
    lastName: "Sinnat",
    email: "ksinnat7@xrea.com",
    address: "7583 Commercial Point",
    role: "customer",
  },
  {
    id: 9,
    username: "janders8",
    password: "55 Artisan Place",
    firstName: "Juli",
    lastName: "Anders",
    email: "janders8@opensource.org",
    address: "86 Lyons Terrace",
    role: "customer",
  },
  {
    id: 10,
    username: "kjessop9",
    password: "01 Bunker Hill Crossing",
    firstName: "Kerri",
    lastName: "Jessop",
    email: "kjessop9@gravatar.com",
    address: "5 Lerdahl Hill",
    role: "customer",
  },
];

const ORDER_SEED_DATA = [
  {
    id: 1,
    total: 2.39,
    status: "in progress",
    userId: 1,
  },
  {
    id: 2,
    total: 50.39,
    status: "in progress",
    userId: 6,
  },
  {
    id: 3,
    total: 21.67,
    status: "in progress",
    userId: 2,
  },
  {
    id: 4,
    total: 18.28,
    status: "in progress",
    userId: 8,
  },
  {
    id: 5,
    total: 44.08,
    status: "complete",
    userId: 4,
  },
];

const ITEM_SEED_DATA = [
  {
    id: 1,
    name: "Cardamon Seed / Pod",
    description:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    price: 51.58,
    qty: 7,
  },
  {
    id: 2,
    name: "Table Cloth 62x114 White",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    price: 32.93,
    qty: 91,
  },
  {
    id: 3,
    name: "Juice - Apple, 500 Ml",
    description:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    price: 93.13,
    qty: 90,
  },
  {
    id: 4,
    name: "Lamb - Loin Chops",
    description:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    price: 59.06,
    qty: 23,
  },
  {
    id: 5,
    name: "Asparagus - Green, Fresh",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    price: 98.06,
    qty: 8,
  },
  {
    id: 6,
    name: "Cheese - Mix",
    description:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    price: 32.49,
    qty: 62,
  },
  {
    id: 7,
    name: "Honey - Comb",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    price: 56.05,
    qty: 71,
  },
  {
    id: 8,
    name: "Apple - Macintosh",
    description:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    price: 86.57,
    qty: 40,
  },
  {
    id: 9,
    name: "Wine - Sauvignon Blanc Oyster",
    description:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    price: 38.13,
    qty: 71,
  },
  {
    id: 10,
    name: "Beef - Rib Eye Aaa",
    description:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    price: 59.53,
    qty: 40,
  },
  {
    id: 11,
    name: "Salami - Genova",
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    price: 42.18,
    qty: 58,
  },
  {
    id: 12,
    name: "Wine - Ej Gallo Sonoma",
    description:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    price: 79.93,
    qty: 89,
  },
  {
    id: 13,
    name: "Pastry - Baked Cinnamon Stick",
    description:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    price: 74.63,
    qty: 100,
  },
  {
    id: 14,
    name: "Bread - White, Unsliced",
    description: "Fusce consequat. Nulla nisl. Nunc nisl.",
    price: 44.37,
    qty: 81,
  },
  {
    id: 15,
    name: "Soup - Knorr, Chicken Gumbo",
    description:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    price: 53.78,
    qty: 7,
  },
  {
    id: 16,
    name: "Salmon - Fillets",
    description: "Fusce consequat. Nulla nisl. Nunc nisl.",
    price: 12.65,
    qty: 60,
  },
  {
    id: 17,
    name: "Oil - Canola",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    price: 62.33,
    qty: 77,
  },
  {
    id: 18,
    name: "Pate Pans Yellow",
    description:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    price: 49.18,
    qty: 92,
  },
  {
    id: 19,
    name: "Cream - 10%",
    description:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    price: 63.31,
    qty: 46,
  },
  {
    id: 20,
    name: "Wine - Chablis J Moreau Et Fils",
    description:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    price: 11.77,
    qty: 76,
  },
];

const CART_SEED_DATA = [
  {
    qty: 4,
    orderId: 2,
    itemId: 1,
  },
   {
     qty: 2,
     orderId: 2,
     itemId: 17,
   },
   {
     qty: 3,
     orderId: 4,
     itemId: 10,
   },
   {
     qty: 4,
     orderId: 2,
     itemId: 16,
   },
   {
     qty: 2,
     orderId: 4,
     itemId: 16,
   },
   {
     qty: 2,
     orderId: 2,
     itemId: 19,
   },
   {
     qty: 1,
     orderId: 1,
     itemId: 18,
   },
   {
     qty: 3,
     orderId: 2,
     itemId: 20,
   },
   {
     qty: 4,
     orderId: 4,
     itemId: 17,
   },
   {
     qty: 3,
     orderId: 3,
     itemId: 14,
   },
  {
    qty: 4,
    orderId: 4,
    itemId: 15,
  },
  {
    qty: 1,
    orderId: 1,
    itemId: 10,
  },
  {
    qty: 4,
    orderId: 1,
    itemId: 7,
  },
  {
    qty: 2,
    orderId: 3,
    itemId: 19,
  },
  {
    qty: 3,
    orderId: 2,
    itemId: 15,
  },
  {
    qty: 2,
    orderId: 2,
    itemId: 5,
  },
  {
    qty: 2,
    orderId: 3,
    itemId: 3,
  },
  {
    qty: 4,
    orderId: 5,
    itemId: 8,
  },
  {
    qty: 2,
    orderId: 5,
    itemId: 14,
  },
  {
    qty: 2,
    orderId: 4,
    itemId: 1,
  },
  {
    qty: 1,
    orderId: 4,
    itemId: 7,
  },
  {
    qty: 1,
    orderId: 5,
    itemId: 5,
  },
  {
    qty: 2,
    orderId: 4,
    itemId: 19,
  },
  {
    qty: 2,
    orderId: 2,
    itemId: 9,
  },
  {
    qty: 2,
    orderId: 4,
    itemId: 6,
  },
  {
    qty: 4,
    orderId: 1,
    itemId: 19,
  },
  {
    qty: 3,
    orderId: 5,
    itemId: 20,
  },
  {
    qty: 4,
    orderId: 2,
    itemId: 2,
  },
  {
    qty: 3,
    orderId: 4,
    itemId: 11,
  },
  {
    qty: 4,
    orderId: 3,
    itemId: 12,
  },
];
