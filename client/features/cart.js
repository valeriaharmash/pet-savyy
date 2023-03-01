import React, { useState, useEffect } from "react";

const Cart = () => {
  const [item, setItem] = useState({});
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ userId: 5 });
  const [total, setTotal] = useState(0);
  const qtyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const currCart = orders.filter(
      (order) => order.userId === user.userId && order.status === "in progress"
    );
    setCart(currCart);
    const subTotal = currCart.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);

    setTotal(subTotal);
  }, []);

  const handleDelete = async (itemId) => {
    const updatedCart = cart.filter((item) => item.itemId !== itemId);
    setCart(updatedCart);
    const subTotal = updatedCart.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);

    setTotal(subTotal);
  };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedCart = cart.map((item) => {
      if (item.itemId === itemId) {
        return { ...item, qty: quantity };
      }
      return item;
    });
    setCart(updatedCart);

    const subTotal = updatedCart.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);

    setTotal(subTotal);
  };

  return (
    <div className="content">
      <div className="container">
        <h1>Shopping Cart</h1>
        <h3 className="flex-end-column">{`Total: $${total.toFixed(2)}`}</h3>
      </div>
      <div>
        {cart.map((item) => {
          return (
            <div key={item.itemId} className="cart-items">
              <img
                src={item.imageUrl}
                alt={item.name}
                height="150"
                width="175"
              />
              <div className="item-description">
                <h4>Item: {item.name}</h4>
                <p>{item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                <select
                  style={{ marginBottom: "1rem" }}
                  value={item.qty}
                  onChange={(event) =>
                    handleQuantityChange(item.itemId, event.target.value)
                  }
                >
                  {qtyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleDelete(item.itemId)}>
                  Remove from Cart
                </button>
              </div>
              <div>{`$ ${(item.price * item.qty).toFixed(2)}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;


const orders = [
  {
    itemId: 97,
    orderId: 1,
    qty: 2,
    name: "Muskox - French Rack",
    description: "Creme De Cacao Mcguines",
    price: 38.18,
    stock: 84,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 29.35,
    status: "in progress",
    userId: 4,
  },
  {
    itemId: 67,
    orderId: 2,
    qty: 4,
    name: "Pasta - Lasagna Noodle, Frozen",
    description: "Beef - Rib Roast, Cap On",
    price: 49.98,
    stock: 62,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 38.51,
    status: "in progress",
    userId: 2,
  },
  {
    itemId: 67,
    orderId: 3,
    qty: 3,
    name: "Table Cloth 81x81 White",
    description: "Corn Meal",
    price: 14.34,
    stock: 25,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 8.1,
    status: "complete",
    userId: 2,
  },
  {
    itemId: 67,
    orderId: 4,
    qty: 5,
    name: "Beef Tenderloin Aaa",
    description: "Beef - Bresaola",
    price: 29.78,
    stock: 90,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 22.51,
    status: "in progress",
    userId: 5,
  },
  {
    itemId: 75,
    orderId: 4,
    qty: 5,
    name: "Soup - Base Broth Chix",
    description: "Wine - Chablis J Moreau Et Fils",
    price: 29.63,
    stock: 79,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 21.06,
    status: "in progress",
    userId: 5,
  },
  {
    itemId: 32,
    orderId: 4,
    qty: 2,
    name: "Shrimp - Black Tiger 8 - 12",
    description: "Pasta - Canelloni, Single Serve",
    price: 12.75,
    stock: 20,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 20.18,
    status: "in progress",
    userId: 5,
  },
  {
    itemId: 89,
    orderId: 4,
    qty: 3,
    name: "Bread - Hot Dog Buns",
    description: "Nantucket Orange Juice",
    price: 23.85,
    stock: 39,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 35.62,
    status: "in progress",
    userId: 5,
  },
  {
    itemId: 90,
    orderId: 4,
    qty: 3,
    name: "Appetizer - Assorted Box",
    description: "Coke - Diet, 355 Ml",
    price: 7.92,
    stock: 0,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 37.47,
    status: "in progress",
    userId: 5,
  },
  {
    itemId: 67,
    orderId: 5,
    qty: 3,
    name: "Coffee - Irish Cream",
    description: "Steam Pan - Half Size Deep",
    price: 9.41,
    stock: 35,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 20.41,
    status: "complete",
    userId: 2,
  },
  {
    itemId: 72,
    orderId: 6,
    qty: 5,
    name: "Soup - Campbells, Spinach Crm",
    description: "Salmon - Smoked, Sliced",
    price: 12.83,
    stock: 63,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 43.51,
    status: "complete",
    userId: 1,
  },
  {
    itemId: 67,
    orderId: 7,
    qty: 3,
    name: "Soup Knorr Chili With Beans",
    description: "Wine - Sicilia Igt Nero Avola",
    price: 13.31,
    stock: 66,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 11.35,
    status: "complete",
    userId: 2,
  },
  {
    itemId: 82,
    orderId: 8,
    qty: 5,
    name: "Veal - Loin",
    description: "Soup - Campbells",
    price: 46.68,
    stock: 34,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 11.81,
    status: "complete",
    userId: 1,
  },
  {
    itemId: 14,
    orderId: 9,
    qty: 2,
    name: "Potatoes - Fingerling 4 Oz",
    description: "idaho potatoes",
    price: 16.33,
    stock: 94,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 21.19,
    status: "in progress",
    userId: 3,
  },
  {
    itemId: 27,
    orderId: 9,
    qty: 3,
    name: "Rolled Oats",
    description: "Nut - Almond, Blanched, Whole",
    price: 47.44,
    stock: 69,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 31.92,
    status: "in progress",
    userId: 3,
  },
  {
    itemId: 66,
    orderId: 9,
    qty: 1,
    name: "Muffin Carrot - Individual",
    description: "Wine - Valpolicella Masi",
    price: 20.5,
    stock: 70,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 38.57,
    status: "in progress",
    userId: 3,
  },
  {
    itemId: 83,
    orderId: 9,
    qty: 5,
    name: "Pasta - Tortellini, Fresh",
    description: "Potatoes - Yukon Gold, 80 Ct",
    price: 31.29,
    stock: 34,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 12.96,
    status: "in progress",
    userId: 3,
  },
  {
    itemId: 83,
    orderId: 17,
    qty: 5,
    name: "Sambuca - Ramazzotti",
    description: "Oil - Grapeseed Oil",
    price: 8.75,
    stock: 62,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 22.2,
    status: "in progress",
    userId: 4,
  },
  {
    itemId: 99,
    orderId: 18,
    qty: 4,
    name: "Mousse - Banana Chocolate",
    description: "Shrimp - 16 - 20 Cooked, Peeled",
    price: 32.19,
    stock: 99,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 8.71,
    status: "in progress",
    userId: 1,
  },
  {
    itemId: 93,
    orderId: 19,
    qty: 3,
    name: "Beef - Tenderloin - Aa",
    description: "Wine - Blue Nun Qualitatswein",
    price: 33.54,
    stock: 80,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 47.01,
    status: "in progress",
    userId: 2,
  },
  {
    itemId: 15,
    orderId: 20,
    qty: 1,
    name: "Fish - Halibut, Cold Smoked",
    description: "Pasta - Orecchiette",
    price: 5.15,
    stock: 36,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 47.39,
    status: "complete",
    userId: 3,
  },
  {
    itemId: 44,
    orderId: 21,
    qty: 5,
    name: "Dates",
    description: "Longos - Grilled Veg Sandwiches",
    price: 8.8,
    stock: 43,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 32.6,
    status: "in progress",
    userId: 2,
  },
  {
    itemId: 20,
    orderId: 22,
    qty: 3,
    name: "Wine - Vovray Sec Domaine Huet",
    description: "Sauce - Soya, Dark",
    price: 32.56,
    stock: 24,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 15.42,
    status: "complete",
    userId: 3,
  },
  {
    itemId: 39,
    orderId: 23,
    qty: 5,
    name: "Parsnip",
    description: "Bread - Corn Muffaletta",
    price: 40.25,
    stock: 84,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 40.87,
    status: "complete",
    userId: 1,
  },
  {
    itemId: 97,
    orderId: 24,
    qty: 3,
    name: "Cheese - Bocconcini",
    description: "Cheese - Brie",
    price: 41.11,
    stock: 3,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 21.08,
    status: "in progress",
    userId: 2,
  },
  {
    itemId: 52,
    orderId: 25,
    qty: 4,
    name: "Wine - Ej Gallo Sierra Valley",
    description: "Wine - Red, Pelee Island Merlot",
    price: 44.62,
    stock: 94,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/2294/1137/products/squid-game-pet-costume-506455_800x.jpg?v=1634174556",
    total: 14.1,
    status: "complete",
    userId: 1,
  },
];
