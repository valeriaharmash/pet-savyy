'use strict';

const {
  db,
  models: { User, Item, Order, Item_Order },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await User.bulkCreate(USER_SEED_DATA, { validate: true });

  //Creating Items
  const items = await Item.bulkCreate(ITEM_SEED_DATA, { validate: true });

  //Creating Orders
  const orders = await Order.bulkCreate(ORDER_SEED_DATA, { validate: true });

  //Filling some carts
  const itemOrders = await Item_Order.bulkCreate(CART_SEED_DATA, {
    validate: true,
  });

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
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
    password: 'passWord123',
    firstName: 'Rhoda',
    lastName: 'MacDavitt',
    email: 'rmacdavitt0@paginegialle.it',
    address: '960 Cambridge Parkway',
    role: 'customer',
  },
  {
    id: 2,
    password: 'lamp432',
    firstName: 'Glendon',
    lastName: 'Haysom',
    email: 'ghaysom1@cdbaby.com',
    address: '8 Onsgard Terrace',
    role: 'customer',
  },
  {
    id: 3,
    password: 'secretword',
    firstName: 'Sela',
    lastName: 'Huikerby',
    email: 'shuikerby2@godaddy.com',
    address: '797 Sheridan Avenue',
    role: 'customer',
  },
  {
    id: 4,
    password: 'hiddenText',
    firstName: 'Barbee',
    lastName: 'Logsdail',
    email: 'blogsdail3@hibu.com',
    address: '331 Glacier Hill Parkway',
    role: 'customer',
  },
  {
    id: 5,
    password: 'leash',
    firstName: 'Nevile',
    lastName: 'Arckoll',
    email: 'narckoll4@patch.com',
    address: '37 Oakridge Park',
    role: 'customer',
  },
  {
    id: 6,
    password: 'puppyLover',
    firstName: 'Herschel',
    lastName: 'Chapleo',
    email: 'hchapleo5@latimes.com',
    address: '220 Mendota Circle',
    role: 'customer',
  },
  {
    id: 7,
    password: 'MarineCorpRules',
    firstName: 'Rochette',
    lastName: 'Keedy',
    email: 'rkeedy6@360.cn',
    address: '99824 Grasskamp Parkway',
    role: 'customer',
  },
  {
    id: 8,
    password: 'NavyDrools',
    firstName: 'Kore',
    lastName: 'Sinnat',
    email: 'ksinnat7@xrea.com',
    address: '7583 Commercial Point',
    role: 'customer',
  },
  {
    id: 9,
    password: 'CoolKid',
    firstName: 'Juli',
    lastName: 'Anders',
    email: 'janders8@opensource.org',
    address: '86 Lyons Terrace',
    role: 'customer',
  },
  {
    id: 10,
    password: 'guitars',
    firstName: 'Kerri',
    lastName: 'Jessop',
    email: 'kjessop9@gravatar.com',
    address: '5 Lerdahl Hill',
    role: 'customer',
  },
  {
    id: 12,
    password: 'shallnotpass',
    firstName: 'Funky',
    lastName: 'Edd',
    email: 'fedd9@gmail.com',
    role: 'admin',
  },
];

const ORDER_SEED_DATA = [
  {
    id: 1,
    total: 2.39,
    status: 'in progress',
    userId: 1,
  },
  {
    id: 2,
    total: 50.39,
    status: 'in progress',
    userId: 6,
  },
  {
    id: 3,
    total: 21.67,
    status: 'in progress',
    userId: 2,
  },
  {
    id: 4,
    total: 18.28,
    status: 'in progress',
    userId: 8,
  },
  {
    id: 5,
    total: 44.08,
    status: 'complete',
    userId: 4,
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




const ITEM_SEED_DATA = [{
  "id": 1,
  "name": "Anisette - Mcguiness",
  "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  "price": 27.77,
  "stock": 57,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 2,
  "name": "Wine - Magnotta, White",
  "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  "price": 32.68,
  "stock": 95,
  "tag": "grooming",
  "favorite": true
}, {
  "id": 3,
  "name": "Cookie - Dough Variety",
  "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  "price": 97.7,
  "stock": 16,
  "tag": "costume",
  "favorite": false
}, {
  "id": 4,
  "name": "Shrimp - 16/20, Peeled Deviened",
  "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
  "price": 91.26,
  "stock": 96,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 5,
  "name": "Longos - Chicken Caeser Salad",
  "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
  "price": 44.0,
  "stock": 40,
  "tag": "bed",
  "favorite": true
}, {
  "id": 6,
  "name": "Hand Towel",
  "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  "price": 53.42,
  "stock": 48,
  "tag": "clothing",
  "favorite": false
}, {
  "id": 7,
  "name": "Stock - Chicken, White",
  "description": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  "price": 36.29,
  "stock": 34,
  "tag": "grooming",
  "favorite": true
}, {
  "id": 8,
  "name": "Pork - Suckling Pig",
  "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
  "price": 49.99,
  "stock": 9,
  "tag": "costume",
  "favorite": false
}, {
  "id": 9,
  "name": "Sausage - Chorizo",
  "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  "price": 94.05,
  "stock": 55,
  "tag": "toy",
  "favorite": false
}, {
  "id": 10,
  "name": "Grapefruit - White",
  "description": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
  "price": 28.39,
  "stock": 97,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 11,
  "name": "Ecolab - Hobart Upr Prewash Arm",
  "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  "price": 60.0,
  "stock": 40,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 12,
  "name": "Chambord Royal",
  "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
  "price": 74.97,
  "stock": 55,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 13,
  "name": "Sauce - Chili",
  "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  "price": 45.42,
  "stock": 41,
  "tag": "food",
  "favorite": false
}, {
  "id": 14,
  "name": "Juice - V8, Tomato",
  "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  "price": 84.37,
  "stock": 69,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 15,
  "name": "Juice - Ocean Spray Cranberry",
  "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
  "price": 89.29,
  "stock": 59,
  "tag": "leash",
  "favorite": false
}, {
  "id": 16,
  "name": "Quail - Whole, Boneless",
  "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  "price": 49.54,
  "stock": 58,
  "tag": "toy",
  "favorite": false
}, {
  "id": 17,
  "name": "Anchovy Fillets",
  "description": "Fusce consequat. Nulla nisl. Nunc nisl.",
  "price": 58.83,
  "stock": 73,
  "tag": "leash",
  "favorite": true
}, {
  "id": 18,
  "name": "Beef - Tender Tips",
  "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  "price": 60.75,
  "stock": 44,
  "tag": "food",
  "favorite": true
}, {
  "id": 19,
  "name": "Lettuce - Romaine",
  "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
  "price": 35.75,
  "stock": 99,
  "tag": "toy",
  "favorite": true
}, {
  "id": 20,
  "name": "Stock - Beef, White",
  "description": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
  "price": 18.71,
  "stock": 85,
  "tag": "bed",
  "favorite": true
}, {
  "id": 21,
  "name": "Schnappes - Peach, Walkers",
  "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  "price": 10.38,
  "stock": 54,
  "tag": "costume",
  "favorite": true
}, {
  "id": 22,
  "name": "Sandwich Wrap",
  "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  "price": 89.53,
  "stock": 96,
  "tag": "costume",
  "favorite": false
}, {
  "id": 23,
  "name": "Mushroom - Enoki, Dry",
  "description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
  "price": 60.53,
  "stock": 20,
  "tag": "food",
  "favorite": false
}, {
  "id": 24,
  "name": "Coriander - Seed",
  "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
  "price": 77.4,
  "stock": 47,
  "tag": "bed",
  "favorite": false
}, {
  "id": 25,
  "name": "Soup - Campbells Chili Veg",
  "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
  "price": 5.41,
  "stock": 39,
  "tag": "costume",
  "favorite": false
}, {
  "id": 26,
  "name": "Pork - Back, Long Cut, Boneless",
  "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  "price": 17.69,
  "stock": 5,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 27,
  "name": "Table Cloth 81x81 White",
  "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  "price": 21.32,
  "stock": 43,
  "tag": "toy",
  "favorite": false
}, {
  "id": 28,
  "name": "Rice - Brown",
  "description": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
  "price": 9.32,
  "stock": 77,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 29,
  "name": "Straws - Cocktale",
  "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
  "price": 43.88,
  "stock": 11,
  "tag": "toy",
  "favorite": true
}, {
  "id": 30,
  "name": "Pork - Side Ribs",
  "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
  "price": 92.39,
  "stock": 94,
  "tag": "costume",
  "favorite": true
}, {
  "id": 31,
  "name": "Trout - Hot Smkd, Dbl Fillet",
  "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  "price": 87.28,
  "stock": 41,
  "tag": "food",
  "favorite": false
}, {
  "id": 32,
  "name": "Cheese - Parmesan Cubes",
  "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  "price": 50.18,
  "stock": 22,
  "tag": "toy",
  "favorite": false
}, {
  "id": 33,
  "name": "Cheese - Brick With Onion",
  "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  "price": 58.54,
  "stock": 35,
  "tag": "costume",
  "favorite": true
}, {
  "id": 34,
  "name": "Compound - Passion Fruit",
  "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
  "price": 40.1,
  "stock": 79,
  "tag": "costume",
  "favorite": true
}, {
  "id": 35,
  "name": "Snapple - Mango Maddness",
  "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
  "price": 34.47,
  "stock": 19,
  "tag": "bed",
  "favorite": false
}, {
  "id": 36,
  "name": "Apple - Custard",
  "description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
  "price": 19.11,
  "stock": 3,
  "tag": "costume",
  "favorite": false
}, {
  "id": 37,
  "name": "Muffin - Mix - Mango Sour Cherry",
  "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
  "price": 30.49,
  "stock": 33,
  "tag": "costume",
  "favorite": true
}, {
  "id": 38,
  "name": "Tart Shells - Savory, 2",
  "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
  "price": 13.6,
  "stock": 97,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 39,
  "name": "Soup - Campbells, Butternut",
  "description": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  "price": 64.96,
  "stock": 10,
  "tag": "costume",
  "favorite": false
}, {
  "id": 40,
  "name": "Stock - Fish",
  "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
  "price": 14.77,
  "stock": 82,
  "tag": "toy",
  "favorite": true
}, {
  "id": 41,
  "name": "Shrimp - Black Tiger 6 - 8",
  "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
  "price": 95.12,
  "stock": 98,
  "tag": "food",
  "favorite": true
}, {
  "id": 42,
  "name": "Sprouts - Pea",
  "description": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
  "price": 91.82,
  "stock": 80,
  "tag": "toy",
  "favorite": true
}, {
  "id": 43,
  "name": "Anisette - Mcguiness",
  "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  "price": 47.35,
  "stock": 24,
  "tag": "clothing",
  "favorite": false
}, {
  "id": 44,
  "name": "Tomato Paste",
  "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
  "price": 19.25,
  "stock": 88,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 45,
  "name": "Sauce - Chili",
  "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
  "price": 93.16,
  "stock": 76,
  "tag": "food",
  "favorite": false
}, {
  "id": 46,
  "name": "Sachet",
  "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  "price": 48.86,
  "stock": 9,
  "tag": "leash",
  "favorite": true
}, {
  "id": 47,
  "name": "Petit Baguette",
  "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
  "price": 55.31,
  "stock": 72,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 48,
  "name": "Crab - Back Fin Meat, Canned",
  "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
  "price": 2.86,
  "stock": 76,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 49,
  "name": "Salt - Celery",
  "description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
  "price": 24.99,
  "stock": 50,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 50,
  "name": "Appetizer - Seafood Assortment",
  "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
  "price": 86.14,
  "stock": 70,
  "tag": "costume",
  "favorite": false
}, {
  "id": 51,
  "name": "Broom - Push",
  "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
  "price": 47.26,
  "stock": 36,
  "tag": "bed",
  "favorite": false
}, {
  "id": 52,
  "name": "Paper Cocktail Umberlla 80 - 180",
  "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  "price": 34.11,
  "stock": 75,
  "tag": "leash",
  "favorite": true
}, {
  "id": 53,
  "name": "Sobe - Liz Blizz",
  "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  "price": 53.69,
  "stock": 70,
  "tag": "leash",
  "favorite": false
}, {
  "id": 54,
  "name": "Halibut - Steaks",
  "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
  "price": 94.78,
  "stock": 19,
  "tag": "clothing",
  "favorite": false
}, {
  "id": 55,
  "name": "Wine - Cotes Du Rhone",
  "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  "price": 9.36,
  "stock": 8,
  "tag": "food",
  "favorite": true
}, {
  "id": 56,
  "name": "Artichokes - Knobless, White",
  "description": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
  "price": 38.58,
  "stock": 34,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 57,
  "name": "Rappini - Andy Boy",
  "description": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
  "price": 74.69,
  "stock": 12,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 58,
  "name": "Carbonated Water - Lemon Lime",
  "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  "price": 13.48,
  "stock": 5,
  "tag": "costume",
  "favorite": true
}, {
  "id": 59,
  "name": "Wine - Kwv Chenin Blanc South",
  "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  "price": 51.0,
  "stock": 41,
  "tag": "bed",
  "favorite": false
}, {
  "id": 60,
  "name": "Gingerale - Schweppes, 355 Ml",
  "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
  "price": 58.1,
  "stock": 68,
  "tag": "leash",
  "favorite": false
}, {
  "id": 61,
  "name": "Bread - White Epi Baguette",
  "description": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
  "price": 41.66,
  "stock": 93,
  "tag": "clothing",
  "favorite": false
}, {
  "id": 62,
  "name": "Rappini - Andy Boy",
  "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  "price": 41.65,
  "stock": 90,
  "tag": "bed",
  "favorite": true
}, {
  "id": 63,
  "name": "Containter - 3oz Microwave Rect.",
  "description": "In congue. Etiam justo. Etiam pretium iaculis justo.",
  "price": 64.29,
  "stock": 57,
  "tag": "costume",
  "favorite": false
}, {
  "id": 64,
  "name": "Chips Potato Swt Chilli Sour",
  "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  "price": 90.57,
  "stock": 62,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 65,
  "name": "Corn Kernels - Frozen",
  "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  "price": 48.87,
  "stock": 60,
  "tag": "leash",
  "favorite": true
}, {
  "id": 66,
  "name": "Sauce - Cranberry",
  "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  "price": 26.36,
  "stock": 66,
  "tag": "bed",
  "favorite": true
}, {
  "id": 67,
  "name": "Trueblue - Blueberry",
  "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  "price": 27.12,
  "stock": 31,
  "tag": "clothing",
  "favorite": false
}, {
  "id": 68,
  "name": "Mints - Striped Red",
  "description": "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
  "price": 83.72,
  "stock": 88,
  "tag": "food",
  "favorite": true
}, {
  "id": 69,
  "name": "Flour - Fast / Rapid",
  "description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
  "price": 17.87,
  "stock": 5,
  "tag": "bed",
  "favorite": true
}, {
  "id": 70,
  "name": "Lentils - Green Le Puy",
  "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
  "price": 53.25,
  "stock": 59,
  "tag": "food",
  "favorite": false
}, {
  "id": 71,
  "name": "Mix Pina Colada",
  "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  "price": 49.22,
  "stock": 58,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 72,
  "name": "Crush - Orange, 355ml",
  "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
  "price": 94.66,
  "stock": 36,
  "tag": "toy",
  "favorite": true
}, {
  "id": 73,
  "name": "Kaffir Lime Leaves",
  "description": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
  "price": 14.21,
  "stock": 16,
  "tag": "food",
  "favorite": true
}, {
  "id": 74,
  "name": "Bacon Strip Precooked",
  "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
  "price": 83.09,
  "stock": 26,
  "tag": "toy",
  "favorite": false
}, {
  "id": 75,
  "name": "Coriander - Seed",
  "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
  "price": 11.68,
  "stock": 76,
  "tag": "clothing",
  "favorite": false
}, {
  "id": 76,
  "name": "Heavy Duty Dust Pan",
  "description": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
  "price": 87.46,
  "stock": 70,
  "tag": "food",
  "favorite": true
}, {
  "id": 77,
  "name": "Chips Potato All Dressed - 43g",
  "description": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
  "price": 64.61,
  "stock": 24,
  "tag": "food",
  "favorite": true
}, {
  "id": 78,
  "name": "Soup - Campbells Beef Strogonoff",
  "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  "price": 6.97,
  "stock": 2,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 79,
  "name": "Salmon - Canned",
  "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  "price": 97.05,
  "stock": 20,
  "tag": "bed",
  "favorite": false
}, {
  "id": 80,
  "name": "Longos - Chicken Caeser Salad",
  "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
  "price": 1.72,
  "stock": 27,
  "tag": "bed",
  "favorite": false
}, {
  "id": 81,
  "name": "Chip - Potato Dill Pickle",
  "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  "price": 64.08,
  "stock": 9,
  "tag": "leash",
  "favorite": true
}, {
  "id": 82,
  "name": "Beer - True North Lager",
  "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
  "price": 30.53,
  "stock": 60,
  "tag": "toy",
  "favorite": false
}, {
  "id": 83,
  "name": "Wine - Vovray Sec Domaine Huet",
  "description": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  "price": 56.87,
  "stock": 8,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 84,
  "name": "Horseradish - Prepared",
  "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
  "price": 99.18,
  "stock": 5,
  "tag": "bed",
  "favorite": true
}, {
  "id": 85,
  "name": "Pastry - Choclate Baked",
  "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
  "price": 36.6,
  "stock": 39,
  "tag": "bed",
  "favorite": false
}, {
  "id": 86,
  "name": "Shrimp - Black Tiger 8 - 12",
  "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
  "price": 57.93,
  "stock": 49,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 87,
  "name": "Stock - Veal, White",
  "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
  "price": 92.22,
  "stock": 46,
  "tag": "leash",
  "favorite": true
}, {
  "id": 88,
  "name": "Oil - Truffle, White",
  "description": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
  "price": 96.71,
  "stock": 39,
  "tag": "bed",
  "favorite": true
}, {
  "id": 89,
  "name": "Latex Rubber Gloves Size 9",
  "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  "price": 78.91,
  "stock": 74,
  "tag": "leash",
  "favorite": true
}, {
  "id": 90,
  "name": "Napkin - Beverge, White 2 - Ply",
  "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  "price": 49.38,
  "stock": 71,
  "tag": "costume",
  "favorite": true
}, {
  "id": 91,
  "name": "Truffle - Whole Black Peeled",
  "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
  "price": 85.49,
  "stock": 22,
  "tag": "toy",
  "favorite": true
}, {
  "id": 92,
  "name": "Raspberries - Frozen",
  "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  "price": 67.92,
  "stock": 27,
  "tag": "toy",
  "favorite": false
}, {
  "id": 93,
  "name": "Wine - Chateau Aqueria Tavel",
  "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
  "price": 51.17,
  "stock": 12,
  "tag": "grooming",
  "favorite": false
}, {
  "id": 94,
  "name": "Water - Tonic",
  "description": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
  "price": 79.18,
  "stock": 23,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 95,
  "name": "Vanilla Beans",
  "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  "price": 38.65,
  "stock": 50,
  "tag": "clothing",
  "favorite": true
}, {
  "id": 96,
  "name": "Puree - Guava",
  "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
  "price": 11.12,
  "stock": 50,
  "tag": "food",
  "favorite": false
}, {
  "id": 97,
  "name": "Jam - Blackberry, 20 Ml Jar",
  "description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  "price": 86.26,
  "stock": 20,
  "tag": "food",
  "favorite": false
}, {
  "id": 98,
  "name": "Pomegranates",
  "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
  "price": 96.15,
  "stock": 68,
  "tag": "clothing",
  "favorite": false
}, {
  "id": 99,
  "name": "Banana Turning",
  "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
  "price": 59.83,
  "stock": 73,
  "tag": "toy",
  "favorite": true
}, {
  "id": 100,
  "name": "Pork - Bacon,back Peameal",
  "description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
  "price": 79.64,
  "stock": 7,
  "tag": "bed",
  "favorite": true
}]