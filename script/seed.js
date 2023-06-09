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
    password: 'passWord123',
    firstName: 'Rhoda',
    lastName: 'MacDavitt',
    email: 'rmacdavitt0@paginegialle.it',
    address: '960 Cambridge Parkway',
    role: 'customer',
  },
  {
    password: 'lamp432',
    firstName: 'Glendon',
    lastName: 'Haysom',
    email: 'ghaysom1@cdbaby.com',
    address: '8 Onsgard Terrace',
    role: 'customer',
  },
  {
    password: 'secretword',
    firstName: 'Sela',
    lastName: 'Huikerby',
    email: 'shuikerby2@godaddy.com',
    address: '797 Sheridan Avenue',
    role: 'customer',
  },
  {
    password: 'hiddenText',
    firstName: 'Barbee',
    lastName: 'Logsdail',
    email: 'blogsdail3@hibu.com',
    address: '331 Glacier Hill Parkway',
    role: 'customer',
  },
  {
    password: 'leash',
    firstName: 'Nevile',
    lastName: 'Arckoll',
    email: 'narckoll4@patch.com',
    address: '37 Oakridge Park',
    role: 'customer',
  },
  {
    password: 'puppyLover',
    firstName: 'Herschel',
    lastName: 'Chapleo',
    email: 'hchapleo5@latimes.com',
    address: '220 Mendota Circle',
    role: 'customer',
  },
  {
    password: 'MarineCorpRules',
    firstName: 'Rochette',
    lastName: 'Keedy',
    email: 'rkeedy6@360.cn',
    address: '99824 Grasskamp Parkway',
    role: 'customer',
  },
  {
    password: 'NavyDrools',
    firstName: 'Kore',
    lastName: 'Sinnat',
    email: 'ksinnat7@xrea.com',
    address: '7583 Commercial Point',
    role: 'customer',
  },
  {
    password: 'CoolKid',
    firstName: 'Juli',
    lastName: 'Anders',
    email: 'janders8@opensource.org',
    address: '86 Lyons Terrace',
    role: 'customer',
  },
  {
    password: 'guitars',
    firstName: 'Kerri',
    lastName: 'Jessop',
    email: 'kjessop9@gravatar.com',
    address: '5 Lerdahl Hill',
    role: 'customer',
  },
  {
    password: 'shallnotpass',
    firstName: 'Funky',
    lastName: 'Edd',
    email: 'fedd9@gmail.com',
    role: 'admin',
  },
];

const ORDER_SEED_DATA = [
  {
    total: 586.15,
    status: 'in progress',
    userId: 1,
  },
  {
    total: 1108.95,
    status: 'in progress',
    userId: 6,
  },
  {
    total: 765.71,
    status: 'in progress',
    userId: 2,
  },
  {
    total: 1226.9,
    status: 'in progress',
    userId: 8,
  },
  {
    total: 568.39,
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

const ITEM_SEED_DATA = [
  {
    name: 'Pee Pads',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    price: 27.19,
    stock: 57,
    tag: 'supplies',
    favorite: true,
  },
  {
    name: 'Poop Bags',
    description:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    price: 6.99,
    stock: 95,
    tag: 'supplies',
    favorite: true,
  },
  {
    name: 'Stain & Odor Eliminator',
    description:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    price: 19.97,
    stock: 16,
    tag: 'supplies',
    favorite: false,
  },
  {
    name: 'Probiotics for Dogs',
    description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    price: 35.95,
    stock: 96,
    tag: 'health',
    favorite: false,
  },
  {
    name: 'Hair Clippers',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    price: 34.99,
    stock: 40,
    tag: 'grooming',
    favorite: true,
  },
  {
    name: 'Dog Leash',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    price: 21.99,
    stock: 48,
    tag: 'leash',
    favorite: false,
  },
  {
    name: 'Reflective Dog Collar',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    price: 8.19,
    stock: 34,
    tag: 'collar',
    favorite: true,
  },
  {
    name: 'Round Cushion Bed',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    price: 19.99,
    stock: 9,
    tag: 'bed',
    favorite: false,
  },
  {
    name: 'Woven Storage Basket',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    price: 12.74,
    stock: 55,
    tag: 'misc',
    favorite: false,
  },
  {
    name: 'Toothpaste, Toothbrush & Fingerbrush',
    description:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    price: 7.99,
    stock: 97,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Pet Hair Remover',
    description:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    price: 29.95,
    stock: 40,
    tag: 'supplies',
    favorite: true,
  },
  {
    name: 'Pet Blanket',
    description: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    price: 13.99,
    stock: 55,
    tag: 'bed',
    favorite: true,
  },
  {
    name: 'Pet Grooming Wipes',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    price: 8.99,
    stock: 41,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Washable Pee Pads',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    price: 16.99,
    stock: 69,
    tag: 'supplies',
    favorite: false,
  },
  {
    name: 'Nail Grinder',
    description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    price: 24.99,
    stock: 59,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: '20 Pack Chew Toys',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    price: 20.39,
    stock: 58,
    tag: 'toy',
    favorite: false,
  },
  {
    name: 'Alaskan Salmon Oil',
    description: 'Fusce consequat. Nulla nisl. Nunc nisl.',
    price: 13.68,
    stock: 73,
    tag: 'food',
    favorite: true,
  },
  {
    name: 'Pet Camera',
    description:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    price: 35.99,
    stock: 44,
    tag: 'food',
    favorite: true,
  },
  {
    name: 'Lettuce - Romaine',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    price: 35.75,
    stock: 99,
    tag: 'toy',
    favorite: true,
  },
  {
    name: 'Stock - Beef, White',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    price: 18.71,
    stock: 85,
    tag: 'bed',
    favorite: true,
  },
  {
    name: 'Schnappes - Peach, Walkers',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    price: 10.38,
    stock: 54,
    tag: 'costume',
    favorite: true,
  },
  {
    name: 'Sandwich Wrap',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    price: 89.53,
    stock: 96,
    tag: 'costume',
    favorite: false,
  },
  {
    name: 'Mushroom - Enoki, Dry',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    price: 60.53,
    stock: 20,
    tag: 'food',
    favorite: false,
  },
  {
    name: 'Coriander - Seed',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    price: 77.4,
    stock: 47,
    tag: 'bed',
    favorite: false,
  },
  {
    name: 'Soup - Campbells Chili Veg',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    price: 5.41,
    stock: 39,
    tag: 'costume',
    favorite: false,
  },
  {
    name: 'Pork - Back, Long Cut, Boneless',
    description:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    price: 17.69,
    stock: 5,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Table Cloth 81x81 White',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    price: 21.32,
    stock: 43,
    tag: 'toy',
    favorite: false,
  },
  {
    name: 'Rice - Brown',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    price: 9.32,
    stock: 77,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Straws - Cocktale',
    description:
      'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    price: 43.88,
    stock: 11,
    tag: 'toy',
    favorite: true,
  },
  {
    name: 'Pork - Side Ribs',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    price: 92.39,
    stock: 94,
    tag: 'costume',
    favorite: true,
  },
  {
    name: 'Trout - Hot Smkd, Dbl Fillet',
    description:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    price: 87.28,
    stock: 41,
    tag: 'food',
    favorite: false,
  },
  {
    name: 'Cheese - Parmesan Cubes',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    price: 50.18,
    stock: 22,
    tag: 'toy',
    favorite: false,
  },
  {
    name: 'Cheese - Brick With Onion',
    description:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    price: 58.54,
    stock: 35,
    tag: 'costume',
    favorite: true,
  },
  {
    name: 'Compound - Passion Fruit',
    description:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    price: 40.1,
    stock: 79,
    tag: 'costume',
    favorite: true,
  },
  {
    name: 'Snapple - Mango Maddness',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    price: 34.47,
    stock: 19,
    tag: 'bed',
    favorite: false,
  },
  {
    name: 'Apple - Custard',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    price: 19.11,
    stock: 3,
    tag: 'costume',
    favorite: false,
  },
  {
    name: 'Muffin - Mix - Mango Sour Cherry',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
    price: 30.49,
    stock: 33,
    tag: 'costume',
    favorite: true,
  },
  {
    name: 'Tart Shells - Savory, 2',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    price: 13.6,
    stock: 97,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Soup - Campbells, Butternut',
    description:
      'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    price: 64.96,
    stock: 10,
    tag: 'costume',
    favorite: false,
  },
  {
    name: 'Stock - Fish',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    price: 14.77,
    stock: 82,
    tag: 'toy',
    favorite: true,
  },
  {
    name: 'Shrimp - Black Tiger 6 - 8',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    price: 95.12,
    stock: 98,
    tag: 'food',
    favorite: true,
  },
  {
    name: 'Sprouts - Pea',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    price: 91.82,
    stock: 80,
    tag: 'toy',
    favorite: true,
  },
  {
    name: 'Anisette - Mcguiness',
    description:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    price: 47.35,
    stock: 24,
    tag: 'clothing',
    favorite: false,
  },
  {
    name: 'Tomato Paste',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
    price: 19.25,
    stock: 88,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Sauce - Chili',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    price: 93.16,
    stock: 76,
    tag: 'food',
    favorite: false,
  },
  {
    name: 'Sachet',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    price: 48.86,
    stock: 9,
    tag: 'leash',
    favorite: true,
  },
  {
    name: 'Petit Baguette',
    description:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    price: 55.31,
    stock: 72,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Crab - Back Fin Meat, Canned',
    description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    price: 2.86,
    stock: 76,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Salt - Celery',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    price: 24.99,
    stock: 50,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Appetizer - Seafood Assortment',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    price: 86.14,
    stock: 70,
    tag: 'costume',
    favorite: false,
  },
  {
    name: 'Broom - Push',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    price: 47.26,
    stock: 36,
    tag: 'bed',
    favorite: false,
  },
  {
    name: 'Paper Cocktail Umberlla 80 - 180',
    description:
      'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
    price: 34.11,
    stock: 75,
    tag: 'leash',
    favorite: true,
  },
  {
    name: 'Sobe - Liz Blizz',
    description:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    price: 53.69,
    stock: 70,
    tag: 'leash',
    favorite: false,
  },
  {
    name: 'Halibut - Steaks',
    description:
      'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    price: 94.78,
    stock: 19,
    tag: 'clothing',
    favorite: false,
  },
  {
    name: 'Wine - Cotes Du Rhone',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    price: 9.36,
    stock: 8,
    tag: 'food',
    favorite: true,
  },
  {
    name: 'Artichokes - Knobless, White',
    description:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    price: 38.58,
    stock: 34,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Rappini - Andy Boy',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    price: 74.69,
    stock: 12,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Carbonated Water - Lemon Lime',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    price: 13.48,
    stock: 5,
    tag: 'costume',
    favorite: true,
  },
  {
    name: 'Wine - Kwv Chenin Blanc South',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    price: 51.0,
    stock: 41,
    tag: 'bed',
    favorite: false,
  },
  {
    name: 'Gingerale - Schweppes, 355 Ml',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    price: 58.1,
    stock: 68,
    tag: 'leash',
    favorite: false,
  },
  {
    name: 'Bread - White Epi Baguette',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    price: 41.66,
    stock: 93,
    tag: 'clothing',
    favorite: false,
  },
  {
    name: 'Rappini - Andy Boy',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    price: 41.65,
    stock: 90,
    tag: 'bed',
    favorite: true,
  },
  {
    name: 'Containter - 3oz Microwave Rect.',
    description: 'In congue. Etiam justo. Etiam pretium iaculis justo.',
    price: 64.29,
    stock: 57,
    tag: 'costume',
    favorite: false,
  },
  {
    name: 'Chips Potato Swt Chilli Sour',
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    price: 90.57,
    stock: 62,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Corn Kernels - Frozen',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
    price: 48.87,
    stock: 60,
    tag: 'leash',
    favorite: true,
  },
  {
    name: 'Sauce - Cranberry',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    price: 26.36,
    stock: 66,
    tag: 'bed',
    favorite: true,
  },
  {
    name: 'Trueblue - Blueberry',
    description:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    price: 27.12,
    stock: 31,
    tag: 'clothing',
    favorite: false,
  },
  {
    name: 'Mints - Striped Red',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    price: 83.72,
    stock: 88,
    tag: 'food',
    favorite: true,
  },
  {
    name: 'Flour - Fast / Rapid',
    description:
      'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
    price: 17.87,
    stock: 5,
    tag: 'bed',
    favorite: true,
  },
  {
    name: 'Lentils - Green Le Puy',
    description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    price: 53.25,
    stock: 59,
    tag: 'food',
    favorite: false,
  },
  {
    name: 'Mix Pina Colada',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    price: 49.22,
    stock: 58,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Crush - Orange, 355ml',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    price: 94.66,
    stock: 36,
    tag: 'toy',
    favorite: true,
  },
  {
    name: 'Kaffir Lime Leaves',
    description:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
    price: 14.21,
    stock: 16,
    tag: 'food',
    favorite: true,
  },
  {
    name: 'Bacon Strip Precooked',
    description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    price: 83.09,
    stock: 26,
    tag: 'toy',
    favorite: false,
  },
  {
    name: 'Coriander - Seed',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    price: 11.68,
    stock: 76,
    tag: 'clothing',
    favorite: false,
  },
  {
    name: 'Heavy Duty Dust Pan',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    price: 87.46,
    stock: 70,
    tag: 'food',
    favorite: true,
  },
  {
    name: 'Chips Potato All Dressed - 43g',
    description:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    price: 64.61,
    stock: 24,
    tag: 'food',
    favorite: true,
  },
  {
    name: 'Soup - Campbells Beef Strogonoff',
    description:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    price: 6.97,
    stock: 2,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Salmon - Canned',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    price: 97.05,
    stock: 20,
    tag: 'bed',
    favorite: false,
  },
  {
    name: 'Longos - Chicken Caeser Salad',
    description:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.',
    price: 1.72,
    stock: 27,
    tag: 'bed',
    favorite: false,
  },
  {
    name: 'Chip - Potato Dill Pickle',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    price: 64.08,
    stock: 9,
    tag: 'leash',
    favorite: true,
  },
  {
    name: 'Beer - True North Lager',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    price: 30.53,
    stock: 60,
    tag: 'toy',
    favorite: false,
  },
  {
    name: 'Wine - Vovray Sec Domaine Huet',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    price: 56.87,
    stock: 8,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Horseradish - Prepared',
    description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    price: 99.18,
    stock: 5,
    tag: 'bed',
    favorite: true,
  },
  {
    name: 'Pastry - Choclate Baked',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    price: 36.6,
    stock: 39,
    tag: 'bed',
    favorite: false,
  },
  {
    name: 'Shrimp - Black Tiger 8 - 12',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    price: 57.93,
    stock: 49,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Stock - Veal, White',
    description: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    price: 92.22,
    stock: 46,
    tag: 'leash',
    favorite: true,
  },
  {
    name: 'Oil - Truffle, White',
    description:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
    price: 96.71,
    stock: 39,
    tag: 'bed',
    favorite: true,
  },
  {
    name: 'Latex Rubber Gloves Size 9',
    description:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    price: 78.91,
    stock: 74,
    tag: 'leash',
    favorite: true,
  },
  {
    name: 'Napkin - Beverge, White 2 - Ply',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    price: 49.38,
    stock: 71,
    tag: 'costume',
    favorite: true,
  },
  {
    name: 'Truffle - Whole Black Peeled',
    description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    price: 85.49,
    stock: 22,
    tag: 'toy',
    favorite: true,
  },
  {
    name: 'Raspberries - Frozen',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    price: 67.92,
    stock: 27,
    tag: 'toy',
    favorite: false,
  },
  {
    name: 'Wine - Chateau Aqueria Tavel',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    price: 51.17,
    stock: 12,
    tag: 'grooming',
    favorite: false,
  },
  {
    name: 'Water - Tonic',
    description:
      'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    price: 79.18,
    stock: 23,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Vanilla Beans',
    description:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
    price: 38.65,
    stock: 50,
    tag: 'clothing',
    favorite: true,
  },
  {
    name: 'Puree - Guava',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    price: 11.12,
    stock: 50,
    tag: 'food',
    favorite: false,
  },
  {
    name: 'Jam - Blackberry, 20 Ml Jar',
    description:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    price: 86.26,
    stock: 20,
    tag: 'food',
    favorite: false,
  },
  {
    name: 'Pomegranates',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    price: 96.15,
    stock: 68,
    tag: 'clothing',
    favorite: false,
  },
  {
    name: 'Banana Turning',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    price: 59.83,
    stock: 73,
    tag: 'toy',
    favorite: true,
  },
  {
    name: 'Pork - Bacon,back Peameal',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
    price: 79.64,
    stock: 7,
    tag: 'bed',
    favorite: true,
  },
];
