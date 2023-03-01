import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { selectItems, fetchItems } from "../store/slices/items";
import { useDispatch, useSelector } from "react-redux";

const Items = () => {
  const dispatch = useDispatch();
  let items = ITEM_SEED_DATA;
  useEffect(() => {
    //dispatch(fetchItems());
  }, [dispatch]);

  //const items = useSelector(selectItems);

  return (
    <>
      {items !== [] ? (
        <>
          <h1 className="itemsHeader">Number of Items {`(${items.length})`}</h1>
          <div className="items">
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <div className="itemContainer">
                    <Link to={`/items/${item.name}`}>
                      <div id="itemImage">
                        <img src="https://heydjangles.com/wp-content/uploads/2020/08/halloween-costumes-for-chihuahuas-21-768x702.png" />
                      </div>
                      <div id="itemDetails">
                        <ul>
                          <li>{item.name}</li>
                          <li
                            style={{ fontWeight: "bold" }}
                          >{`$${item.price}`}</li>
                          <li>Number in cart: {`0`}</li>
                        </ul>
                      </div>
                    </Link>

                    <div id="itemFooter">
                      <Link to={`/items/${item.name}`}>Add to Cart</Link>
                    </div>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Items;

const ITEM_SEED_DATA = [
  {
    id: 1,
    name: "Cardamon Seed / Pod",
    description:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    price: 51.58,
    stock: 7,
  },
  {
    id: 2,
    name: "Table Cloth 62x114 White",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    price: 32.93,
    stock: 91,
  },
  {
    id: 3,
    name: "Juice - Apple, 500 Ml",
    description:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    price: 93.13,
    stock: 90,
  },
  {
    id: 4,
    name: "Lamb - Loin Chops",
    description:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    price: 59.06,
    stock: 23,
  },
  {
    id: 5,
    name: "Asparagus - Green, Fresh",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    price: 98.06,
    stock: 8,
  },
  {
    id: 6,
    name: "Cheese - Mix",
    description:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    price: 32.49,
    stock: 62,
  },
  {
    id: 7,
    name: "Honey - Comb",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    price: 56.05,
    stock: 71,
  },
  {
    id: 8,
    name: "Apple - Macintosh",
    description:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    price: 86.57,
    stock: 40,
  },
  {
    id: 9,
    name: "Wine - Sauvignon Blanc Oyster",
    description:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    price: 38.13,
    stock: 71,
  },
  {
    id: 10,
    name: "Beef - Rib Eye Aaa",
    description:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    price: 59.53,
    stock: 40,
  },
  {
    id: 11,
    name: "Salami - Genova",
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    price: 42.18,
    stock: 58,
  },
  {
    id: 12,
    name: "Wine - Ej Gallo Sonoma",
    description:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    price: 79.93,
    stock: 89,
  },
  {
    id: 13,
    name: "Pastry - Baked Cinnamon Stick",
    description:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    price: 74.63,
    stock: 100,
  },
  {
    id: 14,
    name: "Bread - White, Unsliced",
    description: "Fusce consequat. Nulla nisl. Nunc nisl.",
    price: 44.37,
    stock: 81,
  },
  {
    id: 15,
    name: "Soup - Knorr, Chicken Gumbo",
    description:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    price: 53.78,
    stock: 7,
  },
  {
    id: 16,
    name: "Salmon - Fillets",
    description: "Fusce consequat. Nulla nisl. Nunc nisl.",
    price: 12.65,
    stock: 60,
  },
  {
    id: 17,
    name: "Oil - Canola",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    price: 62.33,
    stock: 77,
  },
  {
    id: 18,
    name: "Pate Pans Yellow",
    description:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    price: 49.18,
    stock: 92,
  },
  {
    id: 19,
    name: "Cream - 10%",
    description:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    price: 63.31,
    stock: 46,
  },
  {
    id: 20,
    name: "Wine - Chablis J Moreau Et Fils",
    description:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    price: 11.77,
    stock: 76,
  },
];
